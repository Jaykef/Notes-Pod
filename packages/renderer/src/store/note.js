import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';
import { useStorage } from '../composable/storage';
import { DB3, getATestStaticKeypair, getAddress, DocStore, sign } from 'db3js';

const storage = useStorage();
const db3 = new DB3('http://127.0.0.1:26659');
const doc_store = new DocStore(db3);
const [sk, public_key] = (async () => {return await getATestStaticKeypair()})();
async function mySign(data) {
	return [await sign(data, sk), public_key];
}

const noteIndex = {
	keys: [
		{
			name: 'id',
			keyType: DocKeyType.STRING,
		},
	],
	ns: 'my_notes',
	docName: 'notes',
};

export const useNoteStore = defineStore('note', {
  state: () => ({
    data: {},
  }),
  getters: {
    notes: (state) => Object.values(state.data).filter(({ id }) => id),
    getById: (state) => (id) => state.data[id],
  },
  actions: {
    retrieve() {
      return new Promise((resolve) => {
        storage.get('notes', {}).then((data) => {
          this.data = data;
          resolve(data);
        });
      });
    },
    add(note = {}) {
      return new Promise((resolve) => {
        const id = note.id || nanoid();
        const newNote = {
          id,
          title: '',
          content: { type: 'doc', content: [] },
          labels: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
          isBookmarked: false,
          isArchived: false,
          ...note,
        };
        this.data[id] = new_note;
        doc_store.insertDocs(nodeIndex, [new_note], mySign);
      });
    },
    update(id, data = {}) {
      return new Promise((resolve) => {
        const updatedNode =  {
          ...this.data[id],
          ...data,
        };
        this.data[id] = updatedNode;
        doc_store.insertDocs(nodeIndex, [updatedNode], mySign);
      });
    },
    async delete(id) {
      try {
        const lastEditedNote = localStorage.getItem('lastNoteEdit');

        if (lastEditedNote === id) localStorage.removeItem('lastNoteEdit');

        const { path, ipcRenderer } = window.electron;
        const dataDir = await storage.get('dataDir', '', 'settings');

        delete this.data[id];

        await ipcRenderer.callMain(
          'fs:remove',
          path.join(dataDir, 'notes-assets', id)
        );
        await storage.delete(`notes.${id}`);

        return id;
      } catch (error) {
        console.error(error);
      }
    },
  },
  addLabel(id, labelId) {
    return new Promise((resolve) => {
      if (this.data[id]) {
        const labelIndex = this.data[id].labels.indexOf(labelId);

        if (labelIndex === -1) {
          this.data[id].labels.push(labelId);

          storage
            .set(`notes.${id}`, this.data[id])
            .then(() => resolve(labelId));

          return;
        }

        resolve();
      }
    });
  },
});
