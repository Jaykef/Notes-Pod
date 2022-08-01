"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source2, exclude) => {
  var target = {};
  for (var prop in source2)
    if (__hasOwnProp.call(source2, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source2[prop];
  if (source2 != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source2)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source2, prop))
        target[prop] = source2[prop];
    }
  return target;
};
var require$$1 = require("electron");
var require$$1$1 = require("path");
var require$$2 = require("url");
var require$$0$2 = require("fs");
var require$$0 = require("constants");
var require$$0$1 = require("stream");
var require$$4 = require("util");
var require$$5 = require("assert");
var require$$0$3 = require("events");
var require$$0$4 = require("crypto");
var require$$1$2 = require("string_decoder");
var require$$4$1 = require("fs/promises");
var require$$1$3 = require("os");
var require$$1$4 = require("child_process");
var require$$2$1 = require("zlib");
var require$$3$1 = require("http");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
function _interopNamespace(e) {
  if (e && e.__esModule)
    return e;
  var n = { __proto__: null, [Symbol.toStringTag]: "Module" };
  if (e) {
    Object.keys(e).forEach(function(k) {
      if (k !== "default") {
        var d2 = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d2.get ? d2 : {
          enumerable: true,
          get: function() {
            return e[k];
          }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}
var require$$1__default = /* @__PURE__ */ _interopDefaultLegacy(require$$1);
var require$$1__default$1 = /* @__PURE__ */ _interopDefaultLegacy(require$$1$1);
var require$$2__default = /* @__PURE__ */ _interopDefaultLegacy(require$$2);
var require$$0__default$2 = /* @__PURE__ */ _interopDefaultLegacy(require$$0$2);
var require$$0__default = /* @__PURE__ */ _interopDefaultLegacy(require$$0);
var require$$0__default$1 = /* @__PURE__ */ _interopDefaultLegacy(require$$0$1);
var require$$4__default = /* @__PURE__ */ _interopDefaultLegacy(require$$4);
var require$$5__default = /* @__PURE__ */ _interopDefaultLegacy(require$$5);
var require$$0__default$3 = /* @__PURE__ */ _interopDefaultLegacy(require$$0$3);
var require$$0__default$4 = /* @__PURE__ */ _interopDefaultLegacy(require$$0$4);
var require$$1__default$2 = /* @__PURE__ */ _interopDefaultLegacy(require$$1$2);
var require$$4__default$1 = /* @__PURE__ */ _interopDefaultLegacy(require$$4$1);
var require$$1__default$3 = /* @__PURE__ */ _interopDefaultLegacy(require$$1$3);
var require$$1__default$4 = /* @__PURE__ */ _interopDefaultLegacy(require$$1$4);
var require$$2__default$1 = /* @__PURE__ */ _interopDefaultLegacy(require$$2$1);
var require$$3__default = /* @__PURE__ */ _interopDefaultLegacy(require$$3$1);
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
class NonError extends Error {
  constructor(message) {
    super(NonError._prepareSuperMessage(message));
    Object.defineProperty(this, "name", {
      value: "NonError",
      configurable: true,
      writable: true
    });
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NonError);
    }
  }
  static _prepareSuperMessage(message) {
    try {
      return JSON.stringify(message);
    } catch {
      return String(message);
    }
  }
}
const commonProperties = [
  { property: "name", enumerable: false },
  { property: "message", enumerable: false },
  { property: "stack", enumerable: false },
  { property: "code", enumerable: true }
];
const isCalled = Symbol(".toJSON called");
const toJSON = (from) => {
  from[isCalled] = true;
  const json2 = from.toJSON();
  delete from[isCalled];
  return json2;
};
const destroyCircular = ({
  from,
  seen,
  to_,
  forceEnumerable,
  maxDepth,
  depth
}) => {
  const to = to_ || (Array.isArray(from) ? [] : {});
  seen.push(from);
  if (depth >= maxDepth) {
    return to;
  }
  if (typeof from.toJSON === "function" && from[isCalled] !== true) {
    return toJSON(from);
  }
  for (const [key, value] of Object.entries(from)) {
    if (typeof Buffer === "function" && Buffer.isBuffer(value)) {
      to[key] = "[object Buffer]";
      continue;
    }
    if (typeof value === "function") {
      continue;
    }
    if (!value || typeof value !== "object") {
      to[key] = value;
      continue;
    }
    if (!seen.includes(from[key])) {
      depth++;
      to[key] = destroyCircular({
        from: from[key],
        seen: seen.slice(),
        forceEnumerable,
        maxDepth,
        depth
      });
      continue;
    }
    to[key] = "[Circular]";
  }
  for (const { property, enumerable } of commonProperties) {
    if (typeof from[property] === "string") {
      Object.defineProperty(to, property, {
        value: from[property],
        enumerable: forceEnumerable ? true : enumerable,
        configurable: true,
        writable: true
      });
    }
  }
  return to;
};
const serializeError$2 = (value, options = {}) => {
  const { maxDepth = Number.POSITIVE_INFINITY } = options;
  if (typeof value === "object" && value !== null) {
    return destroyCircular({
      from: value,
      seen: [],
      forceEnumerable: true,
      maxDepth,
      depth: 0
    });
  }
  if (typeof value === "function") {
    return `[Function: ${value.name || "anonymous"}]`;
  }
  return value;
};
const deserializeError$2 = (value, options = {}) => {
  const { maxDepth = Number.POSITIVE_INFINITY } = options;
  if (value instanceof Error) {
    return value;
  }
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const newError = new Error();
    destroyCircular({
      from: value,
      seen: [],
      to_: newError,
      maxDepth,
      depth: 0
    });
    return newError;
  }
  return new NonError(value);
};
var serializeError_1 = {
  serializeError: serializeError$2,
  deserializeError: deserializeError$2
};
var util$6 = {};
const getUniqueId = () => `${Date.now()}-${Math.random()}`;
const getSendChannel = (channel) => `%better-ipc-send-channel-${channel}`;
const getRendererSendChannel = (channel) => `%better-ipc-send-channel-${channel}`;
util$6.currentWindowChannel = "%better-ipc-current-window";
util$6.getSendChannel = getSendChannel;
util$6.getRendererSendChannel = getRendererSendChannel;
util$6.getResponseChannels = (channel) => {
  const id2 = getUniqueId();
  return {
    sendChannel: getSendChannel(channel),
    dataChannel: `%better-ipc-response-data-channel-${channel}-${id2}`,
    errorChannel: `%better-ipc-response-error-channel-${channel}-${id2}`
  };
};
util$6.getRendererResponseChannels = (channel) => {
  const id2 = getUniqueId();
  return {
    sendChannel: getRendererSendChannel(channel),
    dataChannel: `%better-ipc-response-data-channel-${channel}-${id2}`,
    errorChannel: `%better-ipc-response-error-channel-${channel}-${id2}`
  };
};
const electron$1 = require$$1__default["default"];
const { serializeError: serializeError$1, deserializeError: deserializeError$1 } = serializeError_1;
const util$5 = util$6;
const { ipcRenderer: ipcRenderer$1 } = electron$1;
const ipc$1 = Object.create(ipcRenderer$1 || {});
ipc$1.callMain = (channel, data) => new Promise((resolve2, reject) => {
  const { sendChannel, dataChannel, errorChannel } = util$5.getResponseChannels(channel);
  const cleanup = () => {
    ipcRenderer$1.off(dataChannel, onData);
    ipcRenderer$1.off(errorChannel, onError);
  };
  const onData = (_event, result) => {
    cleanup();
    resolve2(result);
  };
  const onError = (_event, error2) => {
    cleanup();
    reject(deserializeError$1(error2));
  };
  ipcRenderer$1.once(dataChannel, onData);
  ipcRenderer$1.once(errorChannel, onError);
  const completeData = {
    dataChannel,
    errorChannel,
    userData: data
  };
  ipcRenderer$1.send(sendChannel, completeData);
});
ipc$1.answerMain = (channel, callback) => {
  const sendChannel = util$5.getRendererSendChannel(channel);
  const listener = async (_event, data) => {
    const { dataChannel, errorChannel, userData } = data;
    try {
      ipcRenderer$1.send(dataChannel, await callback(userData));
    } catch (error2) {
      ipcRenderer$1.send(errorChannel, serializeError$1(error2));
    }
  };
  ipcRenderer$1.on(sendChannel, listener);
  return () => {
    ipcRenderer$1.off(sendChannel, listener);
  };
};
const electron = require$$1__default["default"];
const { serializeError, deserializeError } = serializeError_1;
const util$4 = util$6;
const { ipcMain: ipcMain$2, BrowserWindow } = electron;
const ipc = Object.create(ipcMain$2 || {});
ipc.callRenderer = (browserWindow, channel, data) => new Promise((resolve2, reject) => {
  if (!browserWindow) {
    throw new Error("Browser window required");
  }
  const { sendChannel, dataChannel, errorChannel } = util$4.getRendererResponseChannels(channel);
  const cleanup = () => {
    ipcMain$2.off(dataChannel, onData);
    ipcMain$2.off(errorChannel, onError);
  };
  const onData = (event, result) => {
    const window2 = BrowserWindow.fromWebContents(event.sender);
    if (window2.id === browserWindow.id) {
      cleanup();
      resolve2(result);
    }
  };
  const onError = (event, error2) => {
    const window2 = BrowserWindow.fromWebContents(event.sender);
    if (window2.id === browserWindow.id) {
      cleanup();
      reject(deserializeError(error2));
    }
  };
  ipcMain$2.on(dataChannel, onData);
  ipcMain$2.on(errorChannel, onError);
  const completeData = {
    dataChannel,
    errorChannel,
    userData: data
  };
  if (browserWindow.webContents) {
    browserWindow.webContents.send(sendChannel, completeData);
  }
});
ipc.callFocusedRenderer = async (...args) => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (!focusedWindow) {
    throw new Error("No browser window in focus");
  }
  return ipc.callRenderer(focusedWindow, ...args);
};
ipc.answerRenderer = (browserWindowOrChannel, channelOrCallback, callbackOrNothing) => {
  let window2;
  let channel;
  let callback;
  if (callbackOrNothing === void 0) {
    channel = browserWindowOrChannel;
    callback = channelOrCallback;
  } else {
    window2 = browserWindowOrChannel;
    channel = channelOrCallback;
    callback = callbackOrNothing;
    if (!window2) {
      throw new Error("Browser window required");
    }
  }
  const sendChannel = util$4.getSendChannel(channel);
  const listener = async (event, data) => {
    const browserWindow = BrowserWindow.fromWebContents(event.sender);
    if (window2 && window2.id !== browserWindow.id) {
      return;
    }
    const send = (channel2, data2) => {
      if (!(browserWindow && browserWindow.isDestroyed())) {
        event.sender.send(channel2, data2);
      }
    };
    const { dataChannel, errorChannel, userData } = data;
    try {
      send(dataChannel, await callback(userData, browserWindow));
    } catch (error2) {
      send(errorChannel, serializeError(error2));
    }
  };
  ipcMain$2.on(sendChannel, listener);
  return () => {
    ipcMain$2.off(sendChannel, listener);
  };
};
ipc.sendToRenderers = (channel, data) => {
  for (const browserWindow of BrowserWindow.getAllWindows()) {
    if (browserWindow.webContents) {
      browserWindow.webContents.send(channel, data);
    }
  }
};
var main$2 = ipc;
var ipcMain$1;
if (process.type === "renderer")
  ;
else {
  ipcMain$1 = main$2;
}
var fs$m = {};
var universalify$1 = {};
universalify$1.fromCallback = function(fn) {
  return Object.defineProperty(function(...args) {
    if (typeof args[args.length - 1] === "function")
      fn.apply(this, args);
    else {
      return new Promise((resolve2, reject) => {
        fn.call(this, ...args, (err, res) => err != null ? reject(err) : resolve2(res));
      });
    }
  }, "name", { value: fn.name });
};
universalify$1.fromPromise = function(fn) {
  return Object.defineProperty(function(...args) {
    const cb = args[args.length - 1];
    if (typeof cb !== "function")
      return fn.apply(this, args);
    else
      fn.apply(this, args.slice(0, -1)).then((r) => cb(null, r), cb);
  }, "name", { value: fn.name });
};
var constants$1 = require$$0__default["default"];
var origCwd = process.cwd;
var cwd = null;
var platform = process.platform;
process.cwd = function() {
  if (!cwd)
    cwd = origCwd.call(process);
  return cwd;
};
try {
  process.cwd();
} catch (er) {
}
if (typeof process.chdir === "function") {
  var chdir = process.chdir;
  process.chdir = function(d2) {
    cwd = null;
    chdir.call(process, d2);
  };
  if (Object.setPrototypeOf)
    Object.setPrototypeOf(process.chdir, chdir);
}
var polyfills$1 = patch$2;
function patch$2(fs2) {
  if (constants$1.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
    patchLchmod(fs2);
  }
  if (!fs2.lutimes) {
    patchLutimes(fs2);
  }
  fs2.chown = chownFix(fs2.chown);
  fs2.fchown = chownFix(fs2.fchown);
  fs2.lchown = chownFix(fs2.lchown);
  fs2.chmod = chmodFix(fs2.chmod);
  fs2.fchmod = chmodFix(fs2.fchmod);
  fs2.lchmod = chmodFix(fs2.lchmod);
  fs2.chownSync = chownFixSync(fs2.chownSync);
  fs2.fchownSync = chownFixSync(fs2.fchownSync);
  fs2.lchownSync = chownFixSync(fs2.lchownSync);
  fs2.chmodSync = chmodFixSync(fs2.chmodSync);
  fs2.fchmodSync = chmodFixSync(fs2.fchmodSync);
  fs2.lchmodSync = chmodFixSync(fs2.lchmodSync);
  fs2.stat = statFix(fs2.stat);
  fs2.fstat = statFix(fs2.fstat);
  fs2.lstat = statFix(fs2.lstat);
  fs2.statSync = statFixSync(fs2.statSync);
  fs2.fstatSync = statFixSync(fs2.fstatSync);
  fs2.lstatSync = statFixSync(fs2.lstatSync);
  if (!fs2.lchmod) {
    fs2.lchmod = function(path2, mode, cb) {
      if (cb)
        process.nextTick(cb);
    };
    fs2.lchmodSync = function() {
    };
  }
  if (!fs2.lchown) {
    fs2.lchown = function(path2, uid, gid, cb) {
      if (cb)
        process.nextTick(cb);
    };
    fs2.lchownSync = function() {
    };
  }
  if (platform === "win32") {
    fs2.rename = function(fs$rename) {
      return function(from, to, cb) {
        var start = Date.now();
        var backoff = 0;
        fs$rename(from, to, function CB(er) {
          if (er && (er.code === "EACCES" || er.code === "EPERM") && Date.now() - start < 6e4) {
            setTimeout(function() {
              fs2.stat(to, function(stater, st) {
                if (stater && stater.code === "ENOENT")
                  fs$rename(from, to, CB);
                else
                  cb(er);
              });
            }, backoff);
            if (backoff < 100)
              backoff += 10;
            return;
          }
          if (cb)
            cb(er);
        });
      };
    }(fs2.rename);
  }
  fs2.read = function(fs$read) {
    function read(fd, buffer, offset, length, position, callback_) {
      var callback;
      if (callback_ && typeof callback_ === "function") {
        var eagCounter = 0;
        callback = function(er, _, __) {
          if (er && er.code === "EAGAIN" && eagCounter < 10) {
            eagCounter++;
            return fs$read.call(fs2, fd, buffer, offset, length, position, callback);
          }
          callback_.apply(this, arguments);
        };
      }
      return fs$read.call(fs2, fd, buffer, offset, length, position, callback);
    }
    if (Object.setPrototypeOf)
      Object.setPrototypeOf(read, fs$read);
    return read;
  }(fs2.read);
  fs2.readSync = function(fs$readSync) {
    return function(fd, buffer, offset, length, position) {
      var eagCounter = 0;
      while (true) {
        try {
          return fs$readSync.call(fs2, fd, buffer, offset, length, position);
        } catch (er) {
          if (er.code === "EAGAIN" && eagCounter < 10) {
            eagCounter++;
            continue;
          }
          throw er;
        }
      }
    };
  }(fs2.readSync);
  function patchLchmod(fs3) {
    fs3.lchmod = function(path2, mode, callback) {
      fs3.open(path2, constants$1.O_WRONLY | constants$1.O_SYMLINK, mode, function(err, fd) {
        if (err) {
          if (callback)
            callback(err);
          return;
        }
        fs3.fchmod(fd, mode, function(err2) {
          fs3.close(fd, function(err22) {
            if (callback)
              callback(err2 || err22);
          });
        });
      });
    };
    fs3.lchmodSync = function(path2, mode) {
      var fd = fs3.openSync(path2, constants$1.O_WRONLY | constants$1.O_SYMLINK, mode);
      var threw = true;
      var ret;
      try {
        ret = fs3.fchmodSync(fd, mode);
        threw = false;
      } finally {
        if (threw) {
          try {
            fs3.closeSync(fd);
          } catch (er) {
          }
        } else {
          fs3.closeSync(fd);
        }
      }
      return ret;
    };
  }
  function patchLutimes(fs3) {
    if (constants$1.hasOwnProperty("O_SYMLINK")) {
      fs3.lutimes = function(path2, at, mt, cb) {
        fs3.open(path2, constants$1.O_SYMLINK, function(er, fd) {
          if (er) {
            if (cb)
              cb(er);
            return;
          }
          fs3.futimes(fd, at, mt, function(er2) {
            fs3.close(fd, function(er22) {
              if (cb)
                cb(er2 || er22);
            });
          });
        });
      };
      fs3.lutimesSync = function(path2, at, mt) {
        var fd = fs3.openSync(path2, constants$1.O_SYMLINK);
        var ret;
        var threw = true;
        try {
          ret = fs3.futimesSync(fd, at, mt);
          threw = false;
        } finally {
          if (threw) {
            try {
              fs3.closeSync(fd);
            } catch (er) {
            }
          } else {
            fs3.closeSync(fd);
          }
        }
        return ret;
      };
    } else {
      fs3.lutimes = function(_a, _b, _c, cb) {
        if (cb)
          process.nextTick(cb);
      };
      fs3.lutimesSync = function() {
      };
    }
  }
  function chmodFix(orig) {
    if (!orig)
      return orig;
    return function(target, mode, cb) {
      return orig.call(fs2, target, mode, function(er) {
        if (chownErOk(er))
          er = null;
        if (cb)
          cb.apply(this, arguments);
      });
    };
  }
  function chmodFixSync(orig) {
    if (!orig)
      return orig;
    return function(target, mode) {
      try {
        return orig.call(fs2, target, mode);
      } catch (er) {
        if (!chownErOk(er))
          throw er;
      }
    };
  }
  function chownFix(orig) {
    if (!orig)
      return orig;
    return function(target, uid, gid, cb) {
      return orig.call(fs2, target, uid, gid, function(er) {
        if (chownErOk(er))
          er = null;
        if (cb)
          cb.apply(this, arguments);
      });
    };
  }
  function chownFixSync(orig) {
    if (!orig)
      return orig;
    return function(target, uid, gid) {
      try {
        return orig.call(fs2, target, uid, gid);
      } catch (er) {
        if (!chownErOk(er))
          throw er;
      }
    };
  }
  function statFix(orig) {
    if (!orig)
      return orig;
    return function(target, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = null;
      }
      function callback(er, stats) {
        if (stats) {
          if (stats.uid < 0)
            stats.uid += 4294967296;
          if (stats.gid < 0)
            stats.gid += 4294967296;
        }
        if (cb)
          cb.apply(this, arguments);
      }
      return options ? orig.call(fs2, target, options, callback) : orig.call(fs2, target, callback);
    };
  }
  function statFixSync(orig) {
    if (!orig)
      return orig;
    return function(target, options) {
      var stats = options ? orig.call(fs2, target, options) : orig.call(fs2, target);
      if (stats.uid < 0)
        stats.uid += 4294967296;
      if (stats.gid < 0)
        stats.gid += 4294967296;
      return stats;
    };
  }
  function chownErOk(er) {
    if (!er)
      return true;
    if (er.code === "ENOSYS")
      return true;
    var nonroot = !process.getuid || process.getuid() !== 0;
    if (nonroot) {
      if (er.code === "EINVAL" || er.code === "EPERM")
        return true;
    }
    return false;
  }
}
var Stream = require$$0__default$1["default"].Stream;
var legacyStreams = legacy$1;
function legacy$1(fs2) {
  return {
    ReadStream,
    WriteStream
  };
  function ReadStream(path2, options) {
    if (!(this instanceof ReadStream))
      return new ReadStream(path2, options);
    Stream.call(this);
    var self2 = this;
    this.path = path2;
    this.fd = null;
    this.readable = true;
    this.paused = false;
    this.flags = "r";
    this.mode = 438;
    this.bufferSize = 64 * 1024;
    options = options || {};
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }
    if (this.encoding)
      this.setEncoding(this.encoding);
    if (this.start !== void 0) {
      if (typeof this.start !== "number") {
        throw TypeError("start must be a Number");
      }
      if (this.end === void 0) {
        this.end = Infinity;
      } else if (typeof this.end !== "number") {
        throw TypeError("end must be a Number");
      }
      if (this.start > this.end) {
        throw new Error("start must be <= end");
      }
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        self2._read();
      });
      return;
    }
    fs2.open(this.path, this.flags, this.mode, function(err, fd) {
      if (err) {
        self2.emit("error", err);
        self2.readable = false;
        return;
      }
      self2.fd = fd;
      self2.emit("open", fd);
      self2._read();
    });
  }
  function WriteStream(path2, options) {
    if (!(this instanceof WriteStream))
      return new WriteStream(path2, options);
    Stream.call(this);
    this.path = path2;
    this.fd = null;
    this.writable = true;
    this.flags = "w";
    this.encoding = "binary";
    this.mode = 438;
    this.bytesWritten = 0;
    options = options || {};
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }
    if (this.start !== void 0) {
      if (typeof this.start !== "number") {
        throw TypeError("start must be a Number");
      }
      if (this.start < 0) {
        throw new Error("start must be >= zero");
      }
      this.pos = this.start;
    }
    this.busy = false;
    this._queue = [];
    if (this.fd === null) {
      this._open = fs2.open;
      this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
      this.flush();
    }
  }
}
var clone_1 = clone$1;
var getPrototypeOf = Object.getPrototypeOf || function(obj) {
  return obj.__proto__;
};
function clone$1(obj) {
  if (obj === null || typeof obj !== "object")
    return obj;
  if (obj instanceof Object)
    var copy2 = { __proto__: getPrototypeOf(obj) };
  else
    var copy2 = Object.create(null);
  Object.getOwnPropertyNames(obj).forEach(function(key) {
    Object.defineProperty(copy2, key, Object.getOwnPropertyDescriptor(obj, key));
  });
  return copy2;
}
var fs$l = require$$0__default$2["default"];
var polyfills = polyfills$1;
var legacy = legacyStreams;
var clone = clone_1;
var util$3 = require$$4__default["default"];
var gracefulQueue;
var previousSymbol;
if (typeof Symbol === "function" && typeof Symbol.for === "function") {
  gracefulQueue = Symbol.for("graceful-fs.queue");
  previousSymbol = Symbol.for("graceful-fs.previous");
} else {
  gracefulQueue = "___graceful-fs.queue";
  previousSymbol = "___graceful-fs.previous";
}
function noop() {
}
function publishQueue(context, queue2) {
  Object.defineProperty(context, gracefulQueue, {
    get: function() {
      return queue2;
    }
  });
}
var debug$5 = noop;
if (util$3.debuglog)
  debug$5 = util$3.debuglog("gfs4");
else if (/\bgfs4\b/i.test(""))
  debug$5 = function() {
    var m2 = util$3.format.apply(util$3, arguments);
    m2 = "GFS4: " + m2.split(/\n/).join("\nGFS4: ");
    console.error(m2);
  };
if (!fs$l[gracefulQueue]) {
  var queue = commonjsGlobal[gracefulQueue] || [];
  publishQueue(fs$l, queue);
  fs$l.close = function(fs$close) {
    function close(fd, cb) {
      return fs$close.call(fs$l, fd, function(err) {
        if (!err) {
          resetQueue();
        }
        if (typeof cb === "function")
          cb.apply(this, arguments);
      });
    }
    Object.defineProperty(close, previousSymbol, {
      value: fs$close
    });
    return close;
  }(fs$l.close);
  fs$l.closeSync = function(fs$closeSync) {
    function closeSync(fd) {
      fs$closeSync.apply(fs$l, arguments);
      resetQueue();
    }
    Object.defineProperty(closeSync, previousSymbol, {
      value: fs$closeSync
    });
    return closeSync;
  }(fs$l.closeSync);
  if (/\bgfs4\b/i.test("")) {
    process.on("exit", function() {
      debug$5(fs$l[gracefulQueue]);
      require$$5__default["default"].equal(fs$l[gracefulQueue].length, 0);
    });
  }
}
if (!commonjsGlobal[gracefulQueue]) {
  publishQueue(commonjsGlobal, fs$l[gracefulQueue]);
}
var gracefulFs = patch$1(clone(fs$l));
function patch$1(fs2) {
  polyfills(fs2);
  fs2.gracefulify = patch$1;
  fs2.createReadStream = createReadStream;
  fs2.createWriteStream = createWriteStream;
  var fs$readFile = fs2.readFile;
  fs2.readFile = readFile2;
  function readFile2(path2, options, cb) {
    if (typeof options === "function")
      cb = options, options = null;
    return go$readFile(path2, options, cb);
    function go$readFile(path3, options2, cb2, startTime) {
      return fs$readFile(path3, options2, function(err) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
          enqueue([go$readFile, [path3, options2, cb2], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb2 === "function")
            cb2.apply(this, arguments);
        }
      });
    }
  }
  var fs$writeFile = fs2.writeFile;
  fs2.writeFile = writeFile2;
  function writeFile2(path2, data, options, cb) {
    if (typeof options === "function")
      cb = options, options = null;
    return go$writeFile(path2, data, options, cb);
    function go$writeFile(path3, data2, options2, cb2, startTime) {
      return fs$writeFile(path3, data2, options2, function(err) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
          enqueue([go$writeFile, [path3, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb2 === "function")
            cb2.apply(this, arguments);
        }
      });
    }
  }
  var fs$appendFile = fs2.appendFile;
  if (fs$appendFile)
    fs2.appendFile = appendFile;
  function appendFile(path2, data, options, cb) {
    if (typeof options === "function")
      cb = options, options = null;
    return go$appendFile(path2, data, options, cb);
    function go$appendFile(path3, data2, options2, cb2, startTime) {
      return fs$appendFile(path3, data2, options2, function(err) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
          enqueue([go$appendFile, [path3, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb2 === "function")
            cb2.apply(this, arguments);
        }
      });
    }
  }
  var fs$copyFile = fs2.copyFile;
  if (fs$copyFile)
    fs2.copyFile = copyFile2;
  function copyFile2(src, dest, flags, cb) {
    if (typeof flags === "function") {
      cb = flags;
      flags = 0;
    }
    return go$copyFile(src, dest, flags, cb);
    function go$copyFile(src2, dest2, flags2, cb2, startTime) {
      return fs$copyFile(src2, dest2, flags2, function(err) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
          enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb2 === "function")
            cb2.apply(this, arguments);
        }
      });
    }
  }
  var fs$readdir = fs2.readdir;
  fs2.readdir = readdir;
  function readdir(path2, options, cb) {
    if (typeof options === "function")
      cb = options, options = null;
    return go$readdir(path2, options, cb);
    function go$readdir(path3, options2, cb2, startTime) {
      return fs$readdir(path3, options2, function(err, files) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
          enqueue([go$readdir, [path3, options2, cb2], err, startTime || Date.now(), Date.now()]);
        else {
          if (files && files.sort)
            files.sort();
          if (typeof cb2 === "function")
            cb2.call(this, err, files);
        }
      });
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var legStreams = legacy(fs2);
    ReadStream = legStreams.ReadStream;
    WriteStream = legStreams.WriteStream;
  }
  var fs$ReadStream = fs2.ReadStream;
  if (fs$ReadStream) {
    ReadStream.prototype = Object.create(fs$ReadStream.prototype);
    ReadStream.prototype.open = ReadStream$open;
  }
  var fs$WriteStream = fs2.WriteStream;
  if (fs$WriteStream) {
    WriteStream.prototype = Object.create(fs$WriteStream.prototype);
    WriteStream.prototype.open = WriteStream$open;
  }
  Object.defineProperty(fs2, "ReadStream", {
    get: function() {
      return ReadStream;
    },
    set: function(val) {
      ReadStream = val;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(fs2, "WriteStream", {
    get: function() {
      return WriteStream;
    },
    set: function(val) {
      WriteStream = val;
    },
    enumerable: true,
    configurable: true
  });
  var FileReadStream = ReadStream;
  Object.defineProperty(fs2, "FileReadStream", {
    get: function() {
      return FileReadStream;
    },
    set: function(val) {
      FileReadStream = val;
    },
    enumerable: true,
    configurable: true
  });
  var FileWriteStream = WriteStream;
  Object.defineProperty(fs2, "FileWriteStream", {
    get: function() {
      return FileWriteStream;
    },
    set: function(val) {
      FileWriteStream = val;
    },
    enumerable: true,
    configurable: true
  });
  function ReadStream(path2, options) {
    if (this instanceof ReadStream)
      return fs$ReadStream.apply(this, arguments), this;
    else
      return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
  }
  function ReadStream$open() {
    var that = this;
    open(that.path, that.flags, that.mode, function(err, fd) {
      if (err) {
        if (that.autoClose)
          that.destroy();
        that.emit("error", err);
      } else {
        that.fd = fd;
        that.emit("open", fd);
        that.read();
      }
    });
  }
  function WriteStream(path2, options) {
    if (this instanceof WriteStream)
      return fs$WriteStream.apply(this, arguments), this;
    else
      return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
  }
  function WriteStream$open() {
    var that = this;
    open(that.path, that.flags, that.mode, function(err, fd) {
      if (err) {
        that.destroy();
        that.emit("error", err);
      } else {
        that.fd = fd;
        that.emit("open", fd);
      }
    });
  }
  function createReadStream(path2, options) {
    return new fs2.ReadStream(path2, options);
  }
  function createWriteStream(path2, options) {
    return new fs2.WriteStream(path2, options);
  }
  var fs$open = fs2.open;
  fs2.open = open;
  function open(path2, flags, mode, cb) {
    if (typeof mode === "function")
      cb = mode, mode = null;
    return go$open(path2, flags, mode, cb);
    function go$open(path3, flags2, mode2, cb2, startTime) {
      return fs$open(path3, flags2, mode2, function(err, fd) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
          enqueue([go$open, [path3, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb2 === "function")
            cb2.apply(this, arguments);
        }
      });
    }
  }
  return fs2;
}
function enqueue(elem) {
  debug$5("ENQUEUE", elem[0].name, elem[1]);
  fs$l[gracefulQueue].push(elem);
  retry();
}
var retryTimer;
function resetQueue() {
  var now = Date.now();
  for (var i2 = 0; i2 < fs$l[gracefulQueue].length; ++i2) {
    if (fs$l[gracefulQueue][i2].length > 2) {
      fs$l[gracefulQueue][i2][3] = now;
      fs$l[gracefulQueue][i2][4] = now;
    }
  }
  retry();
}
function retry() {
  clearTimeout(retryTimer);
  retryTimer = void 0;
  if (fs$l[gracefulQueue].length === 0)
    return;
  var elem = fs$l[gracefulQueue].shift();
  var fn = elem[0];
  var args = elem[1];
  var err = elem[2];
  var startTime = elem[3];
  var lastTime = elem[4];
  if (startTime === void 0) {
    debug$5("RETRY", fn.name, args);
    fn.apply(null, args);
  } else if (Date.now() - startTime >= 6e4) {
    debug$5("TIMEOUT", fn.name, args);
    var cb = args.pop();
    if (typeof cb === "function")
      cb.call(null, err);
  } else {
    var sinceAttempt = Date.now() - lastTime;
    var sinceStart = Math.max(lastTime - startTime, 1);
    var desiredDelay = Math.min(sinceStart * 1.2, 100);
    if (sinceAttempt >= desiredDelay) {
      debug$5("RETRY", fn.name, args);
      fn.apply(null, args.concat([startTime]));
    } else {
      fs$l[gracefulQueue].push(elem);
    }
  }
  if (retryTimer === void 0) {
    retryTimer = setTimeout(retry, 0);
  }
}
(function(exports) {
  const u2 = universalify$1.fromCallback;
  const fs2 = gracefulFs;
  const api = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((key) => {
    return typeof fs2[key] === "function";
  });
  Object.assign(exports, fs2);
  api.forEach((method) => {
    exports[method] = u2(fs2[method]);
  });
  exports.realpath.native = u2(fs2.realpath.native);
  exports.exists = function(filename, callback) {
    if (typeof callback === "function") {
      return fs2.exists(filename, callback);
    }
    return new Promise((resolve2) => {
      return fs2.exists(filename, resolve2);
    });
  };
  exports.read = function(fd, buffer, offset, length, position, callback) {
    if (typeof callback === "function") {
      return fs2.read(fd, buffer, offset, length, position, callback);
    }
    return new Promise((resolve2, reject) => {
      fs2.read(fd, buffer, offset, length, position, (err, bytesRead, buffer2) => {
        if (err)
          return reject(err);
        resolve2({ bytesRead, buffer: buffer2 });
      });
    });
  };
  exports.write = function(fd, buffer, ...args) {
    if (typeof args[args.length - 1] === "function") {
      return fs2.write(fd, buffer, ...args);
    }
    return new Promise((resolve2, reject) => {
      fs2.write(fd, buffer, ...args, (err, bytesWritten, buffer2) => {
        if (err)
          return reject(err);
        resolve2({ bytesWritten, buffer: buffer2 });
      });
    });
  };
  if (typeof fs2.writev === "function") {
    exports.writev = function(fd, buffers, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs2.writev(fd, buffers, ...args);
      }
      return new Promise((resolve2, reject) => {
        fs2.writev(fd, buffers, ...args, (err, bytesWritten, buffers2) => {
          if (err)
            return reject(err);
          resolve2({ bytesWritten, buffers: buffers2 });
        });
      });
    };
  }
})(fs$m);
var makeDir$1 = {};
var utils$1 = {};
const path$q = require$$1__default$1["default"];
utils$1.checkPath = function checkPath2(pth) {
  if (process.platform === "win32") {
    const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path$q.parse(pth).root, ""));
    if (pathHasInvalidWinCharacters) {
      const error2 = new Error(`Path contains invalid characters: ${pth}`);
      error2.code = "EINVAL";
      throw error2;
    }
  }
};
const fs$k = fs$m;
const { checkPath } = utils$1;
const getMode = (options) => {
  const defaults2 = { mode: 511 };
  if (typeof options === "number")
    return options;
  return __spreadValues(__spreadValues({}, defaults2), options).mode;
};
makeDir$1.makeDir = async (dir, options) => {
  checkPath(dir);
  return fs$k.mkdir(dir, {
    mode: getMode(options),
    recursive: true
  });
};
makeDir$1.makeDirSync = (dir, options) => {
  checkPath(dir);
  return fs$k.mkdirSync(dir, {
    mode: getMode(options),
    recursive: true
  });
};
const u$a = universalify$1.fromPromise;
const { makeDir: _makeDir, makeDirSync } = makeDir$1;
const makeDir = u$a(_makeDir);
var mkdirs$2 = {
  mkdirs: makeDir,
  mkdirsSync: makeDirSync,
  mkdirp: makeDir,
  mkdirpSync: makeDirSync,
  ensureDir: makeDir,
  ensureDirSync: makeDirSync
};
const fs$j = gracefulFs;
function utimesMillis$1(path2, atime, mtime, callback) {
  fs$j.open(path2, "r+", (err, fd) => {
    if (err)
      return callback(err);
    fs$j.futimes(fd, atime, mtime, (futimesErr) => {
      fs$j.close(fd, (closeErr) => {
        if (callback)
          callback(futimesErr || closeErr);
      });
    });
  });
}
function utimesMillisSync$1(path2, atime, mtime) {
  const fd = fs$j.openSync(path2, "r+");
  fs$j.futimesSync(fd, atime, mtime);
  return fs$j.closeSync(fd);
}
var utimes = {
  utimesMillis: utimesMillis$1,
  utimesMillisSync: utimesMillisSync$1
};
const fs$i = fs$m;
const path$p = require$$1__default$1["default"];
const util$2 = require$$4__default["default"];
function getStats$2(src, dest, opts2) {
  const statFunc = opts2.dereference ? (file2) => fs$i.stat(file2, { bigint: true }) : (file2) => fs$i.lstat(file2, { bigint: true });
  return Promise.all([
    statFunc(src),
    statFunc(dest).catch((err) => {
      if (err.code === "ENOENT")
        return null;
      throw err;
    })
  ]).then(([srcStat, destStat]) => ({ srcStat, destStat }));
}
function getStatsSync(src, dest, opts2) {
  let destStat;
  const statFunc = opts2.dereference ? (file2) => fs$i.statSync(file2, { bigint: true }) : (file2) => fs$i.lstatSync(file2, { bigint: true });
  const srcStat = statFunc(src);
  try {
    destStat = statFunc(dest);
  } catch (err) {
    if (err.code === "ENOENT")
      return { srcStat, destStat: null };
    throw err;
  }
  return { srcStat, destStat };
}
function checkPaths(src, dest, funcName, opts2, cb) {
  util$2.callbackify(getStats$2)(src, dest, opts2, (err, stats) => {
    if (err)
      return cb(err);
    const { srcStat, destStat } = stats;
    if (destStat) {
      if (areIdentical$2(srcStat, destStat)) {
        const srcBaseName = path$p.basename(src);
        const destBaseName = path$p.basename(dest);
        if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
          return cb(null, { srcStat, destStat, isChangingCase: true });
        }
        return cb(new Error("Source and destination must not be the same."));
      }
      if (srcStat.isDirectory() && !destStat.isDirectory()) {
        return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`));
      }
      if (!srcStat.isDirectory() && destStat.isDirectory()) {
        return cb(new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`));
      }
    }
    if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
      return cb(new Error(errMsg(src, dest, funcName)));
    }
    return cb(null, { srcStat, destStat });
  });
}
function checkPathsSync(src, dest, funcName, opts2) {
  const { srcStat, destStat } = getStatsSync(src, dest, opts2);
  if (destStat) {
    if (areIdentical$2(srcStat, destStat)) {
      const srcBaseName = path$p.basename(src);
      const destBaseName = path$p.basename(dest);
      if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
        return { srcStat, destStat, isChangingCase: true };
      }
      throw new Error("Source and destination must not be the same.");
    }
    if (srcStat.isDirectory() && !destStat.isDirectory()) {
      throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
    }
    if (!srcStat.isDirectory() && destStat.isDirectory()) {
      throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
    }
  }
  if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
    throw new Error(errMsg(src, dest, funcName));
  }
  return { srcStat, destStat };
}
function checkParentPaths(src, srcStat, dest, funcName, cb) {
  const srcParent = path$p.resolve(path$p.dirname(src));
  const destParent = path$p.resolve(path$p.dirname(dest));
  if (destParent === srcParent || destParent === path$p.parse(destParent).root)
    return cb();
  fs$i.stat(destParent, { bigint: true }, (err, destStat) => {
    if (err) {
      if (err.code === "ENOENT")
        return cb();
      return cb(err);
    }
    if (areIdentical$2(srcStat, destStat)) {
      return cb(new Error(errMsg(src, dest, funcName)));
    }
    return checkParentPaths(src, srcStat, destParent, funcName, cb);
  });
}
function checkParentPathsSync(src, srcStat, dest, funcName) {
  const srcParent = path$p.resolve(path$p.dirname(src));
  const destParent = path$p.resolve(path$p.dirname(dest));
  if (destParent === srcParent || destParent === path$p.parse(destParent).root)
    return;
  let destStat;
  try {
    destStat = fs$i.statSync(destParent, { bigint: true });
  } catch (err) {
    if (err.code === "ENOENT")
      return;
    throw err;
  }
  if (areIdentical$2(srcStat, destStat)) {
    throw new Error(errMsg(src, dest, funcName));
  }
  return checkParentPathsSync(src, srcStat, destParent, funcName);
}
function areIdentical$2(srcStat, destStat) {
  return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev;
}
function isSrcSubdir(src, dest) {
  const srcArr = path$p.resolve(src).split(path$p.sep).filter((i2) => i2);
  const destArr = path$p.resolve(dest).split(path$p.sep).filter((i2) => i2);
  return srcArr.reduce((acc, cur, i2) => acc && destArr[i2] === cur, true);
}
function errMsg(src, dest, funcName) {
  return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
}
var stat$4 = {
  checkPaths,
  checkPathsSync,
  checkParentPaths,
  checkParentPathsSync,
  isSrcSubdir,
  areIdentical: areIdentical$2
};
const fs$h = gracefulFs;
const path$o = require$$1__default$1["default"];
const mkdirsSync$1 = mkdirs$2.mkdirsSync;
const utimesMillisSync = utimes.utimesMillisSync;
const stat$3 = stat$4;
function copySync$2(src, dest, opts2) {
  if (typeof opts2 === "function") {
    opts2 = { filter: opts2 };
  }
  opts2 = opts2 || {};
  opts2.clobber = "clobber" in opts2 ? !!opts2.clobber : true;
  opts2.overwrite = "overwrite" in opts2 ? !!opts2.overwrite : opts2.clobber;
  if (opts2.preserveTimestamps && process.arch === "ia32") {
    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;

    see https://github.com/jprichardson/node-fs-extra/issues/269`);
  }
  const { srcStat, destStat } = stat$3.checkPathsSync(src, dest, "copy", opts2);
  stat$3.checkParentPathsSync(src, srcStat, dest, "copy");
  return handleFilterAndCopy(destStat, src, dest, opts2);
}
function handleFilterAndCopy(destStat, src, dest, opts2) {
  if (opts2.filter && !opts2.filter(src, dest))
    return;
  const destParent = path$o.dirname(dest);
  if (!fs$h.existsSync(destParent))
    mkdirsSync$1(destParent);
  return getStats$1(destStat, src, dest, opts2);
}
function startCopy$1(destStat, src, dest, opts2) {
  if (opts2.filter && !opts2.filter(src, dest))
    return;
  return getStats$1(destStat, src, dest, opts2);
}
function getStats$1(destStat, src, dest, opts2) {
  const statSync = opts2.dereference ? fs$h.statSync : fs$h.lstatSync;
  const srcStat = statSync(src);
  if (srcStat.isDirectory())
    return onDir$1(srcStat, destStat, src, dest, opts2);
  else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
    return onFile$1(srcStat, destStat, src, dest, opts2);
  else if (srcStat.isSymbolicLink())
    return onLink$1(destStat, src, dest, opts2);
  else if (srcStat.isSocket())
    throw new Error(`Cannot copy a socket file: ${src}`);
  else if (srcStat.isFIFO())
    throw new Error(`Cannot copy a FIFO pipe: ${src}`);
  throw new Error(`Unknown file: ${src}`);
}
function onFile$1(srcStat, destStat, src, dest, opts2) {
  if (!destStat)
    return copyFile$1(srcStat, src, dest, opts2);
  return mayCopyFile$1(srcStat, src, dest, opts2);
}
function mayCopyFile$1(srcStat, src, dest, opts2) {
  if (opts2.overwrite) {
    fs$h.unlinkSync(dest);
    return copyFile$1(srcStat, src, dest, opts2);
  } else if (opts2.errorOnExist) {
    throw new Error(`'${dest}' already exists`);
  }
}
function copyFile$1(srcStat, src, dest, opts2) {
  fs$h.copyFileSync(src, dest);
  if (opts2.preserveTimestamps)
    handleTimestamps(srcStat.mode, src, dest);
  return setDestMode$1(dest, srcStat.mode);
}
function handleTimestamps(srcMode, src, dest) {
  if (fileIsNotWritable$1(srcMode))
    makeFileWritable$1(dest, srcMode);
  return setDestTimestamps$1(src, dest);
}
function fileIsNotWritable$1(srcMode) {
  return (srcMode & 128) === 0;
}
function makeFileWritable$1(dest, srcMode) {
  return setDestMode$1(dest, srcMode | 128);
}
function setDestMode$1(dest, srcMode) {
  return fs$h.chmodSync(dest, srcMode);
}
function setDestTimestamps$1(src, dest) {
  const updatedSrcStat = fs$h.statSync(src);
  return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
}
function onDir$1(srcStat, destStat, src, dest, opts2) {
  if (!destStat)
    return mkDirAndCopy$1(srcStat.mode, src, dest, opts2);
  return copyDir$1(src, dest, opts2);
}
function mkDirAndCopy$1(srcMode, src, dest, opts2) {
  fs$h.mkdirSync(dest);
  copyDir$1(src, dest, opts2);
  return setDestMode$1(dest, srcMode);
}
function copyDir$1(src, dest, opts2) {
  fs$h.readdirSync(src).forEach((item) => copyDirItem$1(item, src, dest, opts2));
}
function copyDirItem$1(item, src, dest, opts2) {
  const srcItem = path$o.join(src, item);
  const destItem = path$o.join(dest, item);
  const { destStat } = stat$3.checkPathsSync(srcItem, destItem, "copy", opts2);
  return startCopy$1(destStat, srcItem, destItem, opts2);
}
function onLink$1(destStat, src, dest, opts2) {
  let resolvedSrc = fs$h.readlinkSync(src);
  if (opts2.dereference) {
    resolvedSrc = path$o.resolve(process.cwd(), resolvedSrc);
  }
  if (!destStat) {
    return fs$h.symlinkSync(resolvedSrc, dest);
  } else {
    let resolvedDest;
    try {
      resolvedDest = fs$h.readlinkSync(dest);
    } catch (err) {
      if (err.code === "EINVAL" || err.code === "UNKNOWN")
        return fs$h.symlinkSync(resolvedSrc, dest);
      throw err;
    }
    if (opts2.dereference) {
      resolvedDest = path$o.resolve(process.cwd(), resolvedDest);
    }
    if (stat$3.isSrcSubdir(resolvedSrc, resolvedDest)) {
      throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
    }
    if (fs$h.statSync(dest).isDirectory() && stat$3.isSrcSubdir(resolvedDest, resolvedSrc)) {
      throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
    }
    return copyLink$1(resolvedSrc, dest);
  }
}
function copyLink$1(resolvedSrc, dest) {
  fs$h.unlinkSync(dest);
  return fs$h.symlinkSync(resolvedSrc, dest);
}
var copySync_1 = copySync$2;
var copySync$1 = {
  copySync: copySync_1
};
const u$9 = universalify$1.fromPromise;
const fs$g = fs$m;
function pathExists$8(path2) {
  return fs$g.access(path2).then(() => true).catch(() => false);
}
var pathExists_1 = {
  pathExists: u$9(pathExists$8),
  pathExistsSync: fs$g.existsSync
};
const fs$f = gracefulFs;
const path$n = require$$1__default$1["default"];
const mkdirs$1 = mkdirs$2.mkdirs;
const pathExists$7 = pathExists_1.pathExists;
const utimesMillis = utimes.utimesMillis;
const stat$2 = stat$4;
function copy$2(src, dest, opts2, cb) {
  if (typeof opts2 === "function" && !cb) {
    cb = opts2;
    opts2 = {};
  } else if (typeof opts2 === "function") {
    opts2 = { filter: opts2 };
  }
  cb = cb || function() {
  };
  opts2 = opts2 || {};
  opts2.clobber = "clobber" in opts2 ? !!opts2.clobber : true;
  opts2.overwrite = "overwrite" in opts2 ? !!opts2.overwrite : opts2.clobber;
  if (opts2.preserveTimestamps && process.arch === "ia32") {
    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;

    see https://github.com/jprichardson/node-fs-extra/issues/269`);
  }
  stat$2.checkPaths(src, dest, "copy", opts2, (err, stats) => {
    if (err)
      return cb(err);
    const { srcStat, destStat } = stats;
    stat$2.checkParentPaths(src, srcStat, dest, "copy", (err2) => {
      if (err2)
        return cb(err2);
      if (opts2.filter)
        return handleFilter(checkParentDir, destStat, src, dest, opts2, cb);
      return checkParentDir(destStat, src, dest, opts2, cb);
    });
  });
}
function checkParentDir(destStat, src, dest, opts2, cb) {
  const destParent = path$n.dirname(dest);
  pathExists$7(destParent, (err, dirExists) => {
    if (err)
      return cb(err);
    if (dirExists)
      return getStats(destStat, src, dest, opts2, cb);
    mkdirs$1(destParent, (err2) => {
      if (err2)
        return cb(err2);
      return getStats(destStat, src, dest, opts2, cb);
    });
  });
}
function handleFilter(onInclude, destStat, src, dest, opts2, cb) {
  Promise.resolve(opts2.filter(src, dest)).then((include) => {
    if (include)
      return onInclude(destStat, src, dest, opts2, cb);
    return cb();
  }, (error2) => cb(error2));
}
function startCopy(destStat, src, dest, opts2, cb) {
  if (opts2.filter)
    return handleFilter(getStats, destStat, src, dest, opts2, cb);
  return getStats(destStat, src, dest, opts2, cb);
}
function getStats(destStat, src, dest, opts2, cb) {
  const stat2 = opts2.dereference ? fs$f.stat : fs$f.lstat;
  stat2(src, (err, srcStat) => {
    if (err)
      return cb(err);
    if (srcStat.isDirectory())
      return onDir(srcStat, destStat, src, dest, opts2, cb);
    else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
      return onFile(srcStat, destStat, src, dest, opts2, cb);
    else if (srcStat.isSymbolicLink())
      return onLink(destStat, src, dest, opts2, cb);
    else if (srcStat.isSocket())
      return cb(new Error(`Cannot copy a socket file: ${src}`));
    else if (srcStat.isFIFO())
      return cb(new Error(`Cannot copy a FIFO pipe: ${src}`));
    return cb(new Error(`Unknown file: ${src}`));
  });
}
function onFile(srcStat, destStat, src, dest, opts2, cb) {
  if (!destStat)
    return copyFile(srcStat, src, dest, opts2, cb);
  return mayCopyFile(srcStat, src, dest, opts2, cb);
}
function mayCopyFile(srcStat, src, dest, opts2, cb) {
  if (opts2.overwrite) {
    fs$f.unlink(dest, (err) => {
      if (err)
        return cb(err);
      return copyFile(srcStat, src, dest, opts2, cb);
    });
  } else if (opts2.errorOnExist) {
    return cb(new Error(`'${dest}' already exists`));
  } else
    return cb();
}
function copyFile(srcStat, src, dest, opts2, cb) {
  fs$f.copyFile(src, dest, (err) => {
    if (err)
      return cb(err);
    if (opts2.preserveTimestamps)
      return handleTimestampsAndMode(srcStat.mode, src, dest, cb);
    return setDestMode(dest, srcStat.mode, cb);
  });
}
function handleTimestampsAndMode(srcMode, src, dest, cb) {
  if (fileIsNotWritable(srcMode)) {
    return makeFileWritable(dest, srcMode, (err) => {
      if (err)
        return cb(err);
      return setDestTimestampsAndMode(srcMode, src, dest, cb);
    });
  }
  return setDestTimestampsAndMode(srcMode, src, dest, cb);
}
function fileIsNotWritable(srcMode) {
  return (srcMode & 128) === 0;
}
function makeFileWritable(dest, srcMode, cb) {
  return setDestMode(dest, srcMode | 128, cb);
}
function setDestTimestampsAndMode(srcMode, src, dest, cb) {
  setDestTimestamps(src, dest, (err) => {
    if (err)
      return cb(err);
    return setDestMode(dest, srcMode, cb);
  });
}
function setDestMode(dest, srcMode, cb) {
  return fs$f.chmod(dest, srcMode, cb);
}
function setDestTimestamps(src, dest, cb) {
  fs$f.stat(src, (err, updatedSrcStat) => {
    if (err)
      return cb(err);
    return utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime, cb);
  });
}
function onDir(srcStat, destStat, src, dest, opts2, cb) {
  if (!destStat)
    return mkDirAndCopy(srcStat.mode, src, dest, opts2, cb);
  return copyDir(src, dest, opts2, cb);
}
function mkDirAndCopy(srcMode, src, dest, opts2, cb) {
  fs$f.mkdir(dest, (err) => {
    if (err)
      return cb(err);
    copyDir(src, dest, opts2, (err2) => {
      if (err2)
        return cb(err2);
      return setDestMode(dest, srcMode, cb);
    });
  });
}
function copyDir(src, dest, opts2, cb) {
  fs$f.readdir(src, (err, items2) => {
    if (err)
      return cb(err);
    return copyDirItems(items2, src, dest, opts2, cb);
  });
}
function copyDirItems(items2, src, dest, opts2, cb) {
  const item = items2.pop();
  if (!item)
    return cb();
  return copyDirItem(items2, item, src, dest, opts2, cb);
}
function copyDirItem(items2, item, src, dest, opts2, cb) {
  const srcItem = path$n.join(src, item);
  const destItem = path$n.join(dest, item);
  stat$2.checkPaths(srcItem, destItem, "copy", opts2, (err, stats) => {
    if (err)
      return cb(err);
    const { destStat } = stats;
    startCopy(destStat, srcItem, destItem, opts2, (err2) => {
      if (err2)
        return cb(err2);
      return copyDirItems(items2, src, dest, opts2, cb);
    });
  });
}
function onLink(destStat, src, dest, opts2, cb) {
  fs$f.readlink(src, (err, resolvedSrc) => {
    if (err)
      return cb(err);
    if (opts2.dereference) {
      resolvedSrc = path$n.resolve(process.cwd(), resolvedSrc);
    }
    if (!destStat) {
      return fs$f.symlink(resolvedSrc, dest, cb);
    } else {
      fs$f.readlink(dest, (err2, resolvedDest) => {
        if (err2) {
          if (err2.code === "EINVAL" || err2.code === "UNKNOWN")
            return fs$f.symlink(resolvedSrc, dest, cb);
          return cb(err2);
        }
        if (opts2.dereference) {
          resolvedDest = path$n.resolve(process.cwd(), resolvedDest);
        }
        if (stat$2.isSrcSubdir(resolvedSrc, resolvedDest)) {
          return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`));
        }
        if (destStat.isDirectory() && stat$2.isSrcSubdir(resolvedDest, resolvedSrc)) {
          return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`));
        }
        return copyLink(resolvedSrc, dest, cb);
      });
    }
  });
}
function copyLink(resolvedSrc, dest, cb) {
  fs$f.unlink(dest, (err) => {
    if (err)
      return cb(err);
    return fs$f.symlink(resolvedSrc, dest, cb);
  });
}
var copy_1 = copy$2;
const u$8 = universalify$1.fromCallback;
var copy$1 = {
  copy: u$8(copy_1)
};
const fs$e = gracefulFs;
const path$m = require$$1__default$1["default"];
const assert = require$$5__default["default"];
const isWindows = process.platform === "win32";
function defaults$1(options) {
  const methods = [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ];
  methods.forEach((m2) => {
    options[m2] = options[m2] || fs$e[m2];
    m2 = m2 + "Sync";
    options[m2] = options[m2] || fs$e[m2];
  });
  options.maxBusyTries = options.maxBusyTries || 3;
}
function rimraf$1(p, options, cb) {
  let busyTries = 0;
  if (typeof options === "function") {
    cb = options;
    options = {};
  }
  assert(p, "rimraf: missing path");
  assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
  assert.strictEqual(typeof cb, "function", "rimraf: callback function required");
  assert(options, "rimraf: invalid options argument provided");
  assert.strictEqual(typeof options, "object", "rimraf: options should be object");
  defaults$1(options);
  rimraf_(p, options, function CB(er) {
    if (er) {
      if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") && busyTries < options.maxBusyTries) {
        busyTries++;
        const time = busyTries * 100;
        return setTimeout(() => rimraf_(p, options, CB), time);
      }
      if (er.code === "ENOENT")
        er = null;
    }
    cb(er);
  });
}
function rimraf_(p, options, cb) {
  assert(p);
  assert(options);
  assert(typeof cb === "function");
  options.lstat(p, (er, st) => {
    if (er && er.code === "ENOENT") {
      return cb(null);
    }
    if (er && er.code === "EPERM" && isWindows) {
      return fixWinEPERM(p, options, er, cb);
    }
    if (st && st.isDirectory()) {
      return rmdir(p, options, er, cb);
    }
    options.unlink(p, (er2) => {
      if (er2) {
        if (er2.code === "ENOENT") {
          return cb(null);
        }
        if (er2.code === "EPERM") {
          return isWindows ? fixWinEPERM(p, options, er2, cb) : rmdir(p, options, er2, cb);
        }
        if (er2.code === "EISDIR") {
          return rmdir(p, options, er2, cb);
        }
      }
      return cb(er2);
    });
  });
}
function fixWinEPERM(p, options, er, cb) {
  assert(p);
  assert(options);
  assert(typeof cb === "function");
  options.chmod(p, 438, (er2) => {
    if (er2) {
      cb(er2.code === "ENOENT" ? null : er);
    } else {
      options.stat(p, (er3, stats) => {
        if (er3) {
          cb(er3.code === "ENOENT" ? null : er);
        } else if (stats.isDirectory()) {
          rmdir(p, options, er, cb);
        } else {
          options.unlink(p, cb);
        }
      });
    }
  });
}
function fixWinEPERMSync(p, options, er) {
  let stats;
  assert(p);
  assert(options);
  try {
    options.chmodSync(p, 438);
  } catch (er2) {
    if (er2.code === "ENOENT") {
      return;
    } else {
      throw er;
    }
  }
  try {
    stats = options.statSync(p);
  } catch (er3) {
    if (er3.code === "ENOENT") {
      return;
    } else {
      throw er;
    }
  }
  if (stats.isDirectory()) {
    rmdirSync(p, options, er);
  } else {
    options.unlinkSync(p);
  }
}
function rmdir(p, options, originalEr, cb) {
  assert(p);
  assert(options);
  assert(typeof cb === "function");
  options.rmdir(p, (er) => {
    if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")) {
      rmkids(p, options, cb);
    } else if (er && er.code === "ENOTDIR") {
      cb(originalEr);
    } else {
      cb(er);
    }
  });
}
function rmkids(p, options, cb) {
  assert(p);
  assert(options);
  assert(typeof cb === "function");
  options.readdir(p, (er, files) => {
    if (er)
      return cb(er);
    let n = files.length;
    let errState;
    if (n === 0)
      return options.rmdir(p, cb);
    files.forEach((f) => {
      rimraf$1(path$m.join(p, f), options, (er2) => {
        if (errState) {
          return;
        }
        if (er2)
          return cb(errState = er2);
        if (--n === 0) {
          options.rmdir(p, cb);
        }
      });
    });
  });
}
function rimrafSync(p, options) {
  let st;
  options = options || {};
  defaults$1(options);
  assert(p, "rimraf: missing path");
  assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
  assert(options, "rimraf: missing options");
  assert.strictEqual(typeof options, "object", "rimraf: options should be object");
  try {
    st = options.lstatSync(p);
  } catch (er) {
    if (er.code === "ENOENT") {
      return;
    }
    if (er.code === "EPERM" && isWindows) {
      fixWinEPERMSync(p, options, er);
    }
  }
  try {
    if (st && st.isDirectory()) {
      rmdirSync(p, options, null);
    } else {
      options.unlinkSync(p);
    }
  } catch (er) {
    if (er.code === "ENOENT") {
      return;
    } else if (er.code === "EPERM") {
      return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
    } else if (er.code !== "EISDIR") {
      throw er;
    }
    rmdirSync(p, options, er);
  }
}
function rmdirSync(p, options, originalEr) {
  assert(p);
  assert(options);
  try {
    options.rmdirSync(p);
  } catch (er) {
    if (er.code === "ENOTDIR") {
      throw originalEr;
    } else if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM") {
      rmkidsSync(p, options);
    } else if (er.code !== "ENOENT") {
      throw er;
    }
  }
}
function rmkidsSync(p, options) {
  assert(p);
  assert(options);
  options.readdirSync(p).forEach((f) => rimrafSync(path$m.join(p, f), options));
  if (isWindows) {
    const startTime = Date.now();
    do {
      try {
        const ret = options.rmdirSync(p, options);
        return ret;
      } catch {
      }
    } while (Date.now() - startTime < 500);
  } else {
    const ret = options.rmdirSync(p, options);
    return ret;
  }
}
var rimraf_1 = rimraf$1;
rimraf$1.sync = rimrafSync;
const fs$d = gracefulFs;
const u$7 = universalify$1.fromCallback;
const rimraf = rimraf_1;
function remove$2(path2, callback) {
  if (fs$d.rm)
    return fs$d.rm(path2, { recursive: true, force: true }, callback);
  rimraf(path2, callback);
}
function removeSync$1(path2) {
  if (fs$d.rmSync)
    return fs$d.rmSync(path2, { recursive: true, force: true });
  rimraf.sync(path2);
}
var remove_1 = {
  remove: u$7(remove$2),
  removeSync: removeSync$1
};
const u$6 = universalify$1.fromPromise;
const fs$c = fs$m;
const path$l = require$$1__default$1["default"];
const mkdir$3 = mkdirs$2;
const remove$1 = remove_1;
const emptyDir = u$6(async function emptyDir2(dir) {
  let items2;
  try {
    items2 = await fs$c.readdir(dir);
  } catch {
    return mkdir$3.mkdirs(dir);
  }
  return Promise.all(items2.map((item) => remove$1.remove(path$l.join(dir, item))));
});
function emptyDirSync(dir) {
  let items2;
  try {
    items2 = fs$c.readdirSync(dir);
  } catch {
    return mkdir$3.mkdirsSync(dir);
  }
  items2.forEach((item) => {
    item = path$l.join(dir, item);
    remove$1.removeSync(item);
  });
}
var empty = {
  emptyDirSync,
  emptydirSync: emptyDirSync,
  emptyDir,
  emptydir: emptyDir
};
const u$5 = universalify$1.fromCallback;
const path$k = require$$1__default$1["default"];
const fs$b = gracefulFs;
const mkdir$2 = mkdirs$2;
function createFile(file2, callback) {
  function makeFile() {
    fs$b.writeFile(file2, "", (err) => {
      if (err)
        return callback(err);
      callback();
    });
  }
  fs$b.stat(file2, (err, stats) => {
    if (!err && stats.isFile())
      return callback();
    const dir = path$k.dirname(file2);
    fs$b.stat(dir, (err2, stats2) => {
      if (err2) {
        if (err2.code === "ENOENT") {
          return mkdir$2.mkdirs(dir, (err3) => {
            if (err3)
              return callback(err3);
            makeFile();
          });
        }
        return callback(err2);
      }
      if (stats2.isDirectory())
        makeFile();
      else {
        fs$b.readdir(dir, (err3) => {
          if (err3)
            return callback(err3);
        });
      }
    });
  });
}
function createFileSync(file2) {
  let stats;
  try {
    stats = fs$b.statSync(file2);
  } catch {
  }
  if (stats && stats.isFile())
    return;
  const dir = path$k.dirname(file2);
  try {
    if (!fs$b.statSync(dir).isDirectory()) {
      fs$b.readdirSync(dir);
    }
  } catch (err) {
    if (err && err.code === "ENOENT")
      mkdir$2.mkdirsSync(dir);
    else
      throw err;
  }
  fs$b.writeFileSync(file2, "");
}
var file$1 = {
  createFile: u$5(createFile),
  createFileSync
};
const u$4 = universalify$1.fromCallback;
const path$j = require$$1__default$1["default"];
const fs$a = gracefulFs;
const mkdir$1 = mkdirs$2;
const pathExists$6 = pathExists_1.pathExists;
const { areIdentical: areIdentical$1 } = stat$4;
function createLink(srcpath, dstpath, callback) {
  function makeLink(srcpath2, dstpath2) {
    fs$a.link(srcpath2, dstpath2, (err) => {
      if (err)
        return callback(err);
      callback(null);
    });
  }
  fs$a.lstat(dstpath, (_, dstStat) => {
    fs$a.lstat(srcpath, (err, srcStat) => {
      if (err) {
        err.message = err.message.replace("lstat", "ensureLink");
        return callback(err);
      }
      if (dstStat && areIdentical$1(srcStat, dstStat))
        return callback(null);
      const dir = path$j.dirname(dstpath);
      pathExists$6(dir, (err2, dirExists) => {
        if (err2)
          return callback(err2);
        if (dirExists)
          return makeLink(srcpath, dstpath);
        mkdir$1.mkdirs(dir, (err3) => {
          if (err3)
            return callback(err3);
          makeLink(srcpath, dstpath);
        });
      });
    });
  });
}
function createLinkSync(srcpath, dstpath) {
  let dstStat;
  try {
    dstStat = fs$a.lstatSync(dstpath);
  } catch {
  }
  try {
    const srcStat = fs$a.lstatSync(srcpath);
    if (dstStat && areIdentical$1(srcStat, dstStat))
      return;
  } catch (err) {
    err.message = err.message.replace("lstat", "ensureLink");
    throw err;
  }
  const dir = path$j.dirname(dstpath);
  const dirExists = fs$a.existsSync(dir);
  if (dirExists)
    return fs$a.linkSync(srcpath, dstpath);
  mkdir$1.mkdirsSync(dir);
  return fs$a.linkSync(srcpath, dstpath);
}
var link$1 = {
  createLink: u$4(createLink),
  createLinkSync
};
const path$i = require$$1__default$1["default"];
const fs$9 = gracefulFs;
const pathExists$5 = pathExists_1.pathExists;
function symlinkPaths$1(srcpath, dstpath, callback) {
  if (path$i.isAbsolute(srcpath)) {
    return fs$9.lstat(srcpath, (err) => {
      if (err) {
        err.message = err.message.replace("lstat", "ensureSymlink");
        return callback(err);
      }
      return callback(null, {
        toCwd: srcpath,
        toDst: srcpath
      });
    });
  } else {
    const dstdir = path$i.dirname(dstpath);
    const relativeToDst = path$i.join(dstdir, srcpath);
    return pathExists$5(relativeToDst, (err, exists) => {
      if (err)
        return callback(err);
      if (exists) {
        return callback(null, {
          toCwd: relativeToDst,
          toDst: srcpath
        });
      } else {
        return fs$9.lstat(srcpath, (err2) => {
          if (err2) {
            err2.message = err2.message.replace("lstat", "ensureSymlink");
            return callback(err2);
          }
          return callback(null, {
            toCwd: srcpath,
            toDst: path$i.relative(dstdir, srcpath)
          });
        });
      }
    });
  }
}
function symlinkPathsSync$1(srcpath, dstpath) {
  let exists;
  if (path$i.isAbsolute(srcpath)) {
    exists = fs$9.existsSync(srcpath);
    if (!exists)
      throw new Error("absolute srcpath does not exist");
    return {
      toCwd: srcpath,
      toDst: srcpath
    };
  } else {
    const dstdir = path$i.dirname(dstpath);
    const relativeToDst = path$i.join(dstdir, srcpath);
    exists = fs$9.existsSync(relativeToDst);
    if (exists) {
      return {
        toCwd: relativeToDst,
        toDst: srcpath
      };
    } else {
      exists = fs$9.existsSync(srcpath);
      if (!exists)
        throw new Error("relative srcpath does not exist");
      return {
        toCwd: srcpath,
        toDst: path$i.relative(dstdir, srcpath)
      };
    }
  }
}
var symlinkPaths_1 = {
  symlinkPaths: symlinkPaths$1,
  symlinkPathsSync: symlinkPathsSync$1
};
const fs$8 = gracefulFs;
function symlinkType$1(srcpath, type2, callback) {
  callback = typeof type2 === "function" ? type2 : callback;
  type2 = typeof type2 === "function" ? false : type2;
  if (type2)
    return callback(null, type2);
  fs$8.lstat(srcpath, (err, stats) => {
    if (err)
      return callback(null, "file");
    type2 = stats && stats.isDirectory() ? "dir" : "file";
    callback(null, type2);
  });
}
function symlinkTypeSync$1(srcpath, type2) {
  let stats;
  if (type2)
    return type2;
  try {
    stats = fs$8.lstatSync(srcpath);
  } catch {
    return "file";
  }
  return stats && stats.isDirectory() ? "dir" : "file";
}
var symlinkType_1 = {
  symlinkType: symlinkType$1,
  symlinkTypeSync: symlinkTypeSync$1
};
const u$3 = universalify$1.fromCallback;
const path$h = require$$1__default$1["default"];
const fs$7 = fs$m;
const _mkdirs = mkdirs$2;
const mkdirs = _mkdirs.mkdirs;
const mkdirsSync = _mkdirs.mkdirsSync;
const _symlinkPaths = symlinkPaths_1;
const symlinkPaths = _symlinkPaths.symlinkPaths;
const symlinkPathsSync = _symlinkPaths.symlinkPathsSync;
const _symlinkType = symlinkType_1;
const symlinkType = _symlinkType.symlinkType;
const symlinkTypeSync = _symlinkType.symlinkTypeSync;
const pathExists$4 = pathExists_1.pathExists;
const { areIdentical } = stat$4;
function createSymlink(srcpath, dstpath, type2, callback) {
  callback = typeof type2 === "function" ? type2 : callback;
  type2 = typeof type2 === "function" ? false : type2;
  fs$7.lstat(dstpath, (err, stats) => {
    if (!err && stats.isSymbolicLink()) {
      Promise.all([
        fs$7.stat(srcpath),
        fs$7.stat(dstpath)
      ]).then(([srcStat, dstStat]) => {
        if (areIdentical(srcStat, dstStat))
          return callback(null);
        _createSymlink(srcpath, dstpath, type2, callback);
      });
    } else
      _createSymlink(srcpath, dstpath, type2, callback);
  });
}
function _createSymlink(srcpath, dstpath, type2, callback) {
  symlinkPaths(srcpath, dstpath, (err, relative) => {
    if (err)
      return callback(err);
    srcpath = relative.toDst;
    symlinkType(relative.toCwd, type2, (err2, type3) => {
      if (err2)
        return callback(err2);
      const dir = path$h.dirname(dstpath);
      pathExists$4(dir, (err3, dirExists) => {
        if (err3)
          return callback(err3);
        if (dirExists)
          return fs$7.symlink(srcpath, dstpath, type3, callback);
        mkdirs(dir, (err4) => {
          if (err4)
            return callback(err4);
          fs$7.symlink(srcpath, dstpath, type3, callback);
        });
      });
    });
  });
}
function createSymlinkSync(srcpath, dstpath, type2) {
  let stats;
  try {
    stats = fs$7.lstatSync(dstpath);
  } catch {
  }
  if (stats && stats.isSymbolicLink()) {
    const srcStat = fs$7.statSync(srcpath);
    const dstStat = fs$7.statSync(dstpath);
    if (areIdentical(srcStat, dstStat))
      return;
  }
  const relative = symlinkPathsSync(srcpath, dstpath);
  srcpath = relative.toDst;
  type2 = symlinkTypeSync(relative.toCwd, type2);
  const dir = path$h.dirname(dstpath);
  const exists = fs$7.existsSync(dir);
  if (exists)
    return fs$7.symlinkSync(srcpath, dstpath, type2);
  mkdirsSync(dir);
  return fs$7.symlinkSync(srcpath, dstpath, type2);
}
var symlink$1 = {
  createSymlink: u$3(createSymlink),
  createSymlinkSync
};
const file = file$1;
const link = link$1;
const symlink = symlink$1;
var ensure = {
  createFile: file.createFile,
  createFileSync: file.createFileSync,
  ensureFile: file.createFile,
  ensureFileSync: file.createFileSync,
  createLink: link.createLink,
  createLinkSync: link.createLinkSync,
  ensureLink: link.createLink,
  ensureLinkSync: link.createLinkSync,
  createSymlink: symlink.createSymlink,
  createSymlinkSync: symlink.createSymlinkSync,
  ensureSymlink: symlink.createSymlink,
  ensureSymlinkSync: symlink.createSymlinkSync
};
function stringify$4(obj, { EOL = "\n", finalEOL = true, replacer = null, spaces } = {}) {
  const EOF = finalEOL ? EOL : "";
  const str2 = JSON.stringify(obj, replacer, spaces);
  return str2.replace(/\n/g, EOL) + EOF;
}
function stripBom$1(content) {
  if (Buffer.isBuffer(content))
    content = content.toString("utf8");
  return content.replace(/^\uFEFF/, "");
}
var utils = { stringify: stringify$4, stripBom: stripBom$1 };
let _fs;
try {
  _fs = gracefulFs;
} catch (_) {
  _fs = require$$0__default$2["default"];
}
const universalify = universalify$1;
const { stringify: stringify$3, stripBom } = utils;
async function _readFile(file2, options = {}) {
  if (typeof options === "string") {
    options = { encoding: options };
  }
  const fs2 = options.fs || _fs;
  const shouldThrow = "throws" in options ? options.throws : true;
  let data = await universalify.fromCallback(fs2.readFile)(file2, options);
  data = stripBom(data);
  let obj;
  try {
    obj = JSON.parse(data, options ? options.reviver : null);
  } catch (err) {
    if (shouldThrow) {
      err.message = `${file2}: ${err.message}`;
      throw err;
    } else {
      return null;
    }
  }
  return obj;
}
const readFile$1 = universalify.fromPromise(_readFile);
function readFileSync$1(file2, options = {}) {
  if (typeof options === "string") {
    options = { encoding: options };
  }
  const fs2 = options.fs || _fs;
  const shouldThrow = "throws" in options ? options.throws : true;
  try {
    let content = fs2.readFileSync(file2, options);
    content = stripBom(content);
    return JSON.parse(content, options.reviver);
  } catch (err) {
    if (shouldThrow) {
      err.message = `${file2}: ${err.message}`;
      throw err;
    } else {
      return null;
    }
  }
}
async function _writeFile(file2, obj, options = {}) {
  const fs2 = options.fs || _fs;
  const str2 = stringify$3(obj, options);
  await universalify.fromCallback(fs2.writeFile)(file2, str2, options);
}
const writeFile$1 = universalify.fromPromise(_writeFile);
function writeFileSync$1(file2, obj, options = {}) {
  const fs2 = options.fs || _fs;
  const str2 = stringify$3(obj, options);
  return fs2.writeFileSync(file2, str2, options);
}
const jsonfile$1 = {
  readFile: readFile$1,
  readFileSync: readFileSync$1,
  writeFile: writeFile$1,
  writeFileSync: writeFileSync$1
};
var jsonfile_1 = jsonfile$1;
const jsonFile$1 = jsonfile_1;
var jsonfile = {
  readJson: jsonFile$1.readFile,
  readJsonSync: jsonFile$1.readFileSync,
  writeJson: jsonFile$1.writeFile,
  writeJsonSync: jsonFile$1.writeFileSync
};
const u$2 = universalify$1.fromCallback;
const fs$6 = gracefulFs;
const path$g = require$$1__default$1["default"];
const mkdir = mkdirs$2;
const pathExists$3 = pathExists_1.pathExists;
function outputFile$1(file2, data, encoding, callback) {
  if (typeof encoding === "function") {
    callback = encoding;
    encoding = "utf8";
  }
  const dir = path$g.dirname(file2);
  pathExists$3(dir, (err, itDoes) => {
    if (err)
      return callback(err);
    if (itDoes)
      return fs$6.writeFile(file2, data, encoding, callback);
    mkdir.mkdirs(dir, (err2) => {
      if (err2)
        return callback(err2);
      fs$6.writeFile(file2, data, encoding, callback);
    });
  });
}
function outputFileSync$1(file2, ...args) {
  const dir = path$g.dirname(file2);
  if (fs$6.existsSync(dir)) {
    return fs$6.writeFileSync(file2, ...args);
  }
  mkdir.mkdirsSync(dir);
  fs$6.writeFileSync(file2, ...args);
}
var output = {
  outputFile: u$2(outputFile$1),
  outputFileSync: outputFileSync$1
};
const { stringify: stringify$2 } = utils;
const { outputFile } = output;
async function outputJson(file2, data, options = {}) {
  const str2 = stringify$2(data, options);
  await outputFile(file2, str2, options);
}
var outputJson_1 = outputJson;
const { stringify: stringify$1 } = utils;
const { outputFileSync } = output;
function outputJsonSync(file2, data, options) {
  const str2 = stringify$1(data, options);
  outputFileSync(file2, str2, options);
}
var outputJsonSync_1 = outputJsonSync;
const u$1 = universalify$1.fromPromise;
const jsonFile = jsonfile;
jsonFile.outputJson = u$1(outputJson_1);
jsonFile.outputJsonSync = outputJsonSync_1;
jsonFile.outputJSON = jsonFile.outputJson;
jsonFile.outputJSONSync = jsonFile.outputJsonSync;
jsonFile.writeJSON = jsonFile.writeJson;
jsonFile.writeJSONSync = jsonFile.writeJsonSync;
jsonFile.readJSON = jsonFile.readJson;
jsonFile.readJSONSync = jsonFile.readJsonSync;
var json$1 = jsonFile;
const fs$5 = gracefulFs;
const path$f = require$$1__default$1["default"];
const copySync = copySync$1.copySync;
const removeSync = remove_1.removeSync;
const mkdirpSync = mkdirs$2.mkdirpSync;
const stat$1 = stat$4;
function moveSync$1(src, dest, opts2) {
  opts2 = opts2 || {};
  const overwrite = opts2.overwrite || opts2.clobber || false;
  const { srcStat, isChangingCase = false } = stat$1.checkPathsSync(src, dest, "move", opts2);
  stat$1.checkParentPathsSync(src, srcStat, dest, "move");
  if (!isParentRoot$1(dest))
    mkdirpSync(path$f.dirname(dest));
  return doRename$1(src, dest, overwrite, isChangingCase);
}
function isParentRoot$1(dest) {
  const parent = path$f.dirname(dest);
  const parsedPath = path$f.parse(parent);
  return parsedPath.root === parent;
}
function doRename$1(src, dest, overwrite, isChangingCase) {
  if (isChangingCase)
    return rename$1(src, dest, overwrite);
  if (overwrite) {
    removeSync(dest);
    return rename$1(src, dest, overwrite);
  }
  if (fs$5.existsSync(dest))
    throw new Error("dest already exists.");
  return rename$1(src, dest, overwrite);
}
function rename$1(src, dest, overwrite) {
  try {
    fs$5.renameSync(src, dest);
  } catch (err) {
    if (err.code !== "EXDEV")
      throw err;
    return moveAcrossDevice$1(src, dest, overwrite);
  }
}
function moveAcrossDevice$1(src, dest, overwrite) {
  const opts2 = {
    overwrite,
    errorOnExist: true
  };
  copySync(src, dest, opts2);
  return removeSync(src);
}
var moveSync_1 = moveSync$1;
var moveSync = {
  moveSync: moveSync_1
};
const fs$4 = gracefulFs;
const path$e = require$$1__default$1["default"];
const copy = copy$1.copy;
const remove = remove_1.remove;
const mkdirp = mkdirs$2.mkdirp;
const pathExists$2 = pathExists_1.pathExists;
const stat = stat$4;
function move$1(src, dest, opts2, cb) {
  if (typeof opts2 === "function") {
    cb = opts2;
    opts2 = {};
  }
  const overwrite = opts2.overwrite || opts2.clobber || false;
  stat.checkPaths(src, dest, "move", opts2, (err, stats) => {
    if (err)
      return cb(err);
    const { srcStat, isChangingCase = false } = stats;
    stat.checkParentPaths(src, srcStat, dest, "move", (err2) => {
      if (err2)
        return cb(err2);
      if (isParentRoot(dest))
        return doRename(src, dest, overwrite, isChangingCase, cb);
      mkdirp(path$e.dirname(dest), (err3) => {
        if (err3)
          return cb(err3);
        return doRename(src, dest, overwrite, isChangingCase, cb);
      });
    });
  });
}
function isParentRoot(dest) {
  const parent = path$e.dirname(dest);
  const parsedPath = path$e.parse(parent);
  return parsedPath.root === parent;
}
function doRename(src, dest, overwrite, isChangingCase, cb) {
  if (isChangingCase)
    return rename(src, dest, overwrite, cb);
  if (overwrite) {
    return remove(dest, (err) => {
      if (err)
        return cb(err);
      return rename(src, dest, overwrite, cb);
    });
  }
  pathExists$2(dest, (err, destExists) => {
    if (err)
      return cb(err);
    if (destExists)
      return cb(new Error("dest already exists."));
    return rename(src, dest, overwrite, cb);
  });
}
function rename(src, dest, overwrite, cb) {
  fs$4.rename(src, dest, (err) => {
    if (!err)
      return cb();
    if (err.code !== "EXDEV")
      return cb(err);
    return moveAcrossDevice(src, dest, overwrite, cb);
  });
}
function moveAcrossDevice(src, dest, overwrite, cb) {
  const opts2 = {
    overwrite,
    errorOnExist: true
  };
  copy(src, dest, opts2, (err) => {
    if (err)
      return cb(err);
    return remove(src, cb);
  });
}
var move_1 = move$1;
const u = universalify$1.fromCallback;
var move = {
  move: u(move_1)
};
var lib = __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, fs$m), copySync$1), copy$1), empty), ensure), json$1), mkdirs$2), moveSync), move), output), pathExists_1), remove_1);
var main$1 = {};
var out = {};
var CancellationToken$1 = {};
Object.defineProperty(CancellationToken$1, "__esModule", { value: true });
CancellationToken$1.CancellationError = CancellationToken$1.CancellationToken = void 0;
const events_1$1 = require$$0__default$3["default"];
class CancellationToken extends events_1$1.EventEmitter {
  constructor(parent) {
    super();
    this.parentCancelHandler = null;
    this._parent = null;
    this._cancelled = false;
    if (parent != null) {
      this.parent = parent;
    }
  }
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(value) {
    this.removeParentCancelHandler();
    this._parent = value;
    this.parentCancelHandler = () => this.cancel();
    this._parent.onCancel(this.parentCancelHandler);
  }
  cancel() {
    this._cancelled = true;
    this.emit("cancel");
  }
  onCancel(handler) {
    if (this.cancelled) {
      handler();
    } else {
      this.once("cancel", handler);
    }
  }
  createPromise(callback) {
    if (this.cancelled) {
      return Promise.reject(new CancellationError());
    }
    const finallyHandler = () => {
      if (cancelHandler != null) {
        try {
          this.removeListener("cancel", cancelHandler);
          cancelHandler = null;
        } catch (ignore) {
        }
      }
    };
    let cancelHandler = null;
    return new Promise((resolve2, reject) => {
      let addedCancelHandler = null;
      cancelHandler = () => {
        try {
          if (addedCancelHandler != null) {
            addedCancelHandler();
            addedCancelHandler = null;
          }
        } finally {
          reject(new CancellationError());
        }
      };
      if (this.cancelled) {
        cancelHandler();
        return;
      }
      this.onCancel(cancelHandler);
      callback(resolve2, reject, (callback2) => {
        addedCancelHandler = callback2;
      });
    }).then((it) => {
      finallyHandler();
      return it;
    }).catch((e) => {
      finallyHandler();
      throw e;
    });
  }
  removeParentCancelHandler() {
    const parent = this._parent;
    if (parent != null && this.parentCancelHandler != null) {
      parent.removeListener("cancel", this.parentCancelHandler);
      this.parentCancelHandler = null;
    }
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners();
      this._parent = null;
    }
  }
}
CancellationToken$1.CancellationToken = CancellationToken;
class CancellationError extends Error {
  constructor() {
    super("cancelled");
  }
}
CancellationToken$1.CancellationError = CancellationError;
var httpExecutor = {};
var browser = { exports: {} };
var s = 1e3;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
var ms = function(val, options) {
  options = options || {};
  var type2 = typeof val;
  if (type2 === "string" && val.length > 0) {
    return parse$6(val);
  } else if (type2 === "number" && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
};
function parse$6(str2) {
  str2 = String(str2);
  if (str2.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str2);
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type2 = (match[2] || "ms").toLowerCase();
  switch (type2) {
    case "years":
    case "year":
    case "yrs":
    case "yr":
    case "y":
      return n * y;
    case "weeks":
    case "week":
    case "w":
      return n * w;
    case "days":
    case "day":
    case "d":
      return n * d;
    case "hours":
    case "hour":
    case "hrs":
    case "hr":
    case "h":
      return n * h;
    case "minutes":
    case "minute":
    case "mins":
    case "min":
    case "m":
      return n * m;
    case "seconds":
    case "second":
    case "secs":
    case "sec":
    case "s":
      return n * s;
    case "milliseconds":
    case "millisecond":
    case "msecs":
    case "msec":
    case "ms":
      return n;
    default:
      return void 0;
  }
}
function fmtShort(ms2) {
  var msAbs = Math.abs(ms2);
  if (msAbs >= d) {
    return Math.round(ms2 / d) + "d";
  }
  if (msAbs >= h) {
    return Math.round(ms2 / h) + "h";
  }
  if (msAbs >= m) {
    return Math.round(ms2 / m) + "m";
  }
  if (msAbs >= s) {
    return Math.round(ms2 / s) + "s";
  }
  return ms2 + "ms";
}
function fmtLong(ms2) {
  var msAbs = Math.abs(ms2);
  if (msAbs >= d) {
    return plural(ms2, msAbs, d, "day");
  }
  if (msAbs >= h) {
    return plural(ms2, msAbs, h, "hour");
  }
  if (msAbs >= m) {
    return plural(ms2, msAbs, m, "minute");
  }
  if (msAbs >= s) {
    return plural(ms2, msAbs, s, "second");
  }
  return ms2 + " ms";
}
function plural(ms2, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms2 / n) + " " + name + (isPlural ? "s" : "");
}
function setup(env2) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce2;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = ms;
  createDebug.destroy = destroy;
  Object.keys(env2).forEach((key) => {
    createDebug[key] = env2[key];
  });
  createDebug.names = [];
  createDebug.skips = [];
  createDebug.formatters = {};
  function selectColor(namespace) {
    let hash = 0;
    for (let i2 = 0; i2 < namespace.length; i2++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i2);
      hash |= 0;
    }
    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }
  createDebug.selectColor = selectColor;
  function createDebug(namespace) {
    let prevTime;
    let enableOverride = null;
    let namespacesCache;
    let enabledCache;
    function debug2(...args) {
      if (!debug2.enabled) {
        return;
      }
      const self2 = debug2;
      const curr = Number(new Date());
      const ms2 = curr - (prevTime || curr);
      self2.diff = ms2;
      self2.prev = prevTime;
      self2.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);
      if (typeof args[0] !== "string") {
        args.unshift("%O");
      }
      let index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format2) => {
        if (match === "%%") {
          return "%";
        }
        index++;
        const formatter = createDebug.formatters[format2];
        if (typeof formatter === "function") {
          const val = args[index];
          match = formatter.call(self2, val);
          args.splice(index, 1);
          index--;
        }
        return match;
      });
      createDebug.formatArgs.call(self2, args);
      const logFn = self2.log || createDebug.log;
      logFn.apply(self2, args);
    }
    debug2.namespace = namespace;
    debug2.useColors = createDebug.useColors();
    debug2.color = createDebug.selectColor(namespace);
    debug2.extend = extend3;
    debug2.destroy = createDebug.destroy;
    Object.defineProperty(debug2, "enabled", {
      enumerable: true,
      configurable: false,
      get: () => {
        if (enableOverride !== null) {
          return enableOverride;
        }
        if (namespacesCache !== createDebug.namespaces) {
          namespacesCache = createDebug.namespaces;
          enabledCache = createDebug.enabled(namespace);
        }
        return enabledCache;
      },
      set: (v) => {
        enableOverride = v;
      }
    });
    if (typeof createDebug.init === "function") {
      createDebug.init(debug2);
    }
    return debug2;
  }
  function extend3(namespace, delimiter) {
    const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
    newDebug.log = this.log;
    return newDebug;
  }
  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.namespaces = namespaces;
    createDebug.names = [];
    createDebug.skips = [];
    let i2;
    const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
    const len = split.length;
    for (i2 = 0; i2 < len; i2++) {
      if (!split[i2]) {
        continue;
      }
      namespaces = split[i2].replace(/\*/g, ".*?");
      if (namespaces[0] === "-") {
        createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
      } else {
        createDebug.names.push(new RegExp("^" + namespaces + "$"));
      }
    }
  }
  function disable() {
    const namespaces = [
      ...createDebug.names.map(toNamespace),
      ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
    ].join(",");
    createDebug.enable("");
    return namespaces;
  }
  function enabled(name) {
    if (name[name.length - 1] === "*") {
      return true;
    }
    let i2;
    let len;
    for (i2 = 0, len = createDebug.skips.length; i2 < len; i2++) {
      if (createDebug.skips[i2].test(name)) {
        return false;
      }
    }
    for (i2 = 0, len = createDebug.names.length; i2 < len; i2++) {
      if (createDebug.names[i2].test(name)) {
        return true;
      }
    }
    return false;
  }
  function toNamespace(regexp) {
    return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function coerce2(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }
    return val;
  }
  function destroy() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  createDebug.enable(createDebug.load());
  return createDebug;
}
var common$6 = setup;
(function(module, exports) {
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load2;
  exports.useColors = useColors;
  exports.storage = localstorage();
  exports.destroy = (() => {
    let warned = false;
    return () => {
      if (!warned) {
        warned = true;
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
    };
  })();
  exports.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function useColors() {
    if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
      return true;
    }
    if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    }
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function formatArgs(args) {
    args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
    if (!this.useColors) {
      return;
    }
    const c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit");
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match) => {
      if (match === "%%") {
        return;
      }
      index++;
      if (match === "%c") {
        lastC = index;
      }
    });
    args.splice(lastC, 0, c);
  }
  exports.log = console.debug || console.log || (() => {
  });
  function save(namespaces) {
    try {
      if (namespaces) {
        exports.storage.setItem("debug", namespaces);
      } else {
        exports.storage.removeItem("debug");
      }
    } catch (error2) {
    }
  }
  function load2() {
    let r;
    try {
      r = exports.storage.getItem("debug");
    } catch (error2) {
    }
    if (!r && typeof process !== "undefined" && "env" in process) {
      r = {}.DEBUG;
    }
    return r;
  }
  function localstorage() {
    try {
      return localStorage;
    } catch (error2) {
    }
  }
  module.exports = common$6(exports);
  const { formatters } = module.exports;
  formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (error2) {
      return "[UnexpectedJSONParseError]: " + error2.message;
    }
  };
})(browser, browser.exports);
var ProgressCallbackTransform$1 = {};
Object.defineProperty(ProgressCallbackTransform$1, "__esModule", { value: true });
ProgressCallbackTransform$1.ProgressCallbackTransform = void 0;
const stream_1$3 = require$$0__default$1["default"];
class ProgressCallbackTransform extends stream_1$3.Transform {
  constructor(total, cancellationToken, onProgress) {
    super();
    this.total = total;
    this.cancellationToken = cancellationToken;
    this.onProgress = onProgress;
    this.start = Date.now();
    this.transferred = 0;
    this.delta = 0;
    this.nextUpdate = this.start + 1e3;
  }
  _transform(chunk, encoding, callback) {
    if (this.cancellationToken.cancelled) {
      callback(new Error("cancelled"), null);
      return;
    }
    this.transferred += chunk.length;
    this.delta += chunk.length;
    const now = Date.now();
    if (now >= this.nextUpdate && this.transferred !== this.total) {
      this.nextUpdate = now + 1e3;
      this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.total * 100,
        bytesPerSecond: Math.round(this.transferred / ((now - this.start) / 1e3))
      });
      this.delta = 0;
    }
    callback(null, chunk);
  }
  _flush(callback) {
    if (this.cancellationToken.cancelled) {
      callback(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
    this.delta = 0;
    callback(null);
  }
}
ProgressCallbackTransform$1.ProgressCallbackTransform = ProgressCallbackTransform;
Object.defineProperty(httpExecutor, "__esModule", { value: true });
httpExecutor.safeStringifyJson = httpExecutor.configureRequestOptions = httpExecutor.safeGetHeader = httpExecutor.DigestTransform = httpExecutor.configureRequestUrl = httpExecutor.configureRequestOptionsFromUrl = httpExecutor.HttpExecutor = httpExecutor.parseJson = httpExecutor.HttpError = httpExecutor.createHttpError = void 0;
const crypto_1$3 = require$$0__default$4["default"];
const debug_1$1 = browser.exports;
const fs_1$7 = require$$0__default$2["default"];
const stream_1$2 = require$$0__default$1["default"];
const url_1$6 = require$$2__default["default"];
const CancellationToken_1 = CancellationToken$1;
const index_1$2 = out;
const ProgressCallbackTransform_1 = ProgressCallbackTransform$1;
const debug$4 = debug_1$1.default("electron-builder");
function createHttpError(response, description2 = null) {
  return new HttpError(response.statusCode || -1, `${response.statusCode} ${response.statusMessage}` + (description2 == null ? "" : "\n" + JSON.stringify(description2, null, "  ")) + "\nHeaders: " + safeStringifyJson(response.headers), description2);
}
httpExecutor.createHttpError = createHttpError;
const HTTP_STATUS_CODES = new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class HttpError extends Error {
  constructor(statusCode, message = `HTTP error: ${HTTP_STATUS_CODES.get(statusCode) || statusCode}`, description2 = null) {
    super(message);
    this.statusCode = statusCode;
    this.description = description2;
    this.name = "HttpError";
    this.code = `HTTP_ERROR_${statusCode}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
httpExecutor.HttpError = HttpError;
function parseJson(result) {
  return result.then((it) => it == null || it.length === 0 ? null : JSON.parse(it));
}
httpExecutor.parseJson = parseJson;
class HttpExecutor {
  constructor() {
    this.maxRedirects = 10;
  }
  request(options, cancellationToken = new CancellationToken_1.CancellationToken(), data) {
    configureRequestOptions(options);
    const json2 = data == null ? void 0 : JSON.stringify(data);
    const encodedData = json2 ? Buffer.from(json2) : void 0;
    if (encodedData != null) {
      debug$4(json2);
      const _a = options, { headers } = _a, opts2 = __objRest(_a, ["headers"]);
      options = __spreadValues({
        method: "post",
        headers: __spreadValues({
          "Content-Type": "application/json",
          "Content-Length": encodedData.length
        }, headers)
      }, opts2);
    }
    return this.doApiRequest(options, cancellationToken, (it) => {
      it.end(encodedData);
    });
  }
  doApiRequest(options, cancellationToken, requestProcessor, redirectCount = 0) {
    if (debug$4.enabled) {
      debug$4(`Request: ${safeStringifyJson(options)}`);
    }
    return cancellationToken.createPromise((resolve2, reject, onCancel) => {
      const request = this.createRequest(options, (response) => {
        try {
          this.handleResponse(response, options, cancellationToken, resolve2, reject, redirectCount, requestProcessor);
        } catch (e) {
          reject(e);
        }
      });
      this.addErrorAndTimeoutHandlers(request, reject);
      this.addRedirectHandlers(request, options, reject, redirectCount, (options2) => {
        this.doApiRequest(options2, cancellationToken, requestProcessor, redirectCount).then(resolve2).catch(reject);
      });
      requestProcessor(request, reject);
      onCancel(() => request.abort());
    });
  }
  addRedirectHandlers(request, options, reject, redirectCount, handler) {
  }
  addErrorAndTimeoutHandlers(request, reject) {
    this.addTimeOutHandler(request, reject);
    request.on("error", reject);
    request.on("aborted", () => {
      reject(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(response, options, cancellationToken, resolve2, reject, redirectCount, requestProcessor) {
    var _a;
    if (debug$4.enabled) {
      debug$4(`Response: ${response.statusCode} ${response.statusMessage}, request options: ${safeStringifyJson(options)}`);
    }
    if (response.statusCode === 404) {
      reject(createHttpError(response, `method: ${options.method || "GET"} url: ${options.protocol || "https:"}//${options.hostname}${options.port ? `:${options.port}` : ""}${options.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (response.statusCode === 204) {
      resolve2();
      return;
    }
    const code2 = (_a = response.statusCode) !== null && _a !== void 0 ? _a : 0;
    const shouldRedirect = code2 >= 300 && code2 < 400;
    const redirectUrl = safeGetHeader(response, "location");
    if (shouldRedirect && redirectUrl != null) {
      if (redirectCount > this.maxRedirects) {
        reject(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(HttpExecutor.prepareRedirectUrlOptions(redirectUrl, options), cancellationToken, requestProcessor, redirectCount).then(resolve2).catch(reject);
      return;
    }
    response.setEncoding("utf8");
    let data = "";
    response.on("error", reject);
    response.on("data", (chunk) => data += chunk);
    response.on("end", () => {
      try {
        if (response.statusCode != null && response.statusCode >= 400) {
          const contentType = safeGetHeader(response, "content-type");
          const isJson = contentType != null && (Array.isArray(contentType) ? contentType.find((it) => it.includes("json")) != null : contentType.includes("json"));
          reject(createHttpError(response, `method: ${options.method || "GET"} url: ${options.protocol || "https:"}//${options.hostname}${options.port ? `:${options.port}` : ""}${options.path}

          Data:
          ${isJson ? JSON.stringify(JSON.parse(data)) : data}
          `));
        } else {
          resolve2(data.length === 0 ? null : data);
        }
      } catch (e) {
        reject(e);
      }
    });
  }
  async downloadToBuffer(url, options) {
    return await options.cancellationToken.createPromise((resolve2, reject, onCancel) => {
      let result = null;
      const requestOptions = {
        headers: options.headers || void 0,
        redirect: "manual"
      };
      configureRequestUrl(url, requestOptions);
      configureRequestOptions(requestOptions);
      this.doDownload(requestOptions, {
        destination: null,
        options,
        onCancel,
        callback: (error2) => {
          if (error2 == null) {
            resolve2(result);
          } else {
            reject(error2);
          }
        },
        responseHandler: (response, callback) => {
          const contentLength = safeGetHeader(response, "content-length");
          let position = -1;
          if (contentLength != null) {
            const size = parseInt(contentLength, 10);
            if (size > 0) {
              if (size > 524288e3) {
                callback(new Error("Maximum allowed size is 500 MB"));
                return;
              }
              result = Buffer.alloc(size);
              position = 0;
            }
          }
          response.on("data", (chunk) => {
            if (position !== -1) {
              chunk.copy(result, position);
              position += chunk.length;
            } else if (result == null) {
              result = chunk;
            } else {
              if (result.length > 524288e3) {
                callback(new Error("Maximum allowed size is 500 MB"));
                return;
              }
              result = Buffer.concat([result, chunk]);
            }
          });
          response.on("end", () => {
            if (result != null && position !== -1 && position !== result.length) {
              callback(new Error(`Received data length ${position} is not equal to expected ${result.length}`));
            } else {
              callback(null);
            }
          });
        }
      }, 0);
    });
  }
  doDownload(requestOptions, options, redirectCount) {
    const request = this.createRequest(requestOptions, (response) => {
      if (response.statusCode >= 400) {
        options.callback(new Error(`Cannot download "${requestOptions.protocol || "https:"}//${requestOptions.hostname}${requestOptions.path}", status ${response.statusCode}: ${response.statusMessage}`));
        return;
      }
      response.on("error", options.callback);
      const redirectUrl = safeGetHeader(response, "location");
      if (redirectUrl != null) {
        if (redirectCount < this.maxRedirects) {
          this.doDownload(HttpExecutor.prepareRedirectUrlOptions(redirectUrl, requestOptions), options, redirectCount++);
        } else {
          options.callback(this.createMaxRedirectError());
        }
        return;
      }
      if (options.responseHandler == null) {
        configurePipes(options, response);
      } else {
        options.responseHandler(response, options.callback);
      }
    });
    this.addErrorAndTimeoutHandlers(request, options.callback);
    this.addRedirectHandlers(request, requestOptions, options.callback, redirectCount, (requestOptions2) => {
      this.doDownload(requestOptions2, options, redirectCount++);
    });
    request.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(request, callback) {
    request.on("socket", (socket) => {
      socket.setTimeout(60 * 1e3, () => {
        request.abort();
        callback(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(redirectUrl, options) {
    const newOptions = configureRequestOptionsFromUrl(redirectUrl, __spreadValues({}, options));
    const headers = newOptions.headers;
    if (headers === null || headers === void 0 ? void 0 : headers.authorization) {
      const parsedNewUrl = new url_1$6.URL(redirectUrl);
      if (parsedNewUrl.hostname.endsWith(".amazonaws.com") || parsedNewUrl.searchParams.has("X-Amz-Credential")) {
        delete headers.authorization;
      }
    }
    return newOptions;
  }
  static retryOnServerError(task, maxRetries = 3) {
    for (let attemptNumber = 0; ; attemptNumber++) {
      try {
        return task();
      } catch (e) {
        if (attemptNumber < maxRetries && (e instanceof HttpError && e.isServerError() || e.code === "EPIPE")) {
          continue;
        }
        throw e;
      }
    }
  }
}
httpExecutor.HttpExecutor = HttpExecutor;
function configureRequestOptionsFromUrl(url, options) {
  const result = configureRequestOptions(options);
  configureRequestUrl(new url_1$6.URL(url), result);
  return result;
}
httpExecutor.configureRequestOptionsFromUrl = configureRequestOptionsFromUrl;
function configureRequestUrl(url, options) {
  options.protocol = url.protocol;
  options.hostname = url.hostname;
  if (url.port) {
    options.port = url.port;
  } else if (options.port) {
    delete options.port;
  }
  options.path = url.pathname + url.search;
}
httpExecutor.configureRequestUrl = configureRequestUrl;
class DigestTransform extends stream_1$2.Transform {
  constructor(expected, algorithm = "sha512", encoding = "base64") {
    super();
    this.expected = expected;
    this.algorithm = algorithm;
    this.encoding = encoding;
    this._actual = null;
    this.isValidateOnEnd = true;
    this.digester = crypto_1$3.createHash(algorithm);
  }
  get actual() {
    return this._actual;
  }
  _transform(chunk, encoding, callback) {
    this.digester.update(chunk);
    callback(null, chunk);
  }
  _flush(callback) {
    this._actual = this.digester.digest(this.encoding);
    if (this.isValidateOnEnd) {
      try {
        this.validate();
      } catch (e) {
        callback(e);
        return;
      }
    }
    callback(null);
  }
  validate() {
    if (this._actual == null) {
      throw index_1$2.newError("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    }
    if (this._actual !== this.expected) {
      throw index_1$2.newError(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    }
    return null;
  }
}
httpExecutor.DigestTransform = DigestTransform;
function checkSha2(sha2Header, sha2, callback) {
  if (sha2Header != null && sha2 != null && sha2Header !== sha2) {
    callback(new Error(`checksum mismatch: expected ${sha2} but got ${sha2Header} (X-Checksum-Sha2 header)`));
    return false;
  }
  return true;
}
function safeGetHeader(response, headerKey) {
  const value = response.headers[headerKey];
  if (value == null) {
    return null;
  } else if (Array.isArray(value)) {
    return value.length === 0 ? null : value[value.length - 1];
  } else {
    return value;
  }
}
httpExecutor.safeGetHeader = safeGetHeader;
function configurePipes(options, response) {
  if (!checkSha2(safeGetHeader(response, "X-Checksum-Sha2"), options.options.sha2, options.callback)) {
    return;
  }
  const streams = [];
  if (options.options.onProgress != null) {
    const contentLength = safeGetHeader(response, "content-length");
    if (contentLength != null) {
      streams.push(new ProgressCallbackTransform_1.ProgressCallbackTransform(parseInt(contentLength, 10), options.options.cancellationToken, options.options.onProgress));
    }
  }
  const sha512 = options.options.sha512;
  if (sha512 != null) {
    streams.push(new DigestTransform(sha512, "sha512", sha512.length === 128 && !sha512.includes("+") && !sha512.includes("Z") && !sha512.includes("=") ? "hex" : "base64"));
  } else if (options.options.sha2 != null) {
    streams.push(new DigestTransform(options.options.sha2, "sha256", "hex"));
  }
  const fileOut = fs_1$7.createWriteStream(options.destination);
  streams.push(fileOut);
  let lastStream = response;
  for (const stream of streams) {
    stream.on("error", (error2) => {
      if (!options.options.cancellationToken.cancelled) {
        options.callback(error2);
      }
    });
    lastStream = lastStream.pipe(stream);
  }
  fileOut.on("finish", () => {
    fileOut.close(options.callback);
  });
}
function configureRequestOptions(options, token, method) {
  if (method != null) {
    options.method = method;
  }
  options.headers = __spreadValues({}, options.headers);
  const headers = options.headers;
  if (token != null) {
    headers.authorization = token.startsWith("Basic") || token.startsWith("Bearer") ? token : `token ${token}`;
  }
  if (headers["User-Agent"] == null) {
    headers["User-Agent"] = "electron-builder";
  }
  if (method == null || method === "GET" || headers["Cache-Control"] == null) {
    headers["Cache-Control"] = "no-cache";
  }
  if (options.protocol == null && process.versions.electron != null) {
    options.protocol = "https:";
  }
  return options;
}
httpExecutor.configureRequestOptions = configureRequestOptions;
function safeStringifyJson(data, skippedNames) {
  return JSON.stringify(data, (name, value) => {
    if (name.endsWith("Authorization") || name.endsWith("authorization") || name.endsWith("Password") || name.endsWith("PASSWORD") || name.endsWith("Token") || name.includes("password") || name.includes("token") || skippedNames != null && skippedNames.has(name)) {
      return "<stripped sensitive data>";
    }
    return value;
  }, 2);
}
httpExecutor.safeStringifyJson = safeStringifyJson;
var publishOptions = {};
Object.defineProperty(publishOptions, "__esModule", { value: true });
publishOptions.getS3LikeProviderBaseUrl = publishOptions.githubUrl = void 0;
function githubUrl(options, defaultHost = "github.com") {
  return `${options.protocol || "https"}://${options.host || defaultHost}`;
}
publishOptions.githubUrl = githubUrl;
function getS3LikeProviderBaseUrl(configuration) {
  const provider = configuration.provider;
  if (provider === "s3") {
    return s3Url(configuration);
  }
  if (provider === "spaces") {
    return spacesUrl(configuration);
  }
  throw new Error(`Not supported provider: ${provider}`);
}
publishOptions.getS3LikeProviderBaseUrl = getS3LikeProviderBaseUrl;
function s3Url(options) {
  let url;
  if (options.endpoint != null) {
    url = `${options.endpoint}/${options.bucket}`;
  } else if (options.bucket.includes(".")) {
    if (options.region == null) {
      throw new Error(`Bucket name "${options.bucket}" includes a dot, but S3 region is missing`);
    }
    if (options.region === "us-east-1") {
      url = `https://s3.amazonaws.com/${options.bucket}`;
    } else {
      url = `https://s3-${options.region}.amazonaws.com/${options.bucket}`;
    }
  } else if (options.region === "cn-north-1") {
    url = `https://${options.bucket}.s3.${options.region}.amazonaws.com.cn`;
  } else {
    url = `https://${options.bucket}.s3.amazonaws.com`;
  }
  return appendPath(url, options.path);
}
function appendPath(url, p) {
  if (p != null && p.length > 0) {
    if (!p.startsWith("/")) {
      url += "/";
    }
    url += p;
  }
  return url;
}
function spacesUrl(options) {
  if (options.name == null) {
    throw new Error(`name is missing`);
  }
  if (options.region == null) {
    throw new Error(`region is missing`);
  }
  return appendPath(`https://${options.name}.${options.region}.digitaloceanspaces.com`, options.path);
}
var rfc2253Parser = {};
Object.defineProperty(rfc2253Parser, "__esModule", { value: true });
rfc2253Parser.parseDn = void 0;
function parseDn(seq2) {
  let quoted = false;
  let key = null;
  let token = "";
  let nextNonSpace = 0;
  seq2 = seq2.trim();
  const result = new Map();
  for (let i2 = 0; i2 <= seq2.length; i2++) {
    if (i2 === seq2.length) {
      if (key !== null) {
        result.set(key, token);
      }
      break;
    }
    const ch = seq2[i2];
    if (quoted) {
      if (ch === '"') {
        quoted = false;
        continue;
      }
    } else {
      if (ch === '"') {
        quoted = true;
        continue;
      }
      if (ch === "\\") {
        i2++;
        const ord = parseInt(seq2.slice(i2, i2 + 2), 16);
        if (Number.isNaN(ord)) {
          token += seq2[i2];
        } else {
          i2++;
          token += String.fromCharCode(ord);
        }
        continue;
      }
      if (key === null && ch === "=") {
        key = token;
        token = "";
        continue;
      }
      if (ch === "," || ch === ";" || ch === "+") {
        if (key !== null) {
          result.set(key, token);
        }
        key = null;
        token = "";
        continue;
      }
    }
    if (ch === " " && !quoted) {
      if (token.length === 0) {
        continue;
      }
      if (i2 > nextNonSpace) {
        let j = i2;
        while (seq2[j] === " ") {
          j++;
        }
        nextNonSpace = j;
      }
      if (nextNonSpace >= seq2.length || seq2[nextNonSpace] === "," || seq2[nextNonSpace] === ";" || key === null && seq2[nextNonSpace] === "=" || key !== null && seq2[nextNonSpace] === "+") {
        i2 = nextNonSpace - 1;
        continue;
      }
    }
    token += ch;
  }
  return result;
}
rfc2253Parser.parseDn = parseDn;
var uuid = {};
Object.defineProperty(uuid, "__esModule", { value: true });
uuid.nil = uuid.UUID = void 0;
const crypto_1$2 = require$$0__default$4["default"];
const index_1$1 = out;
const invalidName = "options.name must be either a string or a Buffer";
const randomHost = crypto_1$2.randomBytes(16);
randomHost[0] = randomHost[0] | 1;
const hex2byte = {};
const byte2hex = [];
for (let i2 = 0; i2 < 256; i2++) {
  const hex = (i2 + 256).toString(16).substr(1);
  hex2byte[hex] = i2;
  byte2hex[i2] = hex;
}
class UUID {
  constructor(uuid2) {
    this.ascii = null;
    this.binary = null;
    const check = UUID.check(uuid2);
    if (!check) {
      throw new Error("not a UUID");
    }
    this.version = check.version;
    if (check.format === "ascii") {
      this.ascii = uuid2;
    } else {
      this.binary = uuid2;
    }
  }
  static v5(name, namespace) {
    return uuidNamed(name, "sha1", 80, namespace);
  }
  toString() {
    if (this.ascii == null) {
      this.ascii = stringify(this.binary);
    }
    return this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(uuid2, offset = 0) {
    if (typeof uuid2 === "string") {
      uuid2 = uuid2.toLowerCase();
      if (!/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(uuid2)) {
        return false;
      }
      if (uuid2 === "00000000-0000-0000-0000-000000000000") {
        return { version: void 0, variant: "nil", format: "ascii" };
      }
      return {
        version: (hex2byte[uuid2[14] + uuid2[15]] & 240) >> 4,
        variant: getVariant((hex2byte[uuid2[19] + uuid2[20]] & 224) >> 5),
        format: "ascii"
      };
    }
    if (Buffer.isBuffer(uuid2)) {
      if (uuid2.length < offset + 16) {
        return false;
      }
      let i2 = 0;
      for (; i2 < 16; i2++) {
        if (uuid2[offset + i2] !== 0) {
          break;
        }
      }
      if (i2 === 16) {
        return { version: void 0, variant: "nil", format: "binary" };
      }
      return {
        version: (uuid2[offset + 6] & 240) >> 4,
        variant: getVariant((uuid2[offset + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw index_1$1.newError("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  static parse(input) {
    const buffer = Buffer.allocUnsafe(16);
    let j = 0;
    for (let i2 = 0; i2 < 16; i2++) {
      buffer[i2] = hex2byte[input[j++] + input[j++]];
      if (i2 === 3 || i2 === 5 || i2 === 7 || i2 === 9) {
        j += 1;
      }
    }
    return buffer;
  }
}
uuid.UUID = UUID;
UUID.OID = UUID.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function getVariant(bits) {
  switch (bits) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var UuidEncoding;
(function(UuidEncoding2) {
  UuidEncoding2[UuidEncoding2["ASCII"] = 0] = "ASCII";
  UuidEncoding2[UuidEncoding2["BINARY"] = 1] = "BINARY";
  UuidEncoding2[UuidEncoding2["OBJECT"] = 2] = "OBJECT";
})(UuidEncoding || (UuidEncoding = {}));
function uuidNamed(name, hashMethod, version, namespace, encoding = UuidEncoding.ASCII) {
  const hash = crypto_1$2.createHash(hashMethod);
  const nameIsNotAString = typeof name !== "string";
  if (nameIsNotAString && !Buffer.isBuffer(name)) {
    throw index_1$1.newError(invalidName, "ERR_INVALID_UUID_NAME");
  }
  hash.update(namespace);
  hash.update(name);
  const buffer = hash.digest();
  let result;
  switch (encoding) {
    case UuidEncoding.BINARY:
      buffer[6] = buffer[6] & 15 | version;
      buffer[8] = buffer[8] & 63 | 128;
      result = buffer;
      break;
    case UuidEncoding.OBJECT:
      buffer[6] = buffer[6] & 15 | version;
      buffer[8] = buffer[8] & 63 | 128;
      result = new UUID(buffer);
      break;
    default:
      result = byte2hex[buffer[0]] + byte2hex[buffer[1]] + byte2hex[buffer[2]] + byte2hex[buffer[3]] + "-" + byte2hex[buffer[4]] + byte2hex[buffer[5]] + "-" + byte2hex[buffer[6] & 15 | version] + byte2hex[buffer[7]] + "-" + byte2hex[buffer[8] & 63 | 128] + byte2hex[buffer[9]] + "-" + byte2hex[buffer[10]] + byte2hex[buffer[11]] + byte2hex[buffer[12]] + byte2hex[buffer[13]] + byte2hex[buffer[14]] + byte2hex[buffer[15]];
      break;
  }
  return result;
}
function stringify(buffer) {
  return byte2hex[buffer[0]] + byte2hex[buffer[1]] + byte2hex[buffer[2]] + byte2hex[buffer[3]] + "-" + byte2hex[buffer[4]] + byte2hex[buffer[5]] + "-" + byte2hex[buffer[6]] + byte2hex[buffer[7]] + "-" + byte2hex[buffer[8]] + byte2hex[buffer[9]] + "-" + byte2hex[buffer[10]] + byte2hex[buffer[11]] + byte2hex[buffer[12]] + byte2hex[buffer[13]] + byte2hex[buffer[14]] + byte2hex[buffer[15]];
}
uuid.nil = new UUID("00000000-0000-0000-0000-000000000000");
var xml = {};
var sax$1 = {};
(function(exports) {
  (function(sax2) {
    sax2.parser = function(strict, opt) {
      return new SAXParser(strict, opt);
    };
    sax2.SAXParser = SAXParser;
    sax2.SAXStream = SAXStream;
    sax2.createStream = createStream;
    sax2.MAX_BUFFER_LENGTH = 64 * 1024;
    var buffers = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    sax2.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function SAXParser(strict, opt) {
      if (!(this instanceof SAXParser)) {
        return new SAXParser(strict, opt);
      }
      var parser = this;
      clearBuffers(parser);
      parser.q = parser.c = "";
      parser.bufferCheckPosition = sax2.MAX_BUFFER_LENGTH;
      parser.opt = opt || {};
      parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags;
      parser.looseCase = parser.opt.lowercase ? "toLowerCase" : "toUpperCase";
      parser.tags = [];
      parser.closed = parser.closedRoot = parser.sawRoot = false;
      parser.tag = parser.error = null;
      parser.strict = !!strict;
      parser.noscript = !!(strict || parser.opt.noscript);
      parser.state = S.BEGIN;
      parser.strictEntities = parser.opt.strictEntities;
      parser.ENTITIES = parser.strictEntities ? Object.create(sax2.XML_ENTITIES) : Object.create(sax2.ENTITIES);
      parser.attribList = [];
      if (parser.opt.xmlns) {
        parser.ns = Object.create(rootNS);
      }
      parser.trackPosition = parser.opt.position !== false;
      if (parser.trackPosition) {
        parser.position = parser.line = parser.column = 0;
      }
      emit(parser, "onready");
    }
    if (!Object.create) {
      Object.create = function(o) {
        function F() {
        }
        F.prototype = o;
        var newf = new F();
        return newf;
      };
    }
    if (!Object.keys) {
      Object.keys = function(o) {
        var a = [];
        for (var i2 in o)
          if (o.hasOwnProperty(i2))
            a.push(i2);
        return a;
      };
    }
    function checkBufferLength(parser) {
      var maxAllowed = Math.max(sax2.MAX_BUFFER_LENGTH, 10);
      var maxActual = 0;
      for (var i2 = 0, l = buffers.length; i2 < l; i2++) {
        var len = parser[buffers[i2]].length;
        if (len > maxAllowed) {
          switch (buffers[i2]) {
            case "textNode":
              closeText(parser);
              break;
            case "cdata":
              emitNode(parser, "oncdata", parser.cdata);
              parser.cdata = "";
              break;
            case "script":
              emitNode(parser, "onscript", parser.script);
              parser.script = "";
              break;
            default:
              error2(parser, "Max buffer length exceeded: " + buffers[i2]);
          }
        }
        maxActual = Math.max(maxActual, len);
      }
      var m2 = sax2.MAX_BUFFER_LENGTH - maxActual;
      parser.bufferCheckPosition = m2 + parser.position;
    }
    function clearBuffers(parser) {
      for (var i2 = 0, l = buffers.length; i2 < l; i2++) {
        parser[buffers[i2]] = "";
      }
    }
    function flushBuffers(parser) {
      closeText(parser);
      if (parser.cdata !== "") {
        emitNode(parser, "oncdata", parser.cdata);
        parser.cdata = "";
      }
      if (parser.script !== "") {
        emitNode(parser, "onscript", parser.script);
        parser.script = "";
      }
    }
    SAXParser.prototype = {
      end: function() {
        end(this);
      },
      write,
      resume: function() {
        this.error = null;
        return this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        flushBuffers(this);
      }
    };
    var Stream2;
    try {
      Stream2 = require$$0__default$1["default"].Stream;
    } catch (ex) {
      Stream2 = function() {
      };
    }
    var streamWraps = sax2.EVENTS.filter(function(ev) {
      return ev !== "error" && ev !== "end";
    });
    function createStream(strict, opt) {
      return new SAXStream(strict, opt);
    }
    function SAXStream(strict, opt) {
      if (!(this instanceof SAXStream)) {
        return new SAXStream(strict, opt);
      }
      Stream2.apply(this);
      this._parser = new SAXParser(strict, opt);
      this.writable = true;
      this.readable = true;
      var me = this;
      this._parser.onend = function() {
        me.emit("end");
      };
      this._parser.onerror = function(er) {
        me.emit("error", er);
        me._parser.error = null;
      };
      this._decoder = null;
      streamWraps.forEach(function(ev) {
        Object.defineProperty(me, "on" + ev, {
          get: function() {
            return me._parser["on" + ev];
          },
          set: function(h2) {
            if (!h2) {
              me.removeAllListeners(ev);
              me._parser["on" + ev] = h2;
              return h2;
            }
            me.on(ev, h2);
          },
          enumerable: true,
          configurable: false
        });
      });
    }
    SAXStream.prototype = Object.create(Stream2.prototype, {
      constructor: {
        value: SAXStream
      }
    });
    SAXStream.prototype.write = function(data) {
      if (typeof Buffer === "function" && typeof Buffer.isBuffer === "function" && Buffer.isBuffer(data)) {
        if (!this._decoder) {
          var SD = require$$1__default$2["default"].StringDecoder;
          this._decoder = new SD("utf8");
        }
        data = this._decoder.write(data);
      }
      this._parser.write(data.toString());
      this.emit("data", data);
      return true;
    };
    SAXStream.prototype.end = function(chunk) {
      if (chunk && chunk.length) {
        this.write(chunk);
      }
      this._parser.end();
      return true;
    };
    SAXStream.prototype.on = function(ev, handler) {
      var me = this;
      if (!me._parser["on" + ev] && streamWraps.indexOf(ev) !== -1) {
        me._parser["on" + ev] = function() {
          var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          args.splice(0, 0, ev);
          me.emit.apply(me, args);
        };
      }
      return Stream2.prototype.on.call(me, ev, handler);
    };
    var CDATA = "[CDATA[";
    var DOCTYPE = "DOCTYPE";
    var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
    var XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
    var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE };
    var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
    var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
    var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function isWhitespace2(c) {
      return c === " " || c === "\n" || c === "\r" || c === "	";
    }
    function isQuote(c) {
      return c === '"' || c === "'";
    }
    function isAttribEnd(c) {
      return c === ">" || isWhitespace2(c);
    }
    function isMatch(regex, c) {
      return regex.test(c);
    }
    function notMatch(regex, c) {
      return !isMatch(regex, c);
    }
    var S = 0;
    sax2.STATE = {
      BEGIN: S++,
      BEGIN_WHITESPACE: S++,
      TEXT: S++,
      TEXT_ENTITY: S++,
      OPEN_WAKA: S++,
      SGML_DECL: S++,
      SGML_DECL_QUOTED: S++,
      DOCTYPE: S++,
      DOCTYPE_QUOTED: S++,
      DOCTYPE_DTD: S++,
      DOCTYPE_DTD_QUOTED: S++,
      COMMENT_STARTING: S++,
      COMMENT: S++,
      COMMENT_ENDING: S++,
      COMMENT_ENDED: S++,
      CDATA: S++,
      CDATA_ENDING: S++,
      CDATA_ENDING_2: S++,
      PROC_INST: S++,
      PROC_INST_BODY: S++,
      PROC_INST_ENDING: S++,
      OPEN_TAG: S++,
      OPEN_TAG_SLASH: S++,
      ATTRIB: S++,
      ATTRIB_NAME: S++,
      ATTRIB_NAME_SAW_WHITE: S++,
      ATTRIB_VALUE: S++,
      ATTRIB_VALUE_QUOTED: S++,
      ATTRIB_VALUE_CLOSED: S++,
      ATTRIB_VALUE_UNQUOTED: S++,
      ATTRIB_VALUE_ENTITY_Q: S++,
      ATTRIB_VALUE_ENTITY_U: S++,
      CLOSE_TAG: S++,
      CLOSE_TAG_SAW_WHITE: S++,
      SCRIPT: S++,
      SCRIPT_ENDING: S++
    };
    sax2.XML_ENTITIES = {
      "amp": "&",
      "gt": ">",
      "lt": "<",
      "quot": '"',
      "apos": "'"
    };
    sax2.ENTITIES = {
      "amp": "&",
      "gt": ">",
      "lt": "<",
      "quot": '"',
      "apos": "'",
      "AElig": 198,
      "Aacute": 193,
      "Acirc": 194,
      "Agrave": 192,
      "Aring": 197,
      "Atilde": 195,
      "Auml": 196,
      "Ccedil": 199,
      "ETH": 208,
      "Eacute": 201,
      "Ecirc": 202,
      "Egrave": 200,
      "Euml": 203,
      "Iacute": 205,
      "Icirc": 206,
      "Igrave": 204,
      "Iuml": 207,
      "Ntilde": 209,
      "Oacute": 211,
      "Ocirc": 212,
      "Ograve": 210,
      "Oslash": 216,
      "Otilde": 213,
      "Ouml": 214,
      "THORN": 222,
      "Uacute": 218,
      "Ucirc": 219,
      "Ugrave": 217,
      "Uuml": 220,
      "Yacute": 221,
      "aacute": 225,
      "acirc": 226,
      "aelig": 230,
      "agrave": 224,
      "aring": 229,
      "atilde": 227,
      "auml": 228,
      "ccedil": 231,
      "eacute": 233,
      "ecirc": 234,
      "egrave": 232,
      "eth": 240,
      "euml": 235,
      "iacute": 237,
      "icirc": 238,
      "igrave": 236,
      "iuml": 239,
      "ntilde": 241,
      "oacute": 243,
      "ocirc": 244,
      "ograve": 242,
      "oslash": 248,
      "otilde": 245,
      "ouml": 246,
      "szlig": 223,
      "thorn": 254,
      "uacute": 250,
      "ucirc": 251,
      "ugrave": 249,
      "uuml": 252,
      "yacute": 253,
      "yuml": 255,
      "copy": 169,
      "reg": 174,
      "nbsp": 160,
      "iexcl": 161,
      "cent": 162,
      "pound": 163,
      "curren": 164,
      "yen": 165,
      "brvbar": 166,
      "sect": 167,
      "uml": 168,
      "ordf": 170,
      "laquo": 171,
      "not": 172,
      "shy": 173,
      "macr": 175,
      "deg": 176,
      "plusmn": 177,
      "sup1": 185,
      "sup2": 178,
      "sup3": 179,
      "acute": 180,
      "micro": 181,
      "para": 182,
      "middot": 183,
      "cedil": 184,
      "ordm": 186,
      "raquo": 187,
      "frac14": 188,
      "frac12": 189,
      "frac34": 190,
      "iquest": 191,
      "times": 215,
      "divide": 247,
      "OElig": 338,
      "oelig": 339,
      "Scaron": 352,
      "scaron": 353,
      "Yuml": 376,
      "fnof": 402,
      "circ": 710,
      "tilde": 732,
      "Alpha": 913,
      "Beta": 914,
      "Gamma": 915,
      "Delta": 916,
      "Epsilon": 917,
      "Zeta": 918,
      "Eta": 919,
      "Theta": 920,
      "Iota": 921,
      "Kappa": 922,
      "Lambda": 923,
      "Mu": 924,
      "Nu": 925,
      "Xi": 926,
      "Omicron": 927,
      "Pi": 928,
      "Rho": 929,
      "Sigma": 931,
      "Tau": 932,
      "Upsilon": 933,
      "Phi": 934,
      "Chi": 935,
      "Psi": 936,
      "Omega": 937,
      "alpha": 945,
      "beta": 946,
      "gamma": 947,
      "delta": 948,
      "epsilon": 949,
      "zeta": 950,
      "eta": 951,
      "theta": 952,
      "iota": 953,
      "kappa": 954,
      "lambda": 955,
      "mu": 956,
      "nu": 957,
      "xi": 958,
      "omicron": 959,
      "pi": 960,
      "rho": 961,
      "sigmaf": 962,
      "sigma": 963,
      "tau": 964,
      "upsilon": 965,
      "phi": 966,
      "chi": 967,
      "psi": 968,
      "omega": 969,
      "thetasym": 977,
      "upsih": 978,
      "piv": 982,
      "ensp": 8194,
      "emsp": 8195,
      "thinsp": 8201,
      "zwnj": 8204,
      "zwj": 8205,
      "lrm": 8206,
      "rlm": 8207,
      "ndash": 8211,
      "mdash": 8212,
      "lsquo": 8216,
      "rsquo": 8217,
      "sbquo": 8218,
      "ldquo": 8220,
      "rdquo": 8221,
      "bdquo": 8222,
      "dagger": 8224,
      "Dagger": 8225,
      "bull": 8226,
      "hellip": 8230,
      "permil": 8240,
      "prime": 8242,
      "Prime": 8243,
      "lsaquo": 8249,
      "rsaquo": 8250,
      "oline": 8254,
      "frasl": 8260,
      "euro": 8364,
      "image": 8465,
      "weierp": 8472,
      "real": 8476,
      "trade": 8482,
      "alefsym": 8501,
      "larr": 8592,
      "uarr": 8593,
      "rarr": 8594,
      "darr": 8595,
      "harr": 8596,
      "crarr": 8629,
      "lArr": 8656,
      "uArr": 8657,
      "rArr": 8658,
      "dArr": 8659,
      "hArr": 8660,
      "forall": 8704,
      "part": 8706,
      "exist": 8707,
      "empty": 8709,
      "nabla": 8711,
      "isin": 8712,
      "notin": 8713,
      "ni": 8715,
      "prod": 8719,
      "sum": 8721,
      "minus": 8722,
      "lowast": 8727,
      "radic": 8730,
      "prop": 8733,
      "infin": 8734,
      "ang": 8736,
      "and": 8743,
      "or": 8744,
      "cap": 8745,
      "cup": 8746,
      "int": 8747,
      "there4": 8756,
      "sim": 8764,
      "cong": 8773,
      "asymp": 8776,
      "ne": 8800,
      "equiv": 8801,
      "le": 8804,
      "ge": 8805,
      "sub": 8834,
      "sup": 8835,
      "nsub": 8836,
      "sube": 8838,
      "supe": 8839,
      "oplus": 8853,
      "otimes": 8855,
      "perp": 8869,
      "sdot": 8901,
      "lceil": 8968,
      "rceil": 8969,
      "lfloor": 8970,
      "rfloor": 8971,
      "lang": 9001,
      "rang": 9002,
      "loz": 9674,
      "spades": 9824,
      "clubs": 9827,
      "hearts": 9829,
      "diams": 9830
    };
    Object.keys(sax2.ENTITIES).forEach(function(key) {
      var e = sax2.ENTITIES[key];
      var s3 = typeof e === "number" ? String.fromCharCode(e) : e;
      sax2.ENTITIES[key] = s3;
    });
    for (var s2 in sax2.STATE) {
      sax2.STATE[sax2.STATE[s2]] = s2;
    }
    S = sax2.STATE;
    function emit(parser, event, data) {
      parser[event] && parser[event](data);
    }
    function emitNode(parser, nodeType, data) {
      if (parser.textNode)
        closeText(parser);
      emit(parser, nodeType, data);
    }
    function closeText(parser) {
      parser.textNode = textopts(parser.opt, parser.textNode);
      if (parser.textNode)
        emit(parser, "ontext", parser.textNode);
      parser.textNode = "";
    }
    function textopts(opt, text) {
      if (opt.trim)
        text = text.trim();
      if (opt.normalize)
        text = text.replace(/\s+/g, " ");
      return text;
    }
    function error2(parser, er) {
      closeText(parser);
      if (parser.trackPosition) {
        er += "\nLine: " + parser.line + "\nColumn: " + parser.column + "\nChar: " + parser.c;
      }
      er = new Error(er);
      parser.error = er;
      emit(parser, "onerror", er);
      return parser;
    }
    function end(parser) {
      if (parser.sawRoot && !parser.closedRoot)
        strictFail(parser, "Unclosed root tag");
      if (parser.state !== S.BEGIN && parser.state !== S.BEGIN_WHITESPACE && parser.state !== S.TEXT) {
        error2(parser, "Unexpected end");
      }
      closeText(parser);
      parser.c = "";
      parser.closed = true;
      emit(parser, "onend");
      SAXParser.call(parser, parser.strict, parser.opt);
      return parser;
    }
    function strictFail(parser, message) {
      if (typeof parser !== "object" || !(parser instanceof SAXParser)) {
        throw new Error("bad call to strictFail");
      }
      if (parser.strict) {
        error2(parser, message);
      }
    }
    function newTag(parser) {
      if (!parser.strict)
        parser.tagName = parser.tagName[parser.looseCase]();
      var parent = parser.tags[parser.tags.length - 1] || parser;
      var tag = parser.tag = { name: parser.tagName, attributes: {} };
      if (parser.opt.xmlns) {
        tag.ns = parent.ns;
      }
      parser.attribList.length = 0;
      emitNode(parser, "onopentagstart", tag);
    }
    function qname(name, attribute) {
      var i2 = name.indexOf(":");
      var qualName = i2 < 0 ? ["", name] : name.split(":");
      var prefix = qualName[0];
      var local = qualName[1];
      if (attribute && name === "xmlns") {
        prefix = "xmlns";
        local = "";
      }
      return { prefix, local };
    }
    function attrib(parser) {
      if (!parser.strict) {
        parser.attribName = parser.attribName[parser.looseCase]();
      }
      if (parser.attribList.indexOf(parser.attribName) !== -1 || parser.tag.attributes.hasOwnProperty(parser.attribName)) {
        parser.attribName = parser.attribValue = "";
        return;
      }
      if (parser.opt.xmlns) {
        var qn = qname(parser.attribName, true);
        var prefix = qn.prefix;
        var local = qn.local;
        if (prefix === "xmlns") {
          if (local === "xml" && parser.attribValue !== XML_NAMESPACE) {
            strictFail(parser, "xml: prefix must be bound to " + XML_NAMESPACE + "\nActual: " + parser.attribValue);
          } else if (local === "xmlns" && parser.attribValue !== XMLNS_NAMESPACE) {
            strictFail(parser, "xmlns: prefix must be bound to " + XMLNS_NAMESPACE + "\nActual: " + parser.attribValue);
          } else {
            var tag = parser.tag;
            var parent = parser.tags[parser.tags.length - 1] || parser;
            if (tag.ns === parent.ns) {
              tag.ns = Object.create(parent.ns);
            }
            tag.ns[local] = parser.attribValue;
          }
        }
        parser.attribList.push([parser.attribName, parser.attribValue]);
      } else {
        parser.tag.attributes[parser.attribName] = parser.attribValue;
        emitNode(parser, "onattribute", {
          name: parser.attribName,
          value: parser.attribValue
        });
      }
      parser.attribName = parser.attribValue = "";
    }
    function openTag(parser, selfClosing) {
      if (parser.opt.xmlns) {
        var tag = parser.tag;
        var qn = qname(parser.tagName);
        tag.prefix = qn.prefix;
        tag.local = qn.local;
        tag.uri = tag.ns[qn.prefix] || "";
        if (tag.prefix && !tag.uri) {
          strictFail(parser, "Unbound namespace prefix: " + JSON.stringify(parser.tagName));
          tag.uri = qn.prefix;
        }
        var parent = parser.tags[parser.tags.length - 1] || parser;
        if (tag.ns && parent.ns !== tag.ns) {
          Object.keys(tag.ns).forEach(function(p) {
            emitNode(parser, "onopennamespace", {
              prefix: p,
              uri: tag.ns[p]
            });
          });
        }
        for (var i2 = 0, l = parser.attribList.length; i2 < l; i2++) {
          var nv = parser.attribList[i2];
          var name = nv[0];
          var value = nv[1];
          var qualName = qname(name, true);
          var prefix = qualName.prefix;
          var local = qualName.local;
          var uri = prefix === "" ? "" : tag.ns[prefix] || "";
          var a = {
            name,
            value,
            prefix,
            local,
            uri
          };
          if (prefix && prefix !== "xmlns" && !uri) {
            strictFail(parser, "Unbound namespace prefix: " + JSON.stringify(prefix));
            a.uri = prefix;
          }
          parser.tag.attributes[name] = a;
          emitNode(parser, "onattribute", a);
        }
        parser.attribList.length = 0;
      }
      parser.tag.isSelfClosing = !!selfClosing;
      parser.sawRoot = true;
      parser.tags.push(parser.tag);
      emitNode(parser, "onopentag", parser.tag);
      if (!selfClosing) {
        if (!parser.noscript && parser.tagName.toLowerCase() === "script") {
          parser.state = S.SCRIPT;
        } else {
          parser.state = S.TEXT;
        }
        parser.tag = null;
        parser.tagName = "";
      }
      parser.attribName = parser.attribValue = "";
      parser.attribList.length = 0;
    }
    function closeTag(parser) {
      if (!parser.tagName) {
        strictFail(parser, "Weird empty close tag.");
        parser.textNode += "</>";
        parser.state = S.TEXT;
        return;
      }
      if (parser.script) {
        if (parser.tagName !== "script") {
          parser.script += "</" + parser.tagName + ">";
          parser.tagName = "";
          parser.state = S.SCRIPT;
          return;
        }
        emitNode(parser, "onscript", parser.script);
        parser.script = "";
      }
      var t2 = parser.tags.length;
      var tagName = parser.tagName;
      if (!parser.strict) {
        tagName = tagName[parser.looseCase]();
      }
      var closeTo = tagName;
      while (t2--) {
        var close = parser.tags[t2];
        if (close.name !== closeTo) {
          strictFail(parser, "Unexpected close tag");
        } else {
          break;
        }
      }
      if (t2 < 0) {
        strictFail(parser, "Unmatched closing tag: " + parser.tagName);
        parser.textNode += "</" + parser.tagName + ">";
        parser.state = S.TEXT;
        return;
      }
      parser.tagName = tagName;
      var s3 = parser.tags.length;
      while (s3-- > t2) {
        var tag = parser.tag = parser.tags.pop();
        parser.tagName = parser.tag.name;
        emitNode(parser, "onclosetag", parser.tagName);
        var x = {};
        for (var i2 in tag.ns) {
          x[i2] = tag.ns[i2];
        }
        var parent = parser.tags[parser.tags.length - 1] || parser;
        if (parser.opt.xmlns && tag.ns !== parent.ns) {
          Object.keys(tag.ns).forEach(function(p) {
            var n = tag.ns[p];
            emitNode(parser, "onclosenamespace", { prefix: p, uri: n });
          });
        }
      }
      if (t2 === 0)
        parser.closedRoot = true;
      parser.tagName = parser.attribValue = parser.attribName = "";
      parser.attribList.length = 0;
      parser.state = S.TEXT;
    }
    function parseEntity(parser) {
      var entity = parser.entity;
      var entityLC = entity.toLowerCase();
      var num;
      var numStr = "";
      if (parser.ENTITIES[entity]) {
        return parser.ENTITIES[entity];
      }
      if (parser.ENTITIES[entityLC]) {
        return parser.ENTITIES[entityLC];
      }
      entity = entityLC;
      if (entity.charAt(0) === "#") {
        if (entity.charAt(1) === "x") {
          entity = entity.slice(2);
          num = parseInt(entity, 16);
          numStr = num.toString(16);
        } else {
          entity = entity.slice(1);
          num = parseInt(entity, 10);
          numStr = num.toString(10);
        }
      }
      entity = entity.replace(/^0+/, "");
      if (isNaN(num) || numStr.toLowerCase() !== entity) {
        strictFail(parser, "Invalid character entity");
        return "&" + parser.entity + ";";
      }
      return String.fromCodePoint(num);
    }
    function beginWhiteSpace(parser, c) {
      if (c === "<") {
        parser.state = S.OPEN_WAKA;
        parser.startTagPosition = parser.position;
      } else if (!isWhitespace2(c)) {
        strictFail(parser, "Non-whitespace before first tag.");
        parser.textNode = c;
        parser.state = S.TEXT;
      }
    }
    function charAt(chunk, i2) {
      var result = "";
      if (i2 < chunk.length) {
        result = chunk.charAt(i2);
      }
      return result;
    }
    function write(chunk) {
      var parser = this;
      if (this.error) {
        throw this.error;
      }
      if (parser.closed) {
        return error2(parser, "Cannot write after close. Assign an onready handler.");
      }
      if (chunk === null) {
        return end(parser);
      }
      if (typeof chunk === "object") {
        chunk = chunk.toString();
      }
      var i2 = 0;
      var c = "";
      while (true) {
        c = charAt(chunk, i2++);
        parser.c = c;
        if (!c) {
          break;
        }
        if (parser.trackPosition) {
          parser.position++;
          if (c === "\n") {
            parser.line++;
            parser.column = 0;
          } else {
            parser.column++;
          }
        }
        switch (parser.state) {
          case S.BEGIN:
            parser.state = S.BEGIN_WHITESPACE;
            if (c === "\uFEFF") {
              continue;
            }
            beginWhiteSpace(parser, c);
            continue;
          case S.BEGIN_WHITESPACE:
            beginWhiteSpace(parser, c);
            continue;
          case S.TEXT:
            if (parser.sawRoot && !parser.closedRoot) {
              var starti = i2 - 1;
              while (c && c !== "<" && c !== "&") {
                c = charAt(chunk, i2++);
                if (c && parser.trackPosition) {
                  parser.position++;
                  if (c === "\n") {
                    parser.line++;
                    parser.column = 0;
                  } else {
                    parser.column++;
                  }
                }
              }
              parser.textNode += chunk.substring(starti, i2 - 1);
            }
            if (c === "<" && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
              parser.state = S.OPEN_WAKA;
              parser.startTagPosition = parser.position;
            } else {
              if (!isWhitespace2(c) && (!parser.sawRoot || parser.closedRoot)) {
                strictFail(parser, "Text data outside of root node.");
              }
              if (c === "&") {
                parser.state = S.TEXT_ENTITY;
              } else {
                parser.textNode += c;
              }
            }
            continue;
          case S.SCRIPT:
            if (c === "<") {
              parser.state = S.SCRIPT_ENDING;
            } else {
              parser.script += c;
            }
            continue;
          case S.SCRIPT_ENDING:
            if (c === "/") {
              parser.state = S.CLOSE_TAG;
            } else {
              parser.script += "<" + c;
              parser.state = S.SCRIPT;
            }
            continue;
          case S.OPEN_WAKA:
            if (c === "!") {
              parser.state = S.SGML_DECL;
              parser.sgmlDecl = "";
            } else if (isWhitespace2(c))
              ;
            else if (isMatch(nameStart, c)) {
              parser.state = S.OPEN_TAG;
              parser.tagName = c;
            } else if (c === "/") {
              parser.state = S.CLOSE_TAG;
              parser.tagName = "";
            } else if (c === "?") {
              parser.state = S.PROC_INST;
              parser.procInstName = parser.procInstBody = "";
            } else {
              strictFail(parser, "Unencoded <");
              if (parser.startTagPosition + 1 < parser.position) {
                var pad = parser.position - parser.startTagPosition;
                c = new Array(pad).join(" ") + c;
              }
              parser.textNode += "<" + c;
              parser.state = S.TEXT;
            }
            continue;
          case S.SGML_DECL:
            if ((parser.sgmlDecl + c).toUpperCase() === CDATA) {
              emitNode(parser, "onopencdata");
              parser.state = S.CDATA;
              parser.sgmlDecl = "";
              parser.cdata = "";
            } else if (parser.sgmlDecl + c === "--") {
              parser.state = S.COMMENT;
              parser.comment = "";
              parser.sgmlDecl = "";
            } else if ((parser.sgmlDecl + c).toUpperCase() === DOCTYPE) {
              parser.state = S.DOCTYPE;
              if (parser.doctype || parser.sawRoot) {
                strictFail(parser, "Inappropriately located doctype declaration");
              }
              parser.doctype = "";
              parser.sgmlDecl = "";
            } else if (c === ">") {
              emitNode(parser, "onsgmldeclaration", parser.sgmlDecl);
              parser.sgmlDecl = "";
              parser.state = S.TEXT;
            } else if (isQuote(c)) {
              parser.state = S.SGML_DECL_QUOTED;
              parser.sgmlDecl += c;
            } else {
              parser.sgmlDecl += c;
            }
            continue;
          case S.SGML_DECL_QUOTED:
            if (c === parser.q) {
              parser.state = S.SGML_DECL;
              parser.q = "";
            }
            parser.sgmlDecl += c;
            continue;
          case S.DOCTYPE:
            if (c === ">") {
              parser.state = S.TEXT;
              emitNode(parser, "ondoctype", parser.doctype);
              parser.doctype = true;
            } else {
              parser.doctype += c;
              if (c === "[") {
                parser.state = S.DOCTYPE_DTD;
              } else if (isQuote(c)) {
                parser.state = S.DOCTYPE_QUOTED;
                parser.q = c;
              }
            }
            continue;
          case S.DOCTYPE_QUOTED:
            parser.doctype += c;
            if (c === parser.q) {
              parser.q = "";
              parser.state = S.DOCTYPE;
            }
            continue;
          case S.DOCTYPE_DTD:
            parser.doctype += c;
            if (c === "]") {
              parser.state = S.DOCTYPE;
            } else if (isQuote(c)) {
              parser.state = S.DOCTYPE_DTD_QUOTED;
              parser.q = c;
            }
            continue;
          case S.DOCTYPE_DTD_QUOTED:
            parser.doctype += c;
            if (c === parser.q) {
              parser.state = S.DOCTYPE_DTD;
              parser.q = "";
            }
            continue;
          case S.COMMENT:
            if (c === "-") {
              parser.state = S.COMMENT_ENDING;
            } else {
              parser.comment += c;
            }
            continue;
          case S.COMMENT_ENDING:
            if (c === "-") {
              parser.state = S.COMMENT_ENDED;
              parser.comment = textopts(parser.opt, parser.comment);
              if (parser.comment) {
                emitNode(parser, "oncomment", parser.comment);
              }
              parser.comment = "";
            } else {
              parser.comment += "-" + c;
              parser.state = S.COMMENT;
            }
            continue;
          case S.COMMENT_ENDED:
            if (c !== ">") {
              strictFail(parser, "Malformed comment");
              parser.comment += "--" + c;
              parser.state = S.COMMENT;
            } else {
              parser.state = S.TEXT;
            }
            continue;
          case S.CDATA:
            if (c === "]") {
              parser.state = S.CDATA_ENDING;
            } else {
              parser.cdata += c;
            }
            continue;
          case S.CDATA_ENDING:
            if (c === "]") {
              parser.state = S.CDATA_ENDING_2;
            } else {
              parser.cdata += "]" + c;
              parser.state = S.CDATA;
            }
            continue;
          case S.CDATA_ENDING_2:
            if (c === ">") {
              if (parser.cdata) {
                emitNode(parser, "oncdata", parser.cdata);
              }
              emitNode(parser, "onclosecdata");
              parser.cdata = "";
              parser.state = S.TEXT;
            } else if (c === "]") {
              parser.cdata += "]";
            } else {
              parser.cdata += "]]" + c;
              parser.state = S.CDATA;
            }
            continue;
          case S.PROC_INST:
            if (c === "?") {
              parser.state = S.PROC_INST_ENDING;
            } else if (isWhitespace2(c)) {
              parser.state = S.PROC_INST_BODY;
            } else {
              parser.procInstName += c;
            }
            continue;
          case S.PROC_INST_BODY:
            if (!parser.procInstBody && isWhitespace2(c)) {
              continue;
            } else if (c === "?") {
              parser.state = S.PROC_INST_ENDING;
            } else {
              parser.procInstBody += c;
            }
            continue;
          case S.PROC_INST_ENDING:
            if (c === ">") {
              emitNode(parser, "onprocessinginstruction", {
                name: parser.procInstName,
                body: parser.procInstBody
              });
              parser.procInstName = parser.procInstBody = "";
              parser.state = S.TEXT;
            } else {
              parser.procInstBody += "?" + c;
              parser.state = S.PROC_INST_BODY;
            }
            continue;
          case S.OPEN_TAG:
            if (isMatch(nameBody, c)) {
              parser.tagName += c;
            } else {
              newTag(parser);
              if (c === ">") {
                openTag(parser);
              } else if (c === "/") {
                parser.state = S.OPEN_TAG_SLASH;
              } else {
                if (!isWhitespace2(c)) {
                  strictFail(parser, "Invalid character in tag name");
                }
                parser.state = S.ATTRIB;
              }
            }
            continue;
          case S.OPEN_TAG_SLASH:
            if (c === ">") {
              openTag(parser, true);
              closeTag(parser);
            } else {
              strictFail(parser, "Forward-slash in opening tag not followed by >");
              parser.state = S.ATTRIB;
            }
            continue;
          case S.ATTRIB:
            if (isWhitespace2(c)) {
              continue;
            } else if (c === ">") {
              openTag(parser);
            } else if (c === "/") {
              parser.state = S.OPEN_TAG_SLASH;
            } else if (isMatch(nameStart, c)) {
              parser.attribName = c;
              parser.attribValue = "";
              parser.state = S.ATTRIB_NAME;
            } else {
              strictFail(parser, "Invalid attribute name");
            }
            continue;
          case S.ATTRIB_NAME:
            if (c === "=") {
              parser.state = S.ATTRIB_VALUE;
            } else if (c === ">") {
              strictFail(parser, "Attribute without value");
              parser.attribValue = parser.attribName;
              attrib(parser);
              openTag(parser);
            } else if (isWhitespace2(c)) {
              parser.state = S.ATTRIB_NAME_SAW_WHITE;
            } else if (isMatch(nameBody, c)) {
              parser.attribName += c;
            } else {
              strictFail(parser, "Invalid attribute name");
            }
            continue;
          case S.ATTRIB_NAME_SAW_WHITE:
            if (c === "=") {
              parser.state = S.ATTRIB_VALUE;
            } else if (isWhitespace2(c)) {
              continue;
            } else {
              strictFail(parser, "Attribute without value");
              parser.tag.attributes[parser.attribName] = "";
              parser.attribValue = "";
              emitNode(parser, "onattribute", {
                name: parser.attribName,
                value: ""
              });
              parser.attribName = "";
              if (c === ">") {
                openTag(parser);
              } else if (isMatch(nameStart, c)) {
                parser.attribName = c;
                parser.state = S.ATTRIB_NAME;
              } else {
                strictFail(parser, "Invalid attribute name");
                parser.state = S.ATTRIB;
              }
            }
            continue;
          case S.ATTRIB_VALUE:
            if (isWhitespace2(c)) {
              continue;
            } else if (isQuote(c)) {
              parser.q = c;
              parser.state = S.ATTRIB_VALUE_QUOTED;
            } else {
              strictFail(parser, "Unquoted attribute value");
              parser.state = S.ATTRIB_VALUE_UNQUOTED;
              parser.attribValue = c;
            }
            continue;
          case S.ATTRIB_VALUE_QUOTED:
            if (c !== parser.q) {
              if (c === "&") {
                parser.state = S.ATTRIB_VALUE_ENTITY_Q;
              } else {
                parser.attribValue += c;
              }
              continue;
            }
            attrib(parser);
            parser.q = "";
            parser.state = S.ATTRIB_VALUE_CLOSED;
            continue;
          case S.ATTRIB_VALUE_CLOSED:
            if (isWhitespace2(c)) {
              parser.state = S.ATTRIB;
            } else if (c === ">") {
              openTag(parser);
            } else if (c === "/") {
              parser.state = S.OPEN_TAG_SLASH;
            } else if (isMatch(nameStart, c)) {
              strictFail(parser, "No whitespace between attributes");
              parser.attribName = c;
              parser.attribValue = "";
              parser.state = S.ATTRIB_NAME;
            } else {
              strictFail(parser, "Invalid attribute name");
            }
            continue;
          case S.ATTRIB_VALUE_UNQUOTED:
            if (!isAttribEnd(c)) {
              if (c === "&") {
                parser.state = S.ATTRIB_VALUE_ENTITY_U;
              } else {
                parser.attribValue += c;
              }
              continue;
            }
            attrib(parser);
            if (c === ">") {
              openTag(parser);
            } else {
              parser.state = S.ATTRIB;
            }
            continue;
          case S.CLOSE_TAG:
            if (!parser.tagName) {
              if (isWhitespace2(c)) {
                continue;
              } else if (notMatch(nameStart, c)) {
                if (parser.script) {
                  parser.script += "</" + c;
                  parser.state = S.SCRIPT;
                } else {
                  strictFail(parser, "Invalid tagname in closing tag.");
                }
              } else {
                parser.tagName = c;
              }
            } else if (c === ">") {
              closeTag(parser);
            } else if (isMatch(nameBody, c)) {
              parser.tagName += c;
            } else if (parser.script) {
              parser.script += "</" + parser.tagName;
              parser.tagName = "";
              parser.state = S.SCRIPT;
            } else {
              if (!isWhitespace2(c)) {
                strictFail(parser, "Invalid tagname in closing tag");
              }
              parser.state = S.CLOSE_TAG_SAW_WHITE;
            }
            continue;
          case S.CLOSE_TAG_SAW_WHITE:
            if (isWhitespace2(c)) {
              continue;
            }
            if (c === ">") {
              closeTag(parser);
            } else {
              strictFail(parser, "Invalid characters in closing tag");
            }
            continue;
          case S.TEXT_ENTITY:
          case S.ATTRIB_VALUE_ENTITY_Q:
          case S.ATTRIB_VALUE_ENTITY_U:
            var returnState;
            var buffer;
            switch (parser.state) {
              case S.TEXT_ENTITY:
                returnState = S.TEXT;
                buffer = "textNode";
                break;
              case S.ATTRIB_VALUE_ENTITY_Q:
                returnState = S.ATTRIB_VALUE_QUOTED;
                buffer = "attribValue";
                break;
              case S.ATTRIB_VALUE_ENTITY_U:
                returnState = S.ATTRIB_VALUE_UNQUOTED;
                buffer = "attribValue";
                break;
            }
            if (c === ";") {
              parser[buffer] += parseEntity(parser);
              parser.entity = "";
              parser.state = returnState;
            } else if (isMatch(parser.entity.length ? entityBody : entityStart, c)) {
              parser.entity += c;
            } else {
              strictFail(parser, "Invalid character in entity name");
              parser[buffer] += "&" + parser.entity + c;
              parser.entity = "";
              parser.state = returnState;
            }
            continue;
          default:
            throw new Error(parser, "Unknown state: " + parser.state);
        }
      }
      if (parser.position >= parser.bufferCheckPosition) {
        checkBufferLength(parser);
      }
      return parser;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    if (!String.fromCodePoint) {
      (function() {
        var stringFromCharCode = String.fromCharCode;
        var floor = Math.floor;
        var fromCodePoint = function() {
          var MAX_SIZE = 16384;
          var codeUnits = [];
          var highSurrogate;
          var lowSurrogate;
          var index = -1;
          var length = arguments.length;
          if (!length) {
            return "";
          }
          var result = "";
          while (++index < length) {
            var codePoint = Number(arguments[index]);
            if (!isFinite(codePoint) || codePoint < 0 || codePoint > 1114111 || floor(codePoint) !== codePoint) {
              throw RangeError("Invalid code point: " + codePoint);
            }
            if (codePoint <= 65535) {
              codeUnits.push(codePoint);
            } else {
              codePoint -= 65536;
              highSurrogate = (codePoint >> 10) + 55296;
              lowSurrogate = codePoint % 1024 + 56320;
              codeUnits.push(highSurrogate, lowSurrogate);
            }
            if (index + 1 === length || codeUnits.length > MAX_SIZE) {
              result += stringFromCharCode.apply(null, codeUnits);
              codeUnits.length = 0;
            }
          }
          return result;
        };
        if (Object.defineProperty) {
          Object.defineProperty(String, "fromCodePoint", {
            value: fromCodePoint,
            configurable: true,
            writable: true
          });
        } else {
          String.fromCodePoint = fromCodePoint;
        }
      })();
    }
  })(exports);
})(sax$1);
Object.defineProperty(xml, "__esModule", { value: true });
xml.parseXml = xml.XElement = void 0;
const sax = sax$1;
const index_1 = out;
class XElement {
  constructor(name) {
    this.name = name;
    this.value = "";
    this.attributes = null;
    this.isCData = false;
    this.elements = null;
    if (!name) {
      throw index_1.newError("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    }
    if (!isValidName(name)) {
      throw index_1.newError(`Invalid element name: ${name}`, "ERR_XML_ELEMENT_INVALID_NAME");
    }
  }
  attribute(name) {
    const result = this.attributes === null ? null : this.attributes[name];
    if (result == null) {
      throw index_1.newError(`No attribute "${name}"`, "ERR_XML_MISSED_ATTRIBUTE");
    }
    return result;
  }
  removeAttribute(name) {
    if (this.attributes !== null) {
      delete this.attributes[name];
    }
  }
  element(name, ignoreCase = false, errorIfMissed = null) {
    const result = this.elementOrNull(name, ignoreCase);
    if (result === null) {
      throw index_1.newError(errorIfMissed || `No element "${name}"`, "ERR_XML_MISSED_ELEMENT");
    }
    return result;
  }
  elementOrNull(name, ignoreCase = false) {
    if (this.elements === null) {
      return null;
    }
    for (const element of this.elements) {
      if (isNameEquals(element, name, ignoreCase)) {
        return element;
      }
    }
    return null;
  }
  getElements(name, ignoreCase = false) {
    if (this.elements === null) {
      return [];
    }
    return this.elements.filter((it) => isNameEquals(it, name, ignoreCase));
  }
  elementValueOrEmpty(name, ignoreCase = false) {
    const element = this.elementOrNull(name, ignoreCase);
    return element === null ? "" : element.value;
  }
}
xml.XElement = XElement;
const NAME_REG_EXP = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function isValidName(name) {
  return NAME_REG_EXP.test(name);
}
function isNameEquals(element, name, ignoreCase) {
  const elementName = element.name;
  return elementName === name || ignoreCase === true && elementName.length === name.length && elementName.toLowerCase() === name.toLowerCase();
}
function parseXml(data) {
  let rootElement = null;
  const parser = sax.parser(true, {});
  const elements = [];
  parser.onopentag = (saxElement) => {
    const element = new XElement(saxElement.name);
    element.attributes = saxElement.attributes;
    if (rootElement === null) {
      rootElement = element;
    } else {
      const parent = elements[elements.length - 1];
      if (parent.elements == null) {
        parent.elements = [];
      }
      parent.elements.push(element);
    }
    elements.push(element);
  };
  parser.onclosetag = () => {
    elements.pop();
  };
  parser.ontext = (text) => {
    if (elements.length > 0) {
      elements[elements.length - 1].value = text;
    }
  };
  parser.oncdata = (cdata) => {
    const element = elements[elements.length - 1];
    element.value = cdata;
    element.isCData = true;
  };
  parser.onerror = (err) => {
    throw err;
  };
  parser.write(data);
  return rootElement;
}
xml.parseXml = parseXml;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.newError = exports.asArray = exports.CURRENT_APP_PACKAGE_FILE_NAME = exports.CURRENT_APP_INSTALLER_FILE_NAME = exports.XElement = exports.parseXml = exports.ProgressCallbackTransform = exports.UUID = exports.parseDn = exports.githubUrl = exports.getS3LikeProviderBaseUrl = exports.configureRequestUrl = exports.parseJson = exports.safeStringifyJson = exports.configureRequestOptionsFromUrl = exports.configureRequestOptions = exports.safeGetHeader = exports.DigestTransform = exports.HttpExecutor = exports.createHttpError = exports.HttpError = exports.CancellationError = exports.CancellationToken = void 0;
  var CancellationToken_12 = CancellationToken$1;
  Object.defineProperty(exports, "CancellationToken", { enumerable: true, get: function() {
    return CancellationToken_12.CancellationToken;
  } });
  Object.defineProperty(exports, "CancellationError", { enumerable: true, get: function() {
    return CancellationToken_12.CancellationError;
  } });
  var httpExecutor_12 = httpExecutor;
  Object.defineProperty(exports, "HttpError", { enumerable: true, get: function() {
    return httpExecutor_12.HttpError;
  } });
  Object.defineProperty(exports, "createHttpError", { enumerable: true, get: function() {
    return httpExecutor_12.createHttpError;
  } });
  Object.defineProperty(exports, "HttpExecutor", { enumerable: true, get: function() {
    return httpExecutor_12.HttpExecutor;
  } });
  Object.defineProperty(exports, "DigestTransform", { enumerable: true, get: function() {
    return httpExecutor_12.DigestTransform;
  } });
  Object.defineProperty(exports, "safeGetHeader", { enumerable: true, get: function() {
    return httpExecutor_12.safeGetHeader;
  } });
  Object.defineProperty(exports, "configureRequestOptions", { enumerable: true, get: function() {
    return httpExecutor_12.configureRequestOptions;
  } });
  Object.defineProperty(exports, "configureRequestOptionsFromUrl", { enumerable: true, get: function() {
    return httpExecutor_12.configureRequestOptionsFromUrl;
  } });
  Object.defineProperty(exports, "safeStringifyJson", { enumerable: true, get: function() {
    return httpExecutor_12.safeStringifyJson;
  } });
  Object.defineProperty(exports, "parseJson", { enumerable: true, get: function() {
    return httpExecutor_12.parseJson;
  } });
  Object.defineProperty(exports, "configureRequestUrl", { enumerable: true, get: function() {
    return httpExecutor_12.configureRequestUrl;
  } });
  var publishOptions_1 = publishOptions;
  Object.defineProperty(exports, "getS3LikeProviderBaseUrl", { enumerable: true, get: function() {
    return publishOptions_1.getS3LikeProviderBaseUrl;
  } });
  Object.defineProperty(exports, "githubUrl", { enumerable: true, get: function() {
    return publishOptions_1.githubUrl;
  } });
  var rfc2253Parser_1 = rfc2253Parser;
  Object.defineProperty(exports, "parseDn", { enumerable: true, get: function() {
    return rfc2253Parser_1.parseDn;
  } });
  var uuid_1 = uuid;
  Object.defineProperty(exports, "UUID", { enumerable: true, get: function() {
    return uuid_1.UUID;
  } });
  var ProgressCallbackTransform_12 = ProgressCallbackTransform$1;
  Object.defineProperty(exports, "ProgressCallbackTransform", { enumerable: true, get: function() {
    return ProgressCallbackTransform_12.ProgressCallbackTransform;
  } });
  var xml_1 = xml;
  Object.defineProperty(exports, "parseXml", { enumerable: true, get: function() {
    return xml_1.parseXml;
  } });
  Object.defineProperty(exports, "XElement", { enumerable: true, get: function() {
    return xml_1.XElement;
  } });
  exports.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe";
  exports.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function asArray(v) {
    if (v == null) {
      return [];
    } else if (Array.isArray(v)) {
      return v;
    } else {
      return [v];
    }
  }
  exports.asArray = asArray;
  function newError(message, code2) {
    const error2 = new Error(message);
    error2.code = code2;
    return error2;
  }
  exports.newError = newError;
})(out);
var AppUpdater$1 = {};
var jsYaml = {};
var loader$1 = {};
var common$5 = {};
function isNothing(subject) {
  return typeof subject === "undefined" || subject === null;
}
function isObject(subject) {
  return typeof subject === "object" && subject !== null;
}
function toArray(sequence) {
  if (Array.isArray(sequence))
    return sequence;
  else if (isNothing(sequence))
    return [];
  return [sequence];
}
function extend(target, source2) {
  var index, length, key, sourceKeys;
  if (source2) {
    sourceKeys = Object.keys(source2);
    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source2[key];
    }
  }
  return target;
}
function repeat(string, count) {
  var result = "", cycle;
  for (cycle = 0; cycle < count; cycle += 1) {
    result += string;
  }
  return result;
}
function isNegativeZero(number) {
  return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
}
common$5.isNothing = isNothing;
common$5.isObject = isObject;
common$5.toArray = toArray;
common$5.repeat = repeat;
common$5.isNegativeZero = isNegativeZero;
common$5.extend = extend;
function formatError(exception2, compact) {
  var where = "", message = exception2.reason || "(unknown reason)";
  if (!exception2.mark)
    return message;
  if (exception2.mark.name) {
    where += 'in "' + exception2.mark.name + '" ';
  }
  where += "(" + (exception2.mark.line + 1) + ":" + (exception2.mark.column + 1) + ")";
  if (!compact && exception2.mark.snippet) {
    where += "\n\n" + exception2.mark.snippet;
  }
  return message + " " + where;
}
function YAMLException$4(reason, mark) {
  Error.call(this);
  this.name = "YAMLException";
  this.reason = reason;
  this.mark = mark;
  this.message = formatError(this, false);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack || "";
  }
}
YAMLException$4.prototype = Object.create(Error.prototype);
YAMLException$4.prototype.constructor = YAMLException$4;
YAMLException$4.prototype.toString = function toString2(compact) {
  return this.name + ": " + formatError(this, compact);
};
var exception = YAMLException$4;
var common$4 = common$5;
function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
  var head = "";
  var tail = "";
  var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
  if (position - lineStart > maxHalfLength) {
    head = " ... ";
    lineStart = position - maxHalfLength + head.length;
  }
  if (lineEnd - position > maxHalfLength) {
    tail = " ...";
    lineEnd = position + maxHalfLength - tail.length;
  }
  return {
    str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "\u2192") + tail,
    pos: position - lineStart + head.length
  };
}
function padStart(string, max) {
  return common$4.repeat(" ", max - string.length) + string;
}
function makeSnippet$1(mark, options) {
  options = Object.create(options || null);
  if (!mark.buffer)
    return null;
  if (!options.maxLength)
    options.maxLength = 79;
  if (typeof options.indent !== "number")
    options.indent = 1;
  if (typeof options.linesBefore !== "number")
    options.linesBefore = 3;
  if (typeof options.linesAfter !== "number")
    options.linesAfter = 2;
  var re2 = /\r?\n|\r|\0/g;
  var lineStarts = [0];
  var lineEnds = [];
  var match;
  var foundLineNo = -1;
  while (match = re2.exec(mark.buffer)) {
    lineEnds.push(match.index);
    lineStarts.push(match.index + match[0].length);
    if (mark.position <= match.index && foundLineNo < 0) {
      foundLineNo = lineStarts.length - 2;
    }
  }
  if (foundLineNo < 0)
    foundLineNo = lineStarts.length - 1;
  var result = "", i2, line;
  var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
  var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
  for (i2 = 1; i2 <= options.linesBefore; i2++) {
    if (foundLineNo - i2 < 0)
      break;
    line = getLine(mark.buffer, lineStarts[foundLineNo - i2], lineEnds[foundLineNo - i2], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i2]), maxLineLength);
    result = common$4.repeat(" ", options.indent) + padStart((mark.line - i2 + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
  }
  line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
  result += common$4.repeat(" ", options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
  result += common$4.repeat("-", options.indent + lineNoLength + 3 + line.pos) + "^\n";
  for (i2 = 1; i2 <= options.linesAfter; i2++) {
    if (foundLineNo + i2 >= lineEnds.length)
      break;
    line = getLine(mark.buffer, lineStarts[foundLineNo + i2], lineEnds[foundLineNo + i2], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i2]), maxLineLength);
    result += common$4.repeat(" ", options.indent) + padStart((mark.line + i2 + 1).toString(), lineNoLength) + " | " + line.str + "\n";
  }
  return result.replace(/\n$/, "");
}
var snippet = makeSnippet$1;
var YAMLException$3 = exception;
var TYPE_CONSTRUCTOR_OPTIONS = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
];
var YAML_NODE_KINDS = [
  "scalar",
  "sequence",
  "mapping"
];
function compileStyleAliases(map2) {
  var result = {};
  if (map2 !== null) {
    Object.keys(map2).forEach(function(style) {
      map2[style].forEach(function(alias) {
        result[String(alias)] = style;
      });
    });
  }
  return result;
}
function Type$e(tag, options) {
  options = options || {};
  Object.keys(options).forEach(function(name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new YAMLException$3('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });
  this.options = options;
  this.tag = tag;
  this.kind = options["kind"] || null;
  this.resolve = options["resolve"] || function() {
    return true;
  };
  this.construct = options["construct"] || function(data) {
    return data;
  };
  this.instanceOf = options["instanceOf"] || null;
  this.predicate = options["predicate"] || null;
  this.represent = options["represent"] || null;
  this.representName = options["representName"] || null;
  this.defaultStyle = options["defaultStyle"] || null;
  this.multi = options["multi"] || false;
  this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new YAMLException$3('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}
var type$2 = Type$e;
var YAMLException$2 = exception;
var Type$d = type$2;
function compileList(schema2, name) {
  var result = [];
  schema2[name].forEach(function(currentType) {
    var newIndex = result.length;
    result.forEach(function(previousType, previousIndex) {
      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
        newIndex = previousIndex;
      }
    });
    result[newIndex] = currentType;
  });
  return result;
}
function compileMap() {
  var result = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, index, length;
  function collectType(type2) {
    if (type2.multi) {
      result.multi[type2.kind].push(type2);
      result.multi["fallback"].push(type2);
    } else {
      result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
    }
  }
  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }
  return result;
}
function Schema$1(definition) {
  return this.extend(definition);
}
Schema$1.prototype.extend = function extend2(definition) {
  var implicit = [];
  var explicit = [];
  if (definition instanceof Type$d) {
    explicit.push(definition);
  } else if (Array.isArray(definition)) {
    explicit = explicit.concat(definition);
  } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
    if (definition.implicit)
      implicit = implicit.concat(definition.implicit);
    if (definition.explicit)
      explicit = explicit.concat(definition.explicit);
  } else {
    throw new YAMLException$2("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  }
  implicit.forEach(function(type2) {
    if (!(type2 instanceof Type$d)) {
      throw new YAMLException$2("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
    if (type2.loadKind && type2.loadKind !== "scalar") {
      throw new YAMLException$2("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    }
    if (type2.multi) {
      throw new YAMLException$2("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }
  });
  explicit.forEach(function(type2) {
    if (!(type2 instanceof Type$d)) {
      throw new YAMLException$2("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
  });
  var result = Object.create(Schema$1.prototype);
  result.implicit = (this.implicit || []).concat(implicit);
  result.explicit = (this.explicit || []).concat(explicit);
  result.compiledImplicit = compileList(result, "implicit");
  result.compiledExplicit = compileList(result, "explicit");
  result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
  return result;
};
var schema$2 = Schema$1;
var Type$c = type$2;
var str = new Type$c("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(data) {
    return data !== null ? data : "";
  }
});
var Type$b = type$2;
var seq = new Type$b("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(data) {
    return data !== null ? data : [];
  }
});
var Type$a = type$2;
var map = new Type$a("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(data) {
    return data !== null ? data : {};
  }
});
var Schema = schema$2;
var failsafe = new Schema({
  explicit: [
    str,
    seq,
    map
  ]
});
var Type$9 = type$2;
function resolveYamlNull(data) {
  if (data === null)
    return true;
  var max = data.length;
  return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
}
function constructYamlNull() {
  return null;
}
function isNull(object) {
  return object === null;
}
var _null = new Type$9("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
});
var Type$8 = type$2;
function resolveYamlBoolean(data) {
  if (data === null)
    return false;
  var max = data.length;
  return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
}
function constructYamlBoolean(data) {
  return data === "true" || data === "True" || data === "TRUE";
}
function isBoolean(object) {
  return Object.prototype.toString.call(object) === "[object Boolean]";
}
var bool = new Type$8("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function(object) {
      return object ? "true" : "false";
    },
    uppercase: function(object) {
      return object ? "TRUE" : "FALSE";
    },
    camelcase: function(object) {
      return object ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
});
var common$3 = common$5;
var Type$7 = type$2;
function isHexCode(c) {
  return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
}
function isOctCode(c) {
  return 48 <= c && c <= 55;
}
function isDecCode(c) {
  return 48 <= c && c <= 57;
}
function resolveYamlInteger(data) {
  if (data === null)
    return false;
  var max = data.length, index = 0, hasDigits = false, ch;
  if (!max)
    return false;
  ch = data[index];
  if (ch === "-" || ch === "+") {
    ch = data[++index];
  }
  if (ch === "0") {
    if (index + 1 === max)
      return true;
    ch = data[++index];
    if (ch === "b") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_")
          continue;
        if (ch !== "0" && ch !== "1")
          return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "x") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_")
          continue;
        if (!isHexCode(data.charCodeAt(index)))
          return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "o") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_")
          continue;
        if (!isOctCode(data.charCodeAt(index)))
          return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
  }
  if (ch === "_")
    return false;
  for (; index < max; index++) {
    ch = data[index];
    if (ch === "_")
      continue;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }
  if (!hasDigits || ch === "_")
    return false;
  return true;
}
function constructYamlInteger(data) {
  var value = data, sign = 1, ch;
  if (value.indexOf("_") !== -1) {
    value = value.replace(/_/g, "");
  }
  ch = value[0];
  if (ch === "-" || ch === "+") {
    if (ch === "-")
      sign = -1;
    value = value.slice(1);
    ch = value[0];
  }
  if (value === "0")
    return 0;
  if (ch === "0") {
    if (value[1] === "b")
      return sign * parseInt(value.slice(2), 2);
    if (value[1] === "x")
      return sign * parseInt(value.slice(2), 16);
    if (value[1] === "o")
      return sign * parseInt(value.slice(2), 8);
  }
  return sign * parseInt(value, 10);
}
function isInteger(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common$3.isNegativeZero(object));
}
var int = new Type$7("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary: function(obj) {
      return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
    },
    octal: function(obj) {
      return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
    },
    decimal: function(obj) {
      return obj.toString(10);
    },
    hexadecimal: function(obj) {
      return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
});
var common$2 = common$5;
var Type$6 = type$2;
var YAML_FLOAT_PATTERN = new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
function resolveYamlFloat(data) {
  if (data === null)
    return false;
  if (!YAML_FLOAT_PATTERN.test(data) || data[data.length - 1] === "_") {
    return false;
  }
  return true;
}
function constructYamlFloat(data) {
  var value, sign;
  value = data.replace(/_/g, "").toLowerCase();
  sign = value[0] === "-" ? -1 : 1;
  if ("+-".indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }
  if (value === ".inf") {
    return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  } else if (value === ".nan") {
    return NaN;
  }
  return sign * parseFloat(value, 10);
}
var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function representYamlFloat(object, style) {
  var res;
  if (isNaN(object)) {
    switch (style) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  } else if (common$2.isNegativeZero(object)) {
    return "-0.0";
  }
  res = object.toString(10);
  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
}
function isFloat(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common$2.isNegativeZero(object));
}
var float = new Type$6("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: "lowercase"
});
var json = failsafe.extend({
  implicit: [
    _null,
    bool,
    int,
    float
  ]
});
var core$3 = json;
var Type$5 = type$2;
var YAML_DATE_REGEXP = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$");
var YAML_TIMESTAMP_REGEXP = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");
function resolveYamlTimestamp(data) {
  if (data === null)
    return false;
  if (YAML_DATE_REGEXP.exec(data) !== null)
    return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null)
    return true;
  return false;
}
function constructYamlTimestamp(data) {
  var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
  match = YAML_DATE_REGEXP.exec(data);
  if (match === null)
    match = YAML_TIMESTAMP_REGEXP.exec(data);
  if (match === null)
    throw new Error("Date resolve error");
  year = +match[1];
  month = +match[2] - 1;
  day = +match[3];
  if (!match[4]) {
    return new Date(Date.UTC(year, month, day));
  }
  hour = +match[4];
  minute = +match[5];
  second = +match[6];
  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) {
      fraction += "0";
    }
    fraction = +fraction;
  }
  if (match[9]) {
    tz_hour = +match[10];
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 6e4;
    if (match[9] === "-")
      delta = -delta;
  }
  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
  if (delta)
    date.setTime(date.getTime() - delta);
  return date;
}
function representYamlTimestamp(object) {
  return object.toISOString();
}
var timestamp = new Type$5("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});
var Type$4 = type$2;
function resolveYamlMerge(data) {
  return data === "<<" || data === null;
}
var merge = new Type$4("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: resolveYamlMerge
});
var Type$3 = type$2;
var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
function resolveYamlBinary(data) {
  if (data === null)
    return false;
  var code2, idx, bitlen = 0, max = data.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    code2 = map2.indexOf(data.charAt(idx));
    if (code2 > 64)
      continue;
    if (code2 < 0)
      return false;
    bitlen += 6;
  }
  return bitlen % 8 === 0;
}
function constructYamlBinary(data) {
  var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map2 = BASE64_MAP, bits = 0, result = [];
  for (idx = 0; idx < max; idx++) {
    if (idx % 4 === 0 && idx) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    }
    bits = bits << 6 | map2.indexOf(input.charAt(idx));
  }
  tailbits = max % 4 * 6;
  if (tailbits === 0) {
    result.push(bits >> 16 & 255);
    result.push(bits >> 8 & 255);
    result.push(bits & 255);
  } else if (tailbits === 18) {
    result.push(bits >> 10 & 255);
    result.push(bits >> 2 & 255);
  } else if (tailbits === 12) {
    result.push(bits >> 4 & 255);
  }
  return new Uint8Array(result);
}
function representYamlBinary(object) {
  var result = "", bits = 0, idx, tail, max = object.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    if (idx % 3 === 0 && idx) {
      result += map2[bits >> 18 & 63];
      result += map2[bits >> 12 & 63];
      result += map2[bits >> 6 & 63];
      result += map2[bits & 63];
    }
    bits = (bits << 8) + object[idx];
  }
  tail = max % 3;
  if (tail === 0) {
    result += map2[bits >> 18 & 63];
    result += map2[bits >> 12 & 63];
    result += map2[bits >> 6 & 63];
    result += map2[bits & 63];
  } else if (tail === 2) {
    result += map2[bits >> 10 & 63];
    result += map2[bits >> 4 & 63];
    result += map2[bits << 2 & 63];
    result += map2[64];
  } else if (tail === 1) {
    result += map2[bits >> 2 & 63];
    result += map2[bits << 4 & 63];
    result += map2[64];
    result += map2[64];
  }
  return result;
}
function isBinary(obj) {
  return Object.prototype.toString.call(obj) === "[object Uint8Array]";
}
var binary = new Type$3("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});
var Type$2 = type$2;
var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var _toString$2 = Object.prototype.toString;
function resolveYamlOmap(data) {
  if (data === null)
    return true;
  var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;
    if (_toString$2.call(pair) !== "[object Object]")
      return false;
    for (pairKey in pair) {
      if (_hasOwnProperty$3.call(pair, pairKey)) {
        if (!pairHasKey)
          pairHasKey = true;
        else
          return false;
      }
    }
    if (!pairHasKey)
      return false;
    if (objectKeys.indexOf(pairKey) === -1)
      objectKeys.push(pairKey);
    else
      return false;
  }
  return true;
}
function constructYamlOmap(data) {
  return data !== null ? data : [];
}
var omap = new Type$2("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});
var Type$1 = type$2;
var _toString$1 = Object.prototype.toString;
function resolveYamlPairs(data) {
  if (data === null)
    return true;
  var index, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    if (_toString$1.call(pair) !== "[object Object]")
      return false;
    keys = Object.keys(pair);
    if (keys.length !== 1)
      return false;
    result[index] = [keys[0], pair[keys[0]]];
  }
  return true;
}
function constructYamlPairs(data) {
  if (data === null)
    return [];
  var index, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    keys = Object.keys(pair);
    result[index] = [keys[0], pair[keys[0]]];
  }
  return result;
}
var pairs = new Type$1("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});
var Type = type$2;
var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function resolveYamlSet(data) {
  if (data === null)
    return true;
  var key, object = data;
  for (key in object) {
    if (_hasOwnProperty$2.call(object, key)) {
      if (object[key] !== null)
        return false;
    }
  }
  return true;
}
function constructYamlSet(data) {
  return data !== null ? data : {};
}
var set = new Type("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: resolveYamlSet,
  construct: constructYamlSet
});
var _default = core$3.extend({
  implicit: [
    timestamp,
    merge
  ],
  explicit: [
    binary,
    omap,
    pairs,
    set
  ]
});
var common$1 = common$5;
var YAMLException$1 = exception;
var makeSnippet = snippet;
var DEFAULT_SCHEMA$1 = _default;
var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var CONTEXT_FLOW_IN = 1;
var CONTEXT_FLOW_OUT = 2;
var CONTEXT_BLOCK_IN = 3;
var CONTEXT_BLOCK_OUT = 4;
var CHOMPING_CLIP = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP = 3;
var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function _class(obj) {
  return Object.prototype.toString.call(obj);
}
function is_EOL(c) {
  return c === 10 || c === 13;
}
function is_WHITE_SPACE(c) {
  return c === 9 || c === 32;
}
function is_WS_OR_EOL(c) {
  return c === 9 || c === 32 || c === 10 || c === 13;
}
function is_FLOW_INDICATOR(c) {
  return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
}
function fromHexCode(c) {
  var lc;
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  lc = c | 32;
  if (97 <= lc && lc <= 102) {
    return lc - 97 + 10;
  }
  return -1;
}
function escapedHexLen(c) {
  if (c === 120) {
    return 2;
  }
  if (c === 117) {
    return 4;
  }
  if (c === 85) {
    return 8;
  }
  return 0;
}
function fromDecimalCode(c) {
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  return -1;
}
function simpleEscapeSequence(c) {
  return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
}
function charFromCodepoint(c) {
  if (c <= 65535) {
    return String.fromCharCode(c);
  }
  return String.fromCharCode((c - 65536 >> 10) + 55296, (c - 65536 & 1023) + 56320);
}
var simpleEscapeCheck = new Array(256);
var simpleEscapeMap = new Array(256);
for (var i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}
function State$1(input, options) {
  this.input = input;
  this.filename = options["filename"] || null;
  this.schema = options["schema"] || DEFAULT_SCHEMA$1;
  this.onWarning = options["onWarning"] || null;
  this.legacy = options["legacy"] || false;
  this.json = options["json"] || false;
  this.listener = options["listener"] || null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.typeMap = this.schema.compiledTypeMap;
  this.length = input.length;
  this.position = 0;
  this.line = 0;
  this.lineStart = 0;
  this.lineIndent = 0;
  this.firstTabInLine = -1;
  this.documents = [];
}
function generateError(state, message) {
  var mark = {
    name: state.filename,
    buffer: state.input.slice(0, -1),
    position: state.position,
    line: state.line,
    column: state.position - state.lineStart
  };
  mark.snippet = makeSnippet(mark);
  return new YAMLException$1(message, mark);
}
function throwError(state, message) {
  throw generateError(state, message);
}
function throwWarning(state, message) {
  if (state.onWarning) {
    state.onWarning.call(null, generateError(state, message));
  }
}
var directiveHandlers = {
  YAML: function handleYamlDirective(state, name, args) {
    var match, major2, minor2;
    if (state.version !== null) {
      throwError(state, "duplication of %YAML directive");
    }
    if (args.length !== 1) {
      throwError(state, "YAML directive accepts exactly one argument");
    }
    match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
    if (match === null) {
      throwError(state, "ill-formed argument of the YAML directive");
    }
    major2 = parseInt(match[1], 10);
    minor2 = parseInt(match[2], 10);
    if (major2 !== 1) {
      throwError(state, "unacceptable YAML version of the document");
    }
    state.version = args[0];
    state.checkLineBreaks = minor2 < 2;
    if (minor2 !== 1 && minor2 !== 2) {
      throwWarning(state, "unsupported YAML version of the document");
    }
  },
  TAG: function handleTagDirective(state, name, args) {
    var handle, prefix;
    if (args.length !== 2) {
      throwError(state, "TAG directive accepts exactly two arguments");
    }
    handle = args[0];
    prefix = args[1];
    if (!PATTERN_TAG_HANDLE.test(handle)) {
      throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
    }
    if (_hasOwnProperty$1.call(state.tagMap, handle)) {
      throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
    }
    if (!PATTERN_TAG_URI.test(prefix)) {
      throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
    }
    try {
      prefix = decodeURIComponent(prefix);
    } catch (err) {
      throwError(state, "tag prefix is malformed: " + prefix);
    }
    state.tagMap[handle] = prefix;
  }
};
function captureSegment(state, start, end, checkJson) {
  var _position, _length, _character, _result;
  if (start < end) {
    _result = state.input.slice(start, end);
    if (checkJson) {
      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
        _character = _result.charCodeAt(_position);
        if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
          throwError(state, "expected valid JSON character");
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
      throwError(state, "the stream contains non-printable characters");
    }
    state.result += _result;
  }
}
function mergeMappings(state, destination, source2, overridableKeys) {
  var sourceKeys, key, index, quantity;
  if (!common$1.isObject(source2)) {
    throwError(state, "cannot merge mappings; the provided source object is unacceptable");
  }
  sourceKeys = Object.keys(source2);
  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
    key = sourceKeys[index];
    if (!_hasOwnProperty$1.call(destination, key)) {
      destination[key] = source2[key];
      overridableKeys[key] = true;
    }
  }
}
function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
  var index, quantity;
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);
    for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
      if (Array.isArray(keyNode[index])) {
        throwError(state, "nested arrays are not supported inside keys");
      }
      if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
        keyNode[index] = "[object Object]";
      }
    }
  }
  if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
    keyNode = "[object Object]";
  }
  keyNode = String(keyNode);
  if (_result === null) {
    _result = {};
  }
  if (keyTag === "tag:yaml.org,2002:merge") {
    if (Array.isArray(valueNode)) {
      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
        mergeMappings(state, _result, valueNode[index], overridableKeys);
      }
    } else {
      mergeMappings(state, _result, valueNode, overridableKeys);
    }
  } else {
    if (!state.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
      state.line = startLine || state.line;
      state.lineStart = startLineStart || state.lineStart;
      state.position = startPos || state.position;
      throwError(state, "duplicated mapping key");
    }
    if (keyNode === "__proto__") {
      Object.defineProperty(_result, keyNode, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: valueNode
      });
    } else {
      _result[keyNode] = valueNode;
    }
    delete overridableKeys[keyNode];
  }
  return _result;
}
function readLineBreak(state) {
  var ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 10) {
    state.position++;
  } else if (ch === 13) {
    state.position++;
    if (state.input.charCodeAt(state.position) === 10) {
      state.position++;
    }
  } else {
    throwError(state, "a line break is expected");
  }
  state.line += 1;
  state.lineStart = state.position;
  state.firstTabInLine = -1;
}
function skipSeparationSpace(state, allowComments, checkIndent) {
  var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    while (is_WHITE_SPACE(ch)) {
      if (ch === 9 && state.firstTabInLine === -1) {
        state.firstTabInLine = state.position;
      }
      ch = state.input.charCodeAt(++state.position);
    }
    if (allowComments && ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 10 && ch !== 13 && ch !== 0);
    }
    if (is_EOL(ch)) {
      readLineBreak(state);
      ch = state.input.charCodeAt(state.position);
      lineBreaks++;
      state.lineIndent = 0;
      while (ch === 32) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
    } else {
      break;
    }
  }
  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
    throwWarning(state, "deficient indentation");
  }
  return lineBreaks;
}
function testDocumentSeparator(state) {
  var _position = state.position, ch;
  ch = state.input.charCodeAt(_position);
  if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
    _position += 3;
    ch = state.input.charCodeAt(_position);
    if (ch === 0 || is_WS_OR_EOL(ch)) {
      return true;
    }
  }
  return false;
}
function writeFoldedLines(state, count) {
  if (count === 1) {
    state.result += " ";
  } else if (count > 1) {
    state.result += common$1.repeat("\n", count - 1);
  }
}
function readPlainScalar(state, nodeIndent, withinFlowCollection) {
  var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
  ch = state.input.charCodeAt(state.position);
  if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
    return false;
  }
  if (ch === 63 || ch === 45) {
    following = state.input.charCodeAt(state.position + 1);
    if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
      return false;
    }
  }
  state.kind = "scalar";
  state.result = "";
  captureStart = captureEnd = state.position;
  hasPendingContent = false;
  while (ch !== 0) {
    if (ch === 58) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
        break;
      }
    } else if (ch === 35) {
      preceding = state.input.charCodeAt(state.position - 1);
      if (is_WS_OR_EOL(preceding)) {
        break;
      }
    } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
      break;
    } else if (is_EOL(ch)) {
      _line = state.line;
      _lineStart = state.lineStart;
      _lineIndent = state.lineIndent;
      skipSeparationSpace(state, false, -1);
      if (state.lineIndent >= nodeIndent) {
        hasPendingContent = true;
        ch = state.input.charCodeAt(state.position);
        continue;
      } else {
        state.position = captureEnd;
        state.line = _line;
        state.lineStart = _lineStart;
        state.lineIndent = _lineIndent;
        break;
      }
    }
    if (hasPendingContent) {
      captureSegment(state, captureStart, captureEnd, false);
      writeFoldedLines(state, state.line - _line);
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
    }
    if (!is_WHITE_SPACE(ch)) {
      captureEnd = state.position + 1;
    }
    ch = state.input.charCodeAt(++state.position);
  }
  captureSegment(state, captureStart, captureEnd, false);
  if (state.result) {
    return true;
  }
  state.kind = _kind;
  state.result = _result;
  return false;
}
function readSingleQuotedScalar(state, nodeIndent) {
  var ch, captureStart, captureEnd;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 39) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 39) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (ch === 39) {
        captureStart = state.position;
        state.position++;
        captureEnd = state.position;
      } else {
        return true;
      }
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a single quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a single quoted scalar");
}
function readDoubleQuotedScalar(state, nodeIndent) {
  var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 34) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 34) {
      captureSegment(state, captureStart, state.position, true);
      state.position++;
      return true;
    } else if (ch === 92) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (is_EOL(ch)) {
        skipSeparationSpace(state, false, nodeIndent);
      } else if (ch < 256 && simpleEscapeCheck[ch]) {
        state.result += simpleEscapeMap[ch];
        state.position++;
      } else if ((tmp = escapedHexLen(ch)) > 0) {
        hexLength = tmp;
        hexResult = 0;
        for (; hexLength > 0; hexLength--) {
          ch = state.input.charCodeAt(++state.position);
          if ((tmp = fromHexCode(ch)) >= 0) {
            hexResult = (hexResult << 4) + tmp;
          } else {
            throwError(state, "expected hexadecimal character");
          }
        }
        state.result += charFromCodepoint(hexResult);
        state.position++;
      } else {
        throwError(state, "unknown escape sequence");
      }
      captureStart = captureEnd = state.position;
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a double quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a double quoted scalar");
}
function readFlowCollection(state, nodeIndent) {
  var readNext = true, _line, _lineStart, _pos, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = Object.create(null), keyNode, keyTag, valueNode, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 91) {
    terminator = 93;
    isMapping = false;
    _result = [];
  } else if (ch === 123) {
    terminator = 125;
    isMapping = true;
    _result = {};
  } else {
    return false;
  }
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(++state.position);
  while (ch !== 0) {
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === terminator) {
      state.position++;
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = isMapping ? "mapping" : "sequence";
      state.result = _result;
      return true;
    } else if (!readNext) {
      throwError(state, "missed comma between flow collection entries");
    } else if (ch === 44) {
      throwError(state, "expected the node content, but found ','");
    }
    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;
    if (ch === 63) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following)) {
        isPair = isExplicitPair = true;
        state.position++;
        skipSeparationSpace(state, true, nodeIndent);
      }
    }
    _line = state.line;
    _lineStart = state.lineStart;
    _pos = state.position;
    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state.tag;
    keyNode = state.result;
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if ((isExplicitPair || state.line === _line) && ch === 58) {
      isPair = true;
      ch = state.input.charCodeAt(++state.position);
      skipSeparationSpace(state, true, nodeIndent);
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state.result;
    }
    if (isMapping) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
    } else if (isPair) {
      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
    } else {
      _result.push(keyNode);
    }
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === 44) {
      readNext = true;
      ch = state.input.charCodeAt(++state.position);
    } else {
      readNext = false;
    }
  }
  throwError(state, "unexpected end of the stream within a flow collection");
}
function readBlockScalar(state, nodeIndent) {
  var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 124) {
    folding = false;
  } else if (ch === 62) {
    folding = true;
  } else {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  while (ch !== 0) {
    ch = state.input.charCodeAt(++state.position);
    if (ch === 43 || ch === 45) {
      if (CHOMPING_CLIP === chomping) {
        chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        throwError(state, "repeat of a chomping mode identifier");
      }
    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        throwError(state, "repeat of an indentation width identifier");
      }
    } else {
      break;
    }
  }
  if (is_WHITE_SPACE(ch)) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (is_WHITE_SPACE(ch));
    if (ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (!is_EOL(ch) && ch !== 0);
    }
  }
  while (ch !== 0) {
    readLineBreak(state);
    state.lineIndent = 0;
    ch = state.input.charCodeAt(state.position);
    while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
      state.lineIndent++;
      ch = state.input.charCodeAt(++state.position);
    }
    if (!detectedIndent && state.lineIndent > textIndent) {
      textIndent = state.lineIndent;
    }
    if (is_EOL(ch)) {
      emptyLines++;
      continue;
    }
    if (state.lineIndent < textIndent) {
      if (chomping === CHOMPING_KEEP) {
        state.result += common$1.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) {
          state.result += "\n";
        }
      }
      break;
    }
    if (folding) {
      if (is_WHITE_SPACE(ch)) {
        atMoreIndented = true;
        state.result += common$1.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state.result += common$1.repeat("\n", emptyLines + 1);
      } else if (emptyLines === 0) {
        if (didReadContent) {
          state.result += " ";
        }
      } else {
        state.result += common$1.repeat("\n", emptyLines);
      }
    } else {
      state.result += common$1.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
    }
    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    captureStart = state.position;
    while (!is_EOL(ch) && ch !== 0) {
      ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, state.position, false);
  }
  return true;
}
function readBlockSequence(state, nodeIndent) {
  var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
  if (state.firstTabInLine !== -1)
    return false;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, "tab characters must not be used in indentation");
    }
    if (ch !== 45) {
      break;
    }
    following = state.input.charCodeAt(state.position + 1);
    if (!is_WS_OR_EOL(following)) {
      break;
    }
    detected = true;
    state.position++;
    if (skipSeparationSpace(state, true, -1)) {
      if (state.lineIndent <= nodeIndent) {
        _result.push(null);
        ch = state.input.charCodeAt(state.position);
        continue;
      }
    }
    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    _result.push(state.result);
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state, "bad indentation of a sequence entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "sequence";
    state.result = _result;
    return true;
  }
  return false;
}
function readBlockMapping(state, nodeIndent, flowIndent) {
  var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
  if (state.firstTabInLine !== -1)
    return false;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (!atExplicitKey && state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, "tab characters must not be used in indentation");
    }
    following = state.input.charCodeAt(state.position + 1);
    _line = state.line;
    if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
      if (ch === 63) {
        if (atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }
        detected = true;
        atExplicitKey = true;
        allowCompact = true;
      } else if (atExplicitKey) {
        atExplicitKey = false;
        allowCompact = true;
      } else {
        throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
      }
      state.position += 1;
      ch = following;
    } else {
      _keyLine = state.line;
      _keyLineStart = state.lineStart;
      _keyPos = state.position;
      if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
        break;
      }
      if (state.line === _line) {
        ch = state.input.charCodeAt(state.position);
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (ch === 58) {
          ch = state.input.charCodeAt(++state.position);
          if (!is_WS_OR_EOL(ch)) {
            throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
          }
          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state.tag;
          keyNode = state.result;
        } else if (detected) {
          throwError(state, "can not read an implicit mapping pair; a colon is missed");
        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true;
        }
      } else if (detected) {
        throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
      } else {
        state.tag = _tag;
        state.anchor = _anchor;
        return true;
      }
    }
    if (state.line === _line || state.lineIndent > nodeIndent) {
      if (atExplicitKey) {
        _keyLine = state.line;
        _keyLineStart = state.lineStart;
        _keyPos = state.position;
      }
      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state.result;
        } else {
          valueNode = state.result;
        }
      }
      if (!atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
        keyTag = keyNode = valueNode = null;
      }
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
    }
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state, "bad indentation of a mapping entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (atExplicitKey) {
    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "mapping";
    state.result = _result;
  }
  return detected;
}
function readTagProperty(state) {
  var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 33)
    return false;
  if (state.tag !== null) {
    throwError(state, "duplication of a tag property");
  }
  ch = state.input.charCodeAt(++state.position);
  if (ch === 60) {
    isVerbatim = true;
    ch = state.input.charCodeAt(++state.position);
  } else if (ch === 33) {
    isNamed = true;
    tagHandle = "!!";
    ch = state.input.charCodeAt(++state.position);
  } else {
    tagHandle = "!";
  }
  _position = state.position;
  if (isVerbatim) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (ch !== 0 && ch !== 62);
    if (state.position < state.length) {
      tagName = state.input.slice(_position, state.position);
      ch = state.input.charCodeAt(++state.position);
    } else {
      throwError(state, "unexpected end of the stream within a verbatim tag");
    }
  } else {
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      if (ch === 33) {
        if (!isNamed) {
          tagHandle = state.input.slice(_position - 1, state.position + 1);
          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            throwError(state, "named tag handle cannot contain such characters");
          }
          isNamed = true;
          _position = state.position + 1;
        } else {
          throwError(state, "tag suffix cannot contain exclamation marks");
        }
      }
      ch = state.input.charCodeAt(++state.position);
    }
    tagName = state.input.slice(_position, state.position);
    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      throwError(state, "tag suffix cannot contain flow indicator characters");
    }
  }
  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    throwError(state, "tag name cannot contain such characters: " + tagName);
  }
  try {
    tagName = decodeURIComponent(tagName);
  } catch (err) {
    throwError(state, "tag name is malformed: " + tagName);
  }
  if (isVerbatim) {
    state.tag = tagName;
  } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
    state.tag = state.tagMap[tagHandle] + tagName;
  } else if (tagHandle === "!") {
    state.tag = "!" + tagName;
  } else if (tagHandle === "!!") {
    state.tag = "tag:yaml.org,2002:" + tagName;
  } else {
    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
  }
  return true;
}
function readAnchorProperty(state) {
  var _position, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 38)
    return false;
  if (state.anchor !== null) {
    throwError(state, "duplication of an anchor property");
  }
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an anchor node must contain at least one character");
  }
  state.anchor = state.input.slice(_position, state.position);
  return true;
}
function readAlias(state) {
  var _position, alias, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 42)
    return false;
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an alias node must contain at least one character");
  }
  alias = state.input.slice(_position, state.position);
  if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
    throwError(state, 'unidentified alias "' + alias + '"');
  }
  state.result = state.anchorMap[alias];
  skipSeparationSpace(state, true, -1);
  return true;
}
function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
  var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type2, flowIndent, blockIndent;
  if (state.listener !== null) {
    state.listener("open", state);
  }
  state.tag = null;
  state.anchor = null;
  state.kind = null;
  state.result = null;
  allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
  if (allowToSeek) {
    if (skipSeparationSpace(state, true, -1)) {
      atNewLine = true;
      if (state.lineIndent > parentIndent) {
        indentStatus = 1;
      } else if (state.lineIndent === parentIndent) {
        indentStatus = 0;
      } else if (state.lineIndent < parentIndent) {
        indentStatus = -1;
      }
    }
  }
  if (indentStatus === 1) {
    while (readTagProperty(state) || readAnchorProperty(state)) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        allowBlockCollections = allowBlockStyles;
        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      } else {
        allowBlockCollections = false;
      }
    }
  }
  if (allowBlockCollections) {
    allowBlockCollections = atNewLine || allowCompact;
  }
  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
      flowIndent = parentIndent;
    } else {
      flowIndent = parentIndent + 1;
    }
    blockIndent = state.position - state.lineStart;
    if (indentStatus === 1) {
      if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
        hasContent = true;
      } else {
        if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
          hasContent = true;
        } else if (readAlias(state)) {
          hasContent = true;
          if (state.tag !== null || state.anchor !== null) {
            throwError(state, "alias node should not have any properties");
          }
        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;
          if (state.tag === null) {
            state.tag = "?";
          }
        }
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else if (indentStatus === 0) {
      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    }
  }
  if (state.tag === null) {
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = state.result;
    }
  } else if (state.tag === "?") {
    if (state.result !== null && state.kind !== "scalar") {
      throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
    }
    for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
      type2 = state.implicitTypes[typeIndex];
      if (type2.resolve(state.result)) {
        state.result = type2.construct(state.result);
        state.tag = type2.tag;
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
        break;
      }
    }
  } else if (state.tag !== "!") {
    if (_hasOwnProperty$1.call(state.typeMap[state.kind || "fallback"], state.tag)) {
      type2 = state.typeMap[state.kind || "fallback"][state.tag];
    } else {
      type2 = null;
      typeList = state.typeMap.multi[state.kind || "fallback"];
      for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
        if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
          type2 = typeList[typeIndex];
          break;
        }
      }
    }
    if (!type2) {
      throwError(state, "unknown tag !<" + state.tag + ">");
    }
    if (state.result !== null && type2.kind !== state.kind) {
      throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type2.kind + '", not "' + state.kind + '"');
    }
    if (!type2.resolve(state.result, state.tag)) {
      throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
    } else {
      state.result = type2.construct(state.result, state.tag);
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = state.result;
      }
    }
  }
  if (state.listener !== null) {
    state.listener("close", state);
  }
  return state.tag !== null || state.anchor !== null || hasContent;
}
function readDocument(state) {
  var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
  state.version = null;
  state.checkLineBreaks = state.legacy;
  state.tagMap = Object.create(null);
  state.anchorMap = Object.create(null);
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if (state.lineIndent > 0 || ch !== 37) {
      break;
    }
    hasDirectives = true;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    directiveName = state.input.slice(_position, state.position);
    directiveArgs = [];
    if (directiveName.length < 1) {
      throwError(state, "directive name must not be less than one character in length");
    }
    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && !is_EOL(ch));
        break;
      }
      if (is_EOL(ch))
        break;
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      directiveArgs.push(state.input.slice(_position, state.position));
    }
    if (ch !== 0)
      readLineBreak(state);
    if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state, directiveName, directiveArgs);
    } else {
      throwWarning(state, 'unknown document directive "' + directiveName + '"');
    }
  }
  skipSeparationSpace(state, true, -1);
  if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
    state.position += 3;
    skipSeparationSpace(state, true, -1);
  } else if (hasDirectives) {
    throwError(state, "directives end mark is expected");
  }
  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state, true, -1);
  if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
    throwWarning(state, "non-ASCII line breaks are interpreted as content");
  }
  state.documents.push(state.result);
  if (state.position === state.lineStart && testDocumentSeparator(state)) {
    if (state.input.charCodeAt(state.position) === 46) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    return;
  }
  if (state.position < state.length - 1) {
    throwError(state, "end of the stream or a document separator is expected");
  } else {
    return;
  }
}
function loadDocuments(input, options) {
  input = String(input);
  options = options || {};
  if (input.length !== 0) {
    if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
      input += "\n";
    }
    if (input.charCodeAt(0) === 65279) {
      input = input.slice(1);
    }
  }
  var state = new State$1(input, options);
  var nullpos = input.indexOf("\0");
  if (nullpos !== -1) {
    state.position = nullpos;
    throwError(state, "null byte is not allowed in input");
  }
  state.input += "\0";
  while (state.input.charCodeAt(state.position) === 32) {
    state.lineIndent += 1;
    state.position += 1;
  }
  while (state.position < state.length - 1) {
    readDocument(state);
  }
  return state.documents;
}
function loadAll(input, iterator2, options) {
  if (iterator2 !== null && typeof iterator2 === "object" && typeof options === "undefined") {
    options = iterator2;
    iterator2 = null;
  }
  var documents = loadDocuments(input, options);
  if (typeof iterator2 !== "function") {
    return documents;
  }
  for (var index = 0, length = documents.length; index < length; index += 1) {
    iterator2(documents[index]);
  }
}
function load(input, options) {
  var documents = loadDocuments(input, options);
  if (documents.length === 0) {
    return void 0;
  } else if (documents.length === 1) {
    return documents[0];
  }
  throw new YAMLException$1("expected a single document in the stream, but found more");
}
loader$1.loadAll = loadAll;
loader$1.load = load;
var dumper$1 = {};
var common = common$5;
var YAMLException = exception;
var DEFAULT_SCHEMA = _default;
var _toString = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var CHAR_BOM = 65279;
var CHAR_TAB = 9;
var CHAR_LINE_FEED = 10;
var CHAR_CARRIAGE_RETURN = 13;
var CHAR_SPACE = 32;
var CHAR_EXCLAMATION = 33;
var CHAR_DOUBLE_QUOTE = 34;
var CHAR_SHARP = 35;
var CHAR_PERCENT = 37;
var CHAR_AMPERSAND = 38;
var CHAR_SINGLE_QUOTE = 39;
var CHAR_ASTERISK = 42;
var CHAR_COMMA = 44;
var CHAR_MINUS = 45;
var CHAR_COLON = 58;
var CHAR_EQUALS = 61;
var CHAR_GREATER_THAN = 62;
var CHAR_QUESTION = 63;
var CHAR_COMMERCIAL_AT = 64;
var CHAR_LEFT_SQUARE_BRACKET = 91;
var CHAR_RIGHT_SQUARE_BRACKET = 93;
var CHAR_GRAVE_ACCENT = 96;
var CHAR_LEFT_CURLY_BRACKET = 123;
var CHAR_VERTICAL_LINE = 124;
var CHAR_RIGHT_CURLY_BRACKET = 125;
var ESCAPE_SEQUENCES = {};
ESCAPE_SEQUENCES[0] = "\\0";
ESCAPE_SEQUENCES[7] = "\\a";
ESCAPE_SEQUENCES[8] = "\\b";
ESCAPE_SEQUENCES[9] = "\\t";
ESCAPE_SEQUENCES[10] = "\\n";
ESCAPE_SEQUENCES[11] = "\\v";
ESCAPE_SEQUENCES[12] = "\\f";
ESCAPE_SEQUENCES[13] = "\\r";
ESCAPE_SEQUENCES[27] = "\\e";
ESCAPE_SEQUENCES[34] = '\\"';
ESCAPE_SEQUENCES[92] = "\\\\";
ESCAPE_SEQUENCES[133] = "\\N";
ESCAPE_SEQUENCES[160] = "\\_";
ESCAPE_SEQUENCES[8232] = "\\L";
ESCAPE_SEQUENCES[8233] = "\\P";
var DEPRECATED_BOOLEANS_SYNTAX = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
];
var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function compileStyleMap(schema2, map2) {
  var result, keys, index, length, tag, style, type2;
  if (map2 === null)
    return {};
  result = {};
  keys = Object.keys(map2);
  for (index = 0, length = keys.length; index < length; index += 1) {
    tag = keys[index];
    style = String(map2[tag]);
    if (tag.slice(0, 2) === "!!") {
      tag = "tag:yaml.org,2002:" + tag.slice(2);
    }
    type2 = schema2.compiledTypeMap["fallback"][tag];
    if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
      style = type2.styleAliases[style];
    }
    result[tag] = style;
  }
  return result;
}
function encodeHex(character) {
  var string, handle, length;
  string = character.toString(16).toUpperCase();
  if (character <= 255) {
    handle = "x";
    length = 2;
  } else if (character <= 65535) {
    handle = "u";
    length = 4;
  } else if (character <= 4294967295) {
    handle = "U";
    length = 8;
  } else {
    throw new YAMLException("code point within a string may not be greater than 0xFFFFFFFF");
  }
  return "\\" + handle + common.repeat("0", length - string.length) + string;
}
var QUOTING_TYPE_SINGLE = 1, QUOTING_TYPE_DOUBLE = 2;
function State(options) {
  this.schema = options["schema"] || DEFAULT_SCHEMA;
  this.indent = Math.max(1, options["indent"] || 2);
  this.noArrayIndent = options["noArrayIndent"] || false;
  this.skipInvalid = options["skipInvalid"] || false;
  this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
  this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
  this.sortKeys = options["sortKeys"] || false;
  this.lineWidth = options["lineWidth"] || 80;
  this.noRefs = options["noRefs"] || false;
  this.noCompatMode = options["noCompatMode"] || false;
  this.condenseFlow = options["condenseFlow"] || false;
  this.quotingType = options["quotingType"] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
  this.forceQuotes = options["forceQuotes"] || false;
  this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;
  this.tag = null;
  this.result = "";
  this.duplicates = [];
  this.usedDuplicates = null;
}
function indentString(string, spaces) {
  var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
  while (position < length) {
    next = string.indexOf("\n", position);
    if (next === -1) {
      line = string.slice(position);
      position = length;
    } else {
      line = string.slice(position, next + 1);
      position = next + 1;
    }
    if (line.length && line !== "\n")
      result += ind;
    result += line;
  }
  return result;
}
function generateNextLine(state, level) {
  return "\n" + common.repeat(" ", state.indent * level);
}
function testImplicitResolving(state, str2) {
  var index, length, type2;
  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
    type2 = state.implicitTypes[index];
    if (type2.resolve(str2)) {
      return true;
    }
  }
  return false;
}
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}
function isPrintable(c) {
  return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== CHAR_BOM || 65536 <= c && c <= 1114111;
}
function isNsCharOrWhitespace(c) {
  return isPrintable(c) && c !== CHAR_BOM && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
}
function isPlainSafe(c, prev, inblock) {
  var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
  var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
  return (inblock ? cIsNsCharOrWhitespace : cIsNsCharOrWhitespace && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && c !== CHAR_SHARP && !(prev === CHAR_COLON && !cIsNsChar) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP || prev === CHAR_COLON && cIsNsChar;
}
function isPlainSafeFirst(c) {
  return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
}
function isPlainSafeLast(c) {
  return !isWhitespace(c) && c !== CHAR_COLON;
}
function codePointAt(string, pos) {
  var first = string.charCodeAt(pos), second;
  if (first >= 55296 && first <= 56319 && pos + 1 < string.length) {
    second = string.charCodeAt(pos + 1);
    if (second >= 56320 && second <= 57343) {
      return (first - 55296) * 1024 + second - 56320 + 65536;
    }
  }
  return first;
}
function needIndentIndicator(string) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string);
}
var STYLE_PLAIN = 1, STYLE_SINGLE = 2, STYLE_LITERAL = 3, STYLE_FOLDED = 4, STYLE_DOUBLE = 5;
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
  var i2;
  var char = 0;
  var prevChar = null;
  var hasLineBreak = false;
  var hasFoldableLine = false;
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1;
  var plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
  if (singleLineOnly || forceQuotes) {
    for (i2 = 0; i2 < string.length; char >= 65536 ? i2 += 2 : i2++) {
      char = codePointAt(string, i2);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
  } else {
    for (i2 = 0; i2 < string.length; char >= 65536 ? i2 += 2 : i2++) {
      char = codePointAt(string, i2);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine || i2 - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
          previousLineBreak = i2;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
    hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i2 - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
  }
  if (!hasLineBreak && !hasFoldableLine) {
    if (plain && !forceQuotes && !testAmbiguousType(string)) {
      return STYLE_PLAIN;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }
  if (indentPerLevel > 9 && needIndentIndicator(string)) {
    return STYLE_DOUBLE;
  }
  if (!forceQuotes) {
    return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
  }
  return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
}
function writeScalar(state, string, level, iskey, inblock) {
  state.dump = function() {
    if (string.length === 0) {
      return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
    }
    if (!state.noCompatMode) {
      if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
        return state.quotingType === QUOTING_TYPE_DOUBLE ? '"' + string + '"' : "'" + string + "'";
      }
    }
    var indent = state.indent * Math.max(1, level);
    var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
    var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
    function testAmbiguity(string2) {
      return testImplicitResolving(state, string2);
    }
    switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity, state.quotingType, state.forceQuotes && !iskey, inblock)) {
      case STYLE_PLAIN:
        return string;
      case STYLE_SINGLE:
        return "'" + string.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
      case STYLE_FOLDED:
        return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string) + '"';
      default:
        throw new YAMLException("impossible error: invalid scalar style");
    }
  }();
}
function blockHeader(string, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
  var clip = string[string.length - 1] === "\n";
  var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
  var chomp = keep ? "+" : clip ? "" : "-";
  return indentIndicator + chomp + "\n";
}
function dropEndingNewline(string) {
  return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
}
function foldString(string, width) {
  var lineRe = /(\n+)([^\n]*)/g;
  var result = function() {
    var nextLF = string.indexOf("\n");
    nextLF = nextLF !== -1 ? nextLF : string.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string.slice(0, nextLF), width);
  }();
  var prevMoreIndented = string[0] === "\n" || string[0] === " ";
  var moreIndented;
  var match;
  while (match = lineRe.exec(string)) {
    var prefix = match[1], line = match[2];
    moreIndented = line[0] === " ";
    result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }
  return result;
}
function foldLine(line, width) {
  if (line === "" || line[0] === " ")
    return line;
  var breakRe = / [^ ]/g;
  var match;
  var start = 0, end, curr = 0, next = 0;
  var result = "";
  while (match = breakRe.exec(line)) {
    next = match.index;
    if (next - start > width) {
      end = curr > start ? curr : next;
      result += "\n" + line.slice(start, end);
      start = end + 1;
    }
    curr = next;
  }
  result += "\n";
  if (line.length - start > width && curr > start) {
    result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
  } else {
    result += line.slice(start);
  }
  return result.slice(1);
}
function escapeString(string) {
  var result = "";
  var char = 0;
  var escapeSeq;
  for (var i2 = 0; i2 < string.length; char >= 65536 ? i2 += 2 : i2++) {
    char = codePointAt(string, i2);
    escapeSeq = ESCAPE_SEQUENCES[char];
    if (!escapeSeq && isPrintable(char)) {
      result += string[i2];
      if (char >= 65536)
        result += string[i2 + 1];
    } else {
      result += escapeSeq || encodeHex(char);
    }
  }
  return result;
}
function writeFlowSequence(state, level, object) {
  var _result = "", _tag = state.tag, index, length, value;
  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];
    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }
    if (writeNode(state, level, value, false, false) || typeof value === "undefined" && writeNode(state, level, null, false, false)) {
      if (_result !== "")
        _result += "," + (!state.condenseFlow ? " " : "");
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = "[" + _result + "]";
}
function writeBlockSequence(state, level, object, compact) {
  var _result = "", _tag = state.tag, index, length, value;
  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];
    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }
    if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state, level + 1, null, true, true, false, true)) {
      if (!compact || _result !== "") {
        _result += generateNextLine(state, level);
      }
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += "-";
      } else {
        _result += "- ";
      }
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = _result || "[]";
}
function writeFlowMapping(state, level, object) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (_result !== "")
      pairBuffer += ", ";
    if (state.condenseFlow)
      pairBuffer += '"';
    objectKey = objectKeyList[index];
    objectValue = object[objectKey];
    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state, level, objectKey, false, false)) {
      continue;
    }
    if (state.dump.length > 1024)
      pairBuffer += "? ";
    pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
    if (!writeNode(state, level, objectValue, false, false)) {
      continue;
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = "{" + _result + "}";
}
function writeBlockMapping(state, level, object, compact) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
  if (state.sortKeys === true) {
    objectKeyList.sort();
  } else if (typeof state.sortKeys === "function") {
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    throw new YAMLException("sortKeys must be a boolean or a function");
  }
  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (!compact || _result !== "") {
      pairBuffer += generateNextLine(state, level);
    }
    objectKey = objectKeyList[index];
    objectValue = object[objectKey];
    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue;
    }
    explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += "?";
      } else {
        pairBuffer += "? ";
      }
    }
    pairBuffer += state.dump;
    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }
    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue;
    }
    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ":";
    } else {
      pairBuffer += ": ";
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = _result || "{}";
}
function detectType(state, object, explicit) {
  var _result, typeList, index, length, type2, style;
  typeList = explicit ? state.explicitTypes : state.implicitTypes;
  for (index = 0, length = typeList.length; index < length; index += 1) {
    type2 = typeList[index];
    if ((type2.instanceOf || type2.predicate) && (!type2.instanceOf || typeof object === "object" && object instanceof type2.instanceOf) && (!type2.predicate || type2.predicate(object))) {
      if (explicit) {
        if (type2.multi && type2.representName) {
          state.tag = type2.representName(object);
        } else {
          state.tag = type2.tag;
        }
      } else {
        state.tag = "?";
      }
      if (type2.represent) {
        style = state.styleMap[type2.tag] || type2.defaultStyle;
        if (_toString.call(type2.represent) === "[object Function]") {
          _result = type2.represent(object, style);
        } else if (_hasOwnProperty.call(type2.represent, style)) {
          _result = type2.represent[style](object, style);
        } else {
          throw new YAMLException("!<" + type2.tag + '> tag resolver accepts not "' + style + '" style');
        }
        state.dump = _result;
      }
      return true;
    }
  }
  return false;
}
function writeNode(state, level, object, block, compact, iskey, isblockseq) {
  state.tag = null;
  state.dump = object;
  if (!detectType(state, object, false)) {
    detectType(state, object, true);
  }
  var type2 = _toString.call(state.dump);
  var inblock = block;
  var tagStr;
  if (block) {
    block = state.flowLevel < 0 || state.flowLevel > level;
  }
  var objectOrArray = type2 === "[object Object]" || type2 === "[object Array]", duplicateIndex, duplicate;
  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object);
    duplicate = duplicateIndex !== -1;
  }
  if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
    compact = false;
  }
  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = "*ref_" + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type2 === "[object Object]") {
      if (block && Object.keys(state.dump).length !== 0) {
        writeBlockMapping(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object Array]") {
      if (block && state.dump.length !== 0) {
        if (state.noArrayIndent && !isblockseq && level > 0) {
          writeBlockSequence(state, level - 1, state.dump, compact);
        } else {
          writeBlockSequence(state, level, state.dump, compact);
        }
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowSequence(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object String]") {
      if (state.tag !== "?") {
        writeScalar(state, state.dump, level, iskey, inblock);
      }
    } else if (type2 === "[object Undefined]") {
      return false;
    } else {
      if (state.skipInvalid)
        return false;
      throw new YAMLException("unacceptable kind of an object to dump " + type2);
    }
    if (state.tag !== null && state.tag !== "?") {
      tagStr = encodeURI(state.tag[0] === "!" ? state.tag.slice(1) : state.tag).replace(/!/g, "%21");
      if (state.tag[0] === "!") {
        tagStr = "!" + tagStr;
      } else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") {
        tagStr = "!!" + tagStr.slice(18);
      } else {
        tagStr = "!<" + tagStr + ">";
      }
      state.dump = tagStr + " " + state.dump;
    }
  }
  return true;
}
function getDuplicateReferences(object, state) {
  var objects = [], duplicatesIndexes = [], index, length;
  inspectNode(object, objects, duplicatesIndexes);
  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index]]);
  }
  state.usedDuplicates = new Array(length);
}
function inspectNode(object, objects, duplicatesIndexes) {
  var objectKeyList, index, length;
  if (object !== null && typeof object === "object") {
    index = objects.indexOf(object);
    if (index !== -1) {
      if (duplicatesIndexes.indexOf(index) === -1) {
        duplicatesIndexes.push(index);
      }
    } else {
      objects.push(object);
      if (Array.isArray(object)) {
        for (index = 0, length = object.length; index < length; index += 1) {
          inspectNode(object[index], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object);
        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
        }
      }
    }
  }
}
function dump(input, options) {
  options = options || {};
  var state = new State(options);
  if (!state.noRefs)
    getDuplicateReferences(input, state);
  var value = input;
  if (state.replacer) {
    value = state.replacer.call({ "": value }, "", value);
  }
  if (writeNode(state, 0, value, true, true))
    return state.dump + "\n";
  return "";
}
dumper$1.dump = dump;
var loader = loader$1;
var dumper = dumper$1;
function renamed(from, to) {
  return function() {
    throw new Error("Function yaml." + from + " is removed in js-yaml 4. Use yaml." + to + " instead, which is now safe by default.");
  };
}
jsYaml.Type = type$2;
jsYaml.Schema = schema$2;
jsYaml.FAILSAFE_SCHEMA = failsafe;
jsYaml.JSON_SCHEMA = json;
jsYaml.CORE_SCHEMA = core$3;
jsYaml.DEFAULT_SCHEMA = _default;
jsYaml.load = loader.load;
jsYaml.loadAll = loader.loadAll;
jsYaml.dump = dumper.dump;
jsYaml.YAMLException = exception;
jsYaml.types = {
  binary,
  float,
  map,
  null: _null,
  pairs,
  set,
  timestamp,
  bool,
  int,
  merge,
  omap,
  seq,
  str
};
jsYaml.safeLoad = renamed("safeLoad", "load");
jsYaml.safeLoadAll = renamed("safeLoadAll", "loadAll");
jsYaml.safeDump = renamed("safeDump", "dump");
var main = {};
Object.defineProperty(main, "__esModule", { value: true });
main.Lazy = void 0;
class Lazy {
  constructor(creator) {
    this._value = null;
    this.creator = creator;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null) {
      return this._value;
    }
    const result = this.creator();
    this.value = result;
    return result;
  }
  set value(value) {
    this._value = value;
    this.creator = null;
  }
}
main.Lazy = Lazy;
var re$5 = { exports: {} };
const SEMVER_SPEC_VERSION = "2.0.0";
const MAX_LENGTH$2 = 256;
const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER || 9007199254740991;
const MAX_SAFE_COMPONENT_LENGTH = 16;
var constants = {
  SEMVER_SPEC_VERSION,
  MAX_LENGTH: MAX_LENGTH$2,
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
  MAX_SAFE_COMPONENT_LENGTH
};
const debug$3 = typeof process === "object" && process.env && {}.NODE_DEBUG && /\bsemver\b/i.test({}.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
};
var debug_1 = debug$3;
(function(module, exports) {
  const { MAX_SAFE_COMPONENT_LENGTH: MAX_SAFE_COMPONENT_LENGTH2 } = constants;
  const debug2 = debug_1;
  exports = module.exports = {};
  const re2 = exports.re = [];
  const src = exports.src = [];
  const t2 = exports.t = {};
  let R = 0;
  const createToken = (name, value, isGlobal) => {
    const index = R++;
    debug2(index, value);
    t2[name] = index;
    src[index] = value;
    re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
  };
  createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
  createToken("NUMERICIDENTIFIERLOOSE", "[0-9]+");
  createToken("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*");
  createToken("MAINVERSION", `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`);
  createToken("MAINVERSIONLOOSE", `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`);
  createToken("PRERELEASEIDENTIFIER", `(?:${src[t2.NUMERICIDENTIFIER]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t2.NUMERICIDENTIFIERLOOSE]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASE", `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`);
  createToken("PRERELEASELOOSE", `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`);
  createToken("BUILDIDENTIFIER", "[0-9A-Za-z-]+");
  createToken("BUILD", `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`);
  createToken("FULLPLAIN", `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`);
  createToken("FULL", `^${src[t2.FULLPLAIN]}$`);
  createToken("LOOSEPLAIN", `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`);
  createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`);
  createToken("GTLT", "((?:<|>)?=?)");
  createToken("XRANGEIDENTIFIERLOOSE", `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  createToken("XRANGEIDENTIFIER", `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`);
  createToken("XRANGEPLAIN", `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${src[t2.PRERELEASE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`);
  createToken("XRANGELOOSE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COERCE", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH2}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:$|[^\\d])`);
  createToken("COERCERTL", src[t2.COERCE], true);
  createToken("LONETILDE", "(?:~>?)");
  createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true);
  exports.tildeTrimReplace = "$1~";
  createToken("TILDE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`);
  createToken("TILDELOOSE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("LONECARET", "(?:\\^)");
  createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true);
  exports.caretTrimReplace = "$1^";
  createToken("CARET", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`);
  createToken("CARETLOOSE", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COMPARATORLOOSE", `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`);
  createToken("COMPARATOR", `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`);
  createToken("COMPARATORTRIM", `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`, true);
  exports.comparatorTrimReplace = "$1$2$3";
  createToken("HYPHENRANGE", `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`);
  createToken("HYPHENRANGELOOSE", `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`);
  createToken("STAR", "(<|>)?=?\\s*\\*");
  createToken("GTE0", "^\\s*>=\\s*0.0.0\\s*$");
  createToken("GTE0PRE", "^\\s*>=\\s*0.0.0-0\\s*$");
})(re$5, re$5.exports);
const opts = ["includePrerelease", "loose", "rtl"];
const parseOptions$4 = (options) => !options ? {} : typeof options !== "object" ? { loose: true } : opts.filter((k) => options[k]).reduce((options2, k) => {
  options2[k] = true;
  return options2;
}, {});
var parseOptions_1 = parseOptions$4;
const numeric = /^[0-9]+$/;
const compareIdentifiers$1 = (a, b) => {
  const anum = numeric.test(a);
  const bnum = numeric.test(b);
  if (anum && bnum) {
    a = +a;
    b = +b;
  }
  return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};
const rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);
var identifiers = {
  compareIdentifiers: compareIdentifiers$1,
  rcompareIdentifiers
};
const debug$2 = debug_1;
const { MAX_LENGTH: MAX_LENGTH$1, MAX_SAFE_INTEGER } = constants;
const { re: re$4, t: t$4 } = re$5.exports;
const parseOptions$3 = parseOptions_1;
const { compareIdentifiers } = identifiers;
class SemVer$e {
  constructor(version, options) {
    options = parseOptions$3(options);
    if (version instanceof SemVer$e) {
      if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
        return version;
      } else {
        version = version.version;
      }
    } else if (typeof version !== "string") {
      throw new TypeError(`Invalid Version: ${version}`);
    }
    if (version.length > MAX_LENGTH$1) {
      throw new TypeError(`version is longer than ${MAX_LENGTH$1} characters`);
    }
    debug$2("SemVer", version, options);
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    const m2 = version.trim().match(options.loose ? re$4[t$4.LOOSE] : re$4[t$4.FULL]);
    if (!m2) {
      throw new TypeError(`Invalid Version: ${version}`);
    }
    this.raw = version;
    this.major = +m2[1];
    this.minor = +m2[2];
    this.patch = +m2[3];
    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError("Invalid major version");
    }
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError("Invalid minor version");
    }
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError("Invalid patch version");
    }
    if (!m2[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m2[4].split(".").map((id2) => {
        if (/^[0-9]+$/.test(id2)) {
          const num = +id2;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num;
          }
        }
        return id2;
      });
    }
    this.build = m2[5] ? m2[5].split(".") : [];
    this.format();
  }
  format() {
    this.version = `${this.major}.${this.minor}.${this.patch}`;
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join(".")}`;
    }
    return this.version;
  }
  toString() {
    return this.version;
  }
  compare(other) {
    debug$2("SemVer.compare", this.version, this.options, other);
    if (!(other instanceof SemVer$e)) {
      if (typeof other === "string" && other === this.version) {
        return 0;
      }
      other = new SemVer$e(other, this.options);
    }
    if (other.version === this.version) {
      return 0;
    }
    return this.compareMain(other) || this.comparePre(other);
  }
  compareMain(other) {
    if (!(other instanceof SemVer$e)) {
      other = new SemVer$e(other, this.options);
    }
    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  }
  comparePre(other) {
    if (!(other instanceof SemVer$e)) {
      other = new SemVer$e(other, this.options);
    }
    if (this.prerelease.length && !other.prerelease.length) {
      return -1;
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1;
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0;
    }
    let i2 = 0;
    do {
      const a = this.prerelease[i2];
      const b = other.prerelease[i2];
      debug$2("prerelease compare", i2, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i2);
  }
  compareBuild(other) {
    if (!(other instanceof SemVer$e)) {
      other = new SemVer$e(other, this.options);
    }
    let i2 = 0;
    do {
      const a = this.build[i2];
      const b = other.build[i2];
      debug$2("prerelease compare", i2, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i2);
  }
  inc(release, identifier) {
    switch (release) {
      case "premajor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc("pre", identifier);
        break;
      case "preminor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc("pre", identifier);
        break;
      case "prepatch":
        this.prerelease.length = 0;
        this.inc("patch", identifier);
        this.inc("pre", identifier);
        break;
      case "prerelease":
        if (this.prerelease.length === 0) {
          this.inc("patch", identifier);
        }
        this.inc("pre", identifier);
        break;
      case "major":
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case "minor":
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break;
      case "patch":
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break;
      case "pre":
        if (this.prerelease.length === 0) {
          this.prerelease = [0];
        } else {
          let i2 = this.prerelease.length;
          while (--i2 >= 0) {
            if (typeof this.prerelease[i2] === "number") {
              this.prerelease[i2]++;
              i2 = -2;
            }
          }
          if (i2 === -1) {
            this.prerelease.push(0);
          }
        }
        if (identifier) {
          if (this.prerelease[0] === identifier) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0];
            }
          } else {
            this.prerelease = [identifier, 0];
          }
        }
        break;
      default:
        throw new Error(`invalid increment argument: ${release}`);
    }
    this.format();
    this.raw = this.version;
    return this;
  }
}
var semver$2 = SemVer$e;
const { MAX_LENGTH } = constants;
const { re: re$3, t: t$3 } = re$5.exports;
const SemVer$d = semver$2;
const parseOptions$2 = parseOptions_1;
const parse$5 = (version, options) => {
  options = parseOptions$2(options);
  if (version instanceof SemVer$d) {
    return version;
  }
  if (typeof version !== "string") {
    return null;
  }
  if (version.length > MAX_LENGTH) {
    return null;
  }
  const r = options.loose ? re$3[t$3.LOOSE] : re$3[t$3.FULL];
  if (!r.test(version)) {
    return null;
  }
  try {
    return new SemVer$d(version, options);
  } catch (er) {
    return null;
  }
};
var parse_1 = parse$5;
const parse$4 = parse_1;
const valid$1 = (version, options) => {
  const v = parse$4(version, options);
  return v ? v.version : null;
};
var valid_1 = valid$1;
const parse$3 = parse_1;
const clean = (version, options) => {
  const s2 = parse$3(version.trim().replace(/^[=v]+/, ""), options);
  return s2 ? s2.version : null;
};
var clean_1 = clean;
const SemVer$c = semver$2;
const inc = (version, release, options, identifier) => {
  if (typeof options === "string") {
    identifier = options;
    options = void 0;
  }
  try {
    return new SemVer$c(version, options).inc(release, identifier).version;
  } catch (er) {
    return null;
  }
};
var inc_1 = inc;
const SemVer$b = semver$2;
const compare$a = (a, b, loose) => new SemVer$b(a, loose).compare(new SemVer$b(b, loose));
var compare_1 = compare$a;
const compare$9 = compare_1;
const eq$2 = (a, b, loose) => compare$9(a, b, loose) === 0;
var eq_1 = eq$2;
const parse$2 = parse_1;
const eq$1 = eq_1;
const diff = (version1, version2) => {
  if (eq$1(version1, version2)) {
    return null;
  } else {
    const v1 = parse$2(version1);
    const v2 = parse$2(version2);
    const hasPre = v1.prerelease.length || v2.prerelease.length;
    const prefix = hasPre ? "pre" : "";
    const defaultResult = hasPre ? "prerelease" : "";
    for (const key in v1) {
      if (key === "major" || key === "minor" || key === "patch") {
        if (v1[key] !== v2[key]) {
          return prefix + key;
        }
      }
    }
    return defaultResult;
  }
};
var diff_1 = diff;
const SemVer$a = semver$2;
const major = (a, loose) => new SemVer$a(a, loose).major;
var major_1 = major;
const SemVer$9 = semver$2;
const minor = (a, loose) => new SemVer$9(a, loose).minor;
var minor_1 = minor;
const SemVer$8 = semver$2;
const patch = (a, loose) => new SemVer$8(a, loose).patch;
var patch_1 = patch;
const parse$1 = parse_1;
const prerelease = (version, options) => {
  const parsed = parse$1(version, options);
  return parsed && parsed.prerelease.length ? parsed.prerelease : null;
};
var prerelease_1 = prerelease;
const compare$8 = compare_1;
const rcompare = (a, b, loose) => compare$8(b, a, loose);
var rcompare_1 = rcompare;
const compare$7 = compare_1;
const compareLoose = (a, b) => compare$7(a, b, true);
var compareLoose_1 = compareLoose;
const SemVer$7 = semver$2;
const compareBuild$2 = (a, b, loose) => {
  const versionA = new SemVer$7(a, loose);
  const versionB = new SemVer$7(b, loose);
  return versionA.compare(versionB) || versionA.compareBuild(versionB);
};
var compareBuild_1 = compareBuild$2;
const compareBuild$1 = compareBuild_1;
const sort = (list, loose) => list.sort((a, b) => compareBuild$1(a, b, loose));
var sort_1 = sort;
const compareBuild = compareBuild_1;
const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
var rsort_1 = rsort;
const compare$6 = compare_1;
const gt$3 = (a, b, loose) => compare$6(a, b, loose) > 0;
var gt_1 = gt$3;
const compare$5 = compare_1;
const lt$2 = (a, b, loose) => compare$5(a, b, loose) < 0;
var lt_1 = lt$2;
const compare$4 = compare_1;
const neq$1 = (a, b, loose) => compare$4(a, b, loose) !== 0;
var neq_1 = neq$1;
const compare$3 = compare_1;
const gte$2 = (a, b, loose) => compare$3(a, b, loose) >= 0;
var gte_1 = gte$2;
const compare$2 = compare_1;
const lte$2 = (a, b, loose) => compare$2(a, b, loose) <= 0;
var lte_1 = lte$2;
const eq = eq_1;
const neq = neq_1;
const gt$2 = gt_1;
const gte$1 = gte_1;
const lt$1 = lt_1;
const lte$1 = lte_1;
const cmp$1 = (a, op, b, loose) => {
  switch (op) {
    case "===":
      if (typeof a === "object")
        a = a.version;
      if (typeof b === "object")
        b = b.version;
      return a === b;
    case "!==":
      if (typeof a === "object")
        a = a.version;
      if (typeof b === "object")
        b = b.version;
      return a !== b;
    case "":
    case "=":
    case "==":
      return eq(a, b, loose);
    case "!=":
      return neq(a, b, loose);
    case ">":
      return gt$2(a, b, loose);
    case ">=":
      return gte$1(a, b, loose);
    case "<":
      return lt$1(a, b, loose);
    case "<=":
      return lte$1(a, b, loose);
    default:
      throw new TypeError(`Invalid operator: ${op}`);
  }
};
var cmp_1 = cmp$1;
const SemVer$6 = semver$2;
const parse = parse_1;
const { re: re$2, t: t$2 } = re$5.exports;
const coerce = (version, options) => {
  if (version instanceof SemVer$6) {
    return version;
  }
  if (typeof version === "number") {
    version = String(version);
  }
  if (typeof version !== "string") {
    return null;
  }
  options = options || {};
  let match = null;
  if (!options.rtl) {
    match = version.match(re$2[t$2.COERCE]);
  } else {
    let next;
    while ((next = re$2[t$2.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)) {
      if (!match || next.index + next[0].length !== match.index + match[0].length) {
        match = next;
      }
      re$2[t$2.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
    }
    re$2[t$2.COERCERTL].lastIndex = -1;
  }
  if (match === null)
    return null;
  return parse(`${match[2]}.${match[3] || "0"}.${match[4] || "0"}`, options);
};
var coerce_1 = coerce;
var iterator = function(Yallist2) {
  Yallist2.prototype[Symbol.iterator] = function* () {
    for (let walker = this.head; walker; walker = walker.next) {
      yield walker.value;
    }
  };
};
var yallist = Yallist$1;
Yallist$1.Node = Node;
Yallist$1.create = Yallist$1;
function Yallist$1(list) {
  var self2 = this;
  if (!(self2 instanceof Yallist$1)) {
    self2 = new Yallist$1();
  }
  self2.tail = null;
  self2.head = null;
  self2.length = 0;
  if (list && typeof list.forEach === "function") {
    list.forEach(function(item) {
      self2.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i2 = 0, l = arguments.length; i2 < l; i2++) {
      self2.push(arguments[i2]);
    }
  }
  return self2;
}
Yallist$1.prototype.removeNode = function(node) {
  if (node.list !== this) {
    throw new Error("removing node which does not belong to this list");
  }
  var next = node.next;
  var prev = node.prev;
  if (next) {
    next.prev = prev;
  }
  if (prev) {
    prev.next = next;
  }
  if (node === this.head) {
    this.head = next;
  }
  if (node === this.tail) {
    this.tail = prev;
  }
  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;
  return next;
};
Yallist$1.prototype.unshiftNode = function(node) {
  if (node === this.head) {
    return;
  }
  if (node.list) {
    node.list.removeNode(node);
  }
  var head = this.head;
  node.list = this;
  node.next = head;
  if (head) {
    head.prev = node;
  }
  this.head = node;
  if (!this.tail) {
    this.tail = node;
  }
  this.length++;
};
Yallist$1.prototype.pushNode = function(node) {
  if (node === this.tail) {
    return;
  }
  if (node.list) {
    node.list.removeNode(node);
  }
  var tail = this.tail;
  node.list = this;
  node.prev = tail;
  if (tail) {
    tail.next = node;
  }
  this.tail = node;
  if (!this.head) {
    this.head = node;
  }
  this.length++;
};
Yallist$1.prototype.push = function() {
  for (var i2 = 0, l = arguments.length; i2 < l; i2++) {
    push(this, arguments[i2]);
  }
  return this.length;
};
Yallist$1.prototype.unshift = function() {
  for (var i2 = 0, l = arguments.length; i2 < l; i2++) {
    unshift(this, arguments[i2]);
  }
  return this.length;
};
Yallist$1.prototype.pop = function() {
  if (!this.tail) {
    return void 0;
  }
  var res = this.tail.value;
  this.tail = this.tail.prev;
  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }
  this.length--;
  return res;
};
Yallist$1.prototype.shift = function() {
  if (!this.head) {
    return void 0;
  }
  var res = this.head.value;
  this.head = this.head.next;
  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }
  this.length--;
  return res;
};
Yallist$1.prototype.forEach = function(fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.head, i2 = 0; walker !== null; i2++) {
    fn.call(thisp, walker.value, i2, this);
    walker = walker.next;
  }
};
Yallist$1.prototype.forEachReverse = function(fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.tail, i2 = this.length - 1; walker !== null; i2--) {
    fn.call(thisp, walker.value, i2, this);
    walker = walker.prev;
  }
};
Yallist$1.prototype.get = function(n) {
  for (var i2 = 0, walker = this.head; walker !== null && i2 < n; i2++) {
    walker = walker.next;
  }
  if (i2 === n && walker !== null) {
    return walker.value;
  }
};
Yallist$1.prototype.getReverse = function(n) {
  for (var i2 = 0, walker = this.tail; walker !== null && i2 < n; i2++) {
    walker = walker.prev;
  }
  if (i2 === n && walker !== null) {
    return walker.value;
  }
};
Yallist$1.prototype.map = function(fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$1();
  for (var walker = this.head; walker !== null; ) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }
  return res;
};
Yallist$1.prototype.mapReverse = function(fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$1();
  for (var walker = this.tail; walker !== null; ) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }
  return res;
};
Yallist$1.prototype.reduce = function(fn, initial) {
  var acc;
  var walker = this.head;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError("Reduce of empty list with no initial value");
  }
  for (var i2 = 0; walker !== null; i2++) {
    acc = fn(acc, walker.value, i2);
    walker = walker.next;
  }
  return acc;
};
Yallist$1.prototype.reduceReverse = function(fn, initial) {
  var acc;
  var walker = this.tail;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError("Reduce of empty list with no initial value");
  }
  for (var i2 = this.length - 1; walker !== null; i2--) {
    acc = fn(acc, walker.value, i2);
    walker = walker.prev;
  }
  return acc;
};
Yallist$1.prototype.toArray = function() {
  var arr = new Array(this.length);
  for (var i2 = 0, walker = this.head; walker !== null; i2++) {
    arr[i2] = walker.value;
    walker = walker.next;
  }
  return arr;
};
Yallist$1.prototype.toArrayReverse = function() {
  var arr = new Array(this.length);
  for (var i2 = 0, walker = this.tail; walker !== null; i2++) {
    arr[i2] = walker.value;
    walker = walker.prev;
  }
  return arr;
};
Yallist$1.prototype.slice = function(from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist$1();
  if (to < from || to < 0) {
    return ret;
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i2 = 0, walker = this.head; walker !== null && i2 < from; i2++) {
    walker = walker.next;
  }
  for (; walker !== null && i2 < to; i2++, walker = walker.next) {
    ret.push(walker.value);
  }
  return ret;
};
Yallist$1.prototype.sliceReverse = function(from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist$1();
  if (to < from || to < 0) {
    return ret;
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i2 = this.length, walker = this.tail; walker !== null && i2 > to; i2--) {
    walker = walker.prev;
  }
  for (; walker !== null && i2 > from; i2--, walker = walker.prev) {
    ret.push(walker.value);
  }
  return ret;
};
Yallist$1.prototype.splice = function(start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1;
  }
  if (start < 0) {
    start = this.length + start;
  }
  for (var i2 = 0, walker = this.head; walker !== null && i2 < start; i2++) {
    walker = walker.next;
  }
  var ret = [];
  for (var i2 = 0; walker && i2 < deleteCount; i2++) {
    ret.push(walker.value);
    walker = this.removeNode(walker);
  }
  if (walker === null) {
    walker = this.tail;
  }
  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev;
  }
  for (var i2 = 0; i2 < nodes.length; i2++) {
    walker = insert(this, walker, nodes[i2]);
  }
  return ret;
};
Yallist$1.prototype.reverse = function() {
  var head = this.head;
  var tail = this.tail;
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }
  this.head = tail;
  this.tail = head;
  return this;
};
function insert(self2, node, value) {
  var inserted = node === self2.head ? new Node(value, null, node, self2) : new Node(value, node, node.next, self2);
  if (inserted.next === null) {
    self2.tail = inserted;
  }
  if (inserted.prev === null) {
    self2.head = inserted;
  }
  self2.length++;
  return inserted;
}
function push(self2, item) {
  self2.tail = new Node(item, self2.tail, null, self2);
  if (!self2.head) {
    self2.head = self2.tail;
  }
  self2.length++;
}
function unshift(self2, item) {
  self2.head = new Node(item, null, self2.head, self2);
  if (!self2.tail) {
    self2.tail = self2.head;
  }
  self2.length++;
}
function Node(value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list);
  }
  this.list = list;
  this.value = value;
  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }
  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}
try {
  iterator(Yallist$1);
} catch (er) {
}
const Yallist = yallist;
const MAX = Symbol("max");
const LENGTH = Symbol("length");
const LENGTH_CALCULATOR = Symbol("lengthCalculator");
const ALLOW_STALE = Symbol("allowStale");
const MAX_AGE = Symbol("maxAge");
const DISPOSE = Symbol("dispose");
const NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet");
const LRU_LIST = Symbol("lruList");
const CACHE = Symbol("cache");
const UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet");
const naiveLength = () => 1;
class LRUCache {
  constructor(options) {
    if (typeof options === "number")
      options = { max: options };
    if (!options)
      options = {};
    if (options.max && (typeof options.max !== "number" || options.max < 0))
      throw new TypeError("max must be a non-negative number");
    this[MAX] = options.max || Infinity;
    const lc = options.length || naiveLength;
    this[LENGTH_CALCULATOR] = typeof lc !== "function" ? naiveLength : lc;
    this[ALLOW_STALE] = options.stale || false;
    if (options.maxAge && typeof options.maxAge !== "number")
      throw new TypeError("maxAge must be a number");
    this[MAX_AGE] = options.maxAge || 0;
    this[DISPOSE] = options.dispose;
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
    this.reset();
  }
  set max(mL) {
    if (typeof mL !== "number" || mL < 0)
      throw new TypeError("max must be a non-negative number");
    this[MAX] = mL || Infinity;
    trim(this);
  }
  get max() {
    return this[MAX];
  }
  set allowStale(allowStale) {
    this[ALLOW_STALE] = !!allowStale;
  }
  get allowStale() {
    return this[ALLOW_STALE];
  }
  set maxAge(mA) {
    if (typeof mA !== "number")
      throw new TypeError("maxAge must be a non-negative number");
    this[MAX_AGE] = mA;
    trim(this);
  }
  get maxAge() {
    return this[MAX_AGE];
  }
  set lengthCalculator(lC) {
    if (typeof lC !== "function")
      lC = naiveLength;
    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC;
      this[LENGTH] = 0;
      this[LRU_LIST].forEach((hit) => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
        this[LENGTH] += hit.length;
      });
    }
    trim(this);
  }
  get lengthCalculator() {
    return this[LENGTH_CALCULATOR];
  }
  get length() {
    return this[LENGTH];
  }
  get itemCount() {
    return this[LRU_LIST].length;
  }
  rforEach(fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].tail; walker !== null; ) {
      const prev = walker.prev;
      forEachStep(this, fn, walker, thisp);
      walker = prev;
    }
  }
  forEach(fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].head; walker !== null; ) {
      const next = walker.next;
      forEachStep(this, fn, walker, thisp);
      walker = next;
    }
  }
  keys() {
    return this[LRU_LIST].toArray().map((k) => k.key);
  }
  values() {
    return this[LRU_LIST].toArray().map((k) => k.value);
  }
  reset() {
    if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
      this[LRU_LIST].forEach((hit) => this[DISPOSE](hit.key, hit.value));
    }
    this[CACHE] = new Map();
    this[LRU_LIST] = new Yallist();
    this[LENGTH] = 0;
  }
  dump() {
    return this[LRU_LIST].map((hit) => isStale(this, hit) ? false : {
      k: hit.key,
      v: hit.value,
      e: hit.now + (hit.maxAge || 0)
    }).toArray().filter((h2) => h2);
  }
  dumpLru() {
    return this[LRU_LIST];
  }
  set(key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE];
    if (maxAge && typeof maxAge !== "number")
      throw new TypeError("maxAge must be a number");
    const now = maxAge ? Date.now() : 0;
    const len = this[LENGTH_CALCULATOR](value, key);
    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key));
        return false;
      }
      const node = this[CACHE].get(key);
      const item = node.value;
      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET])
          this[DISPOSE](key, item.value);
      }
      item.now = now;
      item.maxAge = maxAge;
      item.value = value;
      this[LENGTH] += len - item.length;
      item.length = len;
      this.get(key);
      trim(this);
      return true;
    }
    const hit = new Entry(key, value, len, now, maxAge);
    if (hit.length > this[MAX]) {
      if (this[DISPOSE])
        this[DISPOSE](key, value);
      return false;
    }
    this[LENGTH] += hit.length;
    this[LRU_LIST].unshift(hit);
    this[CACHE].set(key, this[LRU_LIST].head);
    trim(this);
    return true;
  }
  has(key) {
    if (!this[CACHE].has(key))
      return false;
    const hit = this[CACHE].get(key).value;
    return !isStale(this, hit);
  }
  get(key) {
    return get(this, key, true);
  }
  peek(key) {
    return get(this, key, false);
  }
  pop() {
    const node = this[LRU_LIST].tail;
    if (!node)
      return null;
    del(this, node);
    return node.value;
  }
  del(key) {
    del(this, this[CACHE].get(key));
  }
  load(arr) {
    this.reset();
    const now = Date.now();
    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l];
      const expiresAt = hit.e || 0;
      if (expiresAt === 0)
        this.set(hit.k, hit.v);
      else {
        const maxAge = expiresAt - now;
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge);
        }
      }
    }
  }
  prune() {
    this[CACHE].forEach((value, key) => get(this, key, false));
  }
}
const get = (self2, key, doUse) => {
  const node = self2[CACHE].get(key);
  if (node) {
    const hit = node.value;
    if (isStale(self2, hit)) {
      del(self2, node);
      if (!self2[ALLOW_STALE])
        return void 0;
    } else {
      if (doUse) {
        if (self2[UPDATE_AGE_ON_GET])
          node.value.now = Date.now();
        self2[LRU_LIST].unshiftNode(node);
      }
    }
    return hit.value;
  }
};
const isStale = (self2, hit) => {
  if (!hit || !hit.maxAge && !self2[MAX_AGE])
    return false;
  const diff2 = Date.now() - hit.now;
  return hit.maxAge ? diff2 > hit.maxAge : self2[MAX_AGE] && diff2 > self2[MAX_AGE];
};
const trim = (self2) => {
  if (self2[LENGTH] > self2[MAX]) {
    for (let walker = self2[LRU_LIST].tail; self2[LENGTH] > self2[MAX] && walker !== null; ) {
      const prev = walker.prev;
      del(self2, walker);
      walker = prev;
    }
  }
};
const del = (self2, node) => {
  if (node) {
    const hit = node.value;
    if (self2[DISPOSE])
      self2[DISPOSE](hit.key, hit.value);
    self2[LENGTH] -= hit.length;
    self2[CACHE].delete(hit.key);
    self2[LRU_LIST].removeNode(node);
  }
};
class Entry {
  constructor(key, value, length, now, maxAge) {
    this.key = key;
    this.value = value;
    this.length = length;
    this.now = now;
    this.maxAge = maxAge || 0;
  }
}
const forEachStep = (self2, fn, node, thisp) => {
  let hit = node.value;
  if (isStale(self2, hit)) {
    del(self2, node);
    if (!self2[ALLOW_STALE])
      hit = void 0;
  }
  if (hit)
    fn.call(thisp, hit.value, hit.key, self2);
};
var lruCache = LRUCache;
class Range$a {
  constructor(range2, options) {
    options = parseOptions$1(options);
    if (range2 instanceof Range$a) {
      if (range2.loose === !!options.loose && range2.includePrerelease === !!options.includePrerelease) {
        return range2;
      } else {
        return new Range$a(range2.raw, options);
      }
    }
    if (range2 instanceof Comparator$3) {
      this.raw = range2.value;
      this.set = [[range2]];
      this.format();
      return this;
    }
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    this.raw = range2;
    this.set = range2.split(/\s*\|\|\s*/).map((range3) => this.parseRange(range3.trim())).filter((c) => c.length);
    if (!this.set.length) {
      throw new TypeError(`Invalid SemVer Range: ${range2}`);
    }
    if (this.set.length > 1) {
      const first = this.set[0];
      this.set = this.set.filter((c) => !isNullSet(c[0]));
      if (this.set.length === 0)
        this.set = [first];
      else if (this.set.length > 1) {
        for (const c of this.set) {
          if (c.length === 1 && isAny(c[0])) {
            this.set = [c];
            break;
          }
        }
      }
    }
    this.format();
  }
  format() {
    this.range = this.set.map((comps) => {
      return comps.join(" ").trim();
    }).join("||").trim();
    return this.range;
  }
  toString() {
    return this.range;
  }
  parseRange(range2) {
    range2 = range2.trim();
    const memoOpts = Object.keys(this.options).join(",");
    const memoKey = `parseRange:${memoOpts}:${range2}`;
    const cached = cache.get(memoKey);
    if (cached)
      return cached;
    const loose = this.options.loose;
    const hr = loose ? re$1[t$1.HYPHENRANGELOOSE] : re$1[t$1.HYPHENRANGE];
    range2 = range2.replace(hr, hyphenReplace(this.options.includePrerelease));
    debug$1("hyphen replace", range2);
    range2 = range2.replace(re$1[t$1.COMPARATORTRIM], comparatorTrimReplace);
    debug$1("comparator trim", range2, re$1[t$1.COMPARATORTRIM]);
    range2 = range2.replace(re$1[t$1.TILDETRIM], tildeTrimReplace);
    range2 = range2.replace(re$1[t$1.CARETTRIM], caretTrimReplace);
    range2 = range2.split(/\s+/).join(" ");
    const compRe = loose ? re$1[t$1.COMPARATORLOOSE] : re$1[t$1.COMPARATOR];
    const rangeList = range2.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options)).filter(this.options.loose ? (comp) => !!comp.match(compRe) : () => true).map((comp) => new Comparator$3(comp, this.options));
    rangeList.length;
    const rangeMap = new Map();
    for (const comp of rangeList) {
      if (isNullSet(comp))
        return [comp];
      rangeMap.set(comp.value, comp);
    }
    if (rangeMap.size > 1 && rangeMap.has(""))
      rangeMap.delete("");
    const result = [...rangeMap.values()];
    cache.set(memoKey, result);
    return result;
  }
  intersects(range2, options) {
    if (!(range2 instanceof Range$a)) {
      throw new TypeError("a Range is required");
    }
    return this.set.some((thisComparators) => {
      return isSatisfiable(thisComparators, options) && range2.set.some((rangeComparators) => {
        return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
          return rangeComparators.every((rangeComparator) => {
            return thisComparator.intersects(rangeComparator, options);
          });
        });
      });
    });
  }
  test(version) {
    if (!version) {
      return false;
    }
    if (typeof version === "string") {
      try {
        version = new SemVer$5(version, this.options);
      } catch (er) {
        return false;
      }
    }
    for (let i2 = 0; i2 < this.set.length; i2++) {
      if (testSet(this.set[i2], version, this.options)) {
        return true;
      }
    }
    return false;
  }
}
var range = Range$a;
const LRU = lruCache;
const cache = new LRU({ max: 1e3 });
const parseOptions$1 = parseOptions_1;
const Comparator$3 = comparator;
const debug$1 = debug_1;
const SemVer$5 = semver$2;
const {
  re: re$1,
  t: t$1,
  comparatorTrimReplace,
  tildeTrimReplace,
  caretTrimReplace
} = re$5.exports;
const isNullSet = (c) => c.value === "<0.0.0-0";
const isAny = (c) => c.value === "";
const isSatisfiable = (comparators, options) => {
  let result = true;
  const remainingComparators = comparators.slice();
  let testComparator = remainingComparators.pop();
  while (result && remainingComparators.length) {
    result = remainingComparators.every((otherComparator) => {
      return testComparator.intersects(otherComparator, options);
    });
    testComparator = remainingComparators.pop();
  }
  return result;
};
const parseComparator = (comp, options) => {
  debug$1("comp", comp, options);
  comp = replaceCarets(comp, options);
  debug$1("caret", comp);
  comp = replaceTildes(comp, options);
  debug$1("tildes", comp);
  comp = replaceXRanges(comp, options);
  debug$1("xrange", comp);
  comp = replaceStars(comp, options);
  debug$1("stars", comp);
  return comp;
};
const isX = (id2) => !id2 || id2.toLowerCase() === "x" || id2 === "*";
const replaceTildes = (comp, options) => comp.trim().split(/\s+/).map((comp2) => {
  return replaceTilde(comp2, options);
}).join(" ");
const replaceTilde = (comp, options) => {
  const r = options.loose ? re$1[t$1.TILDELOOSE] : re$1[t$1.TILDE];
  return comp.replace(r, (_, M, m2, p, pr) => {
    debug$1("tilde", comp, _, M, m2, p, pr);
    let ret;
    if (isX(M)) {
      ret = "";
    } else if (isX(m2)) {
      ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
    } else if (isX(p)) {
      ret = `>=${M}.${m2}.0 <${M}.${+m2 + 1}.0-0`;
    } else if (pr) {
      debug$1("replaceTilde pr", pr);
      ret = `>=${M}.${m2}.${p}-${pr} <${M}.${+m2 + 1}.0-0`;
    } else {
      ret = `>=${M}.${m2}.${p} <${M}.${+m2 + 1}.0-0`;
    }
    debug$1("tilde return", ret);
    return ret;
  });
};
const replaceCarets = (comp, options) => comp.trim().split(/\s+/).map((comp2) => {
  return replaceCaret(comp2, options);
}).join(" ");
const replaceCaret = (comp, options) => {
  debug$1("caret", comp, options);
  const r = options.loose ? re$1[t$1.CARETLOOSE] : re$1[t$1.CARET];
  const z = options.includePrerelease ? "-0" : "";
  return comp.replace(r, (_, M, m2, p, pr) => {
    debug$1("caret", comp, _, M, m2, p, pr);
    let ret;
    if (isX(M)) {
      ret = "";
    } else if (isX(m2)) {
      ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
    } else if (isX(p)) {
      if (M === "0") {
        ret = `>=${M}.${m2}.0${z} <${M}.${+m2 + 1}.0-0`;
      } else {
        ret = `>=${M}.${m2}.0${z} <${+M + 1}.0.0-0`;
      }
    } else if (pr) {
      debug$1("replaceCaret pr", pr);
      if (M === "0") {
        if (m2 === "0") {
          ret = `>=${M}.${m2}.${p}-${pr} <${M}.${m2}.${+p + 1}-0`;
        } else {
          ret = `>=${M}.${m2}.${p}-${pr} <${M}.${+m2 + 1}.0-0`;
        }
      } else {
        ret = `>=${M}.${m2}.${p}-${pr} <${+M + 1}.0.0-0`;
      }
    } else {
      debug$1("no pr");
      if (M === "0") {
        if (m2 === "0") {
          ret = `>=${M}.${m2}.${p}${z} <${M}.${m2}.${+p + 1}-0`;
        } else {
          ret = `>=${M}.${m2}.${p}${z} <${M}.${+m2 + 1}.0-0`;
        }
      } else {
        ret = `>=${M}.${m2}.${p} <${+M + 1}.0.0-0`;
      }
    }
    debug$1("caret return", ret);
    return ret;
  });
};
const replaceXRanges = (comp, options) => {
  debug$1("replaceXRanges", comp, options);
  return comp.split(/\s+/).map((comp2) => {
    return replaceXRange(comp2, options);
  }).join(" ");
};
const replaceXRange = (comp, options) => {
  comp = comp.trim();
  const r = options.loose ? re$1[t$1.XRANGELOOSE] : re$1[t$1.XRANGE];
  return comp.replace(r, (ret, gtlt, M, m2, p, pr) => {
    debug$1("xRange", comp, ret, gtlt, M, m2, p, pr);
    const xM = isX(M);
    const xm = xM || isX(m2);
    const xp = xm || isX(p);
    const anyX = xp;
    if (gtlt === "=" && anyX) {
      gtlt = "";
    }
    pr = options.includePrerelease ? "-0" : "";
    if (xM) {
      if (gtlt === ">" || gtlt === "<") {
        ret = "<0.0.0-0";
      } else {
        ret = "*";
      }
    } else if (gtlt && anyX) {
      if (xm) {
        m2 = 0;
      }
      p = 0;
      if (gtlt === ">") {
        gtlt = ">=";
        if (xm) {
          M = +M + 1;
          m2 = 0;
          p = 0;
        } else {
          m2 = +m2 + 1;
          p = 0;
        }
      } else if (gtlt === "<=") {
        gtlt = "<";
        if (xm) {
          M = +M + 1;
        } else {
          m2 = +m2 + 1;
        }
      }
      if (gtlt === "<")
        pr = "-0";
      ret = `${gtlt + M}.${m2}.${p}${pr}`;
    } else if (xm) {
      ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
    } else if (xp) {
      ret = `>=${M}.${m2}.0${pr} <${M}.${+m2 + 1}.0-0`;
    }
    debug$1("xRange return", ret);
    return ret;
  });
};
const replaceStars = (comp, options) => {
  debug$1("replaceStars", comp, options);
  return comp.trim().replace(re$1[t$1.STAR], "");
};
const replaceGTE0 = (comp, options) => {
  debug$1("replaceGTE0", comp, options);
  return comp.trim().replace(re$1[options.includePrerelease ? t$1.GTE0PRE : t$1.GTE0], "");
};
const hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => {
  if (isX(fM)) {
    from = "";
  } else if (isX(fm)) {
    from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
  } else if (isX(fp)) {
    from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
  } else if (fpr) {
    from = `>=${from}`;
  } else {
    from = `>=${from}${incPr ? "-0" : ""}`;
  }
  if (isX(tM)) {
    to = "";
  } else if (isX(tm)) {
    to = `<${+tM + 1}.0.0-0`;
  } else if (isX(tp)) {
    to = `<${tM}.${+tm + 1}.0-0`;
  } else if (tpr) {
    to = `<=${tM}.${tm}.${tp}-${tpr}`;
  } else if (incPr) {
    to = `<${tM}.${tm}.${+tp + 1}-0`;
  } else {
    to = `<=${to}`;
  }
  return `${from} ${to}`.trim();
};
const testSet = (set2, version, options) => {
  for (let i2 = 0; i2 < set2.length; i2++) {
    if (!set2[i2].test(version)) {
      return false;
    }
  }
  if (version.prerelease.length && !options.includePrerelease) {
    for (let i2 = 0; i2 < set2.length; i2++) {
      debug$1(set2[i2].semver);
      if (set2[i2].semver === Comparator$3.ANY) {
        continue;
      }
      if (set2[i2].semver.prerelease.length > 0) {
        const allowed = set2[i2].semver;
        if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
          return true;
        }
      }
    }
    return false;
  }
  return true;
};
const ANY$2 = Symbol("SemVer ANY");
class Comparator$2 {
  static get ANY() {
    return ANY$2;
  }
  constructor(comp, options) {
    options = parseOptions(options);
    if (comp instanceof Comparator$2) {
      if (comp.loose === !!options.loose) {
        return comp;
      } else {
        comp = comp.value;
      }
    }
    debug("comparator", comp, options);
    this.options = options;
    this.loose = !!options.loose;
    this.parse(comp);
    if (this.semver === ANY$2) {
      this.value = "";
    } else {
      this.value = this.operator + this.semver.version;
    }
    debug("comp", this);
  }
  parse(comp) {
    const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
    const m2 = comp.match(r);
    if (!m2) {
      throw new TypeError(`Invalid comparator: ${comp}`);
    }
    this.operator = m2[1] !== void 0 ? m2[1] : "";
    if (this.operator === "=") {
      this.operator = "";
    }
    if (!m2[2]) {
      this.semver = ANY$2;
    } else {
      this.semver = new SemVer$4(m2[2], this.options.loose);
    }
  }
  toString() {
    return this.value;
  }
  test(version) {
    debug("Comparator.test", version, this.options.loose);
    if (this.semver === ANY$2 || version === ANY$2) {
      return true;
    }
    if (typeof version === "string") {
      try {
        version = new SemVer$4(version, this.options);
      } catch (er) {
        return false;
      }
    }
    return cmp(version, this.operator, this.semver, this.options);
  }
  intersects(comp, options) {
    if (!(comp instanceof Comparator$2)) {
      throw new TypeError("a Comparator is required");
    }
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    if (this.operator === "") {
      if (this.value === "") {
        return true;
      }
      return new Range$9(comp.value, options).test(this.value);
    } else if (comp.operator === "") {
      if (comp.value === "") {
        return true;
      }
      return new Range$9(this.value, options).test(comp.semver);
    }
    const sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
    const sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
    const sameSemVer = this.semver.version === comp.semver.version;
    const differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
    const oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && (this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<");
    const oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && (this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">");
    return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
  }
}
var comparator = Comparator$2;
const parseOptions = parseOptions_1;
const { re, t } = re$5.exports;
const cmp = cmp_1;
const debug = debug_1;
const SemVer$4 = semver$2;
const Range$9 = range;
const Range$8 = range;
const satisfies$3 = (version, range2, options) => {
  try {
    range2 = new Range$8(range2, options);
  } catch (er) {
    return false;
  }
  return range2.test(version);
};
var satisfies_1 = satisfies$3;
const Range$7 = range;
const toComparators = (range2, options) => new Range$7(range2, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
var toComparators_1 = toComparators;
const SemVer$3 = semver$2;
const Range$6 = range;
const maxSatisfying = (versions, range2, options) => {
  let max = null;
  let maxSV = null;
  let rangeObj = null;
  try {
    rangeObj = new Range$6(range2, options);
  } catch (er) {
    return null;
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      if (!max || maxSV.compare(v) === -1) {
        max = v;
        maxSV = new SemVer$3(max, options);
      }
    }
  });
  return max;
};
var maxSatisfying_1 = maxSatisfying;
const SemVer$2 = semver$2;
const Range$5 = range;
const minSatisfying = (versions, range2, options) => {
  let min = null;
  let minSV = null;
  let rangeObj = null;
  try {
    rangeObj = new Range$5(range2, options);
  } catch (er) {
    return null;
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      if (!min || minSV.compare(v) === 1) {
        min = v;
        minSV = new SemVer$2(min, options);
      }
    }
  });
  return min;
};
var minSatisfying_1 = minSatisfying;
const SemVer$1 = semver$2;
const Range$4 = range;
const gt$1 = gt_1;
const minVersion = (range2, loose) => {
  range2 = new Range$4(range2, loose);
  let minver = new SemVer$1("0.0.0");
  if (range2.test(minver)) {
    return minver;
  }
  minver = new SemVer$1("0.0.0-0");
  if (range2.test(minver)) {
    return minver;
  }
  minver = null;
  for (let i2 = 0; i2 < range2.set.length; ++i2) {
    const comparators = range2.set[i2];
    let setMin = null;
    comparators.forEach((comparator2) => {
      const compver = new SemVer$1(comparator2.semver.version);
      switch (comparator2.operator) {
        case ">":
          if (compver.prerelease.length === 0) {
            compver.patch++;
          } else {
            compver.prerelease.push(0);
          }
          compver.raw = compver.format();
        case "":
        case ">=":
          if (!setMin || gt$1(compver, setMin)) {
            setMin = compver;
          }
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${comparator2.operator}`);
      }
    });
    if (setMin && (!minver || gt$1(minver, setMin)))
      minver = setMin;
  }
  if (minver && range2.test(minver)) {
    return minver;
  }
  return null;
};
var minVersion_1 = minVersion;
const Range$3 = range;
const validRange = (range2, options) => {
  try {
    return new Range$3(range2, options).range || "*";
  } catch (er) {
    return null;
  }
};
var valid = validRange;
const SemVer = semver$2;
const Comparator$1 = comparator;
const { ANY: ANY$1 } = Comparator$1;
const Range$2 = range;
const satisfies$2 = satisfies_1;
const gt = gt_1;
const lt = lt_1;
const lte = lte_1;
const gte = gte_1;
const outside$2 = (version, range2, hilo, options) => {
  version = new SemVer(version, options);
  range2 = new Range$2(range2, options);
  let gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
    case ">":
      gtfn = gt;
      ltefn = lte;
      ltfn = lt;
      comp = ">";
      ecomp = ">=";
      break;
    case "<":
      gtfn = lt;
      ltefn = gte;
      ltfn = gt;
      comp = "<";
      ecomp = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (satisfies$2(version, range2, options)) {
    return false;
  }
  for (let i2 = 0; i2 < range2.set.length; ++i2) {
    const comparators = range2.set[i2];
    let high = null;
    let low = null;
    comparators.forEach((comparator2) => {
      if (comparator2.semver === ANY$1) {
        comparator2 = new Comparator$1(">=0.0.0");
      }
      high = high || comparator2;
      low = low || comparator2;
      if (gtfn(comparator2.semver, high.semver, options)) {
        high = comparator2;
      } else if (ltfn(comparator2.semver, low.semver, options)) {
        low = comparator2;
      }
    });
    if (high.operator === comp || high.operator === ecomp) {
      return false;
    }
    if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
      return false;
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false;
    }
  }
  return true;
};
var outside_1 = outside$2;
const outside$1 = outside_1;
const gtr = (version, range2, options) => outside$1(version, range2, ">", options);
var gtr_1 = gtr;
const outside = outside_1;
const ltr = (version, range2, options) => outside(version, range2, "<", options);
var ltr_1 = ltr;
const Range$1 = range;
const intersects = (r1, r2, options) => {
  r1 = new Range$1(r1, options);
  r2 = new Range$1(r2, options);
  return r1.intersects(r2);
};
var intersects_1 = intersects;
const satisfies$1 = satisfies_1;
const compare$1 = compare_1;
var simplify = (versions, range2, options) => {
  const set2 = [];
  let min = null;
  let prev = null;
  const v = versions.sort((a, b) => compare$1(a, b, options));
  for (const version of v) {
    const included = satisfies$1(version, range2, options);
    if (included) {
      prev = version;
      if (!min)
        min = version;
    } else {
      if (prev) {
        set2.push([min, prev]);
      }
      prev = null;
      min = null;
    }
  }
  if (min)
    set2.push([min, null]);
  const ranges = [];
  for (const [min2, max] of set2) {
    if (min2 === max)
      ranges.push(min2);
    else if (!max && min2 === v[0])
      ranges.push("*");
    else if (!max)
      ranges.push(`>=${min2}`);
    else if (min2 === v[0])
      ranges.push(`<=${max}`);
    else
      ranges.push(`${min2} - ${max}`);
  }
  const simplified = ranges.join(" || ");
  const original = typeof range2.raw === "string" ? range2.raw : String(range2);
  return simplified.length < original.length ? simplified : range2;
};
const Range = range;
const Comparator = comparator;
const { ANY } = Comparator;
const satisfies = satisfies_1;
const compare = compare_1;
const subset = (sub, dom, options = {}) => {
  if (sub === dom)
    return true;
  sub = new Range(sub, options);
  dom = new Range(dom, options);
  let sawNonNull = false;
  OUTER:
    for (const simpleSub of sub.set) {
      for (const simpleDom of dom.set) {
        const isSub = simpleSubset(simpleSub, simpleDom, options);
        sawNonNull = sawNonNull || isSub !== null;
        if (isSub)
          continue OUTER;
      }
      if (sawNonNull)
        return false;
    }
  return true;
};
const simpleSubset = (sub, dom, options) => {
  if (sub === dom)
    return true;
  if (sub.length === 1 && sub[0].semver === ANY) {
    if (dom.length === 1 && dom[0].semver === ANY)
      return true;
    else if (options.includePrerelease)
      sub = [new Comparator(">=0.0.0-0")];
    else
      sub = [new Comparator(">=0.0.0")];
  }
  if (dom.length === 1 && dom[0].semver === ANY) {
    if (options.includePrerelease)
      return true;
    else
      dom = [new Comparator(">=0.0.0")];
  }
  const eqSet = new Set();
  let gt2, lt2;
  for (const c of sub) {
    if (c.operator === ">" || c.operator === ">=")
      gt2 = higherGT(gt2, c, options);
    else if (c.operator === "<" || c.operator === "<=")
      lt2 = lowerLT(lt2, c, options);
    else
      eqSet.add(c.semver);
  }
  if (eqSet.size > 1)
    return null;
  let gtltComp;
  if (gt2 && lt2) {
    gtltComp = compare(gt2.semver, lt2.semver, options);
    if (gtltComp > 0)
      return null;
    else if (gtltComp === 0 && (gt2.operator !== ">=" || lt2.operator !== "<="))
      return null;
  }
  for (const eq2 of eqSet) {
    if (gt2 && !satisfies(eq2, String(gt2), options))
      return null;
    if (lt2 && !satisfies(eq2, String(lt2), options))
      return null;
    for (const c of dom) {
      if (!satisfies(eq2, String(c), options))
        return false;
    }
    return true;
  }
  let higher, lower;
  let hasDomLT, hasDomGT;
  let needDomLTPre = lt2 && !options.includePrerelease && lt2.semver.prerelease.length ? lt2.semver : false;
  let needDomGTPre = gt2 && !options.includePrerelease && gt2.semver.prerelease.length ? gt2.semver : false;
  if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt2.operator === "<" && needDomLTPre.prerelease[0] === 0) {
    needDomLTPre = false;
  }
  for (const c of dom) {
    hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
    hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
    if (gt2) {
      if (needDomGTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
          needDomGTPre = false;
        }
      }
      if (c.operator === ">" || c.operator === ">=") {
        higher = higherGT(gt2, c, options);
        if (higher === c && higher !== gt2)
          return false;
      } else if (gt2.operator === ">=" && !satisfies(gt2.semver, String(c), options))
        return false;
    }
    if (lt2) {
      if (needDomLTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
          needDomLTPre = false;
        }
      }
      if (c.operator === "<" || c.operator === "<=") {
        lower = lowerLT(lt2, c, options);
        if (lower === c && lower !== lt2)
          return false;
      } else if (lt2.operator === "<=" && !satisfies(lt2.semver, String(c), options))
        return false;
    }
    if (!c.operator && (lt2 || gt2) && gtltComp !== 0)
      return false;
  }
  if (gt2 && hasDomLT && !lt2 && gtltComp !== 0)
    return false;
  if (lt2 && hasDomGT && !gt2 && gtltComp !== 0)
    return false;
  if (needDomGTPre || needDomLTPre)
    return false;
  return true;
};
const higherGT = (a, b, options) => {
  if (!a)
    return b;
  const comp = compare(a.semver, b.semver, options);
  return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
};
const lowerLT = (a, b, options) => {
  if (!a)
    return b;
  const comp = compare(a.semver, b.semver, options);
  return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
};
var subset_1 = subset;
const internalRe = re$5.exports;
var semver$1 = {
  re: internalRe.re,
  src: internalRe.src,
  tokens: internalRe.t,
  SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
  SemVer: semver$2,
  compareIdentifiers: identifiers.compareIdentifiers,
  rcompareIdentifiers: identifiers.rcompareIdentifiers,
  parse: parse_1,
  valid: valid_1,
  clean: clean_1,
  inc: inc_1,
  diff: diff_1,
  major: major_1,
  minor: minor_1,
  patch: patch_1,
  prerelease: prerelease_1,
  compare: compare_1,
  rcompare: rcompare_1,
  compareLoose: compareLoose_1,
  compareBuild: compareBuild_1,
  sort: sort_1,
  rsort: rsort_1,
  gt: gt_1,
  lt: lt_1,
  eq: eq_1,
  neq: neq_1,
  gte: gte_1,
  lte: lte_1,
  cmp: cmp_1,
  coerce: coerce_1,
  Comparator: comparator,
  Range: range,
  satisfies: satisfies_1,
  toComparators: toComparators_1,
  maxSatisfying: maxSatisfying_1,
  minSatisfying: minSatisfying_1,
  minVersion: minVersion_1,
  validRange: valid,
  outside: outside_1,
  gtr: gtr_1,
  ltr: ltr_1,
  intersects: intersects_1,
  simplifyRange: simplify,
  subset: subset_1
};
var DownloadedUpdateHelper$1 = {};
var lodash_isequal = { exports: {} };
(function(module, exports) {
  var LARGE_ARRAY_SIZE = 200;
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
  var MAX_SAFE_INTEGER2 = 9007199254740991;
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag2 = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  var reRegExpChar2 = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  var freeGlobal2 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var freeSelf2 = typeof self == "object" && self && self.Object === Object && self;
  var root2 = freeGlobal2 || freeSelf2 || Function("return this")();
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && freeGlobal2.process;
  var nodeUtil = function() {
    try {
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  }();
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
  function arrayFilter(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  function arraySome(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }
  function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  function cacheHas(cache2, key) {
    return cache2.has(key);
  }
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  function mapToArray(map2) {
    var index = -1, result = Array(map2.size);
    map2.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  function setToArray(set2) {
    var index = -1, result = Array(set2.size);
    set2.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }
  var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto2 = Object.prototype;
  var coreJsData = root2["__core-js_shared__"];
  var funcToString = funcProto.toString;
  var hasOwnProperty = objectProto2.hasOwnProperty;
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  var nativeObjectToString = objectProto2.toString;
  var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  var Buffer2 = moduleExports ? root2.Buffer : void 0, Symbol2 = root2.Symbol, Uint8Array2 = root2.Uint8Array, propertyIsEnumerable = objectProto2.propertyIsEnumerable, splice = arrayProto.splice, symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
  var nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0, nativeKeys = overArg(Object.keys, Object);
  var DataView = getNative(root2, "DataView"), Map2 = getNative(root2, "Map"), Promise2 = getNative(root2, "Promise"), Set2 = getNative(root2, "Set"), WeakMap2 = getNative(root2, "WeakMap"), nativeCreate = getNative(Object, "create");
  var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
  var symbolProto2 = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf = symbolProto2 ? symbolProto2.valueOf : void 0;
  function Hash(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
  }
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : void 0;
  }
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
  }
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
    return this;
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  function ListCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  function MapCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash(),
      "map": new (Map2 || ListCache)(),
      "string": new Hash()
    };
  }
  function mapCacheDelete(key) {
    var result = getMapData(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  function mapCacheSet(key, value) {
    var data = getMapData(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  function SetCache(values) {
    var index = -1, length = values == null ? 0 : values.length;
    this.__data__ = new MapCache();
    while (++index < length) {
      this.add(values[index]);
    }
  }
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }
  function setCacheHas(value) {
    return this.__data__.has(value);
  }
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
  function stackClear() {
    this.__data__ = new ListCache();
    this.size = 0;
  }
  function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  function stackGet(key) {
    return this.__data__.get(key);
  }
  function stackHas(key) {
    return this.__data__.has(key);
  }
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs2 = data.__data__;
      if (!Map2 || pairs2.length < LARGE_ARRAY_SIZE - 1) {
        pairs2.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs2);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype["delete"] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq2(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
  }
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString2(value);
  }
  function baseIsArguments(value) {
    return isObjectLike2(value) && baseGetTag(value) == argsTag;
  }
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !isObjectLike2(value) && !isObjectLike2(other)) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }
  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
    objTag = objTag == argsTag ? objectTag : objTag;
    othTag = othTag == argsTag ? objectTag : othTag;
    var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer(object)) {
      if (!isBuffer(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack());
      return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
      var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new Stack());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack());
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }
  function baseIsNative(value) {
    if (!isObject2(value) || isMasked(value)) {
      return false;
    }
    var pattern2 = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern2.test(toSource(value));
  }
  function baseIsTypedArray(value) {
    return isObjectLike2(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    var stacked = stack.get(array);
    if (stacked && stack.get(other)) {
      return stacked == other;
    }
    var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
    stack.set(array, other);
    stack.set(other, array);
    while (++index < arrLength) {
      var arrValue = array[index], othValue = other[index];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== void 0) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      if (seen) {
        if (!arraySome(other, function(othValue2, othIndex) {
          if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }
    stack["delete"](array);
    stack["delete"](other);
    return result;
  }
  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;
      case arrayBufferTag:
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
          return false;
        }
        return true;
      case boolTag:
      case dateTag:
      case numberTag:
        return eq2(+object, +other);
      case errorTag:
        return object.name == other.name && object.message == other.message;
      case regexpTag:
      case stringTag:
        return object == other + "";
      case mapTag:
        var convert = mapToArray;
      case setTag:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
        convert || (convert = setToArray);
        if (object.size != other.size && !isPartial) {
          return false;
        }
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG;
        stack.set(object, other);
        var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack["delete"](object);
        return result;
      case symbolTag2:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
        return false;
      }
    }
    var stacked = stack.get(object);
    if (stacked && stack.get(other)) {
      return stacked == other;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key], othValue = other[key];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      }
      if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == "constructor");
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor, othCtor = other.constructor;
      if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack["delete"](object);
    stack["delete"](other);
    return result;
  }
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  }
  function getMapData(map2, key) {
    var data = map2.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    });
  };
  var getTag = baseGetTag;
  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
    getTag = function(value) {
      var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;
          case mapCtorString:
            return mapTag;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag;
          case weakMapCtorString:
            return weakMapTag;
        }
      }
      return result;
    };
  }
  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER2 : length;
    return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  function isKeyable(value) {
    var type2 = typeof value;
    return type2 == "string" || type2 == "number" || type2 == "symbol" || type2 == "boolean" ? value !== "__proto__" : value === null;
  }
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto2;
    return value === proto;
  }
  function objectToString2(value) {
    return nativeObjectToString.call(value);
  }
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  function eq2(value, other) {
    return value === other || value !== value && other !== other;
  }
  var isArguments = baseIsArguments(function() {
    return arguments;
  }()) ? baseIsArguments : function(value) {
    return isObjectLike2(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  var isArray = Array.isArray;
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }
  var isBuffer = nativeIsBuffer || stubFalse;
  function isEqual2(value, other) {
    return baseIsEqual(value, other);
  }
  function isFunction(value) {
    if (!isObject2(value)) {
      return false;
    }
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
  }
  function isObject2(value) {
    var type2 = typeof value;
    return value != null && (type2 == "object" || type2 == "function");
  }
  function isObjectLike2(value) {
    return value != null && typeof value == "object";
  }
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }
  function stubArray() {
    return [];
  }
  function stubFalse() {
    return false;
  }
  module.exports = isEqual2;
})(lodash_isequal, lodash_isequal.exports);
Object.defineProperty(DownloadedUpdateHelper$1, "__esModule", { value: true });
DownloadedUpdateHelper$1.createTempUpdateFile = DownloadedUpdateHelper$1.DownloadedUpdateHelper = void 0;
const crypto_1$1 = require$$0__default$4["default"];
const fs_1$6 = require$$0__default$2["default"];
const isEqual = lodash_isequal.exports;
const fs_extra_1$6 = lib;
const path$d = require$$1__default$1["default"];
class DownloadedUpdateHelper {
  constructor(cacheDir) {
    this.cacheDir = cacheDir;
    this._file = null;
    this._packageFile = null;
    this.versionInfo = null;
    this.fileInfo = null;
    this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return path$d.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(updateFile, updateInfo, fileInfo, logger) {
    if (this.versionInfo != null && this.file === updateFile && this.fileInfo != null) {
      if (isEqual(this.versionInfo, updateInfo) && isEqual(this.fileInfo.info, fileInfo.info) && await fs_extra_1$6.pathExists(updateFile)) {
        return updateFile;
      } else {
        return null;
      }
    }
    const cachedUpdateFile = await this.getValidCachedUpdateFile(fileInfo, logger);
    if (cachedUpdateFile === null) {
      return null;
    }
    logger.info(`Update has already been downloaded to ${updateFile}).`);
    this._file = cachedUpdateFile;
    return cachedUpdateFile;
  }
  async setDownloadedFile(downloadedFile, packageFile, versionInfo, fileInfo, updateFileName, isSaveCache) {
    this._file = downloadedFile;
    this._packageFile = packageFile;
    this.versionInfo = versionInfo;
    this.fileInfo = fileInfo;
    this._downloadedFileInfo = {
      fileName: updateFileName,
      sha512: fileInfo.info.sha512,
      isAdminRightsRequired: fileInfo.info.isAdminRightsRequired === true
    };
    if (isSaveCache) {
      await fs_extra_1$6.outputJson(this.getUpdateInfoFile(), this._downloadedFileInfo);
    }
  }
  async clear() {
    this._file = null;
    this._packageFile = null;
    this.versionInfo = null;
    this.fileInfo = null;
    await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await fs_extra_1$6.emptyDir(this.cacheDirForPendingUpdate);
    } catch (ignore) {
    }
  }
  async getValidCachedUpdateFile(fileInfo, logger) {
    var _a;
    const updateInfoFilePath = this.getUpdateInfoFile();
    const doesUpdateInfoFileExist = await fs_extra_1$6.pathExists(updateInfoFilePath);
    if (!doesUpdateInfoFileExist) {
      return null;
    }
    let cachedInfo;
    try {
      cachedInfo = await fs_extra_1$6.readJson(updateInfoFilePath);
    } catch (error2) {
      let message = `No cached update info available`;
      if (error2.code !== "ENOENT") {
        await this.cleanCacheDirForPendingUpdate();
        message += ` (error on read: ${error2.message})`;
      }
      logger.info(message);
      return null;
    }
    const isCachedInfoFileNameValid = (_a = (cachedInfo === null || cachedInfo === void 0 ? void 0 : cachedInfo.fileName) !== null) !== null && _a !== void 0 ? _a : false;
    if (!isCachedInfoFileNameValid) {
      logger.warn(`Cached update info is corrupted: no fileName, directory for cached update will be cleaned`);
      await this.cleanCacheDirForPendingUpdate();
      return null;
    }
    if (fileInfo.info.sha512 !== cachedInfo.sha512) {
      logger.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${cachedInfo.sha512}, expected: ${fileInfo.info.sha512}. Directory for cached update will be cleaned`);
      await this.cleanCacheDirForPendingUpdate();
      return null;
    }
    const updateFile = path$d.join(this.cacheDirForPendingUpdate, cachedInfo.fileName);
    if (!await fs_extra_1$6.pathExists(updateFile)) {
      logger.info("Cached update file doesn't exist");
      return null;
    }
    const sha512 = await hashFile(updateFile);
    if (fileInfo.info.sha512 !== sha512) {
      logger.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${sha512}, expected: ${fileInfo.info.sha512}`);
      await this.cleanCacheDirForPendingUpdate();
      return null;
    }
    this._downloadedFileInfo = cachedInfo;
    return updateFile;
  }
  getUpdateInfoFile() {
    return path$d.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
DownloadedUpdateHelper$1.DownloadedUpdateHelper = DownloadedUpdateHelper;
function hashFile(file2, algorithm = "sha512", encoding = "base64", options) {
  return new Promise((resolve2, reject) => {
    const hash = crypto_1$1.createHash(algorithm);
    hash.on("error", reject).setEncoding(encoding);
    fs_1$6.createReadStream(file2, __spreadProps(__spreadValues({}, options), { highWaterMark: 1024 * 1024 })).on("error", reject).on("end", () => {
      hash.end();
      resolve2(hash.read());
    }).pipe(hash, { end: false });
  });
}
async function createTempUpdateFile(name, cacheDir, log) {
  let nameCounter = 0;
  let result = path$d.join(cacheDir, name);
  for (let i2 = 0; i2 < 3; i2++) {
    try {
      await fs_extra_1$6.unlink(result);
      return result;
    } catch (e) {
      if (e.code === "ENOENT") {
        return result;
      }
      log.warn(`Error on remove temp update file: ${e}`);
      result = path$d.join(cacheDir, `${nameCounter++}-${name}`);
    }
  }
  return result;
}
DownloadedUpdateHelper$1.createTempUpdateFile = createTempUpdateFile;
var ElectronAppAdapter$1 = {};
var AppAdapter = {};
Object.defineProperty(AppAdapter, "__esModule", { value: true });
AppAdapter.getAppCacheDir = void 0;
const path$c = require$$1__default$1["default"];
const os_1 = require$$1__default$3["default"];
function getAppCacheDir() {
  const homedir2 = os_1.homedir();
  let result;
  if (process.platform === "win32") {
    result = process.env["LOCALAPPDATA"] || path$c.join(homedir2, "AppData", "Local");
  } else if (process.platform === "darwin") {
    result = path$c.join(homedir2, "Library", "Application Support", "Caches");
  } else {
    result = process.env["XDG_CACHE_HOME"] || path$c.join(homedir2, ".cache");
  }
  return result;
}
AppAdapter.getAppCacheDir = getAppCacheDir;
Object.defineProperty(ElectronAppAdapter$1, "__esModule", { value: true });
ElectronAppAdapter$1.ElectronAppAdapter = void 0;
const path$b = require$$1__default$1["default"];
const AppAdapter_1 = AppAdapter;
class ElectronAppAdapter {
  constructor(app2 = require$$1__default["default"].app) {
    this.app = app2;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === true;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? path$b.join(process.resourcesPath, "app-update.yml") : path$b.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return AppAdapter_1.getAppCacheDir();
  }
  quit() {
    this.app.quit();
  }
  onQuit(handler) {
    this.app.once("quit", (_, exitCode) => handler(exitCode));
  }
}
ElectronAppAdapter$1.ElectronAppAdapter = ElectronAppAdapter;
var electronHttpExecutor = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ElectronHttpExecutor = exports.getNetSession = exports.NET_SESSION_NAME = void 0;
  const builder_util_runtime_12 = out;
  exports.NET_SESSION_NAME = "electron-updater";
  function getNetSession() {
    return require$$1__default["default"].session.fromPartition(exports.NET_SESSION_NAME, {
      cache: false
    });
  }
  exports.getNetSession = getNetSession;
  class ElectronHttpExecutor extends builder_util_runtime_12.HttpExecutor {
    constructor(proxyLoginCallback) {
      super();
      this.proxyLoginCallback = proxyLoginCallback;
      this.cachedSession = null;
    }
    async download(url, destination, options) {
      return await options.cancellationToken.createPromise((resolve2, reject, onCancel) => {
        const requestOptions = {
          headers: options.headers || void 0,
          redirect: "manual"
        };
        builder_util_runtime_12.configureRequestUrl(url, requestOptions);
        builder_util_runtime_12.configureRequestOptions(requestOptions);
        this.doDownload(requestOptions, {
          destination,
          options,
          onCancel,
          callback: (error2) => {
            if (error2 == null) {
              resolve2(destination);
            } else {
              reject(error2);
            }
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(options, callback) {
      if (options.headers && options.headers.Host) {
        options.host = options.headers.Host;
        delete options.headers.Host;
      }
      if (this.cachedSession == null) {
        this.cachedSession = getNetSession();
      }
      const request = require$$1__default["default"].net.request(__spreadProps(__spreadValues({}, options), {
        session: this.cachedSession
      }));
      request.on("response", callback);
      if (this.proxyLoginCallback != null) {
        request.on("login", this.proxyLoginCallback);
      }
      return request;
    }
    addRedirectHandlers(request, options, reject, redirectCount, handler) {
      request.on("redirect", (statusCode, method, redirectUrl) => {
        request.abort();
        if (redirectCount > this.maxRedirects) {
          reject(this.createMaxRedirectError());
        } else {
          handler(builder_util_runtime_12.HttpExecutor.prepareRedirectUrlOptions(redirectUrl, options));
        }
      });
    }
  }
  exports.ElectronHttpExecutor = ElectronHttpExecutor;
})(electronHttpExecutor);
var GenericProvider$1 = {};
var util$1 = {};
var INFINITY = 1 / 0;
var symbolTag = "[object Symbol]";
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
var objectProto = Object.prototype;
var objectToString = objectProto.toString;
var Symbol$1 = root.Symbol;
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
function isObjectLike(value) {
  return !!value && typeof value == "object";
}
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
function toString(value) {
  return value == null ? "" : baseToString(value);
}
function escapeRegExp$1(string) {
  string = toString(string);
  return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
}
var lodash_escaperegexp = escapeRegExp$1;
Object.defineProperty(util$1, "__esModule", { value: true });
util$1.blockmapFiles = util$1.getChannelFilename = util$1.newUrlFromBase = util$1.newBaseUrl = void 0;
const url_1$5 = require$$2__default["default"];
const escapeRegExp = lodash_escaperegexp;
function newBaseUrl(url) {
  const result = new url_1$5.URL(url);
  if (!result.pathname.endsWith("/")) {
    result.pathname += "/";
  }
  return result;
}
util$1.newBaseUrl = newBaseUrl;
function newUrlFromBase(pathname, baseUrl, addRandomQueryToAvoidCaching = false) {
  const result = new url_1$5.URL(pathname, baseUrl);
  const search = baseUrl.search;
  if (search != null && search.length !== 0) {
    result.search = search;
  } else if (addRandomQueryToAvoidCaching) {
    result.search = `noCache=${Date.now().toString(32)}`;
  }
  return result;
}
util$1.newUrlFromBase = newUrlFromBase;
function getChannelFilename(channel) {
  return `${channel}.yml`;
}
util$1.getChannelFilename = getChannelFilename;
function blockmapFiles(baseUrl, oldVersion, newVersion) {
  const newBlockMapUrl = newUrlFromBase(`${baseUrl.pathname}.blockmap`, baseUrl);
  const oldBlockMapUrl = newUrlFromBase(`${baseUrl.pathname.replace(new RegExp(escapeRegExp(newVersion), "g"), oldVersion)}.blockmap`, baseUrl);
  return [oldBlockMapUrl, newBlockMapUrl];
}
util$1.blockmapFiles = blockmapFiles;
var Provider$1 = {};
Object.defineProperty(Provider$1, "__esModule", { value: true });
Provider$1.resolveFiles = Provider$1.getFileList = Provider$1.parseUpdateInfo = Provider$1.findFile = Provider$1.Provider = void 0;
const builder_util_runtime_1$e = out;
const js_yaml_1$2 = jsYaml;
const util_1$w = util$1;
class Provider {
  constructor(runtimeOptions) {
    this.runtimeOptions = runtimeOptions;
    this.requestHeaders = null;
    this.executor = runtimeOptions.executor;
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== false;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const arch = process.env["TEST_UPDATER_ARCH"] || process.arch;
      const archSuffix = arch === "x64" ? "" : `-${arch}`;
      return "-linux" + archSuffix;
    } else {
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
    }
  }
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(channel) {
    return `${channel}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(value) {
    this.requestHeaders = value;
  }
  httpRequest(url, headers, cancellationToken) {
    return this.executor.request(this.createRequestOptions(url, headers), cancellationToken);
  }
  createRequestOptions(url, headers) {
    const result = {};
    if (this.requestHeaders == null) {
      if (headers != null) {
        result.headers = headers;
      }
    } else {
      result.headers = headers == null ? this.requestHeaders : __spreadValues(__spreadValues({}, this.requestHeaders), headers);
    }
    builder_util_runtime_1$e.configureRequestUrl(url, result);
    return result;
  }
}
Provider$1.Provider = Provider;
function findFile(files, extension, not2) {
  if (files.length === 0) {
    throw builder_util_runtime_1$e.newError("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  }
  const result = files.find((it) => it.url.pathname.toLowerCase().endsWith(`.${extension}`));
  if (result != null) {
    return result;
  } else if (not2 == null) {
    return files[0];
  } else {
    return files.find((fileInfo) => !not2.some((ext) => fileInfo.url.pathname.toLowerCase().endsWith(`.${ext}`)));
  }
}
Provider$1.findFile = findFile;
function parseUpdateInfo(rawData, channelFile, channelFileUrl) {
  if (rawData == null) {
    throw builder_util_runtime_1$e.newError(`Cannot parse update info from ${channelFile} in the latest release artifacts (${channelFileUrl}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  let result;
  try {
    result = js_yaml_1$2.load(rawData);
  } catch (e) {
    throw builder_util_runtime_1$e.newError(`Cannot parse update info from ${channelFile} in the latest release artifacts (${channelFileUrl}): ${e.stack || e.message}, rawData: ${rawData}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return result;
}
Provider$1.parseUpdateInfo = parseUpdateInfo;
function getFileList(updateInfo) {
  const files = updateInfo.files;
  if (files != null && files.length > 0) {
    return files;
  }
  if (updateInfo.path != null) {
    return [
      {
        url: updateInfo.path,
        sha2: updateInfo.sha2,
        sha512: updateInfo.sha512
      }
    ];
  } else {
    throw builder_util_runtime_1$e.newError(`No files provided: ${builder_util_runtime_1$e.safeStringifyJson(updateInfo)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
  }
}
Provider$1.getFileList = getFileList;
function resolveFiles(updateInfo, baseUrl, pathTransformer = (p) => p) {
  const files = getFileList(updateInfo);
  const result = files.map((fileInfo) => {
    if (fileInfo.sha2 == null && fileInfo.sha512 == null) {
      throw builder_util_runtime_1$e.newError(`Update info doesn't contain nor sha256 neither sha512 checksum: ${builder_util_runtime_1$e.safeStringifyJson(fileInfo)}`, "ERR_UPDATER_NO_CHECKSUM");
    }
    return {
      url: util_1$w.newUrlFromBase(pathTransformer(fileInfo.url), baseUrl),
      info: fileInfo
    };
  });
  const packages = updateInfo.packages;
  const packageInfo = packages == null ? null : packages[process.arch] || packages.ia32;
  if (packageInfo != null) {
    result[0].packageInfo = __spreadProps(__spreadValues({}, packageInfo), {
      path: util_1$w.newUrlFromBase(pathTransformer(packageInfo.path), baseUrl).href
    });
  }
  return result;
}
Provider$1.resolveFiles = resolveFiles;
Object.defineProperty(GenericProvider$1, "__esModule", { value: true });
GenericProvider$1.GenericProvider = void 0;
const builder_util_runtime_1$d = out;
const util_1$v = util$1;
const Provider_1$7 = Provider$1;
class GenericProvider extends Provider_1$7.Provider {
  constructor(configuration, updater, runtimeOptions) {
    super(runtimeOptions);
    this.configuration = configuration;
    this.updater = updater;
    this.baseUrl = util_1$v.newBaseUrl(this.configuration.url);
  }
  get channel() {
    const result = this.updater.channel || this.configuration.channel;
    return result == null ? this.getDefaultChannelName() : this.getCustomChannelName(result);
  }
  async getLatestVersion() {
    const channelFile = util_1$v.getChannelFilename(this.channel);
    const channelUrl = util_1$v.newUrlFromBase(channelFile, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let attemptNumber = 0; ; attemptNumber++) {
      try {
        return Provider_1$7.parseUpdateInfo(await this.httpRequest(channelUrl), channelFile, channelUrl);
      } catch (e) {
        if (e instanceof builder_util_runtime_1$d.HttpError && e.statusCode === 404) {
          throw builder_util_runtime_1$d.newError(`Cannot find channel "${channelFile}" update info: ${e.stack || e.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        } else if (e.code === "ECONNREFUSED") {
          if (attemptNumber < 3) {
            await new Promise((resolve2, reject) => {
              try {
                setTimeout(resolve2, 1e3 * attemptNumber);
              } catch (e2) {
                reject(e2);
              }
            });
            continue;
          }
        }
        throw e;
      }
    }
  }
  resolveFiles(updateInfo) {
    return Provider_1$7.resolveFiles(updateInfo, this.baseUrl);
  }
}
GenericProvider$1.GenericProvider = GenericProvider;
var providerFactory = {};
var BintrayProvider$1 = {};
var bintray = {};
Object.defineProperty(bintray, "__esModule", { value: true });
bintray.BintrayClient = void 0;
const httpExecutor_1 = httpExecutor;
class BintrayClient {
  constructor(options, httpExecutor2, cancellationToken, apiKey) {
    this.httpExecutor = httpExecutor2;
    this.cancellationToken = cancellationToken;
    this.requestHeaders = null;
    if (options.owner == null) {
      throw new Error("owner is not specified");
    }
    if (options.package == null) {
      throw new Error("package is not specified");
    }
    this.repo = options.repo || "generic";
    this.packageName = options.package;
    this.owner = options.owner;
    this.user = options.user || options.owner;
    this.component = options.component || null;
    this.distribution = options.distribution || "stable";
    this.auth = apiKey == null ? null : `Basic ${Buffer.from(`${this.user}:${apiKey}`).toString("base64")}`;
    this.basePath = `/packages/${this.owner}/${this.repo}/${this.packageName}`;
  }
  setRequestHeaders(value) {
    this.requestHeaders = value;
  }
  bintrayRequest(path2, auth, data = null, cancellationToken, method) {
    return httpExecutor_1.parseJson(this.httpExecutor.request(httpExecutor_1.configureRequestOptions({ hostname: "api.bintray.com", path: path2, headers: this.requestHeaders || void 0 }, auth, method), cancellationToken, data));
  }
  getVersion(version) {
    return this.bintrayRequest(`${this.basePath}/versions/${version}`, this.auth, null, this.cancellationToken);
  }
  getVersionFiles(version) {
    return this.bintrayRequest(`${this.basePath}/versions/${version}/files`, this.auth, null, this.cancellationToken);
  }
  createVersion(version) {
    return this.bintrayRequest(`${this.basePath}/versions`, this.auth, {
      name: version
    }, this.cancellationToken);
  }
  deleteVersion(version) {
    return this.bintrayRequest(`${this.basePath}/versions/${version}`, this.auth, null, this.cancellationToken, "DELETE");
  }
}
bintray.BintrayClient = BintrayClient;
Object.defineProperty(BintrayProvider$1, "__esModule", { value: true });
BintrayProvider$1.BintrayProvider = void 0;
const builder_util_runtime_1$c = out;
const bintray_1 = bintray;
const url_1$4 = require$$2__default["default"];
const util_1$u = util$1;
const Provider_1$6 = Provider$1;
class BintrayProvider extends Provider_1$6.Provider {
  constructor(configuration, runtimeOptions) {
    super(runtimeOptions);
    this.client = new bintray_1.BintrayClient(configuration, runtimeOptions.executor, new builder_util_runtime_1$c.CancellationToken());
    this.baseUrl = util_1$u.newBaseUrl(`https://dl.bintray.com/${this.client.owner}/${this.client.repo}`);
  }
  setRequestHeaders(value) {
    super.setRequestHeaders(value);
    this.client.setRequestHeaders(value);
  }
  async getLatestVersion() {
    try {
      const data = await this.client.getVersion("_latest");
      const channelFilename = util_1$u.getChannelFilename(this.getDefaultChannelName());
      const files = await this.client.getVersionFiles(data.name);
      const channelFile = files.find((it) => it.name.endsWith(`_${channelFilename}`) || it.name.endsWith(`-${channelFilename}`));
      if (channelFile == null) {
        throw builder_util_runtime_1$c.newError(`Cannot find channel file "${channelFilename}", existing files:
${files.map((it) => JSON.stringify(it, null, 2)).join(",\n")}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      }
      const channelFileUrl = new url_1$4.URL(`https://dl.bintray.com/${this.client.owner}/${this.client.repo}/${channelFile.name}`);
      return Provider_1$6.parseUpdateInfo(await this.httpRequest(channelFileUrl), channelFilename, channelFileUrl);
    } catch (e) {
      if ("statusCode" in e && e.statusCode === 404) {
        throw builder_util_runtime_1$c.newError(`No latest version, please ensure that user, package and repository correctly configured. Or at least one version is published. ${e.stack || e.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
      throw e;
    }
  }
  resolveFiles(updateInfo) {
    return Provider_1$6.resolveFiles(updateInfo, this.baseUrl);
  }
}
BintrayProvider$1.BintrayProvider = BintrayProvider;
var GitHubProvider$1 = {};
Object.defineProperty(GitHubProvider$1, "__esModule", { value: true });
GitHubProvider$1.computeReleaseNotes = GitHubProvider$1.GitHubProvider = GitHubProvider$1.BaseGitHubProvider = void 0;
const builder_util_runtime_1$b = out;
const semver = semver$1;
const url_1$3 = require$$2__default["default"];
const util_1$t = util$1;
const Provider_1$5 = Provider$1;
const hrefRegExp = /\/tag\/([^/]+)$/;
class BaseGitHubProvider extends Provider_1$5.Provider {
  constructor(options, defaultHost, runtimeOptions) {
    super(__spreadProps(__spreadValues({}, runtimeOptions), {
      isUseMultipleRangeRequest: false
    }));
    this.options = options;
    this.baseUrl = util_1$t.newBaseUrl(builder_util_runtime_1$b.githubUrl(options, defaultHost));
    const apiHost = defaultHost === "github.com" ? "api.github.com" : defaultHost;
    this.baseApiUrl = util_1$t.newBaseUrl(builder_util_runtime_1$b.githubUrl(options, apiHost));
  }
  computeGithubBasePath(result) {
    const host = this.options.host;
    return host != null && host !== "github.com" && host !== "api.github.com" ? `/api/v3${result}` : result;
  }
}
GitHubProvider$1.BaseGitHubProvider = BaseGitHubProvider;
class GitHubProvider extends BaseGitHubProvider {
  constructor(options, updater, runtimeOptions) {
    super(options, "github.com", runtimeOptions);
    this.options = options;
    this.updater = updater;
  }
  async getLatestVersion() {
    const cancellationToken = new builder_util_runtime_1$b.CancellationToken();
    const feedXml = await this.httpRequest(util_1$t.newUrlFromBase(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, cancellationToken);
    const feed = builder_util_runtime_1$b.parseXml(feedXml);
    let latestRelease = feed.element("entry", false, `No published versions on GitHub`);
    let tag;
    try {
      if (this.updater.allowPrerelease) {
        tag = hrefRegExp.exec(latestRelease.element("link").attribute("href"))[1];
      } else {
        tag = await this.getLatestTagName(cancellationToken);
        for (const element of feed.getElements("entry")) {
          if (hrefRegExp.exec(element.element("link").attribute("href"))[1] === tag) {
            latestRelease = element;
            break;
          }
        }
      }
    } catch (e) {
      throw builder_util_runtime_1$b.newError(`Cannot parse releases feed: ${e.stack || e.message},
XML:
${feedXml}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (tag == null) {
      throw builder_util_runtime_1$b.newError(`No published versions on GitHub`, "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    }
    const channelFile = util_1$t.getChannelFilename(this.getDefaultChannelName());
    const channelFileUrl = util_1$t.newUrlFromBase(this.getBaseDownloadPath(tag, channelFile), this.baseUrl);
    const requestOptions = this.createRequestOptions(channelFileUrl);
    let rawData;
    try {
      rawData = await this.executor.request(requestOptions, cancellationToken);
    } catch (e) {
      if (!this.updater.allowPrerelease && e instanceof builder_util_runtime_1$b.HttpError && e.statusCode === 404) {
        throw builder_util_runtime_1$b.newError(`Cannot find ${channelFile} in the latest release artifacts (${channelFileUrl}): ${e.stack || e.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      }
      throw e;
    }
    const result = Provider_1$5.parseUpdateInfo(rawData, channelFile, channelFileUrl);
    if (result.releaseName == null) {
      result.releaseName = latestRelease.elementValueOrEmpty("title");
    }
    if (result.releaseNotes == null) {
      result.releaseNotes = computeReleaseNotes(this.updater.currentVersion, this.updater.fullChangelog, feed, latestRelease);
    }
    return __spreadValues({
      tag
    }, result);
  }
  async getLatestTagName(cancellationToken) {
    const options = this.options;
    const url = options.host == null || options.host === "github.com" ? util_1$t.newUrlFromBase(`${this.basePath}/latest`, this.baseUrl) : new url_1$3.URL(`${this.computeGithubBasePath(`/repos/${options.owner}/${options.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const rawData = await this.httpRequest(url, { Accept: "application/json" }, cancellationToken);
      if (rawData == null) {
        return null;
      }
      const releaseInfo = JSON.parse(rawData);
      return releaseInfo.tag_name;
    } catch (e) {
      throw builder_util_runtime_1$b.newError(`Unable to find latest version on GitHub (${url}), please ensure a production release exists: ${e.stack || e.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(updateInfo) {
    return Provider_1$5.resolveFiles(updateInfo, this.baseUrl, (p) => this.getBaseDownloadPath(updateInfo.tag, p.replace(/ /g, "-")));
  }
  getBaseDownloadPath(tag, fileName) {
    return `${this.basePath}/download/${tag}/${fileName}`;
  }
}
GitHubProvider$1.GitHubProvider = GitHubProvider;
function getNoteValue(parent) {
  const result = parent.elementValueOrEmpty("content");
  return result === "No content." ? "" : result;
}
function computeReleaseNotes(currentVersion, isFullChangelog, feed, latestRelease) {
  if (!isFullChangelog) {
    return getNoteValue(latestRelease);
  }
  const releaseNotes = [];
  for (const release of feed.getElements("entry")) {
    const versionRelease = /\/tag\/v?([^/]+)$/.exec(release.element("link").attribute("href"))[1];
    if (semver.lt(currentVersion, versionRelease)) {
      releaseNotes.push({
        version: versionRelease,
        note: getNoteValue(release)
      });
    }
  }
  return releaseNotes.sort((a, b) => semver.rcompare(a.version, b.version));
}
GitHubProvider$1.computeReleaseNotes = computeReleaseNotes;
var KeygenProvider$1 = {};
Object.defineProperty(KeygenProvider$1, "__esModule", { value: true });
KeygenProvider$1.KeygenProvider = void 0;
const builder_util_runtime_1$a = out;
const util_1$s = util$1;
const Provider_1$4 = Provider$1;
class KeygenProvider extends Provider_1$4.Provider {
  constructor(configuration, updater, runtimeOptions) {
    super(__spreadProps(__spreadValues({}, runtimeOptions), {
      isUseMultipleRangeRequest: false
    }));
    this.configuration = configuration;
    this.updater = updater;
    this.baseUrl = util_1$s.newBaseUrl(`https://api.keygen.sh/v1/accounts/${this.configuration.account}/artifacts`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const cancellationToken = new builder_util_runtime_1$a.CancellationToken();
    const channelFile = util_1$s.getChannelFilename(this.getCustomChannelName(this.channel));
    const channelUrl = util_1$s.newUrlFromBase(channelFile, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const updateInfo = await this.httpRequest(channelUrl, {
        Accept: "application/vnd.api+json"
      }, cancellationToken);
      return Provider_1$4.parseUpdateInfo(updateInfo, channelFile, channelUrl);
    } catch (e) {
      throw builder_util_runtime_1$a.newError(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${e.stack || e.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(updateInfo) {
    return Provider_1$4.resolveFiles(updateInfo, this.baseUrl);
  }
  toString() {
    const { account, product, platform: platform2 } = this.configuration;
    return `Keygen (account: ${account}, product: ${product}, platform: ${platform2}, channel: ${this.channel})`;
  }
}
KeygenProvider$1.KeygenProvider = KeygenProvider;
var PrivateGitHubProvider$1 = {};
Object.defineProperty(PrivateGitHubProvider$1, "__esModule", { value: true });
PrivateGitHubProvider$1.PrivateGitHubProvider = void 0;
const builder_util_runtime_1$9 = out;
const js_yaml_1$1 = jsYaml;
const path$a = require$$1__default$1["default"];
const url_1$2 = require$$2__default["default"];
const util_1$r = util$1;
const GitHubProvider_1$1 = GitHubProvider$1;
const Provider_1$3 = Provider$1;
class PrivateGitHubProvider extends GitHubProvider_1$1.BaseGitHubProvider {
  constructor(options, updater, token, runtimeOptions) {
    super(options, "api.github.com", runtimeOptions);
    this.updater = updater;
    this.token = token;
  }
  createRequestOptions(url, headers) {
    const result = super.createRequestOptions(url, headers);
    result.redirect = "manual";
    return result;
  }
  async getLatestVersion() {
    const cancellationToken = new builder_util_runtime_1$9.CancellationToken();
    const channelFile = util_1$r.getChannelFilename(this.getDefaultChannelName());
    const releaseInfo = await this.getLatestVersionInfo(cancellationToken);
    const asset = releaseInfo.assets.find((it) => it.name === channelFile);
    if (asset == null) {
      throw builder_util_runtime_1$9.newError(`Cannot find ${channelFile} in the release ${releaseInfo.html_url || releaseInfo.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    }
    const url = new url_1$2.URL(asset.url);
    let result;
    try {
      result = js_yaml_1$1.load(await this.httpRequest(url, this.configureHeaders("application/octet-stream"), cancellationToken));
    } catch (e) {
      if (e instanceof builder_util_runtime_1$9.HttpError && e.statusCode === 404) {
        throw builder_util_runtime_1$9.newError(`Cannot find ${channelFile} in the latest release artifacts (${url}): ${e.stack || e.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      }
      throw e;
    }
    result.assets = releaseInfo.assets;
    return result;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(accept) {
    return {
      accept,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(cancellationToken) {
    const allowPrerelease = this.updater.allowPrerelease;
    let basePath = this.basePath;
    if (!allowPrerelease) {
      basePath = `${basePath}/latest`;
    }
    const url = util_1$r.newUrlFromBase(basePath, this.baseUrl);
    try {
      const version = JSON.parse(await this.httpRequest(url, this.configureHeaders("application/vnd.github.v3+json"), cancellationToken));
      if (allowPrerelease) {
        return version.find((it) => it.prerelease) || version[0];
      } else {
        return version;
      }
    } catch (e) {
      throw builder_util_runtime_1$9.newError(`Unable to find latest version on GitHub (${url}), please ensure a production release exists: ${e.stack || e.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(updateInfo) {
    return Provider_1$3.getFileList(updateInfo).map((it) => {
      const name = path$a.posix.basename(it.url).replace(/ /g, "-");
      const asset = updateInfo.assets.find((it2) => it2 != null && it2.name === name);
      if (asset == null) {
        throw builder_util_runtime_1$9.newError(`Cannot find asset "${name}" in: ${JSON.stringify(updateInfo.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      }
      return {
        url: new url_1$2.URL(asset.url),
        info: it
      };
    });
  }
}
PrivateGitHubProvider$1.PrivateGitHubProvider = PrivateGitHubProvider;
Object.defineProperty(providerFactory, "__esModule", { value: true });
providerFactory.createClient = providerFactory.isUrlProbablySupportMultiRangeRequests = void 0;
const builder_util_runtime_1$8 = out;
const BintrayProvider_1 = BintrayProvider$1;
const GenericProvider_1$1 = GenericProvider$1;
const GitHubProvider_1 = GitHubProvider$1;
const KeygenProvider_1 = KeygenProvider$1;
const PrivateGitHubProvider_1 = PrivateGitHubProvider$1;
function isUrlProbablySupportMultiRangeRequests(url) {
  return !url.includes("s3.amazonaws.com");
}
providerFactory.isUrlProbablySupportMultiRangeRequests = isUrlProbablySupportMultiRangeRequests;
function createClient(data, updater, runtimeOptions) {
  if (typeof data === "string") {
    throw builder_util_runtime_1$8.newError("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  }
  const provider = data.provider;
  switch (provider) {
    case "github": {
      const githubOptions = data;
      const token = (githubOptions.private ? process.env["GH_TOKEN"] || process.env["GITHUB_TOKEN"] : null) || githubOptions.token;
      if (token == null) {
        return new GitHubProvider_1.GitHubProvider(githubOptions, updater, runtimeOptions);
      } else {
        return new PrivateGitHubProvider_1.PrivateGitHubProvider(githubOptions, updater, token, runtimeOptions);
      }
    }
    case "keygen":
      return new KeygenProvider_1.KeygenProvider(data, updater, runtimeOptions);
    case "s3":
    case "spaces":
      return new GenericProvider_1$1.GenericProvider({
        provider: "generic",
        url: builder_util_runtime_1$8.getS3LikeProviderBaseUrl(data),
        channel: data.channel || null
      }, updater, __spreadProps(__spreadValues({}, runtimeOptions), {
        isUseMultipleRangeRequest: false
      }));
    case "generic": {
      const options = data;
      return new GenericProvider_1$1.GenericProvider(options, updater, __spreadProps(__spreadValues({}, runtimeOptions), {
        isUseMultipleRangeRequest: options.useMultipleRangeRequest !== false && isUrlProbablySupportMultiRangeRequests(options.url)
      }));
    }
    case "bintray":
      return new BintrayProvider_1.BintrayProvider(data, runtimeOptions);
    case "custom": {
      const options = data;
      const constructor = options.updateProvider;
      if (!constructor) {
        throw builder_util_runtime_1$8.newError("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      }
      return new constructor(options, updater, runtimeOptions);
    }
    default:
      throw builder_util_runtime_1$8.newError(`Unsupported provider: ${provider}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
providerFactory.createClient = createClient;
Object.defineProperty(AppUpdater$1, "__esModule", { value: true });
AppUpdater$1.NoOpLogger = AppUpdater$1.AppUpdater = void 0;
const builder_util_runtime_1$7 = out;
const crypto_1 = require$$0__default$4["default"];
const events_1 = require$$0__default$3["default"];
const fs_extra_1$5 = lib;
const promises_1 = require$$4__default$1["default"];
const js_yaml_1 = jsYaml;
const lazy_val_1 = main;
const path$9 = require$$1__default$1["default"];
const semver_1 = semver$1;
const DownloadedUpdateHelper_1 = DownloadedUpdateHelper$1;
const ElectronAppAdapter_1 = ElectronAppAdapter$1;
const electronHttpExecutor_1 = electronHttpExecutor;
const GenericProvider_1 = GenericProvider$1;
const main_1$2 = main$1;
const providerFactory_1 = providerFactory;
class AppUpdater extends events_1.EventEmitter {
  constructor(options, app2) {
    super();
    this.autoDownload = true;
    this.autoInstallOnAppQuit = true;
    this.allowPrerelease = false;
    this.fullChangelog = false;
    this.allowDowngrade = false;
    this._channel = null;
    this.downloadedUpdateHelper = null;
    this.requestHeaders = null;
    this._logger = console;
    this.signals = new main_1$2.UpdaterSignal(this);
    this._appUpdateConfigPath = null;
    this.clientPromise = null;
    this.stagingUserIdPromise = new lazy_val_1.Lazy(() => this.getOrCreateStagingUserId());
    this.configOnDisk = new lazy_val_1.Lazy(() => this.loadUpdateConfig());
    this.checkForUpdatesPromise = null;
    this.updateInfoAndProvider = null;
    this._testOnlyOptions = null;
    this.on("error", (error2) => {
      this._logger.error(`Error: ${error2.stack || error2.message}`);
    });
    if (app2 == null) {
      this.app = new ElectronAppAdapter_1.ElectronAppAdapter();
      this.httpExecutor = new electronHttpExecutor_1.ElectronHttpExecutor((authInfo, callback) => this.emit("login", authInfo, callback));
    } else {
      this.app = app2;
      this.httpExecutor = null;
    }
    const currentVersionString = this.app.version;
    const currentVersion = semver_1.parse(currentVersionString);
    if (currentVersion == null) {
      throw builder_util_runtime_1$7.newError(`App version is not a valid semver version: "${currentVersionString}"`, "ERR_UPDATER_INVALID_VERSION");
    }
    this.currentVersion = currentVersion;
    this.allowPrerelease = hasPrereleaseComponents(currentVersion);
    if (options != null) {
      this.setFeedURL(options);
      if (typeof options !== "string" && options.requestHeaders) {
        this.requestHeaders = options.requestHeaders;
      }
    }
  }
  get channel() {
    return this._channel;
  }
  set channel(value) {
    if (this._channel != null) {
      if (typeof value !== "string") {
        throw builder_util_runtime_1$7.newError(`Channel must be a string, but got: ${value}`, "ERR_UPDATER_INVALID_CHANNEL");
      } else if (value.length === 0) {
        throw builder_util_runtime_1$7.newError(`Channel must be not an empty string`, "ERR_UPDATER_INVALID_CHANNEL");
      }
    }
    this._channel = value;
    this.allowDowngrade = true;
  }
  addAuthHeader(token) {
    this.requestHeaders = Object.assign({}, this.requestHeaders, {
      authorization: token
    });
  }
  get netSession() {
    return electronHttpExecutor_1.getNetSession();
  }
  get logger() {
    return this._logger;
  }
  set logger(value) {
    this._logger = value == null ? new NoOpLogger() : value;
  }
  set updateConfigPath(value) {
    this.clientPromise = null;
    this._appUpdateConfigPath = value;
    this.configOnDisk = new lazy_val_1.Lazy(() => this.loadUpdateConfig());
  }
  getFeedURL() {
    return "Deprecated. Do not use it.";
  }
  setFeedURL(options) {
    const runtimeOptions = this.createProviderRuntimeOptions();
    let provider;
    if (typeof options === "string") {
      provider = new GenericProvider_1.GenericProvider({ provider: "generic", url: options }, this, __spreadProps(__spreadValues({}, runtimeOptions), {
        isUseMultipleRangeRequest: providerFactory_1.isUrlProbablySupportMultiRangeRequests(options)
      }));
    } else {
      provider = providerFactory_1.createClient(options, this, runtimeOptions);
    }
    this.clientPromise = Promise.resolve(provider);
  }
  checkForUpdates() {
    let checkForUpdatesPromise = this.checkForUpdatesPromise;
    if (checkForUpdatesPromise != null) {
      this._logger.info("Checking for update (already in progress)");
      return checkForUpdatesPromise;
    }
    const nullizePromise = () => this.checkForUpdatesPromise = null;
    this._logger.info("Checking for update");
    checkForUpdatesPromise = this.doCheckForUpdates().then((it) => {
      nullizePromise();
      return it;
    }).catch((e) => {
      nullizePromise();
      this.emit("error", e, `Cannot check for updates: ${(e.stack || e).toString()}`);
      throw e;
    });
    this.checkForUpdatesPromise = checkForUpdatesPromise;
    return checkForUpdatesPromise;
  }
  isUpdaterActive() {
    if (!this.app.isPackaged) {
      this._logger.info("Skip checkForUpdatesAndNotify because application is not packed");
      return false;
    }
    return true;
  }
  checkForUpdatesAndNotify(downloadNotification) {
    if (!this.isUpdaterActive()) {
      return Promise.resolve(null);
    }
    return this.checkForUpdates().then((it) => {
      const downloadPromise = it.downloadPromise;
      if (downloadPromise == null) {
        if (this._logger.debug != null) {
          this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null");
        }
        return it;
      }
      void downloadPromise.then(() => {
        const notificationContent = AppUpdater.formatDownloadNotification(it.updateInfo.version, this.app.name, downloadNotification);
        new require$$1__default["default"].Notification(notificationContent).show();
      });
      return it;
    });
  }
  static formatDownloadNotification(version, appName, downloadNotification) {
    if (downloadNotification == null) {
      downloadNotification = {
        title: "A new update is ready to install",
        body: `{appName} version {version} has been downloaded and will be automatically installed on exit`
      };
    }
    downloadNotification = {
      title: downloadNotification.title.replace("{appName}", appName).replace("{version}", version),
      body: downloadNotification.body.replace("{appName}", appName).replace("{version}", version)
    };
    return downloadNotification;
  }
  async isStagingMatch(updateInfo) {
    const rawStagingPercentage = updateInfo.stagingPercentage;
    let stagingPercentage = rawStagingPercentage;
    if (stagingPercentage == null) {
      return true;
    }
    stagingPercentage = parseInt(stagingPercentage, 10);
    if (isNaN(stagingPercentage)) {
      this._logger.warn(`Staging percentage is NaN: ${rawStagingPercentage}`);
      return true;
    }
    stagingPercentage = stagingPercentage / 100;
    const stagingUserId = await this.stagingUserIdPromise.value;
    const val = builder_util_runtime_1$7.UUID.parse(stagingUserId).readUInt32BE(12);
    const percentage = val / 4294967295;
    this._logger.info(`Staging percentage: ${stagingPercentage}, percentage: ${percentage}, user id: ${stagingUserId}`);
    return percentage < stagingPercentage;
  }
  computeFinalHeaders(headers) {
    if (this.requestHeaders != null) {
      Object.assign(headers, this.requestHeaders);
    }
    return headers;
  }
  async isUpdateAvailable(updateInfo) {
    const latestVersion = semver_1.parse(updateInfo.version);
    if (latestVersion == null) {
      throw builder_util_runtime_1$7.newError(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${updateInfo.version}"`, "ERR_UPDATER_INVALID_VERSION");
    }
    const currentVersion = this.currentVersion;
    if (semver_1.eq(latestVersion, currentVersion)) {
      return false;
    }
    const isStagingMatch = await this.isStagingMatch(updateInfo);
    if (!isStagingMatch) {
      return false;
    }
    const isLatestVersionNewer = semver_1.gt(latestVersion, currentVersion);
    const isLatestVersionOlder = semver_1.lt(latestVersion, currentVersion);
    if (isLatestVersionNewer) {
      return true;
    }
    return this.allowDowngrade && isLatestVersionOlder;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady();
    if (this.clientPromise == null) {
      this.clientPromise = this.configOnDisk.value.then((it) => providerFactory_1.createClient(it, this, this.createProviderRuntimeOptions()));
    }
    const client = await this.clientPromise;
    const stagingUserId = await this.stagingUserIdPromise.value;
    client.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": stagingUserId }));
    return {
      info: await client.getLatestVersion(),
      provider: client
    };
  }
  createProviderRuntimeOptions() {
    return {
      isUseMultipleRangeRequest: true,
      platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
      executor: this.httpExecutor
    };
  }
  async doCheckForUpdates() {
    this.emit("checking-for-update");
    const result = await this.getUpdateInfoAndProvider();
    const updateInfo = result.info;
    if (!await this.isUpdateAvailable(updateInfo)) {
      this._logger.info(`Update for version ${this.currentVersion} is not available (latest version: ${updateInfo.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`);
      this.emit("update-not-available", updateInfo);
      return {
        versionInfo: updateInfo,
        updateInfo
      };
    }
    this.updateInfoAndProvider = result;
    this.onUpdateAvailable(updateInfo);
    const cancellationToken = new builder_util_runtime_1$7.CancellationToken();
    return {
      versionInfo: updateInfo,
      updateInfo,
      cancellationToken,
      downloadPromise: this.autoDownload ? this.downloadUpdate(cancellationToken) : null
    };
  }
  onUpdateAvailable(updateInfo) {
    this._logger.info(`Found version ${updateInfo.version} (url: ${builder_util_runtime_1$7.asArray(updateInfo.files).map((it) => it.url).join(", ")})`);
    this.emit("update-available", updateInfo);
  }
  downloadUpdate(cancellationToken = new builder_util_runtime_1$7.CancellationToken()) {
    const updateInfoAndProvider = this.updateInfoAndProvider;
    if (updateInfoAndProvider == null) {
      const error2 = new Error("Please check update first");
      this.dispatchError(error2);
      return Promise.reject(error2);
    }
    this._logger.info(`Downloading update from ${builder_util_runtime_1$7.asArray(updateInfoAndProvider.info.files).map((it) => it.url).join(", ")}`);
    const errorHandler = (e) => {
      if (!(e instanceof builder_util_runtime_1$7.CancellationError)) {
        try {
          this.dispatchError(e);
        } catch (nestedError) {
          this._logger.warn(`Cannot dispatch error event: ${nestedError.stack || nestedError}`);
        }
      }
      return e;
    };
    try {
      return this.doDownloadUpdate({
        updateInfoAndProvider,
        requestHeaders: this.computeRequestHeaders(updateInfoAndProvider.provider),
        cancellationToken
      }).catch((e) => {
        throw errorHandler(e);
      });
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }
  dispatchError(e) {
    this.emit("error", e, (e.stack || e).toString());
  }
  dispatchUpdateDownloaded(event) {
    this.emit(main_1$2.UPDATE_DOWNLOADED, event);
  }
  async loadUpdateConfig() {
    if (this._appUpdateConfigPath == null) {
      this._appUpdateConfigPath = this.app.appUpdateConfigPath;
    }
    return js_yaml_1.load(await promises_1.readFile(this._appUpdateConfigPath, "utf-8"));
  }
  computeRequestHeaders(provider) {
    const fileExtraDownloadHeaders = provider.fileExtraDownloadHeaders;
    if (fileExtraDownloadHeaders != null) {
      const requestHeaders = this.requestHeaders;
      return requestHeaders == null ? fileExtraDownloadHeaders : __spreadValues(__spreadValues({}, fileExtraDownloadHeaders), requestHeaders);
    }
    return this.computeFinalHeaders({ accept: "*/*" });
  }
  async getOrCreateStagingUserId() {
    const file2 = path$9.join(this.app.userDataPath, ".updaterId");
    try {
      const id3 = await promises_1.readFile(file2, "utf-8");
      if (builder_util_runtime_1$7.UUID.check(id3)) {
        return id3;
      } else {
        this._logger.warn(`Staging user id file exists, but content was invalid: ${id3}`);
      }
    } catch (e) {
      if (e.code !== "ENOENT") {
        this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${e}`);
      }
    }
    const id2 = builder_util_runtime_1$7.UUID.v5(crypto_1.randomBytes(4096), builder_util_runtime_1$7.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${id2}`);
    try {
      await fs_extra_1$5.outputFile(file2, id2);
    } catch (e) {
      this._logger.warn(`Couldn't write out staging user ID: ${e}`);
    }
    return id2;
  }
  get isAddNoCacheQuery() {
    const headers = this.requestHeaders;
    if (headers == null) {
      return true;
    }
    for (const headerName of Object.keys(headers)) {
      const s2 = headerName.toLowerCase();
      if (s2 === "authorization" || s2 === "private-token") {
        return false;
      }
    }
    return true;
  }
  async getOrCreateDownloadHelper() {
    let result = this.downloadedUpdateHelper;
    if (result == null) {
      const dirName = (await this.configOnDisk.value).updaterCacheDirName;
      const logger = this._logger;
      if (dirName == null) {
        logger.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
      }
      const cacheDir = path$9.join(this.app.baseCachePath, dirName || this.app.name);
      if (logger.debug != null) {
        logger.debug(`updater cache dir: ${cacheDir}`);
      }
      result = new DownloadedUpdateHelper_1.DownloadedUpdateHelper(cacheDir);
      this.downloadedUpdateHelper = result;
    }
    return result;
  }
  async executeDownload(taskOptions) {
    const fileInfo = taskOptions.fileInfo;
    const downloadOptions = {
      headers: taskOptions.downloadUpdateOptions.requestHeaders,
      cancellationToken: taskOptions.downloadUpdateOptions.cancellationToken,
      sha2: fileInfo.info.sha2,
      sha512: fileInfo.info.sha512
    };
    if (this.listenerCount(main_1$2.DOWNLOAD_PROGRESS) > 0) {
      downloadOptions.onProgress = (it) => this.emit(main_1$2.DOWNLOAD_PROGRESS, it);
    }
    const updateInfo = taskOptions.downloadUpdateOptions.updateInfoAndProvider.info;
    const version = updateInfo.version;
    const packageInfo = fileInfo.packageInfo;
    function getCacheUpdateFileName() {
      const urlPath = decodeURIComponent(taskOptions.fileInfo.url.pathname);
      if (urlPath.endsWith(`.${taskOptions.fileExtension}`)) {
        return path$9.posix.basename(urlPath);
      } else {
        return `update.${taskOptions.fileExtension}`;
      }
    }
    const downloadedUpdateHelper = await this.getOrCreateDownloadHelper();
    const cacheDir = downloadedUpdateHelper.cacheDirForPendingUpdate;
    await promises_1.mkdir(cacheDir, { recursive: true });
    const updateFileName = getCacheUpdateFileName();
    let updateFile = path$9.join(cacheDir, updateFileName);
    const packageFile = packageInfo == null ? null : path$9.join(cacheDir, `package-${version}${path$9.extname(packageInfo.path) || ".7z"}`);
    const done = async (isSaveCache) => {
      await downloadedUpdateHelper.setDownloadedFile(updateFile, packageFile, updateInfo, fileInfo, updateFileName, isSaveCache);
      await taskOptions.done(__spreadProps(__spreadValues({}, updateInfo), {
        downloadedFile: updateFile
      }));
      return packageFile == null ? [updateFile] : [updateFile, packageFile];
    };
    const log = this._logger;
    const cachedUpdateFile = await downloadedUpdateHelper.validateDownloadedPath(updateFile, updateInfo, fileInfo, log);
    if (cachedUpdateFile != null) {
      updateFile = cachedUpdateFile;
      return await done(false);
    }
    const removeFileIfAny = async () => {
      await downloadedUpdateHelper.clear().catch(() => {
      });
      return await promises_1.unlink(updateFile).catch(() => {
      });
    };
    const tempUpdateFile = await DownloadedUpdateHelper_1.createTempUpdateFile(`temp-${updateFileName}`, cacheDir, log);
    try {
      await taskOptions.task(tempUpdateFile, downloadOptions, packageFile, removeFileIfAny);
      await promises_1.rename(tempUpdateFile, updateFile);
    } catch (e) {
      await removeFileIfAny();
      if (e instanceof builder_util_runtime_1$7.CancellationError) {
        log.info("cancelled");
        this.emit("update-cancelled", updateInfo);
      }
      throw e;
    }
    log.info(`New version ${version} has been downloaded to ${updateFile}`);
    return await done(true);
  }
}
AppUpdater$1.AppUpdater = AppUpdater;
function hasPrereleaseComponents(version) {
  const versionPrereleaseComponent = semver_1.prerelease(version);
  return versionPrereleaseComponent != null && versionPrereleaseComponent.length > 0;
}
class NoOpLogger {
  info(message) {
  }
  warn(message) {
  }
  error(message) {
  }
}
AppUpdater$1.NoOpLogger = NoOpLogger;
var AppImageUpdater$1 = {};
var BaseUpdater$1 = {};
Object.defineProperty(BaseUpdater$1, "__esModule", { value: true });
BaseUpdater$1.BaseUpdater = void 0;
const fs$3 = require$$0__default$2["default"];
const path$8 = require$$1__default$1["default"];
const AppUpdater_1$1 = AppUpdater$1;
class BaseUpdater extends AppUpdater_1$1.AppUpdater {
  constructor(options, app2) {
    super(options, app2);
    this.quitAndInstallCalled = false;
    this.quitHandlerAdded = false;
  }
  quitAndInstall(isSilent = false, isForceRunAfter = false) {
    this._logger.info(`Install on explicit quitAndInstall`);
    const isInstalled = this.install(isSilent, isSilent ? isForceRunAfter : true);
    if (isInstalled) {
      setImmediate(() => {
        this.app.quit();
      });
    } else {
      this.quitAndInstallCalled = false;
    }
  }
  executeDownload(taskOptions) {
    return super.executeDownload(__spreadProps(__spreadValues({}, taskOptions), {
      done: (event) => {
        this.dispatchUpdateDownloaded(event);
        this.addQuitHandler();
        return Promise.resolve();
      }
    }));
  }
  install(isSilent, isForceRunAfter) {
    if (this.quitAndInstallCalled) {
      this._logger.warn("install call ignored: quitAndInstallCalled is set to true");
      return false;
    }
    const downloadedUpdateHelper = this.downloadedUpdateHelper;
    const installerPath = downloadedUpdateHelper == null ? null : downloadedUpdateHelper.file;
    const downloadedFileInfo = downloadedUpdateHelper == null ? null : downloadedUpdateHelper.downloadedFileInfo;
    if (installerPath == null || downloadedFileInfo == null) {
      this.dispatchError(new Error("No valid update available, can't quit and install"));
      return false;
    }
    this.quitAndInstallCalled = true;
    try {
      let installPathRequiresElevation = false;
      if (process.platform === "win32") {
        try {
          const accessTestPath = path$8.join(path$8.dirname(process.execPath), `access-${Math.floor(Math.random() * 100)}.tmp`);
          fs$3.writeFileSync(accessTestPath, " ");
          fs$3.rmSync(accessTestPath);
        } catch (err) {
          installPathRequiresElevation = true;
        }
      }
      this._logger.info(`Install: isSilent: ${isSilent}, isForceRunAfter: ${isForceRunAfter}, installPathRequiresElevation: ${installPathRequiresElevation}`);
      return this.doInstall({
        installerPath,
        isSilent,
        isForceRunAfter,
        isAdminRightsRequired: installPathRequiresElevation || downloadedFileInfo.isAdminRightsRequired
      });
    } catch (e) {
      this.dispatchError(e);
      return false;
    }
  }
  addQuitHandler() {
    if (this.quitHandlerAdded || !this.autoInstallOnAppQuit) {
      return;
    }
    this.quitHandlerAdded = true;
    this.app.onQuit((exitCode) => {
      if (this.quitAndInstallCalled) {
        this._logger.info("Update installer has already been triggered. Quitting application.");
        return;
      }
      if (!this.autoInstallOnAppQuit) {
        this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
        return;
      }
      if (exitCode !== 0) {
        this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${exitCode}`);
        return;
      }
      this._logger.info("Auto install update on quit");
      this.install(true, false);
    });
  }
}
BaseUpdater$1.BaseUpdater = BaseUpdater;
var FileWithEmbeddedBlockMapDifferentialDownloader$1 = {};
var DifferentialDownloader$1 = {};
var DataSplitter$1 = {};
var downloadPlanBuilder = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.computeOperations = exports.OperationKind = void 0;
  var OperationKind2;
  (function(OperationKind3) {
    OperationKind3[OperationKind3["COPY"] = 0] = "COPY";
    OperationKind3[OperationKind3["DOWNLOAD"] = 1] = "DOWNLOAD";
  })(OperationKind2 = exports.OperationKind || (exports.OperationKind = {}));
  function computeOperations(oldBlockMap, newBlockMap, logger) {
    const nameToOldBlocks = buildBlockFileMap(oldBlockMap.files);
    const nameToNewBlocks = buildBlockFileMap(newBlockMap.files);
    let lastOperation = null;
    const blockMapFile = newBlockMap.files[0];
    const operations = [];
    const name = blockMapFile.name;
    const oldEntry = nameToOldBlocks.get(name);
    if (oldEntry == null) {
      throw new Error(`no file ${name} in old blockmap`);
    }
    const newFile = nameToNewBlocks.get(name);
    let changedBlockCount = 0;
    const { checksumToOffset: checksumToOldOffset, checksumToOldSize } = buildChecksumMap(nameToOldBlocks.get(name), oldEntry.offset, logger);
    let newOffset = blockMapFile.offset;
    for (let i2 = 0; i2 < newFile.checksums.length; newOffset += newFile.sizes[i2], i2++) {
      const blockSize = newFile.sizes[i2];
      const checksum = newFile.checksums[i2];
      let oldOffset = checksumToOldOffset.get(checksum);
      if (oldOffset != null && checksumToOldSize.get(checksum) !== blockSize) {
        logger.warn(`Checksum ("${checksum}") matches, but size differs (old: ${checksumToOldSize.get(checksum)}, new: ${blockSize})`);
        oldOffset = void 0;
      }
      if (oldOffset === void 0) {
        changedBlockCount++;
        if (lastOperation != null && lastOperation.kind === OperationKind2.DOWNLOAD && lastOperation.end === newOffset) {
          lastOperation.end += blockSize;
        } else {
          lastOperation = {
            kind: OperationKind2.DOWNLOAD,
            start: newOffset,
            end: newOffset + blockSize
          };
          validateAndAdd(lastOperation, operations, checksum, i2);
        }
      } else {
        if (lastOperation != null && lastOperation.kind === OperationKind2.COPY && lastOperation.end === oldOffset) {
          lastOperation.end += blockSize;
        } else {
          lastOperation = {
            kind: OperationKind2.COPY,
            start: oldOffset,
            end: oldOffset + blockSize
          };
          validateAndAdd(lastOperation, operations, checksum, i2);
        }
      }
    }
    if (changedBlockCount > 0) {
      logger.info(`File${blockMapFile.name === "file" ? "" : " " + blockMapFile.name} has ${changedBlockCount} changed blocks`);
    }
    return operations;
  }
  exports.computeOperations = computeOperations;
  const isValidateOperationRange = process.env["DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES"] === "true";
  function validateAndAdd(operation, operations, checksum, index) {
    if (isValidateOperationRange && operations.length !== 0) {
      const lastOperation = operations[operations.length - 1];
      if (lastOperation.kind === operation.kind && operation.start < lastOperation.end && operation.start > lastOperation.start) {
        const min = [lastOperation.start, lastOperation.end, operation.start, operation.end].reduce((p, v) => p < v ? p : v);
        throw new Error(`operation (block index: ${index}, checksum: ${checksum}, kind: ${OperationKind2[operation.kind]}) overlaps previous operation (checksum: ${checksum}):
abs: ${lastOperation.start} until ${lastOperation.end} and ${operation.start} until ${operation.end}
rel: ${lastOperation.start - min} until ${lastOperation.end - min} and ${operation.start - min} until ${operation.end - min}`);
      }
    }
    operations.push(operation);
  }
  function buildChecksumMap(file2, fileOffset, logger) {
    const checksumToOffset = new Map();
    const checksumToSize = new Map();
    let offset = fileOffset;
    for (let i2 = 0; i2 < file2.checksums.length; i2++) {
      const checksum = file2.checksums[i2];
      const size = file2.sizes[i2];
      const existing = checksumToSize.get(checksum);
      if (existing === void 0) {
        checksumToOffset.set(checksum, offset);
        checksumToSize.set(checksum, size);
      } else if (logger.debug != null) {
        const sizeExplanation = existing === size ? "(same size)" : `(size: ${existing}, this size: ${size})`;
        logger.debug(`${checksum} duplicated in blockmap ${sizeExplanation}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
      }
      offset += size;
    }
    return { checksumToOffset, checksumToOldSize: checksumToSize };
  }
  function buildBlockFileMap(list) {
    const result = new Map();
    for (const item of list) {
      result.set(item.name, item);
    }
    return result;
  }
})(downloadPlanBuilder);
Object.defineProperty(DataSplitter$1, "__esModule", { value: true });
DataSplitter$1.DataSplitter = DataSplitter$1.copyData = void 0;
const builder_util_runtime_1$6 = out;
const fs_1$5 = require$$0__default$2["default"];
const stream_1$1 = require$$0__default$1["default"];
const downloadPlanBuilder_1$2 = downloadPlanBuilder;
const DOUBLE_CRLF = Buffer.from("\r\n\r\n");
var ReadState;
(function(ReadState2) {
  ReadState2[ReadState2["INIT"] = 0] = "INIT";
  ReadState2[ReadState2["HEADER"] = 1] = "HEADER";
  ReadState2[ReadState2["BODY"] = 2] = "BODY";
})(ReadState || (ReadState = {}));
function copyData(task, out2, oldFileFd, reject, resolve2) {
  const readStream = fs_1$5.createReadStream("", {
    fd: oldFileFd,
    autoClose: false,
    start: task.start,
    end: task.end - 1
  });
  readStream.on("error", reject);
  readStream.once("end", resolve2);
  readStream.pipe(out2, {
    end: false
  });
}
DataSplitter$1.copyData = copyData;
class DataSplitter extends stream_1$1.Writable {
  constructor(out2, options, partIndexToTaskIndex, boundary, partIndexToLength, finishHandler) {
    super();
    this.out = out2;
    this.options = options;
    this.partIndexToTaskIndex = partIndexToTaskIndex;
    this.partIndexToLength = partIndexToLength;
    this.finishHandler = finishHandler;
    this.partIndex = -1;
    this.headerListBuffer = null;
    this.readState = ReadState.INIT;
    this.ignoreByteCount = 0;
    this.remainingPartDataCount = 0;
    this.actualPartLength = 0;
    this.boundaryLength = boundary.length + 4;
    this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  _write(data, encoding, callback) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${data.length} bytes`);
      return;
    }
    this.handleData(data).then(callback).catch(callback);
  }
  async handleData(chunk) {
    let start = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0) {
      throw builder_util_runtime_1$6.newError("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    }
    if (this.ignoreByteCount > 0) {
      const toIgnore = Math.min(this.ignoreByteCount, chunk.length);
      this.ignoreByteCount -= toIgnore;
      start = toIgnore;
    } else if (this.remainingPartDataCount > 0) {
      const toRead = Math.min(this.remainingPartDataCount, chunk.length);
      this.remainingPartDataCount -= toRead;
      await this.processPartData(chunk, 0, toRead);
      start = toRead;
    }
    if (start === chunk.length) {
      return;
    }
    if (this.readState === ReadState.HEADER) {
      const headerListEnd = this.searchHeaderListEnd(chunk, start);
      if (headerListEnd === -1) {
        return;
      }
      start = headerListEnd;
      this.readState = ReadState.BODY;
      this.headerListBuffer = null;
    }
    while (true) {
      if (this.readState === ReadState.BODY) {
        this.readState = ReadState.INIT;
      } else {
        this.partIndex++;
        let taskIndex = this.partIndexToTaskIndex.get(this.partIndex);
        if (taskIndex == null) {
          if (this.isFinished) {
            taskIndex = this.options.end;
          } else {
            throw builder_util_runtime_1$6.newError("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          }
        }
        const prevTaskIndex = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
        if (prevTaskIndex < taskIndex) {
          await this.copyExistingData(prevTaskIndex, taskIndex);
        } else if (prevTaskIndex > taskIndex) {
          throw builder_util_runtime_1$6.newError("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
        }
        if (this.isFinished) {
          this.onPartEnd();
          this.finishHandler();
          return;
        }
        start = this.searchHeaderListEnd(chunk, start);
        if (start === -1) {
          this.readState = ReadState.HEADER;
          return;
        }
      }
      const partLength = this.partIndexToLength[this.partIndex];
      const end = start + partLength;
      const effectiveEnd = Math.min(end, chunk.length);
      await this.processPartStarted(chunk, start, effectiveEnd);
      this.remainingPartDataCount = partLength - (effectiveEnd - start);
      if (this.remainingPartDataCount > 0) {
        return;
      }
      start = end + this.boundaryLength;
      if (start >= chunk.length) {
        this.ignoreByteCount = this.boundaryLength - (chunk.length - end);
        return;
      }
    }
  }
  copyExistingData(index, end) {
    return new Promise((resolve2, reject) => {
      const w2 = () => {
        if (index === end) {
          resolve2();
          return;
        }
        const task = this.options.tasks[index];
        if (task.kind !== downloadPlanBuilder_1$2.OperationKind.COPY) {
          reject(new Error("Task kind must be COPY"));
          return;
        }
        copyData(task, this.out, this.options.oldFileFd, reject, () => {
          index++;
          w2();
        });
      };
      w2();
    });
  }
  searchHeaderListEnd(chunk, readOffset) {
    const headerListEnd = chunk.indexOf(DOUBLE_CRLF, readOffset);
    if (headerListEnd !== -1) {
      return headerListEnd + DOUBLE_CRLF.length;
    }
    const partialChunk = readOffset === 0 ? chunk : chunk.slice(readOffset);
    if (this.headerListBuffer == null) {
      this.headerListBuffer = partialChunk;
    } else {
      this.headerListBuffer = Buffer.concat([this.headerListBuffer, partialChunk]);
    }
    return -1;
  }
  onPartEnd() {
    const expectedLength = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== expectedLength) {
      throw builder_util_runtime_1$6.newError(`Expected length: ${expectedLength} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    }
    this.actualPartLength = 0;
  }
  processPartStarted(data, start, end) {
    if (this.partIndex !== 0) {
      this.onPartEnd();
    }
    return this.processPartData(data, start, end);
  }
  processPartData(data, start, end) {
    this.actualPartLength += end - start;
    const out2 = this.out;
    if (out2.write(start === 0 && data.length === end ? data : data.slice(start, end))) {
      return Promise.resolve();
    } else {
      return new Promise((resolve2, reject) => {
        out2.on("error", reject);
        out2.once("drain", () => {
          out2.removeListener("error", reject);
          resolve2();
        });
      });
    }
  }
}
DataSplitter$1.DataSplitter = DataSplitter;
var multipleRangeDownloader = {};
Object.defineProperty(multipleRangeDownloader, "__esModule", { value: true });
multipleRangeDownloader.checkIsRangesSupported = multipleRangeDownloader.executeTasksUsingMultipleRangeRequests = void 0;
const builder_util_runtime_1$5 = out;
const DataSplitter_1$1 = DataSplitter$1;
const downloadPlanBuilder_1$1 = downloadPlanBuilder;
function executeTasksUsingMultipleRangeRequests(differentialDownloader, tasks, out2, oldFileFd, reject) {
  const w2 = (taskOffset) => {
    if (taskOffset >= tasks.length) {
      if (differentialDownloader.fileMetadataBuffer != null) {
        out2.write(differentialDownloader.fileMetadataBuffer);
      }
      out2.end();
      return;
    }
    const nextOffset = taskOffset + 1e3;
    doExecuteTasks(differentialDownloader, {
      tasks,
      start: taskOffset,
      end: Math.min(tasks.length, nextOffset),
      oldFileFd
    }, out2, () => w2(nextOffset), reject);
  };
  return w2;
}
multipleRangeDownloader.executeTasksUsingMultipleRangeRequests = executeTasksUsingMultipleRangeRequests;
function doExecuteTasks(differentialDownloader, options, out2, resolve2, reject) {
  let ranges = "bytes=";
  let partCount = 0;
  const partIndexToTaskIndex = new Map();
  const partIndexToLength = [];
  for (let i2 = options.start; i2 < options.end; i2++) {
    const task = options.tasks[i2];
    if (task.kind === downloadPlanBuilder_1$1.OperationKind.DOWNLOAD) {
      ranges += `${task.start}-${task.end - 1}, `;
      partIndexToTaskIndex.set(partCount, i2);
      partCount++;
      partIndexToLength.push(task.end - task.start);
    }
  }
  if (partCount <= 1) {
    const w2 = (index) => {
      if (index >= options.end) {
        resolve2();
        return;
      }
      const task = options.tasks[index++];
      if (task.kind === downloadPlanBuilder_1$1.OperationKind.COPY) {
        DataSplitter_1$1.copyData(task, out2, options.oldFileFd, reject, () => w2(index));
      } else {
        const requestOptions2 = differentialDownloader.createRequestOptions();
        requestOptions2.headers.Range = `bytes=${task.start}-${task.end - 1}`;
        const request2 = differentialDownloader.httpExecutor.createRequest(requestOptions2, (response) => {
          if (!checkIsRangesSupported(response, reject)) {
            return;
          }
          response.pipe(out2, {
            end: false
          });
          response.once("end", () => w2(index));
        });
        differentialDownloader.httpExecutor.addErrorAndTimeoutHandlers(request2, reject);
        request2.end();
      }
    };
    w2(options.start);
    return;
  }
  const requestOptions = differentialDownloader.createRequestOptions();
  requestOptions.headers.Range = ranges.substring(0, ranges.length - 2);
  const request = differentialDownloader.httpExecutor.createRequest(requestOptions, (response) => {
    if (!checkIsRangesSupported(response, reject)) {
      return;
    }
    const contentType = builder_util_runtime_1$5.safeGetHeader(response, "content-type");
    const m2 = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(contentType);
    if (m2 == null) {
      reject(new Error(`Content-Type "multipart/byteranges" is expected, but got "${contentType}"`));
      return;
    }
    const dicer = new DataSplitter_1$1.DataSplitter(out2, options, partIndexToTaskIndex, m2[1] || m2[2], partIndexToLength, resolve2);
    dicer.on("error", reject);
    response.pipe(dicer);
    response.on("end", () => {
      setTimeout(() => {
        request.abort();
        reject(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  differentialDownloader.httpExecutor.addErrorAndTimeoutHandlers(request, reject);
  request.end();
}
function checkIsRangesSupported(response, reject) {
  if (response.statusCode >= 400) {
    reject(builder_util_runtime_1$5.createHttpError(response));
    return false;
  }
  if (response.statusCode !== 206) {
    const acceptRanges = builder_util_runtime_1$5.safeGetHeader(response, "accept-ranges");
    if (acceptRanges == null || acceptRanges === "none") {
      reject(new Error(`Server doesn't support Accept-Ranges (response code ${response.statusCode})`));
      return false;
    }
  }
  return true;
}
multipleRangeDownloader.checkIsRangesSupported = checkIsRangesSupported;
var ProgressDifferentialDownloadCallbackTransform$1 = {};
Object.defineProperty(ProgressDifferentialDownloadCallbackTransform$1, "__esModule", { value: true });
ProgressDifferentialDownloadCallbackTransform$1.ProgressDifferentialDownloadCallbackTransform = void 0;
const stream_1 = require$$0__default$1["default"];
var OperationKind;
(function(OperationKind2) {
  OperationKind2[OperationKind2["COPY"] = 0] = "COPY";
  OperationKind2[OperationKind2["DOWNLOAD"] = 1] = "DOWNLOAD";
})(OperationKind || (OperationKind = {}));
class ProgressDifferentialDownloadCallbackTransform extends stream_1.Transform {
  constructor(progressDifferentialDownloadInfo, cancellationToken, onProgress) {
    super();
    this.progressDifferentialDownloadInfo = progressDifferentialDownloadInfo;
    this.cancellationToken = cancellationToken;
    this.onProgress = onProgress;
    this.start = Date.now();
    this.transferred = 0;
    this.delta = 0;
    this.expectedBytes = 0;
    this.index = 0;
    this.operationType = OperationKind.COPY;
    this.nextUpdate = this.start + 1e3;
  }
  _transform(chunk, encoding, callback) {
    if (this.cancellationToken.cancelled) {
      callback(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == OperationKind.COPY) {
      callback(null, chunk);
      return;
    }
    this.transferred += chunk.length;
    this.delta += chunk.length;
    const now = Date.now();
    if (now >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal) {
      this.nextUpdate = now + 1e3;
      this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((now - this.start) / 1e3))
      });
      this.delta = 0;
    }
    callback(null, chunk);
  }
  beginFileCopy() {
    this.operationType = OperationKind.COPY;
  }
  beginRangeDownload() {
    this.operationType = OperationKind.DOWNLOAD;
    this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    if (this.transferred !== this.progressDifferentialDownloadInfo.grandTotal) {
      this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      });
    }
  }
  _flush(callback) {
    if (this.cancellationToken.cancelled) {
      callback(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
    this.delta = 0;
    this.transferred = 0;
    callback(null);
  }
}
ProgressDifferentialDownloadCallbackTransform$1.ProgressDifferentialDownloadCallbackTransform = ProgressDifferentialDownloadCallbackTransform;
Object.defineProperty(DifferentialDownloader$1, "__esModule", { value: true });
DifferentialDownloader$1.DifferentialDownloader = void 0;
const builder_util_runtime_1$4 = out;
const fs_extra_1$4 = lib;
const fs_1$4 = require$$0__default$2["default"];
const DataSplitter_1 = DataSplitter$1;
const url_1$1 = require$$2__default["default"];
const downloadPlanBuilder_1 = downloadPlanBuilder;
const multipleRangeDownloader_1 = multipleRangeDownloader;
const ProgressDifferentialDownloadCallbackTransform_1 = ProgressDifferentialDownloadCallbackTransform$1;
class DifferentialDownloader {
  constructor(blockAwareFileInfo, httpExecutor2, options) {
    this.blockAwareFileInfo = blockAwareFileInfo;
    this.httpExecutor = httpExecutor2;
    this.options = options;
    this.fileMetadataBuffer = null;
    this.logger = options.logger;
  }
  createRequestOptions() {
    const result = {
      headers: __spreadProps(__spreadValues({}, this.options.requestHeaders), {
        accept: "*/*"
      })
    };
    builder_util_runtime_1$4.configureRequestUrl(this.options.newUrl, result);
    builder_util_runtime_1$4.configureRequestOptions(result);
    return result;
  }
  doDownload(oldBlockMap, newBlockMap) {
    if (oldBlockMap.version !== newBlockMap.version) {
      throw new Error(`version is different (${oldBlockMap.version} - ${newBlockMap.version}), full download is required`);
    }
    const logger = this.logger;
    const operations = downloadPlanBuilder_1.computeOperations(oldBlockMap, newBlockMap, logger);
    if (logger.debug != null) {
      logger.debug(JSON.stringify(operations, null, 2));
    }
    let downloadSize = 0;
    let copySize = 0;
    for (const operation of operations) {
      const length = operation.end - operation.start;
      if (operation.kind === downloadPlanBuilder_1.OperationKind.DOWNLOAD) {
        downloadSize += length;
      } else {
        copySize += length;
      }
    }
    const newSize = this.blockAwareFileInfo.size;
    if (downloadSize + copySize + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== newSize) {
      throw new Error(`Internal error, size mismatch: downloadSize: ${downloadSize}, copySize: ${copySize}, newSize: ${newSize}`);
    }
    logger.info(`Full: ${formatBytes(newSize)}, To download: ${formatBytes(downloadSize)} (${Math.round(downloadSize / (newSize / 100))}%)`);
    return this.downloadFile(operations);
  }
  downloadFile(tasks) {
    const fdList = [];
    const closeFiles = () => {
      return Promise.all(fdList.map((openedFile) => {
        return fs_extra_1$4.close(openedFile.descriptor).catch((e) => {
          this.logger.error(`cannot close file "${openedFile.path}": ${e}`);
        });
      }));
    };
    return this.doDownloadFile(tasks, fdList).then(closeFiles).catch((e) => {
      return closeFiles().catch((closeFilesError) => {
        try {
          this.logger.error(`cannot close files: ${closeFilesError}`);
        } catch (errorOnLog) {
          try {
            console.error(errorOnLog);
          } catch (ignored) {
          }
        }
        throw e;
      }).then(() => {
        throw e;
      });
    });
  }
  async doDownloadFile(tasks, fdList) {
    const oldFileFd = await fs_extra_1$4.open(this.options.oldFile, "r");
    fdList.push({ descriptor: oldFileFd, path: this.options.oldFile });
    const newFileFd = await fs_extra_1$4.open(this.options.newFile, "w");
    fdList.push({ descriptor: newFileFd, path: this.options.newFile });
    const fileOut = fs_1$4.createWriteStream(this.options.newFile, { fd: newFileFd });
    await new Promise((resolve2, reject) => {
      const streams = [];
      let downloadInfoTransform = void 0;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const expectedByteCounts = [];
        let grandTotalBytes = 0;
        for (const task of tasks) {
          if (task.kind === downloadPlanBuilder_1.OperationKind.DOWNLOAD) {
            expectedByteCounts.push(task.end - task.start);
            grandTotalBytes += task.end - task.start;
          }
        }
        const progressDifferentialDownloadInfo = {
          expectedByteCounts,
          grandTotal: grandTotalBytes
        };
        downloadInfoTransform = new ProgressDifferentialDownloadCallbackTransform_1.ProgressDifferentialDownloadCallbackTransform(progressDifferentialDownloadInfo, this.options.cancellationToken, this.options.onProgress);
        streams.push(downloadInfoTransform);
      }
      const digestTransform = new builder_util_runtime_1$4.DigestTransform(this.blockAwareFileInfo.sha512);
      digestTransform.isValidateOnEnd = false;
      streams.push(digestTransform);
      fileOut.on("finish", () => {
        fileOut.close(() => {
          fdList.splice(1, 1);
          try {
            digestTransform.validate();
          } catch (e) {
            reject(e);
            return;
          }
          resolve2(void 0);
        });
      });
      streams.push(fileOut);
      let lastStream = null;
      for (const stream of streams) {
        stream.on("error", reject);
        if (lastStream == null) {
          lastStream = stream;
        } else {
          lastStream = lastStream.pipe(stream);
        }
      }
      const firstStream = streams[0];
      let w2;
      if (this.options.isUseMultipleRangeRequest) {
        w2 = multipleRangeDownloader_1.executeTasksUsingMultipleRangeRequests(this, tasks, firstStream, oldFileFd, reject);
        w2(0);
        return;
      }
      let downloadOperationCount = 0;
      let actualUrl = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const requestOptions = this.createRequestOptions();
      requestOptions.redirect = "manual";
      w2 = (index) => {
        var _a, _b;
        if (index >= tasks.length) {
          if (this.fileMetadataBuffer != null) {
            firstStream.write(this.fileMetadataBuffer);
          }
          firstStream.end();
          return;
        }
        const operation = tasks[index++];
        if (operation.kind === downloadPlanBuilder_1.OperationKind.COPY) {
          if (downloadInfoTransform) {
            downloadInfoTransform.beginFileCopy();
          }
          DataSplitter_1.copyData(operation, firstStream, oldFileFd, reject, () => w2(index));
          return;
        }
        const range2 = `bytes=${operation.start}-${operation.end - 1}`;
        requestOptions.headers.range = range2;
        (_b = (_a = this.logger) === null || _a === void 0 ? void 0 : _a.debug) === null || _b === void 0 ? void 0 : _b.call(_a, `download range: ${range2}`);
        if (downloadInfoTransform) {
          downloadInfoTransform.beginRangeDownload();
        }
        const request = this.httpExecutor.createRequest(requestOptions, (response) => {
          if (response.statusCode >= 400) {
            reject(builder_util_runtime_1$4.createHttpError(response));
          }
          response.pipe(firstStream, {
            end: false
          });
          response.once("end", () => {
            if (downloadInfoTransform) {
              downloadInfoTransform.endRangeDownload();
            }
            if (++downloadOperationCount === 100) {
              downloadOperationCount = 0;
              setTimeout(() => w2(index), 1e3);
            } else {
              w2(index);
            }
          });
        });
        request.on("redirect", (statusCode, method, redirectUrl) => {
          this.logger.info(`Redirect to ${removeQuery(redirectUrl)}`);
          actualUrl = redirectUrl;
          builder_util_runtime_1$4.configureRequestUrl(new url_1$1.URL(actualUrl), requestOptions);
          request.followRedirect();
        });
        this.httpExecutor.addErrorAndTimeoutHandlers(request, reject);
        request.end();
      };
      w2(0);
    });
  }
  async readRemoteBytes(start, endInclusive) {
    const buffer = Buffer.allocUnsafe(endInclusive + 1 - start);
    const requestOptions = this.createRequestOptions();
    requestOptions.headers.range = `bytes=${start}-${endInclusive}`;
    let position = 0;
    await this.request(requestOptions, (chunk) => {
      chunk.copy(buffer, position);
      position += chunk.length;
    });
    if (position !== buffer.length) {
      throw new Error(`Received data length ${position} is not equal to expected ${buffer.length}`);
    }
    return buffer;
  }
  request(requestOptions, dataHandler) {
    return new Promise((resolve2, reject) => {
      const request = this.httpExecutor.createRequest(requestOptions, (response) => {
        if (!multipleRangeDownloader_1.checkIsRangesSupported(response, reject)) {
          return;
        }
        response.on("data", dataHandler);
        response.on("end", () => resolve2());
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(request, reject);
      request.end();
    });
  }
}
DifferentialDownloader$1.DifferentialDownloader = DifferentialDownloader;
function formatBytes(value, symbol = " KB") {
  return new Intl.NumberFormat("en").format((value / 1024).toFixed(2)) + symbol;
}
function removeQuery(url) {
  const index = url.indexOf("?");
  return index < 0 ? url : url.substring(0, index);
}
Object.defineProperty(FileWithEmbeddedBlockMapDifferentialDownloader$1, "__esModule", { value: true });
FileWithEmbeddedBlockMapDifferentialDownloader$1.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const fs_extra_1$3 = lib;
const DifferentialDownloader_1$1 = DifferentialDownloader$1;
const zlib_1$1 = require$$2__default$1["default"];
class FileWithEmbeddedBlockMapDifferentialDownloader extends DifferentialDownloader_1$1.DifferentialDownloader {
  async download() {
    const packageInfo = this.blockAwareFileInfo;
    const fileSize = packageInfo.size;
    const offset = fileSize - (packageInfo.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(offset, fileSize - 1);
    const newBlockMap = readBlockMap(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await readEmbeddedBlockMapData(this.options.oldFile), newBlockMap);
  }
}
FileWithEmbeddedBlockMapDifferentialDownloader$1.FileWithEmbeddedBlockMapDifferentialDownloader = FileWithEmbeddedBlockMapDifferentialDownloader;
function readBlockMap(data) {
  return JSON.parse(zlib_1$1.inflateRawSync(data).toString());
}
async function readEmbeddedBlockMapData(file2) {
  const fd = await fs_extra_1$3.open(file2, "r");
  try {
    const fileSize = (await fs_extra_1$3.fstat(fd)).size;
    const sizeBuffer = Buffer.allocUnsafe(4);
    await fs_extra_1$3.read(fd, sizeBuffer, 0, sizeBuffer.length, fileSize - sizeBuffer.length);
    const dataBuffer = Buffer.allocUnsafe(sizeBuffer.readUInt32BE(0));
    await fs_extra_1$3.read(fd, dataBuffer, 0, dataBuffer.length, fileSize - sizeBuffer.length - dataBuffer.length);
    await fs_extra_1$3.close(fd);
    return readBlockMap(dataBuffer);
  } catch (e) {
    await fs_extra_1$3.close(fd);
    throw e;
  }
}
Object.defineProperty(AppImageUpdater$1, "__esModule", { value: true });
AppImageUpdater$1.AppImageUpdater = void 0;
const builder_util_runtime_1$3 = out;
const child_process_1$3 = require$$1__default$4["default"];
const fs_extra_1$2 = lib;
const fs_1$3 = require$$0__default$2["default"];
const path$7 = require$$1__default$1["default"];
const BaseUpdater_1$1 = BaseUpdater$1;
const FileWithEmbeddedBlockMapDifferentialDownloader_1$1 = FileWithEmbeddedBlockMapDifferentialDownloader$1;
const main_1$1 = main$1;
const Provider_1$2 = Provider$1;
class AppImageUpdater extends BaseUpdater_1$1.BaseUpdater {
  constructor(options, app2) {
    super(options, app2);
  }
  isUpdaterActive() {
    if (process.env["APPIMAGE"] == null) {
      if (process.env["SNAP"] == null) {
        this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage");
      } else {
        this._logger.info("SNAP env is defined, updater is disabled");
      }
      return false;
    }
    return super.isUpdaterActive();
  }
  doDownloadUpdate(downloadUpdateOptions) {
    const provider = downloadUpdateOptions.updateInfoAndProvider.provider;
    const fileInfo = Provider_1$2.findFile(provider.resolveFiles(downloadUpdateOptions.updateInfoAndProvider.info), "AppImage");
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo,
      downloadUpdateOptions,
      task: async (updateFile, downloadOptions) => {
        const oldFile = process.env["APPIMAGE"];
        if (oldFile == null) {
          throw builder_util_runtime_1$3.newError("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        }
        let isDownloadFull = false;
        try {
          const downloadOptions2 = {
            newUrl: fileInfo.url,
            oldFile,
            logger: this._logger,
            newFile: updateFile,
            isUseMultipleRangeRequest: provider.isUseMultipleRangeRequest,
            requestHeaders: downloadUpdateOptions.requestHeaders,
            cancellationToken: downloadUpdateOptions.cancellationToken
          };
          if (this.listenerCount(main_1$1.DOWNLOAD_PROGRESS) > 0) {
            downloadOptions2.onProgress = (it) => this.emit(main_1$1.DOWNLOAD_PROGRESS, it);
          }
          await new FileWithEmbeddedBlockMapDifferentialDownloader_1$1.FileWithEmbeddedBlockMapDifferentialDownloader(fileInfo.info, this.httpExecutor, downloadOptions2).download();
        } catch (e) {
          this._logger.error(`Cannot download differentially, fallback to full download: ${e.stack || e}`);
          isDownloadFull = process.platform === "linux";
        }
        if (isDownloadFull) {
          await this.httpExecutor.download(fileInfo.url, updateFile, downloadOptions);
        }
        await fs_extra_1$2.chmod(updateFile, 493);
      }
    });
  }
  doInstall(options) {
    const appImageFile = process.env["APPIMAGE"];
    if (appImageFile == null) {
      throw builder_util_runtime_1$3.newError("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    }
    fs_1$3.unlinkSync(appImageFile);
    let destination;
    const existingBaseName = path$7.basename(appImageFile);
    if (path$7.basename(options.installerPath) === existingBaseName || !/\d+\.\d+\.\d+/.test(existingBaseName)) {
      destination = appImageFile;
    } else {
      destination = path$7.join(path$7.dirname(appImageFile), path$7.basename(options.installerPath));
    }
    child_process_1$3.execFileSync("mv", ["-f", options.installerPath, destination]);
    if (destination !== appImageFile) {
      this.emit("appimage-filename-updated", destination);
    }
    const env2 = __spreadProps(__spreadValues({}, process.env), {
      APPIMAGE_SILENT_INSTALL: "true"
    });
    if (options.isForceRunAfter) {
      child_process_1$3.spawn(destination, [], {
        detached: true,
        stdio: "ignore",
        env: env2
      }).unref();
    } else {
      env2.APPIMAGE_EXIT_AFTER_INSTALL = "true";
      child_process_1$3.execFileSync(destination, [], { env: env2 });
    }
    return true;
  }
}
AppImageUpdater$1.AppImageUpdater = AppImageUpdater;
var MacUpdater$1 = {};
Object.defineProperty(MacUpdater$1, "__esModule", { value: true });
MacUpdater$1.MacUpdater = void 0;
const builder_util_runtime_1$2 = out;
const fs_extra_1$1 = lib;
const fs_1$2 = require$$0__default$2["default"];
const http_1 = require$$3__default["default"];
const AppUpdater_1 = AppUpdater$1;
const Provider_1$1 = Provider$1;
const child_process_1$2 = require$$1__default$4["default"];
class MacUpdater extends AppUpdater_1.AppUpdater {
  constructor(options, app2) {
    super(options, app2);
    this.nativeUpdater = require$$1__default["default"].autoUpdater;
    this.squirrelDownloadedUpdate = false;
    this.nativeUpdater.on("error", (it) => {
      this._logger.warn(it);
      this.emit("error", it);
    });
    this.nativeUpdater.on("update-downloaded", () => {
      this.squirrelDownloadedUpdate = true;
    });
  }
  debug(message) {
    if (this._logger.debug != null) {
      this._logger.debug(message);
    }
  }
  async doDownloadUpdate(downloadUpdateOptions) {
    let files = downloadUpdateOptions.updateInfoAndProvider.provider.resolveFiles(downloadUpdateOptions.updateInfoAndProvider.info);
    const log = this._logger;
    const sysctlRosettaInfoKey = "sysctl.proc_translated";
    let isRosetta;
    try {
      this.debug("Checking for macOS Rosetta environment");
      const result = child_process_1$2.execFileSync("sysctl", [sysctlRosettaInfoKey], { encoding: "utf8" });
      isRosetta = result.includes(`${sysctlRosettaInfoKey}: 1`);
      log.info(`Checked for macOS Rosetta environment (isRosetta=${isRosetta})`);
    } catch (e) {
      log.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${e}`);
    }
    const isArm64 = (file2) => {
      var _a;
      return file2.url.pathname.includes("arm64") || ((_a = file2.info.url) === null || _a === void 0 ? void 0 : _a.includes("arm64"));
    };
    if (files.some(isArm64)) {
      files = files.filter((file2) => (process.arch === "arm64" || isRosetta) === isArm64(file2));
    }
    const zipFileInfo = Provider_1$1.findFile(files, "zip", ["pkg", "dmg"]);
    if (zipFileInfo == null) {
      throw builder_util_runtime_1$2.newError(`ZIP file not provided: ${builder_util_runtime_1$2.safeStringifyJson(files)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    }
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: zipFileInfo,
      downloadUpdateOptions,
      task: (destinationFile, downloadOptions) => {
        return this.httpExecutor.download(zipFileInfo.url, destinationFile, downloadOptions);
      },
      done: (event) => this.updateDownloaded(zipFileInfo, event)
    });
  }
  async updateDownloaded(zipFileInfo, event) {
    var _a;
    const downloadedFile = event.downloadedFile;
    const updateFileSize = (_a = zipFileInfo.info.size) !== null && _a !== void 0 ? _a : (await fs_extra_1$1.stat(downloadedFile)).size;
    const log = this._logger;
    const logContext = `fileToProxy=${zipFileInfo.url.href}`;
    this.debug(`Creating proxy server for native Squirrel.Mac (${logContext})`);
    const server = http_1.createServer();
    this.debug(`Proxy server for native Squirrel.Mac is created (${logContext})`);
    server.on("close", () => {
      log.info(`Proxy server for native Squirrel.Mac is closed (${logContext})`);
    });
    function getServerUrl() {
      const address = server.address();
      return `http://127.0.0.1:${address.port}`;
    }
    return await new Promise((resolve2, reject) => {
      const fileUrl = `/${Date.now().toString(16)}-${Math.floor(Math.random() * 9999).toString(16)}.zip`;
      server.on("request", (request, response) => {
        const requestUrl = request.url;
        log.info(`${requestUrl} requested`);
        if (requestUrl === "/") {
          const data = Buffer.from(`{ "url": "${getServerUrl()}${fileUrl}" }`);
          response.writeHead(200, { "Content-Type": "application/json", "Content-Length": data.length });
          response.end(data);
          return;
        }
        if (!requestUrl.startsWith(fileUrl)) {
          log.warn(`${requestUrl} requested, but not supported`);
          response.writeHead(404);
          response.end();
          return;
        }
        log.info(`${fileUrl} requested by Squirrel.Mac, pipe ${downloadedFile}`);
        let errorOccurred = false;
        response.on("finish", () => {
          try {
            setImmediate(() => server.close());
          } finally {
            if (!errorOccurred) {
              this.nativeUpdater.removeListener("error", reject);
              resolve2([]);
            }
          }
        });
        const readStream = fs_1$2.createReadStream(downloadedFile);
        readStream.on("error", (error2) => {
          try {
            response.end();
          } catch (e) {
            log.warn(`cannot end response: ${e}`);
          }
          errorOccurred = true;
          this.nativeUpdater.removeListener("error", reject);
          reject(new Error(`Cannot pipe "${downloadedFile}": ${error2}`));
        });
        response.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": updateFileSize
        });
        readStream.pipe(response);
      });
      this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${logContext})`);
      server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${getServerUrl()}, ${logContext})`);
        this.nativeUpdater.setFeedURL({
          url: getServerUrl(),
          headers: { "Cache-Control": "no-cache" }
        });
        this.dispatchUpdateDownloaded(event);
        if (this.autoInstallOnAppQuit) {
          this.nativeUpdater.once("error", reject);
          this.nativeUpdater.checkForUpdates();
        } else {
          resolve2([]);
        }
      });
    });
  }
  quitAndInstall() {
    if (this.squirrelDownloadedUpdate) {
      this.nativeUpdater.quitAndInstall();
    } else {
      this.nativeUpdater.on("update-downloaded", () => {
        this.nativeUpdater.quitAndInstall();
      });
    }
  }
}
MacUpdater$1.MacUpdater = MacUpdater;
var NsisUpdater$1 = {};
var GenericDifferentialDownloader$1 = {};
Object.defineProperty(GenericDifferentialDownloader$1, "__esModule", { value: true });
GenericDifferentialDownloader$1.GenericDifferentialDownloader = void 0;
const DifferentialDownloader_1 = DifferentialDownloader$1;
class GenericDifferentialDownloader extends DifferentialDownloader_1.DifferentialDownloader {
  download(oldBlockMap, newBlockMap) {
    return this.doDownload(oldBlockMap, newBlockMap);
  }
}
GenericDifferentialDownloader$1.GenericDifferentialDownloader = GenericDifferentialDownloader;
var windowsExecutableCodeSignatureVerifier = {};
Object.defineProperty(windowsExecutableCodeSignatureVerifier, "__esModule", { value: true });
windowsExecutableCodeSignatureVerifier.verifySignature = void 0;
const builder_util_runtime_1$1 = out;
const child_process_1$1 = require$$1__default$4["default"];
const os$1 = require$$1__default$3["default"];
function verifySignature(publisherNames, unescapedTempUpdateFile, logger) {
  return new Promise((resolve2) => {
    const tempUpdateFile = unescapedTempUpdateFile.replace(/'/g, "''").replace(/`/g, "``");
    child_process_1$1.execFile("powershell.exe", [
      "-NoProfile",
      "-NonInteractive",
      "-InputFormat",
      "None",
      "-Command",
      `Get-AuthenticodeSignature '${tempUpdateFile}' | ConvertTo-Json -Compress | ForEach-Object { [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($_)) }`
    ], {
      timeout: 20 * 1e3
    }, (error2, stdout, stderr) => {
      try {
        if (error2 != null || stderr) {
          handleError(logger, error2, stderr);
          resolve2(null);
          return;
        }
        const data = parseOut(Buffer.from(stdout, "base64").toString("utf-8"));
        if (data.Status === 0) {
          const name = builder_util_runtime_1$1.parseDn(data.SignerCertificate.Subject).get("CN");
          if (publisherNames.includes(name)) {
            resolve2(null);
            return;
          }
        }
        const result = `publisherNames: ${publisherNames.join(" | ")}, raw info: ` + JSON.stringify(data, (name, value) => name === "RawData" ? void 0 : value, 2);
        logger.warn(`Sign verification failed, installer signed with incorrect certificate: ${result}`);
        resolve2(result);
      } catch (e) {
        logger.warn(`Cannot execute Get-AuthenticodeSignature: ${error2}. Ignoring signature validation due to unknown error.`);
        resolve2(null);
        return;
      }
    });
  });
}
windowsExecutableCodeSignatureVerifier.verifySignature = verifySignature;
function parseOut(out2) {
  const data = JSON.parse(out2);
  delete data.PrivateKey;
  delete data.IsOSBinary;
  delete data.SignatureType;
  const signerCertificate = data.SignerCertificate;
  if (signerCertificate != null) {
    delete signerCertificate.Archived;
    delete signerCertificate.Extensions;
    delete signerCertificate.Handle;
    delete signerCertificate.HasPrivateKey;
    delete signerCertificate.SubjectName;
  }
  delete data.Path;
  return data;
}
function handleError(logger, error2, stderr) {
  if (isOldWin6()) {
    logger.warn(`Cannot execute Get-AuthenticodeSignature: ${error2 || stderr}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    child_process_1$1.execFileSync("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
  } catch (testError) {
    logger.warn(`Cannot execute ConvertTo-Json: ${testError.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  if (error2 != null) {
    throw error2;
  }
  if (stderr) {
    logger.warn(`Cannot execute Get-AuthenticodeSignature, stderr: ${stderr}. Ignoring signature validation due to unknown stderr.`);
    return;
  }
}
function isOldWin6() {
  const winVersion = os$1.release();
  return winVersion.startsWith("6.") && !winVersion.startsWith("6.3");
}
Object.defineProperty(NsisUpdater$1, "__esModule", { value: true });
NsisUpdater$1.NsisUpdater = void 0;
const builder_util_runtime_1 = out;
const child_process_1 = require$$1__default$4["default"];
const path$6 = require$$1__default$1["default"];
const BaseUpdater_1 = BaseUpdater$1;
const FileWithEmbeddedBlockMapDifferentialDownloader_1 = FileWithEmbeddedBlockMapDifferentialDownloader$1;
const GenericDifferentialDownloader_1 = GenericDifferentialDownloader$1;
const main_1 = main$1;
const util_1$q = util$1;
const Provider_1 = Provider$1;
const fs_extra_1 = lib;
const windowsExecutableCodeSignatureVerifier_1 = windowsExecutableCodeSignatureVerifier;
const url_1 = require$$2__default["default"];
const zlib_1 = require$$2__default$1["default"];
class NsisUpdater extends BaseUpdater_1.BaseUpdater {
  constructor(options, app2) {
    super(options, app2);
  }
  doDownloadUpdate(downloadUpdateOptions) {
    const provider = downloadUpdateOptions.updateInfoAndProvider.provider;
    const fileInfo = Provider_1.findFile(provider.resolveFiles(downloadUpdateOptions.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions,
      fileInfo,
      task: async (destinationFile, downloadOptions, packageFile, removeTempDirIfAny) => {
        const packageInfo = fileInfo.packageInfo;
        const isWebInstaller = packageInfo != null && packageFile != null;
        if (isWebInstaller || await this.differentialDownloadInstaller(fileInfo, downloadUpdateOptions, destinationFile, provider)) {
          await this.httpExecutor.download(fileInfo.url, destinationFile, downloadOptions);
        }
        const signatureVerificationStatus = await this.verifySignature(destinationFile);
        if (signatureVerificationStatus != null) {
          await removeTempDirIfAny();
          throw builder_util_runtime_1.newError(`New version ${downloadUpdateOptions.updateInfoAndProvider.info.version} is not signed by the application owner: ${signatureVerificationStatus}`, "ERR_UPDATER_INVALID_SIGNATURE");
        }
        if (isWebInstaller) {
          if (await this.differentialDownloadWebPackage(downloadUpdateOptions, packageInfo, packageFile, provider)) {
            try {
              await this.httpExecutor.download(new url_1.URL(packageInfo.path), packageFile, {
                headers: downloadUpdateOptions.requestHeaders,
                cancellationToken: downloadUpdateOptions.cancellationToken,
                sha512: packageInfo.sha512
              });
            } catch (e) {
              try {
                await fs_extra_1.unlink(packageFile);
              } catch (ignored) {
              }
              throw e;
            }
          }
        }
      }
    });
  }
  async verifySignature(tempUpdateFile) {
    let publisherName;
    try {
      publisherName = (await this.configOnDisk.value).publisherName;
      if (publisherName == null) {
        return null;
      }
    } catch (e) {
      if (e.code === "ENOENT") {
        return null;
      }
      throw e;
    }
    return await windowsExecutableCodeSignatureVerifier_1.verifySignature(Array.isArray(publisherName) ? publisherName : [publisherName], tempUpdateFile, this._logger);
  }
  doInstall(options) {
    const args = ["--updated"];
    if (options.isSilent) {
      args.push("/S");
    }
    if (options.isForceRunAfter) {
      args.push("--force-run");
    }
    const packagePath = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
    if (packagePath != null) {
      args.push(`--package-file=${packagePath}`);
    }
    const callUsingElevation = () => {
      _spawn(path$6.join(process.resourcesPath, "elevate.exe"), [options.installerPath].concat(args)).catch((e) => this.dispatchError(e));
    };
    if (options.isAdminRightsRequired) {
      this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe");
      callUsingElevation();
      return true;
    }
    _spawn(options.installerPath, args).catch((e) => {
      const errorCode = e.code;
      this._logger.info(`Cannot run installer: error code: ${errorCode}, error message: "${e.message}", will be executed again using elevate if EACCES"`);
      if (errorCode === "UNKNOWN" || errorCode === "EACCES") {
        callUsingElevation();
      } else {
        this.dispatchError(e);
      }
    });
    return true;
  }
  async differentialDownloadInstaller(fileInfo, downloadUpdateOptions, installerPath, provider) {
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload) {
        return true;
      }
      const blockmapFileUrls = util_1$q.blockmapFiles(fileInfo.url, this.app.version, downloadUpdateOptions.updateInfoAndProvider.info.version);
      this._logger.info(`Download block maps (old: "${blockmapFileUrls[0]}", new: ${blockmapFileUrls[1]})`);
      const downloadBlockMap = async (url) => {
        const data = await this.httpExecutor.downloadToBuffer(url, {
          headers: downloadUpdateOptions.requestHeaders,
          cancellationToken: downloadUpdateOptions.cancellationToken
        });
        if (data == null || data.length === 0) {
          throw new Error(`Blockmap "${url.href}" is empty`);
        }
        try {
          return JSON.parse(zlib_1.gunzipSync(data).toString());
        } catch (e) {
          throw new Error(`Cannot parse blockmap "${url.href}", error: ${e}`);
        }
      };
      const downloadOptions = {
        newUrl: fileInfo.url,
        oldFile: path$6.join(this.downloadedUpdateHelper.cacheDir, builder_util_runtime_1.CURRENT_APP_INSTALLER_FILE_NAME),
        logger: this._logger,
        newFile: installerPath,
        isUseMultipleRangeRequest: provider.isUseMultipleRangeRequest,
        requestHeaders: downloadUpdateOptions.requestHeaders,
        cancellationToken: downloadUpdateOptions.cancellationToken
      };
      if (this.listenerCount(main_1.DOWNLOAD_PROGRESS) > 0) {
        downloadOptions.onProgress = (it) => this.emit(main_1.DOWNLOAD_PROGRESS, it);
      }
      const blockMapDataList = await Promise.all(blockmapFileUrls.map((u2) => downloadBlockMap(u2)));
      await new GenericDifferentialDownloader_1.GenericDifferentialDownloader(fileInfo.info, this.httpExecutor, downloadOptions).download(blockMapDataList[0], blockMapDataList[1]);
      return false;
    } catch (e) {
      this._logger.error(`Cannot download differentially, fallback to full download: ${e.stack || e}`);
      if (this._testOnlyOptions != null) {
        throw e;
      }
      return true;
    }
  }
  async differentialDownloadWebPackage(downloadUpdateOptions, packageInfo, packagePath, provider) {
    if (packageInfo.blockMapSize == null) {
      return true;
    }
    try {
      const downloadOptions = {
        newUrl: new url_1.URL(packageInfo.path),
        oldFile: path$6.join(this.downloadedUpdateHelper.cacheDir, builder_util_runtime_1.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: packagePath,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: provider.isUseMultipleRangeRequest,
        cancellationToken: downloadUpdateOptions.cancellationToken
      };
      if (this.listenerCount(main_1.DOWNLOAD_PROGRESS) > 0) {
        downloadOptions.onProgress = (it) => this.emit(main_1.DOWNLOAD_PROGRESS, it);
      }
      await new FileWithEmbeddedBlockMapDifferentialDownloader_1.FileWithEmbeddedBlockMapDifferentialDownloader(packageInfo, this.httpExecutor, downloadOptions).download();
    } catch (e) {
      this._logger.error(`Cannot download differentially, fallback to full download: ${e.stack || e}`);
      return process.platform === "win32";
    }
    return false;
  }
}
NsisUpdater$1.NsisUpdater = NsisUpdater;
async function _spawn(exe, args) {
  return new Promise((resolve2, reject) => {
    try {
      const process2 = child_process_1.spawn(exe, args, {
        detached: true,
        stdio: "ignore"
      });
      process2.on("error", (error2) => {
        reject(error2);
      });
      process2.unref();
      if (process2.pid !== void 0) {
        resolve2(true);
      }
    } catch (error2) {
      reject(error2);
    }
  });
}
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.UpdaterSignal = exports.UPDATE_DOWNLOADED = exports.DOWNLOAD_PROGRESS = exports.NsisUpdater = exports.MacUpdater = exports.AppImageUpdater = exports.Provider = exports.CancellationToken = exports.NoOpLogger = exports.AppUpdater = void 0;
  const builder_util_runtime_12 = out;
  Object.defineProperty(exports, "CancellationToken", { enumerable: true, get: function() {
    return builder_util_runtime_12.CancellationToken;
  } });
  var AppUpdater_12 = AppUpdater$1;
  Object.defineProperty(exports, "AppUpdater", { enumerable: true, get: function() {
    return AppUpdater_12.AppUpdater;
  } });
  Object.defineProperty(exports, "NoOpLogger", { enumerable: true, get: function() {
    return AppUpdater_12.NoOpLogger;
  } });
  var Provider_12 = Provider$1;
  Object.defineProperty(exports, "Provider", { enumerable: true, get: function() {
    return Provider_12.Provider;
  } });
  var AppImageUpdater_1 = AppImageUpdater$1;
  Object.defineProperty(exports, "AppImageUpdater", { enumerable: true, get: function() {
    return AppImageUpdater_1.AppImageUpdater;
  } });
  var MacUpdater_1 = MacUpdater$1;
  Object.defineProperty(exports, "MacUpdater", { enumerable: true, get: function() {
    return MacUpdater_1.MacUpdater;
  } });
  var NsisUpdater_1 = NsisUpdater$1;
  Object.defineProperty(exports, "NsisUpdater", { enumerable: true, get: function() {
    return NsisUpdater_1.NsisUpdater;
  } });
  let _autoUpdater;
  function doLoadAutoUpdater() {
    if (process.platform === "win32") {
      _autoUpdater = new NsisUpdater$1.NsisUpdater();
    } else if (process.platform === "darwin") {
      _autoUpdater = new MacUpdater$1.MacUpdater();
    } else {
      _autoUpdater = new AppImageUpdater$1.AppImageUpdater();
    }
    return _autoUpdater;
  }
  Object.defineProperty(exports, "autoUpdater", {
    enumerable: true,
    get: () => {
      return _autoUpdater || doLoadAutoUpdater();
    }
  });
  exports.DOWNLOAD_PROGRESS = "download-progress";
  exports.UPDATE_DOWNLOADED = "update-downloaded";
  class UpdaterSignal {
    constructor(emitter) {
      this.emitter = emitter;
    }
    login(handler) {
      addHandler(this.emitter, "login", handler);
    }
    progress(handler) {
      addHandler(this.emitter, exports.DOWNLOAD_PROGRESS, handler);
    }
    updateDownloaded(handler) {
      addHandler(this.emitter, exports.UPDATE_DOWNLOADED, handler);
    }
    updateCancelled(handler) {
      addHandler(this.emitter, "update-cancelled", handler);
    }
  }
  exports.UpdaterSignal = UpdaterSignal;
  function addHandler(emitter, event, handler) {
    {
      emitter.on(event, handler);
    }
  }
})(main$1);
var source = { exports: {} };
var isObj$1 = (value) => {
  const type2 = typeof value;
  return value !== null && (type2 === "object" || type2 === "function");
};
const isObj = isObj$1;
const disallowedKeys = new Set([
  "__proto__",
  "prototype",
  "constructor"
]);
const isValidPath = (pathSegments) => !pathSegments.some((segment) => disallowedKeys.has(segment));
function getPathSegments(path2) {
  const pathArray = path2.split(".");
  const parts = [];
  for (let i2 = 0; i2 < pathArray.length; i2++) {
    let p = pathArray[i2];
    while (p[p.length - 1] === "\\" && pathArray[i2 + 1] !== void 0) {
      p = p.slice(0, -1) + ".";
      p += pathArray[++i2];
    }
    parts.push(p);
  }
  if (!isValidPath(parts)) {
    return [];
  }
  return parts;
}
var dotProp = {
  get(object, path2, value) {
    if (!isObj(object) || typeof path2 !== "string") {
      return value === void 0 ? object : value;
    }
    const pathArray = getPathSegments(path2);
    if (pathArray.length === 0) {
      return;
    }
    for (let i2 = 0; i2 < pathArray.length; i2++) {
      object = object[pathArray[i2]];
      if (object === void 0 || object === null) {
        if (i2 !== pathArray.length - 1) {
          return value;
        }
        break;
      }
    }
    return object === void 0 ? value : object;
  },
  set(object, path2, value) {
    if (!isObj(object) || typeof path2 !== "string") {
      return object;
    }
    const root2 = object;
    const pathArray = getPathSegments(path2);
    for (let i2 = 0; i2 < pathArray.length; i2++) {
      const p = pathArray[i2];
      if (!isObj(object[p])) {
        object[p] = {};
      }
      if (i2 === pathArray.length - 1) {
        object[p] = value;
      }
      object = object[p];
    }
    return root2;
  },
  delete(object, path2) {
    if (!isObj(object) || typeof path2 !== "string") {
      return false;
    }
    const pathArray = getPathSegments(path2);
    for (let i2 = 0; i2 < pathArray.length; i2++) {
      const p = pathArray[i2];
      if (i2 === pathArray.length - 1) {
        delete object[p];
        return true;
      }
      object = object[p];
      if (!isObj(object)) {
        return false;
      }
    }
  },
  has(object, path2) {
    if (!isObj(object) || typeof path2 !== "string") {
      return false;
    }
    const pathArray = getPathSegments(path2);
    if (pathArray.length === 0) {
      return false;
    }
    for (let i2 = 0; i2 < pathArray.length; i2++) {
      if (isObj(object)) {
        if (!(pathArray[i2] in object)) {
          return false;
        }
        object = object[pathArray[i2]];
      } else {
        return false;
      }
    }
    return true;
  }
};
var pkgUp = { exports: {} };
var findUp$1 = { exports: {} };
var locatePath$1 = { exports: {} };
var pathExists$1 = { exports: {} };
const fs$2 = require$$0__default$2["default"];
pathExists$1.exports = (fp) => new Promise((resolve2) => {
  fs$2.access(fp, (err) => {
    resolve2(!err);
  });
});
pathExists$1.exports.sync = (fp) => {
  try {
    fs$2.accessSync(fp);
    return true;
  } catch (err) {
    return false;
  }
};
var pLimit$2 = { exports: {} };
var pTry$2 = { exports: {} };
const pTry$1 = (fn, ...arguments_) => new Promise((resolve2) => {
  resolve2(fn(...arguments_));
});
pTry$2.exports = pTry$1;
pTry$2.exports.default = pTry$1;
const pTry = pTry$2.exports;
const pLimit$1 = (concurrency) => {
  if (!((Number.isInteger(concurrency) || concurrency === Infinity) && concurrency > 0)) {
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  }
  const queue2 = [];
  let activeCount = 0;
  const next = () => {
    activeCount--;
    if (queue2.length > 0) {
      queue2.shift()();
    }
  };
  const run = (fn, resolve2, ...args) => {
    activeCount++;
    const result = pTry(fn, ...args);
    resolve2(result);
    result.then(next, next);
  };
  const enqueue2 = (fn, resolve2, ...args) => {
    if (activeCount < concurrency) {
      run(fn, resolve2, ...args);
    } else {
      queue2.push(run.bind(null, fn, resolve2, ...args));
    }
  };
  const generator = (fn, ...args) => new Promise((resolve2) => enqueue2(fn, resolve2, ...args));
  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount
    },
    pendingCount: {
      get: () => queue2.length
    },
    clearQueue: {
      value: () => {
        queue2.length = 0;
      }
    }
  });
  return generator;
};
pLimit$2.exports = pLimit$1;
pLimit$2.exports.default = pLimit$1;
const pLimit = pLimit$2.exports;
class EndError extends Error {
  constructor(value) {
    super();
    this.value = value;
  }
}
const testElement = (el, tester) => Promise.resolve(el).then(tester);
const finder = (el) => Promise.all(el).then((val) => val[1] === true && Promise.reject(new EndError(val[0])));
var pLocate$1 = (iterable, tester, opts2) => {
  opts2 = Object.assign({
    concurrency: Infinity,
    preserveOrder: true
  }, opts2);
  const limit2 = pLimit(opts2.concurrency);
  const items2 = [...iterable].map((el) => [el, limit2(testElement, el, tester)]);
  const checkLimit = pLimit(opts2.preserveOrder ? 1 : Infinity);
  return Promise.all(items2.map((el) => checkLimit(finder, el))).then(() => {
  }).catch((err) => err instanceof EndError ? err.value : Promise.reject(err));
};
const path$5 = require$$1__default$1["default"];
const pathExists = pathExists$1.exports;
const pLocate = pLocate$1;
locatePath$1.exports = (iterable, options) => {
  options = Object.assign({
    cwd: process.cwd()
  }, options);
  return pLocate(iterable, (el) => pathExists(path$5.resolve(options.cwd, el)), options);
};
locatePath$1.exports.sync = (iterable, options) => {
  options = Object.assign({
    cwd: process.cwd()
  }, options);
  for (const el of iterable) {
    if (pathExists.sync(path$5.resolve(options.cwd, el))) {
      return el;
    }
  }
};
const path$4 = require$$1__default$1["default"];
const locatePath = locatePath$1.exports;
findUp$1.exports = (filename, opts2 = {}) => {
  const startDir = path$4.resolve(opts2.cwd || "");
  const { root: root2 } = path$4.parse(startDir);
  const filenames = [].concat(filename);
  return new Promise((resolve2) => {
    (function find(dir) {
      locatePath(filenames, { cwd: dir }).then((file2) => {
        if (file2) {
          resolve2(path$4.join(dir, file2));
        } else if (dir === root2) {
          resolve2(null);
        } else {
          find(path$4.dirname(dir));
        }
      });
    })(startDir);
  });
};
findUp$1.exports.sync = (filename, opts2 = {}) => {
  let dir = path$4.resolve(opts2.cwd || "");
  const { root: root2 } = path$4.parse(dir);
  const filenames = [].concat(filename);
  while (true) {
    const file2 = locatePath.sync(filenames, { cwd: dir });
    if (file2) {
      return path$4.join(dir, file2);
    }
    if (dir === root2) {
      return null;
    }
    dir = path$4.dirname(dir);
  }
};
const findUp = findUp$1.exports;
pkgUp.exports = async ({ cwd: cwd2 } = {}) => findUp("package.json", { cwd: cwd2 });
pkgUp.exports.sync = ({ cwd: cwd2 } = {}) => findUp.sync("package.json", { cwd: cwd2 });
var envPaths$1 = { exports: {} };
const path$3 = require$$1__default$1["default"];
const os = require$$1__default$3["default"];
const homedir = os.homedir();
const tmpdir = os.tmpdir();
const { env: env$1 } = process;
const macos = (name) => {
  const library = path$3.join(homedir, "Library");
  return {
    data: path$3.join(library, "Application Support", name),
    config: path$3.join(library, "Preferences", name),
    cache: path$3.join(library, "Caches", name),
    log: path$3.join(library, "Logs", name),
    temp: path$3.join(tmpdir, name)
  };
};
const windows = (name) => {
  const appData = env$1.APPDATA || path$3.join(homedir, "AppData", "Roaming");
  const localAppData = env$1.LOCALAPPDATA || path$3.join(homedir, "AppData", "Local");
  return {
    data: path$3.join(localAppData, name, "Data"),
    config: path$3.join(appData, name, "Config"),
    cache: path$3.join(localAppData, name, "Cache"),
    log: path$3.join(localAppData, name, "Log"),
    temp: path$3.join(tmpdir, name)
  };
};
const linux = (name) => {
  const username = path$3.basename(homedir);
  return {
    data: path$3.join(env$1.XDG_DATA_HOME || path$3.join(homedir, ".local", "share"), name),
    config: path$3.join(env$1.XDG_CONFIG_HOME || path$3.join(homedir, ".config"), name),
    cache: path$3.join(env$1.XDG_CACHE_HOME || path$3.join(homedir, ".cache"), name),
    log: path$3.join(env$1.XDG_STATE_HOME || path$3.join(homedir, ".local", "state"), name),
    temp: path$3.join(tmpdir, username, name)
  };
};
const envPaths = (name, options) => {
  if (typeof name !== "string") {
    throw new TypeError(`Expected string, got ${typeof name}`);
  }
  options = Object.assign({ suffix: "nodejs" }, options);
  if (options.suffix) {
    name += `-${options.suffix}`;
  }
  if (process.platform === "darwin") {
    return macos(name);
  }
  if (process.platform === "win32") {
    return windows(name);
  }
  return linux(name);
};
envPaths$1.exports = envPaths;
envPaths$1.exports.default = envPaths;
var dist$1 = {};
var consts = {};
Object.defineProperty(consts, "__esModule", { value: true });
consts.NOOP = consts.LIMIT_FILES_DESCRIPTORS = consts.LIMIT_BASENAME_LENGTH = consts.IS_USER_ROOT = consts.IS_POSIX = consts.DEFAULT_TIMEOUT_SYNC = consts.DEFAULT_TIMEOUT_ASYNC = consts.DEFAULT_WRITE_OPTIONS = consts.DEFAULT_READ_OPTIONS = consts.DEFAULT_FOLDER_MODE = consts.DEFAULT_FILE_MODE = consts.DEFAULT_ENCODING = void 0;
const DEFAULT_ENCODING = "utf8";
consts.DEFAULT_ENCODING = DEFAULT_ENCODING;
const DEFAULT_FILE_MODE = 438;
consts.DEFAULT_FILE_MODE = DEFAULT_FILE_MODE;
const DEFAULT_FOLDER_MODE = 511;
consts.DEFAULT_FOLDER_MODE = DEFAULT_FOLDER_MODE;
const DEFAULT_READ_OPTIONS = {};
consts.DEFAULT_READ_OPTIONS = DEFAULT_READ_OPTIONS;
const DEFAULT_WRITE_OPTIONS = {};
consts.DEFAULT_WRITE_OPTIONS = DEFAULT_WRITE_OPTIONS;
const DEFAULT_TIMEOUT_ASYNC = 5e3;
consts.DEFAULT_TIMEOUT_ASYNC = DEFAULT_TIMEOUT_ASYNC;
const DEFAULT_TIMEOUT_SYNC = 100;
consts.DEFAULT_TIMEOUT_SYNC = DEFAULT_TIMEOUT_SYNC;
const IS_POSIX = !!process.getuid;
consts.IS_POSIX = IS_POSIX;
const IS_USER_ROOT = process.getuid ? !process.getuid() : false;
consts.IS_USER_ROOT = IS_USER_ROOT;
const LIMIT_BASENAME_LENGTH = 128;
consts.LIMIT_BASENAME_LENGTH = LIMIT_BASENAME_LENGTH;
const LIMIT_FILES_DESCRIPTORS = 1e4;
consts.LIMIT_FILES_DESCRIPTORS = LIMIT_FILES_DESCRIPTORS;
const NOOP = () => {
};
consts.NOOP = NOOP;
var fs$1 = {};
var attemptify = {};
Object.defineProperty(attemptify, "__esModule", { value: true });
attemptify.attemptifySync = attemptify.attemptifyAsync = void 0;
const consts_1$4 = consts;
const attemptifyAsync = (fn, onError = consts_1$4.NOOP) => {
  return function() {
    return fn.apply(void 0, arguments).catch(onError);
  };
};
attemptify.attemptifyAsync = attemptifyAsync;
const attemptifySync = (fn, onError = consts_1$4.NOOP) => {
  return function() {
    try {
      return fn.apply(void 0, arguments);
    } catch (error2) {
      return onError(error2);
    }
  };
};
attemptify.attemptifySync = attemptifySync;
var fs_handlers = {};
Object.defineProperty(fs_handlers, "__esModule", { value: true });
const consts_1$3 = consts;
const Handlers = {
  isChangeErrorOk: (error2) => {
    const { code: code2 } = error2;
    if (code2 === "ENOSYS")
      return true;
    if (!consts_1$3.IS_USER_ROOT && (code2 === "EINVAL" || code2 === "EPERM"))
      return true;
    return false;
  },
  isRetriableError: (error2) => {
    const { code: code2 } = error2;
    if (code2 === "EMFILE" || code2 === "ENFILE" || code2 === "EAGAIN" || code2 === "EBUSY" || code2 === "EACCESS" || code2 === "EACCS" || code2 === "EPERM")
      return true;
    return false;
  },
  onChangeError: (error2) => {
    if (Handlers.isChangeErrorOk(error2))
      return;
    throw error2;
  }
};
fs_handlers.default = Handlers;
var retryify = {};
var retryify_queue = {};
Object.defineProperty(retryify_queue, "__esModule", { value: true });
const consts_1$2 = consts;
const RetryfyQueue = {
  interval: 25,
  intervalId: void 0,
  limit: consts_1$2.LIMIT_FILES_DESCRIPTORS,
  queueActive: new Set(),
  queueWaiting: new Set(),
  init: () => {
    if (RetryfyQueue.intervalId)
      return;
    RetryfyQueue.intervalId = setInterval(RetryfyQueue.tick, RetryfyQueue.interval);
  },
  reset: () => {
    if (!RetryfyQueue.intervalId)
      return;
    clearInterval(RetryfyQueue.intervalId);
    delete RetryfyQueue.intervalId;
  },
  add: (fn) => {
    RetryfyQueue.queueWaiting.add(fn);
    if (RetryfyQueue.queueActive.size < RetryfyQueue.limit / 2) {
      RetryfyQueue.tick();
    } else {
      RetryfyQueue.init();
    }
  },
  remove: (fn) => {
    RetryfyQueue.queueWaiting.delete(fn);
    RetryfyQueue.queueActive.delete(fn);
  },
  schedule: () => {
    return new Promise((resolve2) => {
      const cleanup = () => RetryfyQueue.remove(resolver);
      const resolver = () => resolve2(cleanup);
      RetryfyQueue.add(resolver);
    });
  },
  tick: () => {
    if (RetryfyQueue.queueActive.size >= RetryfyQueue.limit)
      return;
    if (!RetryfyQueue.queueWaiting.size)
      return RetryfyQueue.reset();
    for (const fn of RetryfyQueue.queueWaiting) {
      if (RetryfyQueue.queueActive.size >= RetryfyQueue.limit)
        break;
      RetryfyQueue.queueWaiting.delete(fn);
      RetryfyQueue.queueActive.add(fn);
      fn();
    }
  }
};
retryify_queue.default = RetryfyQueue;
Object.defineProperty(retryify, "__esModule", { value: true });
retryify.retryifySync = retryify.retryifyAsync = void 0;
const retryify_queue_1 = retryify_queue;
const retryifyAsync = (fn, isRetriableError) => {
  return function(timestamp2) {
    return function attempt() {
      return retryify_queue_1.default.schedule().then((cleanup) => {
        return fn.apply(void 0, arguments).then((result) => {
          cleanup();
          return result;
        }, (error2) => {
          cleanup();
          if (Date.now() >= timestamp2)
            throw error2;
          if (isRetriableError(error2)) {
            const delay = Math.round(100 + 400 * Math.random()), delayPromise = new Promise((resolve2) => setTimeout(resolve2, delay));
            return delayPromise.then(() => attempt.apply(void 0, arguments));
          }
          throw error2;
        });
      });
    };
  };
};
retryify.retryifyAsync = retryifyAsync;
const retryifySync = (fn, isRetriableError) => {
  return function(timestamp2) {
    return function attempt() {
      try {
        return fn.apply(void 0, arguments);
      } catch (error2) {
        if (Date.now() > timestamp2)
          throw error2;
        if (isRetriableError(error2))
          return attempt.apply(void 0, arguments);
        throw error2;
      }
    };
  };
};
retryify.retryifySync = retryifySync;
Object.defineProperty(fs$1, "__esModule", { value: true });
const fs = require$$0__default$2["default"];
const util_1$p = require$$4__default["default"];
const attemptify_1 = attemptify;
const fs_handlers_1 = fs_handlers;
const retryify_1 = retryify;
const FS = {
  chmodAttempt: attemptify_1.attemptifyAsync(util_1$p.promisify(fs.chmod), fs_handlers_1.default.onChangeError),
  chownAttempt: attemptify_1.attemptifyAsync(util_1$p.promisify(fs.chown), fs_handlers_1.default.onChangeError),
  closeAttempt: attemptify_1.attemptifyAsync(util_1$p.promisify(fs.close)),
  fsyncAttempt: attemptify_1.attemptifyAsync(util_1$p.promisify(fs.fsync)),
  mkdirAttempt: attemptify_1.attemptifyAsync(util_1$p.promisify(fs.mkdir)),
  realpathAttempt: attemptify_1.attemptifyAsync(util_1$p.promisify(fs.realpath)),
  statAttempt: attemptify_1.attemptifyAsync(util_1$p.promisify(fs.stat)),
  unlinkAttempt: attemptify_1.attemptifyAsync(util_1$p.promisify(fs.unlink)),
  closeRetry: retryify_1.retryifyAsync(util_1$p.promisify(fs.close), fs_handlers_1.default.isRetriableError),
  fsyncRetry: retryify_1.retryifyAsync(util_1$p.promisify(fs.fsync), fs_handlers_1.default.isRetriableError),
  openRetry: retryify_1.retryifyAsync(util_1$p.promisify(fs.open), fs_handlers_1.default.isRetriableError),
  readFileRetry: retryify_1.retryifyAsync(util_1$p.promisify(fs.readFile), fs_handlers_1.default.isRetriableError),
  renameRetry: retryify_1.retryifyAsync(util_1$p.promisify(fs.rename), fs_handlers_1.default.isRetriableError),
  statRetry: retryify_1.retryifyAsync(util_1$p.promisify(fs.stat), fs_handlers_1.default.isRetriableError),
  writeRetry: retryify_1.retryifyAsync(util_1$p.promisify(fs.write), fs_handlers_1.default.isRetriableError),
  chmodSyncAttempt: attemptify_1.attemptifySync(fs.chmodSync, fs_handlers_1.default.onChangeError),
  chownSyncAttempt: attemptify_1.attemptifySync(fs.chownSync, fs_handlers_1.default.onChangeError),
  closeSyncAttempt: attemptify_1.attemptifySync(fs.closeSync),
  mkdirSyncAttempt: attemptify_1.attemptifySync(fs.mkdirSync),
  realpathSyncAttempt: attemptify_1.attemptifySync(fs.realpathSync),
  statSyncAttempt: attemptify_1.attemptifySync(fs.statSync),
  unlinkSyncAttempt: attemptify_1.attemptifySync(fs.unlinkSync),
  closeSyncRetry: retryify_1.retryifySync(fs.closeSync, fs_handlers_1.default.isRetriableError),
  fsyncSyncRetry: retryify_1.retryifySync(fs.fsyncSync, fs_handlers_1.default.isRetriableError),
  openSyncRetry: retryify_1.retryifySync(fs.openSync, fs_handlers_1.default.isRetriableError),
  readFileSyncRetry: retryify_1.retryifySync(fs.readFileSync, fs_handlers_1.default.isRetriableError),
  renameSyncRetry: retryify_1.retryifySync(fs.renameSync, fs_handlers_1.default.isRetriableError),
  statSyncRetry: retryify_1.retryifySync(fs.statSync, fs_handlers_1.default.isRetriableError),
  writeSyncRetry: retryify_1.retryifySync(fs.writeSync, fs_handlers_1.default.isRetriableError)
};
fs$1.default = FS;
var lang = {};
Object.defineProperty(lang, "__esModule", { value: true });
const Lang = {
  isFunction: (x) => {
    return typeof x === "function";
  },
  isString: (x) => {
    return typeof x === "string";
  },
  isUndefined: (x) => {
    return typeof x === "undefined";
  }
};
lang.default = Lang;
var scheduler = {};
Object.defineProperty(scheduler, "__esModule", { value: true });
const Queues = {};
const Scheduler = {
  next: (id2) => {
    const queue2 = Queues[id2];
    if (!queue2)
      return;
    queue2.shift();
    const job = queue2[0];
    if (job) {
      job(() => Scheduler.next(id2));
    } else {
      delete Queues[id2];
    }
  },
  schedule: (id2) => {
    return new Promise((resolve2) => {
      let queue2 = Queues[id2];
      if (!queue2)
        queue2 = Queues[id2] = [];
      queue2.push(resolve2);
      if (queue2.length > 1)
        return;
      resolve2(() => Scheduler.next(id2));
    });
  }
};
scheduler.default = Scheduler;
var temp = {};
Object.defineProperty(temp, "__esModule", { value: true });
const path$2 = require$$1__default$1["default"];
const consts_1$1 = consts;
const fs_1$1 = fs$1;
const Temp = {
  store: {},
  create: (filePath) => {
    const randomness = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), timestamp2 = Date.now().toString().slice(-10), prefix = "tmp-", suffix = `.${prefix}${timestamp2}${randomness}`, tempPath = `${filePath}${suffix}`;
    return tempPath;
  },
  get: (filePath, creator, purge = true) => {
    const tempPath = Temp.truncate(creator(filePath));
    if (tempPath in Temp.store)
      return Temp.get(filePath, creator, purge);
    Temp.store[tempPath] = purge;
    const disposer = () => delete Temp.store[tempPath];
    return [tempPath, disposer];
  },
  purge: (filePath) => {
    if (!Temp.store[filePath])
      return;
    delete Temp.store[filePath];
    fs_1$1.default.unlinkAttempt(filePath);
  },
  purgeSync: (filePath) => {
    if (!Temp.store[filePath])
      return;
    delete Temp.store[filePath];
    fs_1$1.default.unlinkSyncAttempt(filePath);
  },
  purgeSyncAll: () => {
    for (const filePath in Temp.store) {
      Temp.purgeSync(filePath);
    }
  },
  truncate: (filePath) => {
    const basename = path$2.basename(filePath);
    if (basename.length <= consts_1$1.LIMIT_BASENAME_LENGTH)
      return filePath;
    const truncable = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(basename);
    if (!truncable)
      return filePath;
    const truncationLength = basename.length - consts_1$1.LIMIT_BASENAME_LENGTH;
    return `${filePath.slice(0, -basename.length)}${truncable[1]}${truncable[2].slice(0, -truncationLength)}${truncable[3]}`;
  }
};
process.on("exit", Temp.purgeSyncAll);
temp.default = Temp;
Object.defineProperty(dist$1, "__esModule", { value: true });
dist$1.writeFileSync = dist$1.writeFile = dist$1.readFileSync = dist$1.readFile = void 0;
const path$1 = require$$1__default$1["default"];
const consts_1 = consts;
const fs_1 = fs$1;
const lang_1 = lang;
const scheduler_1 = scheduler;
const temp_1 = temp;
function readFile(filePath, options = consts_1.DEFAULT_READ_OPTIONS) {
  var _a;
  if (lang_1.default.isString(options))
    return readFile(filePath, { encoding: options });
  const timeout = Date.now() + ((_a = options.timeout) !== null && _a !== void 0 ? _a : consts_1.DEFAULT_TIMEOUT_ASYNC);
  return fs_1.default.readFileRetry(timeout)(filePath, options);
}
dist$1.readFile = readFile;
function readFileSync(filePath, options = consts_1.DEFAULT_READ_OPTIONS) {
  var _a;
  if (lang_1.default.isString(options))
    return readFileSync(filePath, { encoding: options });
  const timeout = Date.now() + ((_a = options.timeout) !== null && _a !== void 0 ? _a : consts_1.DEFAULT_TIMEOUT_SYNC);
  return fs_1.default.readFileSyncRetry(timeout)(filePath, options);
}
dist$1.readFileSync = readFileSync;
const writeFile = (filePath, data, options, callback) => {
  if (lang_1.default.isFunction(options))
    return writeFile(filePath, data, consts_1.DEFAULT_WRITE_OPTIONS, options);
  const promise = writeFileAsync(filePath, data, options);
  if (callback)
    promise.then(callback, callback);
  return promise;
};
dist$1.writeFile = writeFile;
const writeFileAsync = async (filePath, data, options = consts_1.DEFAULT_WRITE_OPTIONS) => {
  var _a;
  if (lang_1.default.isString(options))
    return writeFileAsync(filePath, data, { encoding: options });
  const timeout = Date.now() + ((_a = options.timeout) !== null && _a !== void 0 ? _a : consts_1.DEFAULT_TIMEOUT_ASYNC);
  let schedulerCustomDisposer = null, schedulerDisposer = null, tempDisposer = null, tempPath = null, fd = null;
  try {
    if (options.schedule)
      schedulerCustomDisposer = await options.schedule(filePath);
    schedulerDisposer = await scheduler_1.default.schedule(filePath);
    filePath = await fs_1.default.realpathAttempt(filePath) || filePath;
    [tempPath, tempDisposer] = temp_1.default.get(filePath, options.tmpCreate || temp_1.default.create, !(options.tmpPurge === false));
    const useStatChown = consts_1.IS_POSIX && lang_1.default.isUndefined(options.chown), useStatMode = lang_1.default.isUndefined(options.mode);
    if (useStatChown || useStatMode) {
      const stat2 = await fs_1.default.statAttempt(filePath);
      if (stat2) {
        options = __spreadValues({}, options);
        if (useStatChown)
          options.chown = { uid: stat2.uid, gid: stat2.gid };
        if (useStatMode)
          options.mode = stat2.mode;
      }
    }
    const parentPath = path$1.dirname(filePath);
    await fs_1.default.mkdirAttempt(parentPath, {
      mode: consts_1.DEFAULT_FOLDER_MODE,
      recursive: true
    });
    fd = await fs_1.default.openRetry(timeout)(tempPath, "w", options.mode || consts_1.DEFAULT_FILE_MODE);
    if (options.tmpCreated)
      options.tmpCreated(tempPath);
    if (lang_1.default.isString(data)) {
      await fs_1.default.writeRetry(timeout)(fd, data, 0, options.encoding || consts_1.DEFAULT_ENCODING);
    } else if (!lang_1.default.isUndefined(data)) {
      await fs_1.default.writeRetry(timeout)(fd, data, 0, data.length, 0);
    }
    if (options.fsync !== false) {
      if (options.fsyncWait !== false) {
        await fs_1.default.fsyncRetry(timeout)(fd);
      } else {
        fs_1.default.fsyncAttempt(fd);
      }
    }
    await fs_1.default.closeRetry(timeout)(fd);
    fd = null;
    if (options.chown)
      await fs_1.default.chownAttempt(tempPath, options.chown.uid, options.chown.gid);
    if (options.mode)
      await fs_1.default.chmodAttempt(tempPath, options.mode);
    try {
      await fs_1.default.renameRetry(timeout)(tempPath, filePath);
    } catch (error2) {
      if (error2.code !== "ENAMETOOLONG")
        throw error2;
      await fs_1.default.renameRetry(timeout)(tempPath, temp_1.default.truncate(filePath));
    }
    tempDisposer();
    tempPath = null;
  } finally {
    if (fd)
      await fs_1.default.closeAttempt(fd);
    if (tempPath)
      temp_1.default.purge(tempPath);
    if (schedulerCustomDisposer)
      schedulerCustomDisposer();
    if (schedulerDisposer)
      schedulerDisposer();
  }
};
const writeFileSync = (filePath, data, options = consts_1.DEFAULT_WRITE_OPTIONS) => {
  var _a;
  if (lang_1.default.isString(options))
    return writeFileSync(filePath, data, { encoding: options });
  const timeout = Date.now() + ((_a = options.timeout) !== null && _a !== void 0 ? _a : consts_1.DEFAULT_TIMEOUT_SYNC);
  let tempDisposer = null, tempPath = null, fd = null;
  try {
    filePath = fs_1.default.realpathSyncAttempt(filePath) || filePath;
    [tempPath, tempDisposer] = temp_1.default.get(filePath, options.tmpCreate || temp_1.default.create, !(options.tmpPurge === false));
    const useStatChown = consts_1.IS_POSIX && lang_1.default.isUndefined(options.chown), useStatMode = lang_1.default.isUndefined(options.mode);
    if (useStatChown || useStatMode) {
      const stat2 = fs_1.default.statSyncAttempt(filePath);
      if (stat2) {
        options = __spreadValues({}, options);
        if (useStatChown)
          options.chown = { uid: stat2.uid, gid: stat2.gid };
        if (useStatMode)
          options.mode = stat2.mode;
      }
    }
    const parentPath = path$1.dirname(filePath);
    fs_1.default.mkdirSyncAttempt(parentPath, {
      mode: consts_1.DEFAULT_FOLDER_MODE,
      recursive: true
    });
    fd = fs_1.default.openSyncRetry(timeout)(tempPath, "w", options.mode || consts_1.DEFAULT_FILE_MODE);
    if (options.tmpCreated)
      options.tmpCreated(tempPath);
    if (lang_1.default.isString(data)) {
      fs_1.default.writeSyncRetry(timeout)(fd, data, 0, options.encoding || consts_1.DEFAULT_ENCODING);
    } else if (!lang_1.default.isUndefined(data)) {
      fs_1.default.writeSyncRetry(timeout)(fd, data, 0, data.length, 0);
    }
    if (options.fsync !== false) {
      if (options.fsyncWait !== false) {
        fs_1.default.fsyncSyncRetry(timeout)(fd);
      } else {
        fs_1.default.fsyncAttempt(fd);
      }
    }
    fs_1.default.closeSyncRetry(timeout)(fd);
    fd = null;
    if (options.chown)
      fs_1.default.chownSyncAttempt(tempPath, options.chown.uid, options.chown.gid);
    if (options.mode)
      fs_1.default.chmodSyncAttempt(tempPath, options.mode);
    try {
      fs_1.default.renameSyncRetry(timeout)(tempPath, filePath);
    } catch (error2) {
      if (error2.code !== "ENAMETOOLONG")
        throw error2;
      fs_1.default.renameSyncRetry(timeout)(tempPath, temp_1.default.truncate(filePath));
    }
    tempDisposer();
    tempPath = null;
  } finally {
    if (fd)
      fs_1.default.closeSyncAttempt(fd);
    if (tempPath)
      temp_1.default.purge(tempPath);
  }
};
dist$1.writeFileSync = writeFileSync;
var ajv = { exports: {} };
var core$2 = {};
var validate = {};
var boolSchema = {};
var errors = {};
var codegen = {};
var code$1 = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.regexpCode = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
  class _CodeOrName {
  }
  exports._CodeOrName = _CodeOrName;
  exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class Name extends _CodeOrName {
    constructor(s2) {
      super();
      if (!exports.IDENTIFIER.test(s2))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = s2;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return false;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  exports.Name = Name;
  class _Code extends _CodeOrName {
    constructor(code2) {
      super();
      this._items = typeof code2 === "string" ? [code2] : code2;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return false;
      const item = this._items[0];
      return item === "" || item === '""';
    }
    get str() {
      var _a;
      return (_a = this._str) !== null && _a !== void 0 ? _a : this._str = this._items.reduce((s2, c) => `${s2}${c}`, "");
    }
    get names() {
      var _a;
      return (_a = this._names) !== null && _a !== void 0 ? _a : this._names = this._items.reduce((names2, c) => {
        if (c instanceof Name)
          names2[c.str] = (names2[c.str] || 0) + 1;
        return names2;
      }, {});
    }
  }
  exports._Code = _Code;
  exports.nil = new _Code("");
  function _(strs, ...args) {
    const code2 = [strs[0]];
    let i2 = 0;
    while (i2 < args.length) {
      addCodeArg(code2, args[i2]);
      code2.push(strs[++i2]);
    }
    return new _Code(code2);
  }
  exports._ = _;
  const plus = new _Code("+");
  function str2(strs, ...args) {
    const expr = [safeStringify(strs[0])];
    let i2 = 0;
    while (i2 < args.length) {
      expr.push(plus);
      addCodeArg(expr, args[i2]);
      expr.push(plus, safeStringify(strs[++i2]));
    }
    optimize(expr);
    return new _Code(expr);
  }
  exports.str = str2;
  function addCodeArg(code2, arg) {
    if (arg instanceof _Code)
      code2.push(...arg._items);
    else if (arg instanceof Name)
      code2.push(arg);
    else
      code2.push(interpolate(arg));
  }
  exports.addCodeArg = addCodeArg;
  function optimize(expr) {
    let i2 = 1;
    while (i2 < expr.length - 1) {
      if (expr[i2] === plus) {
        const res = mergeExprItems(expr[i2 - 1], expr[i2 + 1]);
        if (res !== void 0) {
          expr.splice(i2 - 1, 3, res);
          continue;
        }
        expr[i2++] = "+";
      }
      i2++;
    }
  }
  function mergeExprItems(a, b) {
    if (b === '""')
      return a;
    if (a === '""')
      return b;
    if (typeof a == "string") {
      if (b instanceof Name || a[a.length - 1] !== '"')
        return;
      if (typeof b != "string")
        return `${a.slice(0, -1)}${b}"`;
      if (b[0] === '"')
        return a.slice(0, -1) + b.slice(1);
      return;
    }
    if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
      return `"${a}${b.slice(1)}`;
    return;
  }
  function strConcat(c1, c2) {
    return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str2`${c1}${c2}`;
  }
  exports.strConcat = strConcat;
  function interpolate(x) {
    return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
  }
  function stringify2(x) {
    return new _Code(safeStringify(x));
  }
  exports.stringify = stringify2;
  function safeStringify(x) {
    return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  exports.safeStringify = safeStringify;
  function getProperty(key) {
    return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _`[${key}]`;
  }
  exports.getProperty = getProperty;
  function regexpCode(rx) {
    return new _Code(rx.toString());
  }
  exports.regexpCode = regexpCode;
})(code$1);
var scope = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
  const code_12 = code$1;
  class ValueError extends Error {
    constructor(name) {
      super(`CodeGen: "code" for ${name} not defined`);
      this.value = name.value;
    }
  }
  var UsedValueState;
  (function(UsedValueState2) {
    UsedValueState2[UsedValueState2["Started"] = 0] = "Started";
    UsedValueState2[UsedValueState2["Completed"] = 1] = "Completed";
  })(UsedValueState = exports.UsedValueState || (exports.UsedValueState = {}));
  exports.varKinds = {
    const: new code_12.Name("const"),
    let: new code_12.Name("let"),
    var: new code_12.Name("var")
  };
  class Scope {
    constructor({ prefixes, parent } = {}) {
      this._names = {};
      this._prefixes = prefixes;
      this._parent = parent;
    }
    toName(nameOrPrefix) {
      return nameOrPrefix instanceof code_12.Name ? nameOrPrefix : this.name(nameOrPrefix);
    }
    name(prefix) {
      return new code_12.Name(this._newName(prefix));
    }
    _newName(prefix) {
      const ng = this._names[prefix] || this._nameGroup(prefix);
      return `${prefix}${ng.index++}`;
    }
    _nameGroup(prefix) {
      var _a, _b;
      if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || this._prefixes && !this._prefixes.has(prefix)) {
        throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
      }
      return this._names[prefix] = { prefix, index: 0 };
    }
  }
  exports.Scope = Scope;
  class ValueScopeName extends code_12.Name {
    constructor(prefix, nameStr) {
      super(nameStr);
      this.prefix = prefix;
    }
    setValue(value, { property, itemIndex }) {
      this.value = value;
      this.scopePath = code_12._`.${new code_12.Name(property)}[${itemIndex}]`;
    }
  }
  exports.ValueScopeName = ValueScopeName;
  const line = code_12._`\n`;
  class ValueScope extends Scope {
    constructor(opts2) {
      super(opts2);
      this._values = {};
      this._scope = opts2.scope;
      this.opts = __spreadProps(__spreadValues({}, opts2), { _n: opts2.lines ? line : code_12.nil });
    }
    get() {
      return this._scope;
    }
    name(prefix) {
      return new ValueScopeName(prefix, this._newName(prefix));
    }
    value(nameOrPrefix, value) {
      var _a;
      if (value.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const name = this.toName(nameOrPrefix);
      const { prefix } = name;
      const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
      let vs = this._values[prefix];
      if (vs) {
        const _name = vs.get(valueKey);
        if (_name)
          return _name;
      } else {
        vs = this._values[prefix] = new Map();
      }
      vs.set(valueKey, name);
      const s2 = this._scope[prefix] || (this._scope[prefix] = []);
      const itemIndex = s2.length;
      s2[itemIndex] = value.ref;
      name.setValue(value, { property: prefix, itemIndex });
      return name;
    }
    getValue(prefix, keyOrRef) {
      const vs = this._values[prefix];
      if (!vs)
        return;
      return vs.get(keyOrRef);
    }
    scopeRefs(scopeName, values = this._values) {
      return this._reduceValues(values, (name) => {
        if (name.scopePath === void 0)
          throw new Error(`CodeGen: name "${name}" has no value`);
        return code_12._`${scopeName}${name.scopePath}`;
      });
    }
    scopeCode(values = this._values, usedValues, getCode) {
      return this._reduceValues(values, (name) => {
        if (name.value === void 0)
          throw new Error(`CodeGen: name "${name}" has no value`);
        return name.value.code;
      }, usedValues, getCode);
    }
    _reduceValues(values, valueCode, usedValues = {}, getCode) {
      let code2 = code_12.nil;
      for (const prefix in values) {
        const vs = values[prefix];
        if (!vs)
          continue;
        const nameSet = usedValues[prefix] = usedValues[prefix] || new Map();
        vs.forEach((name) => {
          if (nameSet.has(name))
            return;
          nameSet.set(name, UsedValueState.Started);
          let c = valueCode(name);
          if (c) {
            const def2 = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
            code2 = code_12._`${code2}${def2} ${name} = ${c};${this.opts._n}`;
          } else if (c = getCode === null || getCode === void 0 ? void 0 : getCode(name)) {
            code2 = code_12._`${code2}${c}${this.opts._n}`;
          } else {
            throw new ValueError(name);
          }
          nameSet.set(name, UsedValueState.Completed);
        });
      }
      return code2;
    }
  }
  exports.ValueScope = ValueScope;
})(scope);
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
  const code_12 = code$1;
  const scope_1 = scope;
  var code_2 = code$1;
  Object.defineProperty(exports, "_", { enumerable: true, get: function() {
    return code_2._;
  } });
  Object.defineProperty(exports, "str", { enumerable: true, get: function() {
    return code_2.str;
  } });
  Object.defineProperty(exports, "strConcat", { enumerable: true, get: function() {
    return code_2.strConcat;
  } });
  Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
    return code_2.nil;
  } });
  Object.defineProperty(exports, "getProperty", { enumerable: true, get: function() {
    return code_2.getProperty;
  } });
  Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
    return code_2.stringify;
  } });
  Object.defineProperty(exports, "regexpCode", { enumerable: true, get: function() {
    return code_2.regexpCode;
  } });
  Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
    return code_2.Name;
  } });
  var scope_2 = scope;
  Object.defineProperty(exports, "Scope", { enumerable: true, get: function() {
    return scope_2.Scope;
  } });
  Object.defineProperty(exports, "ValueScope", { enumerable: true, get: function() {
    return scope_2.ValueScope;
  } });
  Object.defineProperty(exports, "ValueScopeName", { enumerable: true, get: function() {
    return scope_2.ValueScopeName;
  } });
  Object.defineProperty(exports, "varKinds", { enumerable: true, get: function() {
    return scope_2.varKinds;
  } });
  exports.operators = {
    GT: new code_12._Code(">"),
    GTE: new code_12._Code(">="),
    LT: new code_12._Code("<"),
    LTE: new code_12._Code("<="),
    EQ: new code_12._Code("==="),
    NEQ: new code_12._Code("!=="),
    NOT: new code_12._Code("!"),
    OR: new code_12._Code("||"),
    AND: new code_12._Code("&&"),
    ADD: new code_12._Code("+")
  };
  class Node2 {
    optimizeNodes() {
      return this;
    }
    optimizeNames(_names, _constants) {
      return this;
    }
  }
  class Def extends Node2 {
    constructor(varKind, name, rhs) {
      super();
      this.varKind = varKind;
      this.name = name;
      this.rhs = rhs;
    }
    render({ es5, _n }) {
      const varKind = es5 ? scope_1.varKinds.var : this.varKind;
      const rhs = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${varKind} ${this.name}${rhs};` + _n;
    }
    optimizeNames(names2, constants2) {
      if (!names2[this.name.str])
        return;
      if (this.rhs)
        this.rhs = optimizeExpr(this.rhs, names2, constants2);
      return this;
    }
    get names() {
      return this.rhs instanceof code_12._CodeOrName ? this.rhs.names : {};
    }
  }
  class Assign extends Node2 {
    constructor(lhs, rhs, sideEffects) {
      super();
      this.lhs = lhs;
      this.rhs = rhs;
      this.sideEffects = sideEffects;
    }
    render({ _n }) {
      return `${this.lhs} = ${this.rhs};` + _n;
    }
    optimizeNames(names2, constants2) {
      if (this.lhs instanceof code_12.Name && !names2[this.lhs.str] && !this.sideEffects)
        return;
      this.rhs = optimizeExpr(this.rhs, names2, constants2);
      return this;
    }
    get names() {
      const names2 = this.lhs instanceof code_12.Name ? {} : __spreadValues({}, this.lhs.names);
      return addExprNames(names2, this.rhs);
    }
  }
  class AssignOp extends Assign {
    constructor(lhs, op, rhs, sideEffects) {
      super(lhs, rhs, sideEffects);
      this.op = op;
    }
    render({ _n }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
    }
  }
  class Label extends Node2 {
    constructor(label) {
      super();
      this.label = label;
      this.names = {};
    }
    render({ _n }) {
      return `${this.label}:` + _n;
    }
  }
  class Break extends Node2 {
    constructor(label) {
      super();
      this.label = label;
      this.names = {};
    }
    render({ _n }) {
      const label = this.label ? ` ${this.label}` : "";
      return `break${label};` + _n;
    }
  }
  class Throw extends Node2 {
    constructor(error2) {
      super();
      this.error = error2;
    }
    render({ _n }) {
      return `throw ${this.error};` + _n;
    }
    get names() {
      return this.error.names;
    }
  }
  class AnyCode extends Node2 {
    constructor(code2) {
      super();
      this.code = code2;
    }
    render({ _n }) {
      return `${this.code};` + _n;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(names2, constants2) {
      this.code = optimizeExpr(this.code, names2, constants2);
      return this;
    }
    get names() {
      return this.code instanceof code_12._CodeOrName ? this.code.names : {};
    }
  }
  class ParentNode extends Node2 {
    constructor(nodes = []) {
      super();
      this.nodes = nodes;
    }
    render(opts2) {
      return this.nodes.reduce((code2, n) => code2 + n.render(opts2), "");
    }
    optimizeNodes() {
      const { nodes } = this;
      let i2 = nodes.length;
      while (i2--) {
        const n = nodes[i2].optimizeNodes();
        if (Array.isArray(n))
          nodes.splice(i2, 1, ...n);
        else if (n)
          nodes[i2] = n;
        else
          nodes.splice(i2, 1);
      }
      return nodes.length > 0 ? this : void 0;
    }
    optimizeNames(names2, constants2) {
      const { nodes } = this;
      let i2 = nodes.length;
      while (i2--) {
        const n = nodes[i2];
        if (n.optimizeNames(names2, constants2))
          continue;
        subtractNames(names2, n.names);
        nodes.splice(i2, 1);
      }
      return nodes.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((names2, n) => addNames(names2, n.names), {});
    }
  }
  class BlockNode extends ParentNode {
    render(opts2) {
      return "{" + opts2._n + super.render(opts2) + "}" + opts2._n;
    }
  }
  class Root extends ParentNode {
  }
  class Else extends BlockNode {
  }
  Else.kind = "else";
  class If extends BlockNode {
    constructor(condition, nodes) {
      super(nodes);
      this.condition = condition;
    }
    render(opts2) {
      let code2 = `if(${this.condition})` + super.render(opts2);
      if (this.else)
        code2 += "else " + this.else.render(opts2);
      return code2;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const cond = this.condition;
      if (cond === true)
        return this.nodes;
      let e = this.else;
      if (e) {
        const ns = e.optimizeNodes();
        e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
      }
      if (e) {
        if (cond === false)
          return e instanceof If ? e : e.nodes;
        if (this.nodes.length)
          return this;
        return new If(not2(cond), e instanceof If ? [e] : e.nodes);
      }
      if (cond === false || !this.nodes.length)
        return void 0;
      return this;
    }
    optimizeNames(names2, constants2) {
      var _a;
      this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names2, constants2);
      if (!(super.optimizeNames(names2, constants2) || this.else))
        return;
      this.condition = optimizeExpr(this.condition, names2, constants2);
      return this;
    }
    get names() {
      const names2 = super.names;
      addExprNames(names2, this.condition);
      if (this.else)
        addNames(names2, this.else.names);
      return names2;
    }
  }
  If.kind = "if";
  class For extends BlockNode {
  }
  For.kind = "for";
  class ForLoop extends For {
    constructor(iteration) {
      super();
      this.iteration = iteration;
    }
    render(opts2) {
      return `for(${this.iteration})` + super.render(opts2);
    }
    optimizeNames(names2, constants2) {
      if (!super.optimizeNames(names2, constants2))
        return;
      this.iteration = optimizeExpr(this.iteration, names2, constants2);
      return this;
    }
    get names() {
      return addNames(super.names, this.iteration.names);
    }
  }
  class ForRange extends For {
    constructor(varKind, name, from, to) {
      super();
      this.varKind = varKind;
      this.name = name;
      this.from = from;
      this.to = to;
    }
    render(opts2) {
      const varKind = opts2.es5 ? scope_1.varKinds.var : this.varKind;
      const { name, from, to } = this;
      return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts2);
    }
    get names() {
      const names2 = addExprNames(super.names, this.from);
      return addExprNames(names2, this.to);
    }
  }
  class ForIter extends For {
    constructor(loop, varKind, name, iterable) {
      super();
      this.loop = loop;
      this.varKind = varKind;
      this.name = name;
      this.iterable = iterable;
    }
    render(opts2) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts2);
    }
    optimizeNames(names2, constants2) {
      if (!super.optimizeNames(names2, constants2))
        return;
      this.iterable = optimizeExpr(this.iterable, names2, constants2);
      return this;
    }
    get names() {
      return addNames(super.names, this.iterable.names);
    }
  }
  class Func extends BlockNode {
    constructor(name, args, async) {
      super();
      this.name = name;
      this.args = args;
      this.async = async;
    }
    render(opts2) {
      const _async = this.async ? "async " : "";
      return `${_async}function ${this.name}(${this.args})` + super.render(opts2);
    }
  }
  Func.kind = "func";
  class Return extends ParentNode {
    render(opts2) {
      return "return " + super.render(opts2);
    }
  }
  Return.kind = "return";
  class Try extends BlockNode {
    render(opts2) {
      let code2 = "try" + super.render(opts2);
      if (this.catch)
        code2 += this.catch.render(opts2);
      if (this.finally)
        code2 += this.finally.render(opts2);
      return code2;
    }
    optimizeNodes() {
      var _a, _b;
      super.optimizeNodes();
      (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
      (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
      return this;
    }
    optimizeNames(names2, constants2) {
      var _a, _b;
      super.optimizeNames(names2, constants2);
      (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names2, constants2);
      (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names2, constants2);
      return this;
    }
    get names() {
      const names2 = super.names;
      if (this.catch)
        addNames(names2, this.catch.names);
      if (this.finally)
        addNames(names2, this.finally.names);
      return names2;
    }
  }
  class Catch extends BlockNode {
    constructor(error2) {
      super();
      this.error = error2;
    }
    render(opts2) {
      return `catch(${this.error})` + super.render(opts2);
    }
  }
  Catch.kind = "catch";
  class Finally extends BlockNode {
    render(opts2) {
      return "finally" + super.render(opts2);
    }
  }
  Finally.kind = "finally";
  class CodeGen {
    constructor(extScope, opts2 = {}) {
      this._values = {};
      this._blockStarts = [];
      this._constants = {};
      this.opts = __spreadProps(__spreadValues({}, opts2), { _n: opts2.lines ? "\n" : "" });
      this._extScope = extScope;
      this._scope = new scope_1.Scope({ parent: extScope });
      this._nodes = [new Root()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    name(prefix) {
      return this._scope.name(prefix);
    }
    scopeName(prefix) {
      return this._extScope.name(prefix);
    }
    scopeValue(prefixOrName, value) {
      const name = this._extScope.value(prefixOrName, value);
      const vs = this._values[name.prefix] || (this._values[name.prefix] = new Set());
      vs.add(name);
      return name;
    }
    getScopeValue(prefix, keyOrRef) {
      return this._extScope.getValue(prefix, keyOrRef);
    }
    scopeRefs(scopeName) {
      return this._extScope.scopeRefs(scopeName, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(varKind, nameOrPrefix, rhs, constant) {
      const name = this._scope.toName(nameOrPrefix);
      if (rhs !== void 0 && constant)
        this._constants[name.str] = rhs;
      this._leafNode(new Def(varKind, name, rhs));
      return name;
    }
    const(nameOrPrefix, rhs, _constant) {
      return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
    }
    let(nameOrPrefix, rhs, _constant) {
      return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
    }
    var(nameOrPrefix, rhs, _constant) {
      return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
    }
    assign(lhs, rhs, sideEffects) {
      return this._leafNode(new Assign(lhs, rhs, sideEffects));
    }
    add(lhs, rhs) {
      return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
    }
    code(c) {
      if (typeof c == "function")
        c();
      else if (c !== code_12.nil)
        this._leafNode(new AnyCode(c));
      return this;
    }
    object(...keyValues) {
      const code2 = ["{"];
      for (const [key, value] of keyValues) {
        if (code2.length > 1)
          code2.push(",");
        code2.push(key);
        if (key !== value || this.opts.es5) {
          code2.push(":");
          code_12.addCodeArg(code2, value);
        }
      }
      code2.push("}");
      return new code_12._Code(code2);
    }
    if(condition, thenBody, elseBody) {
      this._blockNode(new If(condition));
      if (thenBody && elseBody) {
        this.code(thenBody).else().code(elseBody).endIf();
      } else if (thenBody) {
        this.code(thenBody).endIf();
      } else if (elseBody) {
        throw new Error('CodeGen: "else" body without "then" body');
      }
      return this;
    }
    elseIf(condition) {
      return this._elseNode(new If(condition));
    }
    else() {
      return this._elseNode(new Else());
    }
    endIf() {
      return this._endBlockNode(If, Else);
    }
    _for(node, forBody) {
      this._blockNode(node);
      if (forBody)
        this.code(forBody).endFor();
      return this;
    }
    for(iteration, forBody) {
      return this._for(new ForLoop(iteration), forBody);
    }
    forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
      const name = this._scope.toName(nameOrPrefix);
      return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
    }
    forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
      const name = this._scope.toName(nameOrPrefix);
      if (this.opts.es5) {
        const arr = iterable instanceof code_12.Name ? iterable : this.var("_arr", iterable);
        return this.forRange("_i", 0, code_12._`${arr}.length`, (i2) => {
          this.var(name, code_12._`${arr}[${i2}]`);
          forBody(name);
        });
      }
      return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
    }
    forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
      if (this.opts.ownProperties) {
        return this.forOf(nameOrPrefix, code_12._`Object.keys(${obj})`, forBody);
      }
      const name = this._scope.toName(nameOrPrefix);
      return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
    }
    endFor() {
      return this._endBlockNode(For);
    }
    label(label) {
      return this._leafNode(new Label(label));
    }
    break(label) {
      return this._leafNode(new Break(label));
    }
    return(value) {
      const node = new Return();
      this._blockNode(node);
      this.code(value);
      if (node.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(Return);
    }
    try(tryBody, catchCode, finallyCode) {
      if (!catchCode && !finallyCode)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const node = new Try();
      this._blockNode(node);
      this.code(tryBody);
      if (catchCode) {
        const error2 = this.name("e");
        this._currNode = node.catch = new Catch(error2);
        catchCode(error2);
      }
      if (finallyCode) {
        this._currNode = node.finally = new Finally();
        this.code(finallyCode);
      }
      return this._endBlockNode(Catch, Finally);
    }
    throw(error2) {
      return this._leafNode(new Throw(error2));
    }
    block(body, nodeCount) {
      this._blockStarts.push(this._nodes.length);
      if (body)
        this.code(body).endBlock(nodeCount);
      return this;
    }
    endBlock(nodeCount) {
      const len = this._blockStarts.pop();
      if (len === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const toClose = this._nodes.length - len;
      if (toClose < 0 || nodeCount !== void 0 && toClose !== nodeCount) {
        throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
      }
      this._nodes.length = len;
      return this;
    }
    func(name, args = code_12.nil, async, funcBody) {
      this._blockNode(new Func(name, args, async));
      if (funcBody)
        this.code(funcBody).endFunc();
      return this;
    }
    endFunc() {
      return this._endBlockNode(Func);
    }
    optimize(n = 1) {
      while (n-- > 0) {
        this._root.optimizeNodes();
        this._root.optimizeNames(this._root.names, this._constants);
      }
    }
    _leafNode(node) {
      this._currNode.nodes.push(node);
      return this;
    }
    _blockNode(node) {
      this._currNode.nodes.push(node);
      this._nodes.push(node);
    }
    _endBlockNode(N1, N2) {
      const n = this._currNode;
      if (n instanceof N1 || N2 && n instanceof N2) {
        this._nodes.pop();
        return this;
      }
      throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
    }
    _elseNode(node) {
      const n = this._currNode;
      if (!(n instanceof If)) {
        throw new Error('CodeGen: "else" without "if"');
      }
      this._currNode = n.else = node;
      return this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const ns = this._nodes;
      return ns[ns.length - 1];
    }
    set _currNode(node) {
      const ns = this._nodes;
      ns[ns.length - 1] = node;
    }
  }
  exports.CodeGen = CodeGen;
  function addNames(names2, from) {
    for (const n in from)
      names2[n] = (names2[n] || 0) + (from[n] || 0);
    return names2;
  }
  function addExprNames(names2, from) {
    return from instanceof code_12._CodeOrName ? addNames(names2, from.names) : names2;
  }
  function optimizeExpr(expr, names2, constants2) {
    if (expr instanceof code_12.Name)
      return replaceName(expr);
    if (!canOptimize(expr))
      return expr;
    return new code_12._Code(expr._items.reduce((items2, c) => {
      if (c instanceof code_12.Name)
        c = replaceName(c);
      if (c instanceof code_12._Code)
        items2.push(...c._items);
      else
        items2.push(c);
      return items2;
    }, []));
    function replaceName(n) {
      const c = constants2[n.str];
      if (c === void 0 || names2[n.str] !== 1)
        return n;
      delete names2[n.str];
      return c;
    }
    function canOptimize(e) {
      return e instanceof code_12._Code && e._items.some((c) => c instanceof code_12.Name && names2[c.str] === 1 && constants2[c.str] !== void 0);
    }
  }
  function subtractNames(names2, from) {
    for (const n in from)
      names2[n] = (names2[n] || 0) - (from[n] || 0);
  }
  function not2(x) {
    return typeof x == "boolean" || typeof x == "number" || x === null ? !x : code_12._`!${par(x)}`;
  }
  exports.not = not2;
  const andCode = mappend(exports.operators.AND);
  function and(...args) {
    return args.reduce(andCode);
  }
  exports.and = and;
  const orCode = mappend(exports.operators.OR);
  function or(...args) {
    return args.reduce(orCode);
  }
  exports.or = or;
  function mappend(op) {
    return (x, y2) => x === code_12.nil ? y2 : y2 === code_12.nil ? x : code_12._`${par(x)} ${op} ${par(y2)}`;
  }
  function par(x) {
    return x instanceof code_12.Name ? x : code_12._`(${x})`;
  }
})(codegen);
var util = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
  const codegen_12 = codegen;
  const code_12 = code$1;
  function toHash(arr) {
    const hash = {};
    for (const item of arr)
      hash[item] = true;
    return hash;
  }
  exports.toHash = toHash;
  function alwaysValidSchema(it, schema2) {
    if (typeof schema2 == "boolean")
      return schema2;
    if (Object.keys(schema2).length === 0)
      return true;
    checkUnknownRules(it, schema2);
    return !schemaHasRules(schema2, it.self.RULES.all);
  }
  exports.alwaysValidSchema = alwaysValidSchema;
  function checkUnknownRules(it, schema2 = it.schema) {
    const { opts: opts2, self: self2 } = it;
    if (!opts2.strictSchema)
      return;
    if (typeof schema2 === "boolean")
      return;
    const rules2 = self2.RULES.keywords;
    for (const key in schema2) {
      if (!rules2[key])
        checkStrictMode(it, `unknown keyword: "${key}"`);
    }
  }
  exports.checkUnknownRules = checkUnknownRules;
  function schemaHasRules(schema2, rules2) {
    if (typeof schema2 == "boolean")
      return !schema2;
    for (const key in schema2)
      if (rules2[key])
        return true;
    return false;
  }
  exports.schemaHasRules = schemaHasRules;
  function schemaHasRulesButRef(schema2, RULES) {
    if (typeof schema2 == "boolean")
      return !schema2;
    for (const key in schema2)
      if (key !== "$ref" && RULES.all[key])
        return true;
    return false;
  }
  exports.schemaHasRulesButRef = schemaHasRulesButRef;
  function schemaRefOrVal({ topSchemaRef, schemaPath }, schema2, keyword2, $data) {
    if (!$data) {
      if (typeof schema2 == "number" || typeof schema2 == "boolean")
        return schema2;
      if (typeof schema2 == "string")
        return codegen_12._`${schema2}`;
    }
    return codegen_12._`${topSchemaRef}${schemaPath}${codegen_12.getProperty(keyword2)}`;
  }
  exports.schemaRefOrVal = schemaRefOrVal;
  function unescapeFragment(str2) {
    return unescapeJsonPointer(decodeURIComponent(str2));
  }
  exports.unescapeFragment = unescapeFragment;
  function escapeFragment(str2) {
    return encodeURIComponent(escapeJsonPointer(str2));
  }
  exports.escapeFragment = escapeFragment;
  function escapeJsonPointer(str2) {
    if (typeof str2 == "number")
      return `${str2}`;
    return str2.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  exports.escapeJsonPointer = escapeJsonPointer;
  function unescapeJsonPointer(str2) {
    return str2.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  exports.unescapeJsonPointer = unescapeJsonPointer;
  function eachItem(xs, f) {
    if (Array.isArray(xs)) {
      for (const x of xs)
        f(x);
    } else {
      f(xs);
    }
  }
  exports.eachItem = eachItem;
  function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName }) {
    return (gen, from, to, toName) => {
      const res = to === void 0 ? from : to instanceof codegen_12.Name ? (from instanceof codegen_12.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_12.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
      return toName === codegen_12.Name && !(res instanceof codegen_12.Name) ? resultToName(gen, res) : res;
    };
  }
  exports.mergeEvaluated = {
    props: makeMergeEvaluated({
      mergeNames: (gen, from, to) => gen.if(codegen_12._`${to} !== true && ${from} !== undefined`, () => {
        gen.if(codegen_12._`${from} === true`, () => gen.assign(to, true), () => gen.assign(to, codegen_12._`${to} || {}`).code(codegen_12._`Object.assign(${to}, ${from})`));
      }),
      mergeToName: (gen, from, to) => gen.if(codegen_12._`${to} !== true`, () => {
        if (from === true) {
          gen.assign(to, true);
        } else {
          gen.assign(to, codegen_12._`${to} || {}`);
          setEvaluated(gen, to, from);
        }
      }),
      mergeValues: (from, to) => from === true ? true : __spreadValues(__spreadValues({}, from), to),
      resultToName: evaluatedPropsToName
    }),
    items: makeMergeEvaluated({
      mergeNames: (gen, from, to) => gen.if(codegen_12._`${to} !== true && ${from} !== undefined`, () => gen.assign(to, codegen_12._`${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
      mergeToName: (gen, from, to) => gen.if(codegen_12._`${to} !== true`, () => gen.assign(to, from === true ? true : codegen_12._`${to} > ${from} ? ${to} : ${from}`)),
      mergeValues: (from, to) => from === true ? true : Math.max(from, to),
      resultToName: (gen, items2) => gen.var("items", items2)
    })
  };
  function evaluatedPropsToName(gen, ps) {
    if (ps === true)
      return gen.var("props", true);
    const props = gen.var("props", codegen_12._`{}`);
    if (ps !== void 0)
      setEvaluated(gen, props, ps);
    return props;
  }
  exports.evaluatedPropsToName = evaluatedPropsToName;
  function setEvaluated(gen, props, ps) {
    Object.keys(ps).forEach((p) => gen.assign(codegen_12._`${props}${codegen_12.getProperty(p)}`, true));
  }
  exports.setEvaluated = setEvaluated;
  const snippets = {};
  function useFunc(gen, f) {
    return gen.scopeValue("func", {
      ref: f,
      code: snippets[f.code] || (snippets[f.code] = new code_12._Code(f.code))
    });
  }
  exports.useFunc = useFunc;
  var Type2;
  (function(Type3) {
    Type3[Type3["Num"] = 0] = "Num";
    Type3[Type3["Str"] = 1] = "Str";
  })(Type2 = exports.Type || (exports.Type = {}));
  function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
    if (dataProp instanceof codegen_12.Name) {
      const isNumber = dataPropType === Type2.Num;
      return jsPropertySyntax ? isNumber ? codegen_12._`"[" + ${dataProp} + "]"` : codegen_12._`"['" + ${dataProp} + "']"` : isNumber ? codegen_12._`"/" + ${dataProp}` : codegen_12._`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return jsPropertySyntax ? codegen_12.getProperty(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
  }
  exports.getErrorPath = getErrorPath;
  function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
    if (!mode)
      return;
    msg = `strict mode: ${msg}`;
    if (mode === true)
      throw new Error(msg);
    it.self.logger.warn(msg);
  }
  exports.checkStrictMode = checkStrictMode;
})(util);
var names$1 = {};
Object.defineProperty(names$1, "__esModule", { value: true });
const codegen_1$t = codegen;
const names = {
  data: new codegen_1$t.Name("data"),
  valCxt: new codegen_1$t.Name("valCxt"),
  instancePath: new codegen_1$t.Name("instancePath"),
  parentData: new codegen_1$t.Name("parentData"),
  parentDataProperty: new codegen_1$t.Name("parentDataProperty"),
  rootData: new codegen_1$t.Name("rootData"),
  dynamicAnchors: new codegen_1$t.Name("dynamicAnchors"),
  vErrors: new codegen_1$t.Name("vErrors"),
  errors: new codegen_1$t.Name("errors"),
  this: new codegen_1$t.Name("this"),
  self: new codegen_1$t.Name("self"),
  scope: new codegen_1$t.Name("scope"),
  json: new codegen_1$t.Name("json"),
  jsonPos: new codegen_1$t.Name("jsonPos"),
  jsonLen: new codegen_1$t.Name("jsonLen"),
  jsonPart: new codegen_1$t.Name("jsonPart")
};
names$1.default = names;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
  const codegen_12 = codegen;
  const util_12 = util;
  const names_12 = names$1;
  exports.keywordError = {
    message: ({ keyword: keyword2 }) => codegen_12.str`must pass "${keyword2}" keyword validation`
  };
  exports.keyword$DataError = {
    message: ({ keyword: keyword2, schemaType }) => schemaType ? codegen_12.str`"${keyword2}" keyword must be ${schemaType} ($data)` : codegen_12.str`"${keyword2}" keyword is invalid ($data)`
  };
  function reportError(cxt, error2 = exports.keywordError, errorPaths, overrideAllErrors) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error2, errorPaths);
    if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : compositeRule || allErrors) {
      addError(gen, errObj);
    } else {
      returnErrors(it, codegen_12._`[${errObj}]`);
    }
  }
  exports.reportError = reportError;
  function reportExtraError(cxt, error2 = exports.keywordError, errorPaths) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error2, errorPaths);
    addError(gen, errObj);
    if (!(compositeRule || allErrors)) {
      returnErrors(it, names_12.default.vErrors);
    }
  }
  exports.reportExtraError = reportExtraError;
  function resetErrorsCount(gen, errsCount) {
    gen.assign(names_12.default.errors, errsCount);
    gen.if(codegen_12._`${names_12.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign(codegen_12._`${names_12.default.vErrors}.length`, errsCount), () => gen.assign(names_12.default.vErrors, null)));
  }
  exports.resetErrorsCount = resetErrorsCount;
  function extendErrors({ gen, keyword: keyword2, schemaValue, data, errsCount, it }) {
    if (errsCount === void 0)
      throw new Error("ajv implementation error");
    const err = gen.name("err");
    gen.forRange("i", errsCount, names_12.default.errors, (i2) => {
      gen.const(err, codegen_12._`${names_12.default.vErrors}[${i2}]`);
      gen.if(codegen_12._`${err}.instancePath === undefined`, () => gen.assign(codegen_12._`${err}.instancePath`, codegen_12.strConcat(names_12.default.instancePath, it.errorPath)));
      gen.assign(codegen_12._`${err}.schemaPath`, codegen_12.str`${it.errSchemaPath}/${keyword2}`);
      if (it.opts.verbose) {
        gen.assign(codegen_12._`${err}.schema`, schemaValue);
        gen.assign(codegen_12._`${err}.data`, data);
      }
    });
  }
  exports.extendErrors = extendErrors;
  function addError(gen, errObj) {
    const err = gen.const("err", errObj);
    gen.if(codegen_12._`${names_12.default.vErrors} === null`, () => gen.assign(names_12.default.vErrors, codegen_12._`[${err}]`), codegen_12._`${names_12.default.vErrors}.push(${err})`);
    gen.code(codegen_12._`${names_12.default.errors}++`);
  }
  function returnErrors(it, errs) {
    const { gen, validateName, schemaEnv } = it;
    if (schemaEnv.$async) {
      gen.throw(codegen_12._`new ${it.ValidationError}(${errs})`);
    } else {
      gen.assign(codegen_12._`${validateName}.errors`, errs);
      gen.return(false);
    }
  }
  const E = {
    keyword: new codegen_12.Name("keyword"),
    schemaPath: new codegen_12.Name("schemaPath"),
    params: new codegen_12.Name("params"),
    propertyName: new codegen_12.Name("propertyName"),
    message: new codegen_12.Name("message"),
    schema: new codegen_12.Name("schema"),
    parentSchema: new codegen_12.Name("parentSchema")
  };
  function errorObjectCode(cxt, error2, errorPaths) {
    const { createErrors } = cxt.it;
    if (createErrors === false)
      return codegen_12._`{}`;
    return errorObject(cxt, error2, errorPaths);
  }
  function errorObject(cxt, error2, errorPaths = {}) {
    const { gen, it } = cxt;
    const keyValues = [
      errorInstancePath(it, errorPaths),
      errorSchemaPath(cxt, errorPaths)
    ];
    extraErrorProps(cxt, error2, keyValues);
    return gen.object(...keyValues);
  }
  function errorInstancePath({ errorPath }, { instancePath }) {
    const instPath = instancePath ? codegen_12.str`${errorPath}${util_12.getErrorPath(instancePath, util_12.Type.Str)}` : errorPath;
    return [names_12.default.instancePath, codegen_12.strConcat(names_12.default.instancePath, instPath)];
  }
  function errorSchemaPath({ keyword: keyword2, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
    let schPath = parentSchema ? errSchemaPath : codegen_12.str`${errSchemaPath}/${keyword2}`;
    if (schemaPath) {
      schPath = codegen_12.str`${schPath}${util_12.getErrorPath(schemaPath, util_12.Type.Str)}`;
    }
    return [E.schemaPath, schPath];
  }
  function extraErrorProps(cxt, { params, message }, keyValues) {
    const { keyword: keyword2, data, schemaValue, it } = cxt;
    const { opts: opts2, propertyName, topSchemaRef, schemaPath } = it;
    keyValues.push([E.keyword, keyword2], [E.params, typeof params == "function" ? params(cxt) : params || codegen_12._`{}`]);
    if (opts2.messages) {
      keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
    }
    if (opts2.verbose) {
      keyValues.push([E.schema, schemaValue], [E.parentSchema, codegen_12._`${topSchemaRef}${schemaPath}`], [names_12.default.data, data]);
    }
    if (propertyName)
      keyValues.push([E.propertyName, propertyName]);
  }
})(errors);
Object.defineProperty(boolSchema, "__esModule", { value: true });
boolSchema.boolOrEmptySchema = boolSchema.topBoolOrEmptySchema = void 0;
const errors_1$2 = errors;
const codegen_1$s = codegen;
const names_1$6 = names$1;
const boolError = {
  message: "boolean schema is false"
};
function topBoolOrEmptySchema(it) {
  const { gen, schema: schema2, validateName } = it;
  if (schema2 === false) {
    falseSchemaError(it, false);
  } else if (typeof schema2 == "object" && schema2.$async === true) {
    gen.return(names_1$6.default.data);
  } else {
    gen.assign(codegen_1$s._`${validateName}.errors`, null);
    gen.return(true);
  }
}
boolSchema.topBoolOrEmptySchema = topBoolOrEmptySchema;
function boolOrEmptySchema(it, valid2) {
  const { gen, schema: schema2 } = it;
  if (schema2 === false) {
    gen.var(valid2, false);
    falseSchemaError(it);
  } else {
    gen.var(valid2, true);
  }
}
boolSchema.boolOrEmptySchema = boolOrEmptySchema;
function falseSchemaError(it, overrideAllErrors) {
  const { gen, data } = it;
  const cxt = {
    gen,
    keyword: "false schema",
    data,
    schema: false,
    schemaCode: false,
    schemaValue: false,
    params: {},
    it
  };
  errors_1$2.reportError(cxt, boolError, void 0, overrideAllErrors);
}
var dataType = {};
var rules = {};
Object.defineProperty(rules, "__esModule", { value: true });
rules.getRules = rules.isJSONType = void 0;
const _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
const jsonTypes = new Set(_jsonTypes);
function isJSONType(x) {
  return typeof x == "string" && jsonTypes.has(x);
}
rules.isJSONType = isJSONType;
function getRules() {
  const groups = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: __spreadProps(__spreadValues({}, groups), { integer: true, boolean: true, null: true }),
    rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
rules.getRules = getRules;
var applicability = {};
Object.defineProperty(applicability, "__esModule", { value: true });
applicability.shouldUseRule = applicability.shouldUseGroup = applicability.schemaHasRulesForType = void 0;
function schemaHasRulesForType({ schema: schema2, self: self2 }, type2) {
  const group = self2.RULES.types[type2];
  return group && group !== true && shouldUseGroup(schema2, group);
}
applicability.schemaHasRulesForType = schemaHasRulesForType;
function shouldUseGroup(schema2, group) {
  return group.rules.some((rule) => shouldUseRule(schema2, rule));
}
applicability.shouldUseGroup = shouldUseGroup;
function shouldUseRule(schema2, rule) {
  var _a;
  return schema2[rule.keyword] !== void 0 || ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema2[kwd] !== void 0));
}
applicability.shouldUseRule = shouldUseRule;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
  const rules_1 = rules;
  const applicability_12 = applicability;
  const errors_12 = errors;
  const codegen_12 = codegen;
  const util_12 = util;
  var DataType;
  (function(DataType2) {
    DataType2[DataType2["Correct"] = 0] = "Correct";
    DataType2[DataType2["Wrong"] = 1] = "Wrong";
  })(DataType = exports.DataType || (exports.DataType = {}));
  function getSchemaTypes(schema2) {
    const types2 = getJSONTypes(schema2.type);
    const hasNull = types2.includes("null");
    if (hasNull) {
      if (schema2.nullable === false)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!types2.length && schema2.nullable !== void 0) {
        throw new Error('"nullable" cannot be used without "type"');
      }
      if (schema2.nullable === true)
        types2.push("null");
    }
    return types2;
  }
  exports.getSchemaTypes = getSchemaTypes;
  function getJSONTypes(ts) {
    const types2 = Array.isArray(ts) ? ts : ts ? [ts] : [];
    if (types2.every(rules_1.isJSONType))
      return types2;
    throw new Error("type must be JSONType or JSONType[]: " + types2.join(","));
  }
  exports.getJSONTypes = getJSONTypes;
  function coerceAndCheckDataType(it, types2) {
    const { gen, data, opts: opts2 } = it;
    const coerceTo = coerceToTypes(types2, opts2.coerceTypes);
    const checkTypes = types2.length > 0 && !(coerceTo.length === 0 && types2.length === 1 && applicability_12.schemaHasRulesForType(it, types2[0]));
    if (checkTypes) {
      const wrongType = checkDataTypes(types2, data, opts2.strictNumbers, DataType.Wrong);
      gen.if(wrongType, () => {
        if (coerceTo.length)
          coerceData(it, types2, coerceTo);
        else
          reportTypeError(it);
      });
    }
    return checkTypes;
  }
  exports.coerceAndCheckDataType = coerceAndCheckDataType;
  const COERCIBLE = new Set(["string", "number", "integer", "boolean", "null"]);
  function coerceToTypes(types2, coerceTypes) {
    return coerceTypes ? types2.filter((t2) => COERCIBLE.has(t2) || coerceTypes === "array" && t2 === "array") : [];
  }
  function coerceData(it, types2, coerceTo) {
    const { gen, data, opts: opts2 } = it;
    const dataType2 = gen.let("dataType", codegen_12._`typeof ${data}`);
    const coerced = gen.let("coerced", codegen_12._`undefined`);
    if (opts2.coerceTypes === "array") {
      gen.if(codegen_12._`${dataType2} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen.assign(data, codegen_12._`${data}[0]`).assign(dataType2, codegen_12._`typeof ${data}`).if(checkDataTypes(types2, data, opts2.strictNumbers), () => gen.assign(coerced, data)));
    }
    gen.if(codegen_12._`${coerced} !== undefined`);
    for (const t2 of coerceTo) {
      if (COERCIBLE.has(t2) || t2 === "array" && opts2.coerceTypes === "array") {
        coerceSpecificType(t2);
      }
    }
    gen.else();
    reportTypeError(it);
    gen.endIf();
    gen.if(codegen_12._`${coerced} !== undefined`, () => {
      gen.assign(data, coerced);
      assignParentData(it, coerced);
    });
    function coerceSpecificType(t2) {
      switch (t2) {
        case "string":
          gen.elseIf(codegen_12._`${dataType2} == "number" || ${dataType2} == "boolean"`).assign(coerced, codegen_12._`"" + ${data}`).elseIf(codegen_12._`${data} === null`).assign(coerced, codegen_12._`""`);
          return;
        case "number":
          gen.elseIf(codegen_12._`${dataType2} == "boolean" || ${data} === null
              || (${dataType2} == "string" && ${data} && ${data} == +${data})`).assign(coerced, codegen_12._`+${data}`);
          return;
        case "integer":
          gen.elseIf(codegen_12._`${dataType2} === "boolean" || ${data} === null
              || (${dataType2} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`).assign(coerced, codegen_12._`+${data}`);
          return;
        case "boolean":
          gen.elseIf(codegen_12._`${data} === "false" || ${data} === 0 || ${data} === null`).assign(coerced, false).elseIf(codegen_12._`${data} === "true" || ${data} === 1`).assign(coerced, true);
          return;
        case "null":
          gen.elseIf(codegen_12._`${data} === "" || ${data} === 0 || ${data} === false`);
          gen.assign(coerced, null);
          return;
        case "array":
          gen.elseIf(codegen_12._`${dataType2} === "string" || ${dataType2} === "number"
              || ${dataType2} === "boolean" || ${data} === null`).assign(coerced, codegen_12._`[${data}]`);
      }
    }
  }
  function assignParentData({ gen, parentData, parentDataProperty }, expr) {
    gen.if(codegen_12._`${parentData} !== undefined`, () => gen.assign(codegen_12._`${parentData}[${parentDataProperty}]`, expr));
  }
  function checkDataType(dataType2, data, strictNums, correct = DataType.Correct) {
    const EQ = correct === DataType.Correct ? codegen_12.operators.EQ : codegen_12.operators.NEQ;
    let cond;
    switch (dataType2) {
      case "null":
        return codegen_12._`${data} ${EQ} null`;
      case "array":
        cond = codegen_12._`Array.isArray(${data})`;
        break;
      case "object":
        cond = codegen_12._`${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
        break;
      case "integer":
        cond = numCond(codegen_12._`!(${data} % 1) && !isNaN(${data})`);
        break;
      case "number":
        cond = numCond();
        break;
      default:
        return codegen_12._`typeof ${data} ${EQ} ${dataType2}`;
    }
    return correct === DataType.Correct ? cond : codegen_12.not(cond);
    function numCond(_cond = codegen_12.nil) {
      return codegen_12.and(codegen_12._`typeof ${data} == "number"`, _cond, strictNums ? codegen_12._`isFinite(${data})` : codegen_12.nil);
    }
  }
  exports.checkDataType = checkDataType;
  function checkDataTypes(dataTypes, data, strictNums, correct) {
    if (dataTypes.length === 1) {
      return checkDataType(dataTypes[0], data, strictNums, correct);
    }
    let cond;
    const types2 = util_12.toHash(dataTypes);
    if (types2.array && types2.object) {
      const notObj = codegen_12._`typeof ${data} != "object"`;
      cond = types2.null ? notObj : codegen_12._`!${data} || ${notObj}`;
      delete types2.null;
      delete types2.array;
      delete types2.object;
    } else {
      cond = codegen_12.nil;
    }
    if (types2.number)
      delete types2.integer;
    for (const t2 in types2)
      cond = codegen_12.and(cond, checkDataType(t2, data, strictNums, correct));
    return cond;
  }
  exports.checkDataTypes = checkDataTypes;
  const typeError = {
    message: ({ schema: schema2 }) => `must be ${schema2}`,
    params: ({ schema: schema2, schemaValue }) => typeof schema2 == "string" ? codegen_12._`{type: ${schema2}}` : codegen_12._`{type: ${schemaValue}}`
  };
  function reportTypeError(it) {
    const cxt = getTypeErrorContext(it);
    errors_12.reportError(cxt, typeError);
  }
  exports.reportTypeError = reportTypeError;
  function getTypeErrorContext(it) {
    const { gen, data, schema: schema2 } = it;
    const schemaCode = util_12.schemaRefOrVal(it, schema2, "type");
    return {
      gen,
      keyword: "type",
      data,
      schema: schema2.type,
      schemaCode,
      schemaValue: schemaCode,
      parentSchema: schema2,
      params: {},
      it
    };
  }
})(dataType);
var defaults = {};
Object.defineProperty(defaults, "__esModule", { value: true });
defaults.assignDefaults = void 0;
const codegen_1$r = codegen;
const util_1$o = util;
function assignDefaults(it, ty) {
  const { properties: properties2, items: items2 } = it.schema;
  if (ty === "object" && properties2) {
    for (const key in properties2) {
      assignDefault(it, key, properties2[key].default);
    }
  } else if (ty === "array" && Array.isArray(items2)) {
    items2.forEach((sch, i2) => assignDefault(it, i2, sch.default));
  }
}
defaults.assignDefaults = assignDefaults;
function assignDefault(it, prop, defaultValue) {
  const { gen, compositeRule, data, opts: opts2 } = it;
  if (defaultValue === void 0)
    return;
  const childData = codegen_1$r._`${data}${codegen_1$r.getProperty(prop)}`;
  if (compositeRule) {
    util_1$o.checkStrictMode(it, `default is ignored for: ${childData}`);
    return;
  }
  let condition = codegen_1$r._`${childData} === undefined`;
  if (opts2.useDefaults === "empty") {
    condition = codegen_1$r._`${condition} || ${childData} === null || ${childData} === ""`;
  }
  gen.if(condition, codegen_1$r._`${childData} = ${codegen_1$r.stringify(defaultValue)}`);
}
var keyword = {};
var code = {};
Object.defineProperty(code, "__esModule", { value: true });
code.validateUnion = code.validateArray = code.usePattern = code.callValidateCode = code.schemaProperties = code.allSchemaProperties = code.noPropertyInData = code.propertyInData = code.isOwnProperty = code.hasPropFunc = code.reportMissingProp = code.checkMissingProp = code.checkReportMissingProp = void 0;
const codegen_1$q = codegen;
const util_1$n = util;
const names_1$5 = names$1;
function checkReportMissingProp(cxt, prop) {
  const { gen, data, it } = cxt;
  gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
    cxt.setParams({ missingProperty: codegen_1$q._`${prop}` }, true);
    cxt.error();
  });
}
code.checkReportMissingProp = checkReportMissingProp;
function checkMissingProp({ gen, data, it: { opts: opts2 } }, properties2, missing) {
  return codegen_1$q.or(...properties2.map((prop) => codegen_1$q.and(noPropertyInData(gen, data, prop, opts2.ownProperties), codegen_1$q._`${missing} = ${prop}`)));
}
code.checkMissingProp = checkMissingProp;
function reportMissingProp(cxt, missing) {
  cxt.setParams({ missingProperty: missing }, true);
  cxt.error();
}
code.reportMissingProp = reportMissingProp;
function hasPropFunc(gen) {
  return gen.scopeValue("func", {
    ref: Object.prototype.hasOwnProperty,
    code: codegen_1$q._`Object.prototype.hasOwnProperty`
  });
}
code.hasPropFunc = hasPropFunc;
function isOwnProperty(gen, data, property) {
  return codegen_1$q._`${hasPropFunc(gen)}.call(${data}, ${property})`;
}
code.isOwnProperty = isOwnProperty;
function propertyInData(gen, data, property, ownProperties) {
  const cond = codegen_1$q._`${data}${codegen_1$q.getProperty(property)} !== undefined`;
  return ownProperties ? codegen_1$q._`${cond} && ${isOwnProperty(gen, data, property)}` : cond;
}
code.propertyInData = propertyInData;
function noPropertyInData(gen, data, property, ownProperties) {
  const cond = codegen_1$q._`${data}${codegen_1$q.getProperty(property)} === undefined`;
  return ownProperties ? codegen_1$q.or(cond, codegen_1$q.not(isOwnProperty(gen, data, property))) : cond;
}
code.noPropertyInData = noPropertyInData;
function allSchemaProperties(schemaMap) {
  return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
}
code.allSchemaProperties = allSchemaProperties;
function schemaProperties(it, schemaMap) {
  return allSchemaProperties(schemaMap).filter((p) => !util_1$n.alwaysValidSchema(it, schemaMap[p]));
}
code.schemaProperties = schemaProperties;
function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
  const dataAndSchema = passSchema ? codegen_1$q._`${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
  const valCxt = [
    [names_1$5.default.instancePath, codegen_1$q.strConcat(names_1$5.default.instancePath, errorPath)],
    [names_1$5.default.parentData, it.parentData],
    [names_1$5.default.parentDataProperty, it.parentDataProperty],
    [names_1$5.default.rootData, names_1$5.default.rootData]
  ];
  if (it.opts.dynamicRef)
    valCxt.push([names_1$5.default.dynamicAnchors, names_1$5.default.dynamicAnchors]);
  const args = codegen_1$q._`${dataAndSchema}, ${gen.object(...valCxt)}`;
  return context !== codegen_1$q.nil ? codegen_1$q._`${func}.call(${context}, ${args})` : codegen_1$q._`${func}(${args})`;
}
code.callValidateCode = callValidateCode;
function usePattern({ gen, it: { opts: opts2 } }, pattern2) {
  const u2 = opts2.unicodeRegExp ? "u" : "";
  return gen.scopeValue("pattern", {
    key: pattern2,
    ref: new RegExp(pattern2, u2),
    code: codegen_1$q._`new RegExp(${pattern2}, ${u2})`
  });
}
code.usePattern = usePattern;
function validateArray(cxt) {
  const { gen, data, keyword: keyword2, it } = cxt;
  const valid2 = gen.name("valid");
  if (it.allErrors) {
    const validArr = gen.let("valid", true);
    validateItems(() => gen.assign(validArr, false));
    return validArr;
  }
  gen.var(valid2, true);
  validateItems(() => gen.break());
  return valid2;
  function validateItems(notValid) {
    const len = gen.const("len", codegen_1$q._`${data}.length`);
    gen.forRange("i", 0, len, (i2) => {
      cxt.subschema({
        keyword: keyword2,
        dataProp: i2,
        dataPropType: util_1$n.Type.Num
      }, valid2);
      gen.if(codegen_1$q.not(valid2), notValid);
    });
  }
}
code.validateArray = validateArray;
function validateUnion(cxt) {
  const { gen, schema: schema2, keyword: keyword2, it } = cxt;
  if (!Array.isArray(schema2))
    throw new Error("ajv implementation error");
  const alwaysValid = schema2.some((sch) => util_1$n.alwaysValidSchema(it, sch));
  if (alwaysValid && !it.opts.unevaluated)
    return;
  const valid2 = gen.let("valid", false);
  const schValid = gen.name("_valid");
  gen.block(() => schema2.forEach((_sch, i2) => {
    const schCxt = cxt.subschema({
      keyword: keyword2,
      schemaProp: i2,
      compositeRule: true
    }, schValid);
    gen.assign(valid2, codegen_1$q._`${valid2} || ${schValid}`);
    const merged = cxt.mergeValidEvaluated(schCxt, schValid);
    if (!merged)
      gen.if(codegen_1$q.not(valid2));
  }));
  cxt.result(valid2, () => cxt.reset(), () => cxt.error(true));
}
code.validateUnion = validateUnion;
Object.defineProperty(keyword, "__esModule", { value: true });
keyword.validateKeywordUsage = keyword.validSchemaType = keyword.funcKeywordCode = keyword.macroKeywordCode = void 0;
const codegen_1$p = codegen;
const names_1$4 = names$1;
const code_1$9 = code;
const errors_1$1 = errors;
function macroKeywordCode(cxt, def2) {
  const { gen, keyword: keyword2, schema: schema2, parentSchema, it } = cxt;
  const macroSchema = def2.macro.call(it.self, schema2, parentSchema, it);
  const schemaRef = useKeyword(gen, keyword2, macroSchema);
  if (it.opts.validateSchema !== false)
    it.self.validateSchema(macroSchema, true);
  const valid2 = gen.name("valid");
  cxt.subschema({
    schema: macroSchema,
    schemaPath: codegen_1$p.nil,
    errSchemaPath: `${it.errSchemaPath}/${keyword2}`,
    topSchemaRef: schemaRef,
    compositeRule: true
  }, valid2);
  cxt.pass(valid2, () => cxt.error(true));
}
keyword.macroKeywordCode = macroKeywordCode;
function funcKeywordCode(cxt, def2) {
  var _a;
  const { gen, keyword: keyword2, schema: schema2, parentSchema, $data, it } = cxt;
  checkAsyncKeyword(it, def2);
  const validate2 = !$data && def2.compile ? def2.compile.call(it.self, schema2, parentSchema, it) : def2.validate;
  const validateRef = useKeyword(gen, keyword2, validate2);
  const valid2 = gen.let("valid");
  cxt.block$data(valid2, validateKeyword);
  cxt.ok((_a = def2.valid) !== null && _a !== void 0 ? _a : valid2);
  function validateKeyword() {
    if (def2.errors === false) {
      assignValid();
      if (def2.modifying)
        modifyData(cxt);
      reportErrs(() => cxt.error());
    } else {
      const ruleErrs = def2.async ? validateAsync() : validateSync();
      if (def2.modifying)
        modifyData(cxt);
      reportErrs(() => addErrs(cxt, ruleErrs));
    }
  }
  function validateAsync() {
    const ruleErrs = gen.let("ruleErrs", null);
    gen.try(() => assignValid(codegen_1$p._`await `), (e) => gen.assign(valid2, false).if(codegen_1$p._`${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, codegen_1$p._`${e}.errors`), () => gen.throw(e)));
    return ruleErrs;
  }
  function validateSync() {
    const validateErrs = codegen_1$p._`${validateRef}.errors`;
    gen.assign(validateErrs, null);
    assignValid(codegen_1$p.nil);
    return validateErrs;
  }
  function assignValid(_await = def2.async ? codegen_1$p._`await ` : codegen_1$p.nil) {
    const passCxt = it.opts.passContext ? names_1$4.default.this : names_1$4.default.self;
    const passSchema = !("compile" in def2 && !$data || def2.schema === false);
    gen.assign(valid2, codegen_1$p._`${_await}${code_1$9.callValidateCode(cxt, validateRef, passCxt, passSchema)}`, def2.modifying);
  }
  function reportErrs(errors2) {
    var _a2;
    gen.if(codegen_1$p.not((_a2 = def2.valid) !== null && _a2 !== void 0 ? _a2 : valid2), errors2);
  }
}
keyword.funcKeywordCode = funcKeywordCode;
function modifyData(cxt) {
  const { gen, data, it } = cxt;
  gen.if(it.parentData, () => gen.assign(data, codegen_1$p._`${it.parentData}[${it.parentDataProperty}]`));
}
function addErrs(cxt, errs) {
  const { gen } = cxt;
  gen.if(codegen_1$p._`Array.isArray(${errs})`, () => {
    gen.assign(names_1$4.default.vErrors, codegen_1$p._`${names_1$4.default.vErrors} === null ? ${errs} : ${names_1$4.default.vErrors}.concat(${errs})`).assign(names_1$4.default.errors, codegen_1$p._`${names_1$4.default.vErrors}.length`);
    errors_1$1.extendErrors(cxt);
  }, () => cxt.error());
}
function checkAsyncKeyword({ schemaEnv }, def2) {
  if (def2.async && !schemaEnv.$async)
    throw new Error("async keyword in sync schema");
}
function useKeyword(gen, keyword2, result) {
  if (result === void 0)
    throw new Error(`keyword "${keyword2}" failed to compile`);
  return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: codegen_1$p.stringify(result) });
}
function validSchemaType(schema2, schemaType, allowUndefined = false) {
  return !schemaType.length || schemaType.some((st) => st === "array" ? Array.isArray(schema2) : st === "object" ? schema2 && typeof schema2 == "object" && !Array.isArray(schema2) : typeof schema2 == st || allowUndefined && typeof schema2 == "undefined");
}
keyword.validSchemaType = validSchemaType;
function validateKeywordUsage({ schema: schema2, opts: opts2, self: self2, errSchemaPath }, def2, keyword2) {
  if (Array.isArray(def2.keyword) ? !def2.keyword.includes(keyword2) : def2.keyword !== keyword2) {
    throw new Error("ajv implementation error");
  }
  const deps = def2.dependencies;
  if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema2, kwd))) {
    throw new Error(`parent schema must have dependencies of ${keyword2}: ${deps.join(",")}`);
  }
  if (def2.validateSchema) {
    const valid2 = def2.validateSchema(schema2[keyword2]);
    if (!valid2) {
      const msg = `keyword "${keyword2}" value is invalid at path "${errSchemaPath}": ` + self2.errorsText(def2.validateSchema.errors);
      if (opts2.validateSchema === "log")
        self2.logger.error(msg);
      else
        throw new Error(msg);
    }
  }
}
keyword.validateKeywordUsage = validateKeywordUsage;
var subschema = {};
Object.defineProperty(subschema, "__esModule", { value: true });
subschema.extendSubschemaMode = subschema.extendSubschemaData = subschema.getSubschema = void 0;
const codegen_1$o = codegen;
const util_1$m = util;
function getSubschema(it, { keyword: keyword2, schemaProp, schema: schema2, schemaPath, errSchemaPath, topSchemaRef }) {
  if (keyword2 !== void 0 && schema2 !== void 0) {
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  }
  if (keyword2 !== void 0) {
    const sch = it.schema[keyword2];
    return schemaProp === void 0 ? {
      schema: sch,
      schemaPath: codegen_1$o._`${it.schemaPath}${codegen_1$o.getProperty(keyword2)}`,
      errSchemaPath: `${it.errSchemaPath}/${keyword2}`
    } : {
      schema: sch[schemaProp],
      schemaPath: codegen_1$o._`${it.schemaPath}${codegen_1$o.getProperty(keyword2)}${codegen_1$o.getProperty(schemaProp)}`,
      errSchemaPath: `${it.errSchemaPath}/${keyword2}/${util_1$m.escapeFragment(schemaProp)}`
    };
  }
  if (schema2 !== void 0) {
    if (schemaPath === void 0 || errSchemaPath === void 0 || topSchemaRef === void 0) {
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    }
    return {
      schema: schema2,
      schemaPath,
      topSchemaRef,
      errSchemaPath
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
subschema.getSubschema = getSubschema;
function extendSubschemaData(subschema2, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
  if (data !== void 0 && dataProp !== void 0) {
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  }
  const { gen } = it;
  if (dataProp !== void 0) {
    const { errorPath, dataPathArr, opts: opts2 } = it;
    const nextData = gen.let("data", codegen_1$o._`${it.data}${codegen_1$o.getProperty(dataProp)}`, true);
    dataContextProps(nextData);
    subschema2.errorPath = codegen_1$o.str`${errorPath}${util_1$m.getErrorPath(dataProp, dpType, opts2.jsPropertySyntax)}`;
    subschema2.parentDataProperty = codegen_1$o._`${dataProp}`;
    subschema2.dataPathArr = [...dataPathArr, subschema2.parentDataProperty];
  }
  if (data !== void 0) {
    const nextData = data instanceof codegen_1$o.Name ? data : gen.let("data", data, true);
    dataContextProps(nextData);
    if (propertyName !== void 0)
      subschema2.propertyName = propertyName;
  }
  if (dataTypes)
    subschema2.dataTypes = dataTypes;
  function dataContextProps(_nextData) {
    subschema2.data = _nextData;
    subschema2.dataLevel = it.dataLevel + 1;
    subschema2.dataTypes = [];
    it.definedProperties = new Set();
    subschema2.parentData = it.data;
    subschema2.dataNames = [...it.dataNames, _nextData];
  }
}
subschema.extendSubschemaData = extendSubschemaData;
function extendSubschemaMode(subschema2, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
  if (compositeRule !== void 0)
    subschema2.compositeRule = compositeRule;
  if (createErrors !== void 0)
    subschema2.createErrors = createErrors;
  if (allErrors !== void 0)
    subschema2.allErrors = allErrors;
  subschema2.jtdDiscriminator = jtdDiscriminator;
  subschema2.jtdMetadata = jtdMetadata;
}
subschema.extendSubschemaMode = extendSubschemaMode;
var resolve$1 = {};
var fastDeepEqual = function equal2(a, b) {
  if (a === b)
    return true;
  if (a && b && typeof a == "object" && typeof b == "object") {
    if (a.constructor !== b.constructor)
      return false;
    var length, i2, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length)
        return false;
      for (i2 = length; i2-- !== 0; )
        if (!equal2(a[i2], b[i2]))
          return false;
      return true;
    }
    if (a.constructor === RegExp)
      return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf)
      return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString)
      return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length)
      return false;
    for (i2 = length; i2-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i2]))
        return false;
    for (i2 = length; i2-- !== 0; ) {
      var key = keys[i2];
      if (!equal2(a[key], b[key]))
        return false;
    }
    return true;
  }
  return a !== a && b !== b;
};
var jsonSchemaTraverse = { exports: {} };
var traverse$1 = jsonSchemaTraverse.exports = function(schema2, opts2, cb) {
  if (typeof opts2 == "function") {
    cb = opts2;
    opts2 = {};
  }
  cb = opts2.cb || cb;
  var pre = typeof cb == "function" ? cb : cb.pre || function() {
  };
  var post = cb.post || function() {
  };
  _traverse(opts2, pre, post, schema2, "", schema2);
};
traverse$1.keywords = {
  additionalItems: true,
  items: true,
  contains: true,
  additionalProperties: true,
  propertyNames: true,
  not: true,
  if: true,
  then: true,
  else: true
};
traverse$1.arrayKeywords = {
  items: true,
  allOf: true,
  anyOf: true,
  oneOf: true
};
traverse$1.propsKeywords = {
  $defs: true,
  definitions: true,
  properties: true,
  patternProperties: true,
  dependencies: true
};
traverse$1.skipKeywords = {
  default: true,
  enum: true,
  const: true,
  required: true,
  maximum: true,
  minimum: true,
  exclusiveMaximum: true,
  exclusiveMinimum: true,
  multipleOf: true,
  maxLength: true,
  minLength: true,
  pattern: true,
  format: true,
  maxItems: true,
  minItems: true,
  uniqueItems: true,
  maxProperties: true,
  minProperties: true
};
function _traverse(opts2, pre, post, schema2, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
  if (schema2 && typeof schema2 == "object" && !Array.isArray(schema2)) {
    pre(schema2, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    for (var key in schema2) {
      var sch = schema2[key];
      if (Array.isArray(sch)) {
        if (key in traverse$1.arrayKeywords) {
          for (var i2 = 0; i2 < sch.length; i2++)
            _traverse(opts2, pre, post, sch[i2], jsonPtr + "/" + key + "/" + i2, rootSchema, jsonPtr, key, schema2, i2);
        }
      } else if (key in traverse$1.propsKeywords) {
        if (sch && typeof sch == "object") {
          for (var prop in sch)
            _traverse(opts2, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema2, prop);
        }
      } else if (key in traverse$1.keywords || opts2.allKeys && !(key in traverse$1.skipKeywords)) {
        _traverse(opts2, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema2);
      }
    }
    post(schema2, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
  }
}
function escapeJsonPtr(str2) {
  return str2.replace(/~/g, "~0").replace(/\//g, "~1");
}
var uri_all = { exports: {} };
/** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
(function(module, exports) {
  (function(global2, factory) {
    factory(exports);
  })(commonjsGlobal, function(exports2) {
    function merge2() {
      for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
        sets[_key] = arguments[_key];
      }
      if (sets.length > 1) {
        sets[0] = sets[0].slice(0, -1);
        var xl = sets.length - 1;
        for (var x = 1; x < xl; ++x) {
          sets[x] = sets[x].slice(1, -1);
        }
        sets[xl] = sets[xl].slice(1);
        return sets.join("");
      } else {
        return sets[0];
      }
    }
    function subexp(str2) {
      return "(?:" + str2 + ")";
    }
    function typeOf(o) {
      return o === void 0 ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
    }
    function toUpperCase(str2) {
      return str2.toUpperCase();
    }
    function toArray2(obj) {
      return obj !== void 0 && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
    }
    function assign(target, source2) {
      var obj = target;
      if (source2) {
        for (var key in source2) {
          obj[key] = source2[key];
        }
      }
      return obj;
    }
    function buildExps(isIRI) {
      var ALPHA$$ = "[A-Za-z]", DIGIT$$ = "[0-9]", HEXDIG$$2 = merge2(DIGIT$$, "[A-Fa-f]"), PCT_ENCODED$2 = subexp(subexp("%[EFef]" + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2) + "|" + subexp("%" + HEXDIG$$2 + HEXDIG$$2)), GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]", SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]", RESERVED$$ = merge2(GEN_DELIMS$$, SUB_DELIMS$$), UCSCHAR$$ = isIRI ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]", IPRIVATE$$ = isIRI ? "[\\uE000-\\uF8FF]" : "[]", UNRESERVED$$2 = merge2(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$);
      subexp(ALPHA$$ + merge2(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*");
      subexp(subexp(PCT_ENCODED$2 + "|" + merge2(UNRESERVED$$2, SUB_DELIMS$$, "[\\:]")) + "*");
      var DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$), IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$), H16$ = subexp(HEXDIG$$2 + "{1,4}"), LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$), IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$), IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$), IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$), IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$), IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$), IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$), IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$), IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$), IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"), IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")), ZONEID$ = subexp(subexp(UNRESERVED$$2 + "|" + PCT_ENCODED$2) + "+");
      subexp("[vV]" + HEXDIG$$2 + "+\\." + merge2(UNRESERVED$$2, SUB_DELIMS$$, "[\\:]") + "+");
      subexp(subexp(PCT_ENCODED$2 + "|" + merge2(UNRESERVED$$2, SUB_DELIMS$$)) + "*");
      var PCHAR$ = subexp(PCT_ENCODED$2 + "|" + merge2(UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@]"));
      subexp(subexp(PCT_ENCODED$2 + "|" + merge2(UNRESERVED$$2, SUB_DELIMS$$, "[\\@]")) + "+");
      subexp(subexp(PCHAR$ + "|" + merge2("[\\/\\?]", IPRIVATE$$)) + "*");
      return {
        NOT_SCHEME: new RegExp(merge2("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
        NOT_USERINFO: new RegExp(merge2("[^\\%\\:]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
        NOT_HOST: new RegExp(merge2("[^\\%\\[\\]\\:]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
        NOT_PATH: new RegExp(merge2("[^\\%\\/\\:\\@]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
        NOT_PATH_NOSCHEME: new RegExp(merge2("[^\\%\\/\\@]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
        NOT_QUERY: new RegExp(merge2("[^\\%]", UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
        NOT_FRAGMENT: new RegExp(merge2("[^\\%]", UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
        ESCAPE: new RegExp(merge2("[^]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
        UNRESERVED: new RegExp(UNRESERVED$$2, "g"),
        OTHER_CHARS: new RegExp(merge2("[^\\%]", UNRESERVED$$2, RESERVED$$), "g"),
        PCT_ENCODED: new RegExp(PCT_ENCODED$2, "g"),
        IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
        IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$2 + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$")
      };
    }
    var URI_PROTOCOL = buildExps(false);
    var IRI_PROTOCOL = buildExps(true);
    var slicedToArray = function() {
      function sliceIterator(arr, i2) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i2 && _arr.length === i2)
              break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"])
              _i["return"]();
          } finally {
            if (_d)
              throw _e;
          }
        }
        return _arr;
      }
      return function(arr, i2) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          return sliceIterator(arr, i2);
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
    }();
    var toConsumableArray = function(arr) {
      if (Array.isArray(arr)) {
        for (var i2 = 0, arr2 = Array(arr.length); i2 < arr.length; i2++)
          arr2[i2] = arr[i2];
        return arr2;
      } else {
        return Array.from(arr);
      }
    };
    var maxInt = 2147483647;
    var base = 36;
    var tMin = 1;
    var tMax = 26;
    var skew = 38;
    var damp = 700;
    var initialBias = 72;
    var initialN = 128;
    var delimiter = "-";
    var regexPunycode = /^xn--/;
    var regexNonASCII = /[^\0-\x7E]/;
    var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
    var errors2 = {
      "overflow": "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    };
    var baseMinusTMin = base - tMin;
    var floor = Math.floor;
    var stringFromCharCode = String.fromCharCode;
    function error$12(type2) {
      throw new RangeError(errors2[type2]);
    }
    function map2(array, fn) {
      var result = [];
      var length = array.length;
      while (length--) {
        result[length] = fn(array[length]);
      }
      return result;
    }
    function mapDomain(string, fn) {
      var parts = string.split("@");
      var result = "";
      if (parts.length > 1) {
        result = parts[0] + "@";
        string = parts[1];
      }
      string = string.replace(regexSeparators, ".");
      var labels = string.split(".");
      var encoded = map2(labels, fn).join(".");
      return result + encoded;
    }
    function ucs2decode(string) {
      var output2 = [];
      var counter = 0;
      var length = string.length;
      while (counter < length) {
        var value = string.charCodeAt(counter++);
        if (value >= 55296 && value <= 56319 && counter < length) {
          var extra = string.charCodeAt(counter++);
          if ((extra & 64512) == 56320) {
            output2.push(((value & 1023) << 10) + (extra & 1023) + 65536);
          } else {
            output2.push(value);
            counter--;
          }
        } else {
          output2.push(value);
        }
      }
      return output2;
    }
    var ucs2encode = function ucs2encode2(array) {
      return String.fromCodePoint.apply(String, toConsumableArray(array));
    };
    var basicToDigit = function basicToDigit2(codePoint) {
      if (codePoint - 48 < 10) {
        return codePoint - 22;
      }
      if (codePoint - 65 < 26) {
        return codePoint - 65;
      }
      if (codePoint - 97 < 26) {
        return codePoint - 97;
      }
      return base;
    };
    var digitToBasic = function digitToBasic2(digit, flag) {
      return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    };
    var adapt = function adapt2(delta, numPoints, firstTime) {
      var k = 0;
      delta = firstTime ? floor(delta / damp) : delta >> 1;
      delta += floor(delta / numPoints);
      for (; delta > baseMinusTMin * tMax >> 1; k += base) {
        delta = floor(delta / baseMinusTMin);
      }
      return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    };
    var decode = function decode2(input) {
      var output2 = [];
      var inputLength = input.length;
      var i2 = 0;
      var n = initialN;
      var bias = initialBias;
      var basic = input.lastIndexOf(delimiter);
      if (basic < 0) {
        basic = 0;
      }
      for (var j = 0; j < basic; ++j) {
        if (input.charCodeAt(j) >= 128) {
          error$12("not-basic");
        }
        output2.push(input.charCodeAt(j));
      }
      for (var index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
        var oldi = i2;
        for (var w2 = 1, k = base; ; k += base) {
          if (index >= inputLength) {
            error$12("invalid-input");
          }
          var digit = basicToDigit(input.charCodeAt(index++));
          if (digit >= base || digit > floor((maxInt - i2) / w2)) {
            error$12("overflow");
          }
          i2 += digit * w2;
          var t2 = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (digit < t2) {
            break;
          }
          var baseMinusT = base - t2;
          if (w2 > floor(maxInt / baseMinusT)) {
            error$12("overflow");
          }
          w2 *= baseMinusT;
        }
        var out2 = output2.length + 1;
        bias = adapt(i2 - oldi, out2, oldi == 0);
        if (floor(i2 / out2) > maxInt - n) {
          error$12("overflow");
        }
        n += floor(i2 / out2);
        i2 %= out2;
        output2.splice(i2++, 0, n);
      }
      return String.fromCodePoint.apply(String, output2);
    };
    var encode = function encode2(input) {
      var output2 = [];
      input = ucs2decode(input);
      var inputLength = input.length;
      var n = initialN;
      var delta = 0;
      var bias = initialBias;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = void 0;
      try {
        for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _currentValue2 = _step.value;
          if (_currentValue2 < 128) {
            output2.push(stringFromCharCode(_currentValue2));
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
      var basicLength = output2.length;
      var handledCPCount = basicLength;
      if (basicLength) {
        output2.push(delimiter);
      }
      while (handledCPCount < inputLength) {
        var m2 = maxInt;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = void 0;
        try {
          for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var currentValue = _step2.value;
            if (currentValue >= n && currentValue < m2) {
              m2 = currentValue;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
        var handledCPCountPlusOne = handledCPCount + 1;
        if (m2 - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
          error$12("overflow");
        }
        delta += (m2 - n) * handledCPCountPlusOne;
        n = m2;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = void 0;
        try {
          for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _currentValue = _step3.value;
            if (_currentValue < n && ++delta > maxInt) {
              error$12("overflow");
            }
            if (_currentValue == n) {
              var q = delta;
              for (var k = base; ; k += base) {
                var t2 = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                if (q < t2) {
                  break;
                }
                var qMinusT = q - t2;
                var baseMinusT = base - t2;
                output2.push(stringFromCharCode(digitToBasic(t2 + qMinusT % baseMinusT, 0)));
                q = floor(qMinusT / baseMinusT);
              }
              output2.push(stringFromCharCode(digitToBasic(q, 0)));
              bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
              delta = 0;
              ++handledCPCount;
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
        ++delta;
        ++n;
      }
      return output2.join("");
    };
    var toUnicode = function toUnicode2(input) {
      return mapDomain(input, function(string) {
        return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
      });
    };
    var toASCII = function toASCII2(input) {
      return mapDomain(input, function(string) {
        return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
      });
    };
    var punycode = {
      "version": "2.1.0",
      "ucs2": {
        "decode": ucs2decode,
        "encode": ucs2encode
      },
      "decode": decode,
      "encode": encode,
      "toASCII": toASCII,
      "toUnicode": toUnicode
    };
    var SCHEMES = {};
    function pctEncChar(chr) {
      var c = chr.charCodeAt(0);
      var e = void 0;
      if (c < 16)
        e = "%0" + c.toString(16).toUpperCase();
      else if (c < 128)
        e = "%" + c.toString(16).toUpperCase();
      else if (c < 2048)
        e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
      else
        e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
      return e;
    }
    function pctDecChars(str2) {
      var newStr = "";
      var i2 = 0;
      var il = str2.length;
      while (i2 < il) {
        var c = parseInt(str2.substr(i2 + 1, 2), 16);
        if (c < 128) {
          newStr += String.fromCharCode(c);
          i2 += 3;
        } else if (c >= 194 && c < 224) {
          if (il - i2 >= 6) {
            var c2 = parseInt(str2.substr(i2 + 4, 2), 16);
            newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
          } else {
            newStr += str2.substr(i2, 6);
          }
          i2 += 6;
        } else if (c >= 224) {
          if (il - i2 >= 9) {
            var _c = parseInt(str2.substr(i2 + 4, 2), 16);
            var c3 = parseInt(str2.substr(i2 + 7, 2), 16);
            newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
          } else {
            newStr += str2.substr(i2, 9);
          }
          i2 += 9;
        } else {
          newStr += str2.substr(i2, 3);
          i2 += 3;
        }
      }
      return newStr;
    }
    function _normalizeComponentEncoding(components, protocol) {
      function decodeUnreserved2(str2) {
        var decStr = pctDecChars(str2);
        return !decStr.match(protocol.UNRESERVED) ? str2 : decStr;
      }
      if (components.scheme)
        components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved2).toLowerCase().replace(protocol.NOT_SCHEME, "");
      if (components.userinfo !== void 0)
        components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
      if (components.host !== void 0)
        components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved2).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
      if (components.path !== void 0)
        components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
      if (components.query !== void 0)
        components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
      if (components.fragment !== void 0)
        components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
      return components;
    }
    function _stripLeadingZeros(str2) {
      return str2.replace(/^0*(.*)/, "$1") || "0";
    }
    function _normalizeIPv4(host, protocol) {
      var matches = host.match(protocol.IPV4ADDRESS) || [];
      var _matches = slicedToArray(matches, 2), address = _matches[1];
      if (address) {
        return address.split(".").map(_stripLeadingZeros).join(".");
      } else {
        return host;
      }
    }
    function _normalizeIPv6(host, protocol) {
      var matches = host.match(protocol.IPV6ADDRESS) || [];
      var _matches2 = slicedToArray(matches, 3), address = _matches2[1], zone = _matches2[2];
      if (address) {
        var _address$toLowerCase$ = address.toLowerCase().split("::").reverse(), _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2), last = _address$toLowerCase$2[0], first = _address$toLowerCase$2[1];
        var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
        var lastFields = last.split(":").map(_stripLeadingZeros);
        var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
        var fieldCount = isLastFieldIPv4Address ? 7 : 8;
        var lastFieldsStart = lastFields.length - fieldCount;
        var fields = Array(fieldCount);
        for (var x = 0; x < fieldCount; ++x) {
          fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || "";
        }
        if (isLastFieldIPv4Address) {
          fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
        }
        var allZeroFields = fields.reduce(function(acc, field, index) {
          if (!field || field === "0") {
            var lastLongest = acc[acc.length - 1];
            if (lastLongest && lastLongest.index + lastLongest.length === index) {
              lastLongest.length++;
            } else {
              acc.push({ index, length: 1 });
            }
          }
          return acc;
        }, []);
        var longestZeroFields = allZeroFields.sort(function(a, b) {
          return b.length - a.length;
        })[0];
        var newHost = void 0;
        if (longestZeroFields && longestZeroFields.length > 1) {
          var newFirst = fields.slice(0, longestZeroFields.index);
          var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
          newHost = newFirst.join(":") + "::" + newLast.join(":");
        } else {
          newHost = fields.join(":");
        }
        if (zone) {
          newHost += "%" + zone;
        }
        return newHost;
      } else {
        return host;
      }
    }
    var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
    var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === void 0;
    function parse2(uriString) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var components = {};
      var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
      if (options.reference === "suffix")
        uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
      var matches = uriString.match(URI_PARSE);
      if (matches) {
        if (NO_MATCH_IS_UNDEFINED) {
          components.scheme = matches[1];
          components.userinfo = matches[3];
          components.host = matches[4];
          components.port = parseInt(matches[5], 10);
          components.path = matches[6] || "";
          components.query = matches[7];
          components.fragment = matches[8];
          if (isNaN(components.port)) {
            components.port = matches[5];
          }
        } else {
          components.scheme = matches[1] || void 0;
          components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : void 0;
          components.host = uriString.indexOf("//") !== -1 ? matches[4] : void 0;
          components.port = parseInt(matches[5], 10);
          components.path = matches[6] || "";
          components.query = uriString.indexOf("?") !== -1 ? matches[7] : void 0;
          components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : void 0;
          if (isNaN(components.port)) {
            components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : void 0;
          }
        }
        if (components.host) {
          components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
        }
        if (components.scheme === void 0 && components.userinfo === void 0 && components.host === void 0 && components.port === void 0 && !components.path && components.query === void 0) {
          components.reference = "same-document";
        } else if (components.scheme === void 0) {
          components.reference = "relative";
        } else if (components.fragment === void 0) {
          components.reference = "absolute";
        } else {
          components.reference = "uri";
        }
        if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
          components.error = components.error || "URI is not a " + options.reference + " reference.";
        }
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
          if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
            try {
              components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
            } catch (e) {
              components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
            }
          }
          _normalizeComponentEncoding(components, URI_PROTOCOL);
        } else {
          _normalizeComponentEncoding(components, protocol);
        }
        if (schemeHandler && schemeHandler.parse) {
          schemeHandler.parse(components, options);
        }
      } else {
        components.error = components.error || "URI can not be parsed.";
      }
      return components;
    }
    function _recomposeAuthority(components, options) {
      var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
      var uriTokens = [];
      if (components.userinfo !== void 0) {
        uriTokens.push(components.userinfo);
        uriTokens.push("@");
      }
      if (components.host !== void 0) {
        uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function(_, $1, $2) {
          return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
        }));
      }
      if (typeof components.port === "number" || typeof components.port === "string") {
        uriTokens.push(":");
        uriTokens.push(String(components.port));
      }
      return uriTokens.length ? uriTokens.join("") : void 0;
    }
    var RDS1 = /^\.\.?\//;
    var RDS2 = /^\/\.(\/|$)/;
    var RDS3 = /^\/\.\.(\/|$)/;
    var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
    function removeDotSegments(input) {
      var output2 = [];
      while (input.length) {
        if (input.match(RDS1)) {
          input = input.replace(RDS1, "");
        } else if (input.match(RDS2)) {
          input = input.replace(RDS2, "/");
        } else if (input.match(RDS3)) {
          input = input.replace(RDS3, "/");
          output2.pop();
        } else if (input === "." || input === "..") {
          input = "";
        } else {
          var im = input.match(RDS5);
          if (im) {
            var s2 = im[0];
            input = input.slice(s2.length);
            output2.push(s2);
          } else {
            throw new Error("Unexpected dot segment condition");
          }
        }
      }
      return output2.join("");
    }
    function serialize(components) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
      var uriTokens = [];
      var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
      if (schemeHandler && schemeHandler.serialize)
        schemeHandler.serialize(components, options);
      if (components.host) {
        if (protocol.IPV6ADDRESS.test(components.host))
          ;
        else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
          try {
            components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
          } catch (e) {
            components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
          }
        }
      }
      _normalizeComponentEncoding(components, protocol);
      if (options.reference !== "suffix" && components.scheme) {
        uriTokens.push(components.scheme);
        uriTokens.push(":");
      }
      var authority = _recomposeAuthority(components, options);
      if (authority !== void 0) {
        if (options.reference !== "suffix") {
          uriTokens.push("//");
        }
        uriTokens.push(authority);
        if (components.path && components.path.charAt(0) !== "/") {
          uriTokens.push("/");
        }
      }
      if (components.path !== void 0) {
        var s2 = components.path;
        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
          s2 = removeDotSegments(s2);
        }
        if (authority === void 0) {
          s2 = s2.replace(/^\/\//, "/%2F");
        }
        uriTokens.push(s2);
      }
      if (components.query !== void 0) {
        uriTokens.push("?");
        uriTokens.push(components.query);
      }
      if (components.fragment !== void 0) {
        uriTokens.push("#");
        uriTokens.push(components.fragment);
      }
      return uriTokens.join("");
    }
    function resolveComponents(base2, relative) {
      var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var skipNormalization = arguments[3];
      var target = {};
      if (!skipNormalization) {
        base2 = parse2(serialize(base2, options), options);
        relative = parse2(serialize(relative, options), options);
      }
      options = options || {};
      if (!options.tolerant && relative.scheme) {
        target.scheme = relative.scheme;
        target.userinfo = relative.userinfo;
        target.host = relative.host;
        target.port = relative.port;
        target.path = removeDotSegments(relative.path || "");
        target.query = relative.query;
      } else {
        if (relative.userinfo !== void 0 || relative.host !== void 0 || relative.port !== void 0) {
          target.userinfo = relative.userinfo;
          target.host = relative.host;
          target.port = relative.port;
          target.path = removeDotSegments(relative.path || "");
          target.query = relative.query;
        } else {
          if (!relative.path) {
            target.path = base2.path;
            if (relative.query !== void 0) {
              target.query = relative.query;
            } else {
              target.query = base2.query;
            }
          } else {
            if (relative.path.charAt(0) === "/") {
              target.path = removeDotSegments(relative.path);
            } else {
              if ((base2.userinfo !== void 0 || base2.host !== void 0 || base2.port !== void 0) && !base2.path) {
                target.path = "/" + relative.path;
              } else if (!base2.path) {
                target.path = relative.path;
              } else {
                target.path = base2.path.slice(0, base2.path.lastIndexOf("/") + 1) + relative.path;
              }
              target.path = removeDotSegments(target.path);
            }
            target.query = relative.query;
          }
          target.userinfo = base2.userinfo;
          target.host = base2.host;
          target.port = base2.port;
        }
        target.scheme = base2.scheme;
      }
      target.fragment = relative.fragment;
      return target;
    }
    function resolve2(baseURI, relativeURI, options) {
      var schemelessOptions = assign({ scheme: "null" }, options);
      return serialize(resolveComponents(parse2(baseURI, schemelessOptions), parse2(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
    }
    function normalize(uri, options) {
      if (typeof uri === "string") {
        uri = serialize(parse2(uri, options), options);
      } else if (typeOf(uri) === "object") {
        uri = parse2(serialize(uri, options), options);
      }
      return uri;
    }
    function equal3(uriA, uriB, options) {
      if (typeof uriA === "string") {
        uriA = serialize(parse2(uriA, options), options);
      } else if (typeOf(uriA) === "object") {
        uriA = serialize(uriA, options);
      }
      if (typeof uriB === "string") {
        uriB = serialize(parse2(uriB, options), options);
      } else if (typeOf(uriB) === "object") {
        uriB = serialize(uriB, options);
      }
      return uriA === uriB;
    }
    function escapeComponent(str2, options) {
      return str2 && str2.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
    }
    function unescapeComponent(str2, options) {
      return str2 && str2.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
    }
    var handler = {
      scheme: "http",
      domainHost: true,
      parse: function parse3(components, options) {
        if (!components.host) {
          components.error = components.error || "HTTP URIs must have a host.";
        }
        return components;
      },
      serialize: function serialize2(components, options) {
        var secure = String(components.scheme).toLowerCase() === "https";
        if (components.port === (secure ? 443 : 80) || components.port === "") {
          components.port = void 0;
        }
        if (!components.path) {
          components.path = "/";
        }
        return components;
      }
    };
    var handler$1 = {
      scheme: "https",
      domainHost: handler.domainHost,
      parse: handler.parse,
      serialize: handler.serialize
    };
    function isSecure(wsComponents) {
      return typeof wsComponents.secure === "boolean" ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
    }
    var handler$2 = {
      scheme: "ws",
      domainHost: true,
      parse: function parse3(components, options) {
        var wsComponents = components;
        wsComponents.secure = isSecure(wsComponents);
        wsComponents.resourceName = (wsComponents.path || "/") + (wsComponents.query ? "?" + wsComponents.query : "");
        wsComponents.path = void 0;
        wsComponents.query = void 0;
        return wsComponents;
      },
      serialize: function serialize2(wsComponents, options) {
        if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
          wsComponents.port = void 0;
        }
        if (typeof wsComponents.secure === "boolean") {
          wsComponents.scheme = wsComponents.secure ? "wss" : "ws";
          wsComponents.secure = void 0;
        }
        if (wsComponents.resourceName) {
          var _wsComponents$resourc = wsComponents.resourceName.split("?"), _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2), path2 = _wsComponents$resourc2[0], query = _wsComponents$resourc2[1];
          wsComponents.path = path2 && path2 !== "/" ? path2 : void 0;
          wsComponents.query = query;
          wsComponents.resourceName = void 0;
        }
        wsComponents.fragment = void 0;
        return wsComponents;
      }
    };
    var handler$3 = {
      scheme: "wss",
      domainHost: handler$2.domainHost,
      parse: handler$2.parse,
      serialize: handler$2.serialize
    };
    var O = {};
    var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]";
    var HEXDIG$$ = "[0-9A-Fa-f]";
    var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$));
    var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
    var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
    var VCHAR$$ = merge2(QTEXT$$, '[\\"\\\\]');
    var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
    var UNRESERVED = new RegExp(UNRESERVED$$, "g");
    var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
    var NOT_LOCAL_PART = new RegExp(merge2("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
    var NOT_HFNAME = new RegExp(merge2("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
    var NOT_HFVALUE = NOT_HFNAME;
    function decodeUnreserved(str2) {
      var decStr = pctDecChars(str2);
      return !decStr.match(UNRESERVED) ? str2 : decStr;
    }
    var handler$4 = {
      scheme: "mailto",
      parse: function parse$$1(components, options) {
        var mailtoComponents = components;
        var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
        mailtoComponents.path = void 0;
        if (mailtoComponents.query) {
          var unknownHeaders = false;
          var headers = {};
          var hfields = mailtoComponents.query.split("&");
          for (var x = 0, xl = hfields.length; x < xl; ++x) {
            var hfield = hfields[x].split("=");
            switch (hfield[0]) {
              case "to":
                var toAddrs = hfield[1].split(",");
                for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                  to.push(toAddrs[_x]);
                }
                break;
              case "subject":
                mailtoComponents.subject = unescapeComponent(hfield[1], options);
                break;
              case "body":
                mailtoComponents.body = unescapeComponent(hfield[1], options);
                break;
              default:
                unknownHeaders = true;
                headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                break;
            }
          }
          if (unknownHeaders)
            mailtoComponents.headers = headers;
        }
        mailtoComponents.query = void 0;
        for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
          var addr = to[_x2].split("@");
          addr[0] = unescapeComponent(addr[0]);
          if (!options.unicodeSupport) {
            try {
              addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
            } catch (e) {
              mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
            }
          } else {
            addr[1] = unescapeComponent(addr[1], options).toLowerCase();
          }
          to[_x2] = addr.join("@");
        }
        return mailtoComponents;
      },
      serialize: function serialize$$1(mailtoComponents, options) {
        var components = mailtoComponents;
        var to = toArray2(mailtoComponents.to);
        if (to) {
          for (var x = 0, xl = to.length; x < xl; ++x) {
            var toAddr = String(to[x]);
            var atIdx = toAddr.lastIndexOf("@");
            var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
            var domain = toAddr.slice(atIdx + 1);
            try {
              domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
            } catch (e) {
              components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
            }
            to[x] = localPart + "@" + domain;
          }
          components.path = to.join(",");
        }
        var headers = mailtoComponents.headers = mailtoComponents.headers || {};
        if (mailtoComponents.subject)
          headers["subject"] = mailtoComponents.subject;
        if (mailtoComponents.body)
          headers["body"] = mailtoComponents.body;
        var fields = [];
        for (var name in headers) {
          if (headers[name] !== O[name]) {
            fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
          }
        }
        if (fields.length) {
          components.query = fields.join("&");
        }
        return components;
      }
    };
    var URN_PARSE = /^([^\:]+)\:(.*)/;
    var handler$5 = {
      scheme: "urn",
      parse: function parse$$1(components, options) {
        var matches = components.path && components.path.match(URN_PARSE);
        var urnComponents = components;
        if (matches) {
          var scheme = options.scheme || urnComponents.scheme || "urn";
          var nid = matches[1].toLowerCase();
          var nss = matches[2];
          var urnScheme = scheme + ":" + (options.nid || nid);
          var schemeHandler = SCHEMES[urnScheme];
          urnComponents.nid = nid;
          urnComponents.nss = nss;
          urnComponents.path = void 0;
          if (schemeHandler) {
            urnComponents = schemeHandler.parse(urnComponents, options);
          }
        } else {
          urnComponents.error = urnComponents.error || "URN can not be parsed.";
        }
        return urnComponents;
      },
      serialize: function serialize$$1(urnComponents, options) {
        var scheme = options.scheme || urnComponents.scheme || "urn";
        var nid = urnComponents.nid;
        var urnScheme = scheme + ":" + (options.nid || nid);
        var schemeHandler = SCHEMES[urnScheme];
        if (schemeHandler) {
          urnComponents = schemeHandler.serialize(urnComponents, options);
        }
        var uriComponents = urnComponents;
        var nss = urnComponents.nss;
        uriComponents.path = (nid || options.nid) + ":" + nss;
        return uriComponents;
      }
    };
    var UUID2 = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
    var handler$6 = {
      scheme: "urn:uuid",
      parse: function parse3(urnComponents, options) {
        var uuidComponents = urnComponents;
        uuidComponents.uuid = uuidComponents.nss;
        uuidComponents.nss = void 0;
        if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID2))) {
          uuidComponents.error = uuidComponents.error || "UUID is not valid.";
        }
        return uuidComponents;
      },
      serialize: function serialize2(uuidComponents, options) {
        var urnComponents = uuidComponents;
        urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
        return urnComponents;
      }
    };
    SCHEMES[handler.scheme] = handler;
    SCHEMES[handler$1.scheme] = handler$1;
    SCHEMES[handler$2.scheme] = handler$2;
    SCHEMES[handler$3.scheme] = handler$3;
    SCHEMES[handler$4.scheme] = handler$4;
    SCHEMES[handler$5.scheme] = handler$5;
    SCHEMES[handler$6.scheme] = handler$6;
    exports2.SCHEMES = SCHEMES;
    exports2.pctEncChar = pctEncChar;
    exports2.pctDecChars = pctDecChars;
    exports2.parse = parse2;
    exports2.removeDotSegments = removeDotSegments;
    exports2.serialize = serialize;
    exports2.resolveComponents = resolveComponents;
    exports2.resolve = resolve2;
    exports2.normalize = normalize;
    exports2.equal = equal3;
    exports2.escapeComponent = escapeComponent;
    exports2.unescapeComponent = unescapeComponent;
    Object.defineProperty(exports2, "__esModule", { value: true });
  });
})(uri_all, uri_all.exports);
Object.defineProperty(resolve$1, "__esModule", { value: true });
resolve$1.getSchemaRefs = resolve$1.resolveUrl = resolve$1.normalizeId = resolve$1._getFullPath = resolve$1.getFullPath = resolve$1.inlineRef = void 0;
const util_1$l = util;
const equal$2 = fastDeepEqual;
const traverse = jsonSchemaTraverse.exports;
const URI$1 = uri_all.exports;
const SIMPLE_INLINED = new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function inlineRef(schema2, limit2 = true) {
  if (typeof schema2 == "boolean")
    return true;
  if (limit2 === true)
    return !hasRef(schema2);
  if (!limit2)
    return false;
  return countKeys(schema2) <= limit2;
}
resolve$1.inlineRef = inlineRef;
const REF_KEYWORDS = new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function hasRef(schema2) {
  for (const key in schema2) {
    if (REF_KEYWORDS.has(key))
      return true;
    const sch = schema2[key];
    if (Array.isArray(sch) && sch.some(hasRef))
      return true;
    if (typeof sch == "object" && hasRef(sch))
      return true;
  }
  return false;
}
function countKeys(schema2) {
  let count = 0;
  for (const key in schema2) {
    if (key === "$ref")
      return Infinity;
    count++;
    if (SIMPLE_INLINED.has(key))
      continue;
    if (typeof schema2[key] == "object") {
      util_1$l.eachItem(schema2[key], (sch) => count += countKeys(sch));
    }
    if (count === Infinity)
      return Infinity;
  }
  return count;
}
function getFullPath(id2 = "", normalize) {
  if (normalize !== false)
    id2 = normalizeId(id2);
  const p = URI$1.parse(id2);
  return _getFullPath(p);
}
resolve$1.getFullPath = getFullPath;
function _getFullPath(p) {
  return URI$1.serialize(p).split("#")[0] + "#";
}
resolve$1._getFullPath = _getFullPath;
const TRAILING_SLASH_HASH = /#\/?$/;
function normalizeId(id2) {
  return id2 ? id2.replace(TRAILING_SLASH_HASH, "") : "";
}
resolve$1.normalizeId = normalizeId;
function resolveUrl(baseId, id2) {
  id2 = normalizeId(id2);
  return URI$1.resolve(baseId, id2);
}
resolve$1.resolveUrl = resolveUrl;
const ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
function getSchemaRefs(schema2) {
  if (typeof schema2 == "boolean")
    return {};
  const { schemaId } = this.opts;
  const schId = normalizeId(schema2[schemaId]);
  const baseIds = { "": schId };
  const pathPrefix = getFullPath(schId, false);
  const localRefs = {};
  const schemaRefs = new Set();
  traverse(schema2, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
    if (parentJsonPtr === void 0)
      return;
    const fullPath = pathPrefix + jsonPtr;
    let baseId = baseIds[parentJsonPtr];
    if (typeof sch[schemaId] == "string")
      baseId = addRef.call(this, sch[schemaId]);
    addAnchor.call(this, sch.$anchor);
    addAnchor.call(this, sch.$dynamicAnchor);
    baseIds[jsonPtr] = baseId;
    function addRef(ref2) {
      ref2 = normalizeId(baseId ? URI$1.resolve(baseId, ref2) : ref2);
      if (schemaRefs.has(ref2))
        throw ambiguos(ref2);
      schemaRefs.add(ref2);
      let schOrRef = this.refs[ref2];
      if (typeof schOrRef == "string")
        schOrRef = this.refs[schOrRef];
      if (typeof schOrRef == "object") {
        checkAmbiguosRef(sch, schOrRef.schema, ref2);
      } else if (ref2 !== normalizeId(fullPath)) {
        if (ref2[0] === "#") {
          checkAmbiguosRef(sch, localRefs[ref2], ref2);
          localRefs[ref2] = sch;
        } else {
          this.refs[ref2] = fullPath;
        }
      }
      return ref2;
    }
    function addAnchor(anchor) {
      if (typeof anchor == "string") {
        if (!ANCHOR.test(anchor))
          throw new Error(`invalid anchor "${anchor}"`);
        addRef.call(this, `#${anchor}`);
      }
    }
  });
  return localRefs;
  function checkAmbiguosRef(sch1, sch2, ref2) {
    if (sch2 !== void 0 && !equal$2(sch1, sch2))
      throw ambiguos(ref2);
  }
  function ambiguos(ref2) {
    return new Error(`reference "${ref2}" resolves to more than one schema`);
  }
}
resolve$1.getSchemaRefs = getSchemaRefs;
Object.defineProperty(validate, "__esModule", { value: true });
validate.getData = validate.KeywordCxt = validate.validateFunctionCode = void 0;
const boolSchema_1 = boolSchema;
const dataType_1$1 = dataType;
const applicability_1 = applicability;
const dataType_2 = dataType;
const defaults_1 = defaults;
const keyword_1 = keyword;
const subschema_1 = subschema;
const codegen_1$n = codegen;
const names_1$3 = names$1;
const resolve_1$2 = resolve$1;
const util_1$k = util;
const errors_1 = errors;
function validateFunctionCode(it) {
  if (isSchemaObj(it)) {
    checkKeywords(it);
    if (schemaCxtHasRules(it)) {
      topSchemaObjCode(it);
      return;
    }
  }
  validateFunction(it, () => boolSchema_1.topBoolOrEmptySchema(it));
}
validate.validateFunctionCode = validateFunctionCode;
function validateFunction({ gen, validateName, schema: schema2, schemaEnv, opts: opts2 }, body) {
  if (opts2.code.es5) {
    gen.func(validateName, codegen_1$n._`${names_1$3.default.data}, ${names_1$3.default.valCxt}`, schemaEnv.$async, () => {
      gen.code(codegen_1$n._`"use strict"; ${funcSourceUrl(schema2, opts2)}`);
      destructureValCxtES5(gen, opts2);
      gen.code(body);
    });
  } else {
    gen.func(validateName, codegen_1$n._`${names_1$3.default.data}, ${destructureValCxt(opts2)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema2, opts2)).code(body));
  }
}
function destructureValCxt(opts2) {
  return codegen_1$n._`{${names_1$3.default.instancePath}="", ${names_1$3.default.parentData}, ${names_1$3.default.parentDataProperty}, ${names_1$3.default.rootData}=${names_1$3.default.data}${opts2.dynamicRef ? codegen_1$n._`, ${names_1$3.default.dynamicAnchors}={}` : codegen_1$n.nil}}={}`;
}
function destructureValCxtES5(gen, opts2) {
  gen.if(names_1$3.default.valCxt, () => {
    gen.var(names_1$3.default.instancePath, codegen_1$n._`${names_1$3.default.valCxt}.${names_1$3.default.instancePath}`);
    gen.var(names_1$3.default.parentData, codegen_1$n._`${names_1$3.default.valCxt}.${names_1$3.default.parentData}`);
    gen.var(names_1$3.default.parentDataProperty, codegen_1$n._`${names_1$3.default.valCxt}.${names_1$3.default.parentDataProperty}`);
    gen.var(names_1$3.default.rootData, codegen_1$n._`${names_1$3.default.valCxt}.${names_1$3.default.rootData}`);
    if (opts2.dynamicRef)
      gen.var(names_1$3.default.dynamicAnchors, codegen_1$n._`${names_1$3.default.valCxt}.${names_1$3.default.dynamicAnchors}`);
  }, () => {
    gen.var(names_1$3.default.instancePath, codegen_1$n._`""`);
    gen.var(names_1$3.default.parentData, codegen_1$n._`undefined`);
    gen.var(names_1$3.default.parentDataProperty, codegen_1$n._`undefined`);
    gen.var(names_1$3.default.rootData, names_1$3.default.data);
    if (opts2.dynamicRef)
      gen.var(names_1$3.default.dynamicAnchors, codegen_1$n._`{}`);
  });
}
function topSchemaObjCode(it) {
  const { schema: schema2, opts: opts2, gen } = it;
  validateFunction(it, () => {
    if (opts2.$comment && schema2.$comment)
      commentKeyword(it);
    checkNoDefault(it);
    gen.let(names_1$3.default.vErrors, null);
    gen.let(names_1$3.default.errors, 0);
    if (opts2.unevaluated)
      resetEvaluated(it);
    typeAndKeywords(it);
    returnResults(it);
  });
  return;
}
function resetEvaluated(it) {
  const { gen, validateName } = it;
  it.evaluated = gen.const("evaluated", codegen_1$n._`${validateName}.evaluated`);
  gen.if(codegen_1$n._`${it.evaluated}.dynamicProps`, () => gen.assign(codegen_1$n._`${it.evaluated}.props`, codegen_1$n._`undefined`));
  gen.if(codegen_1$n._`${it.evaluated}.dynamicItems`, () => gen.assign(codegen_1$n._`${it.evaluated}.items`, codegen_1$n._`undefined`));
}
function funcSourceUrl(schema2, opts2) {
  const schId = typeof schema2 == "object" && schema2[opts2.schemaId];
  return schId && (opts2.code.source || opts2.code.process) ? codegen_1$n._`/*# sourceURL=${schId} */` : codegen_1$n.nil;
}
function subschemaCode(it, valid2) {
  if (isSchemaObj(it)) {
    checkKeywords(it);
    if (schemaCxtHasRules(it)) {
      subSchemaObjCode(it, valid2);
      return;
    }
  }
  boolSchema_1.boolOrEmptySchema(it, valid2);
}
function schemaCxtHasRules({ schema: schema2, self: self2 }) {
  if (typeof schema2 == "boolean")
    return !schema2;
  for (const key in schema2)
    if (self2.RULES.all[key])
      return true;
  return false;
}
function isSchemaObj(it) {
  return typeof it.schema != "boolean";
}
function subSchemaObjCode(it, valid2) {
  const { schema: schema2, gen, opts: opts2 } = it;
  if (opts2.$comment && schema2.$comment)
    commentKeyword(it);
  updateContext(it);
  checkAsyncSchema(it);
  const errsCount = gen.const("_errs", names_1$3.default.errors);
  typeAndKeywords(it, errsCount);
  gen.var(valid2, codegen_1$n._`${errsCount} === ${names_1$3.default.errors}`);
}
function checkKeywords(it) {
  util_1$k.checkUnknownRules(it);
  checkRefsAndKeywords(it);
}
function typeAndKeywords(it, errsCount) {
  if (it.opts.jtd)
    return schemaKeywords(it, [], false, errsCount);
  const types2 = dataType_1$1.getSchemaTypes(it.schema);
  const checkedTypes = dataType_1$1.coerceAndCheckDataType(it, types2);
  schemaKeywords(it, types2, !checkedTypes, errsCount);
}
function checkRefsAndKeywords(it) {
  const { schema: schema2, errSchemaPath, opts: opts2, self: self2 } = it;
  if (schema2.$ref && opts2.ignoreKeywordsWithRef && util_1$k.schemaHasRulesButRef(schema2, self2.RULES)) {
    self2.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
  }
}
function checkNoDefault(it) {
  const { schema: schema2, opts: opts2 } = it;
  if (schema2.default !== void 0 && opts2.useDefaults && opts2.strictSchema) {
    util_1$k.checkStrictMode(it, "default is ignored in the schema root");
  }
}
function updateContext(it) {
  const schId = it.schema[it.opts.schemaId];
  if (schId)
    it.baseId = resolve_1$2.resolveUrl(it.baseId, schId);
}
function checkAsyncSchema(it) {
  if (it.schema.$async && !it.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function commentKeyword({ gen, schemaEnv, schema: schema2, errSchemaPath, opts: opts2 }) {
  const msg = schema2.$comment;
  if (opts2.$comment === true) {
    gen.code(codegen_1$n._`${names_1$3.default.self}.logger.log(${msg})`);
  } else if (typeof opts2.$comment == "function") {
    const schemaPath = codegen_1$n.str`${errSchemaPath}/$comment`;
    const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
    gen.code(codegen_1$n._`${names_1$3.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
  }
}
function returnResults(it) {
  const { gen, schemaEnv, validateName, ValidationError: ValidationError2, opts: opts2 } = it;
  if (schemaEnv.$async) {
    gen.if(codegen_1$n._`${names_1$3.default.errors} === 0`, () => gen.return(names_1$3.default.data), () => gen.throw(codegen_1$n._`new ${ValidationError2}(${names_1$3.default.vErrors})`));
  } else {
    gen.assign(codegen_1$n._`${validateName}.errors`, names_1$3.default.vErrors);
    if (opts2.unevaluated)
      assignEvaluated(it);
    gen.return(codegen_1$n._`${names_1$3.default.errors} === 0`);
  }
}
function assignEvaluated({ gen, evaluated, props, items: items2 }) {
  if (props instanceof codegen_1$n.Name)
    gen.assign(codegen_1$n._`${evaluated}.props`, props);
  if (items2 instanceof codegen_1$n.Name)
    gen.assign(codegen_1$n._`${evaluated}.items`, items2);
}
function schemaKeywords(it, types2, typeErrors, errsCount) {
  const { gen, schema: schema2, data, allErrors, opts: opts2, self: self2 } = it;
  const { RULES } = self2;
  if (schema2.$ref && (opts2.ignoreKeywordsWithRef || !util_1$k.schemaHasRulesButRef(schema2, RULES))) {
    gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition));
    return;
  }
  if (!opts2.jtd)
    checkStrictTypes(it, types2);
  gen.block(() => {
    for (const group of RULES.rules)
      groupKeywords(group);
    groupKeywords(RULES.post);
  });
  function groupKeywords(group) {
    if (!applicability_1.shouldUseGroup(schema2, group))
      return;
    if (group.type) {
      gen.if(dataType_2.checkDataType(group.type, data, opts2.strictNumbers));
      iterateKeywords(it, group);
      if (types2.length === 1 && types2[0] === group.type && typeErrors) {
        gen.else();
        dataType_2.reportTypeError(it);
      }
      gen.endIf();
    } else {
      iterateKeywords(it, group);
    }
    if (!allErrors)
      gen.if(codegen_1$n._`${names_1$3.default.errors} === ${errsCount || 0}`);
  }
}
function iterateKeywords(it, group) {
  const { gen, schema: schema2, opts: { useDefaults } } = it;
  if (useDefaults)
    defaults_1.assignDefaults(it, group.type);
  gen.block(() => {
    for (const rule of group.rules) {
      if (applicability_1.shouldUseRule(schema2, rule)) {
        keywordCode(it, rule.keyword, rule.definition, group.type);
      }
    }
  });
}
function checkStrictTypes(it, types2) {
  if (it.schemaEnv.meta || !it.opts.strictTypes)
    return;
  checkContextTypes(it, types2);
  if (!it.opts.allowUnionTypes)
    checkMultipleTypes(it, types2);
  checkKeywordTypes(it, it.dataTypes);
}
function checkContextTypes(it, types2) {
  if (!types2.length)
    return;
  if (!it.dataTypes.length) {
    it.dataTypes = types2;
    return;
  }
  types2.forEach((t2) => {
    if (!includesType(it.dataTypes, t2)) {
      strictTypesError(it, `type "${t2}" not allowed by context "${it.dataTypes.join(",")}"`);
    }
  });
  it.dataTypes = it.dataTypes.filter((t2) => includesType(types2, t2));
}
function checkMultipleTypes(it, ts) {
  if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
    strictTypesError(it, "use allowUnionTypes to allow union type keyword");
  }
}
function checkKeywordTypes(it, ts) {
  const rules2 = it.self.RULES.all;
  for (const keyword2 in rules2) {
    const rule = rules2[keyword2];
    if (typeof rule == "object" && applicability_1.shouldUseRule(it.schema, rule)) {
      const { type: type2 } = rule.definition;
      if (type2.length && !type2.some((t2) => hasApplicableType(ts, t2))) {
        strictTypesError(it, `missing type "${type2.join(",")}" for keyword "${keyword2}"`);
      }
    }
  }
}
function hasApplicableType(schTs, kwdT) {
  return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
}
function includesType(ts, t2) {
  return ts.includes(t2) || t2 === "integer" && ts.includes("number");
}
function strictTypesError(it, msg) {
  const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
  msg += ` at "${schemaPath}" (strictTypes)`;
  util_1$k.checkStrictMode(it, msg, it.opts.strictTypes);
}
class KeywordCxt {
  constructor(it, def2, keyword2) {
    keyword_1.validateKeywordUsage(it, def2, keyword2);
    this.gen = it.gen;
    this.allErrors = it.allErrors;
    this.keyword = keyword2;
    this.data = it.data;
    this.schema = it.schema[keyword2];
    this.$data = def2.$data && it.opts.$data && this.schema && this.schema.$data;
    this.schemaValue = util_1$k.schemaRefOrVal(it, this.schema, keyword2, this.$data);
    this.schemaType = def2.schemaType;
    this.parentSchema = it.schema;
    this.params = {};
    this.it = it;
    this.def = def2;
    if (this.$data) {
      this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
    } else {
      this.schemaCode = this.schemaValue;
      if (!keyword_1.validSchemaType(this.schema, def2.schemaType, def2.allowUndefined)) {
        throw new Error(`${keyword2} value must be ${JSON.stringify(def2.schemaType)}`);
      }
    }
    if ("code" in def2 ? def2.trackErrors : def2.errors !== false) {
      this.errsCount = it.gen.const("_errs", names_1$3.default.errors);
    }
  }
  result(condition, successAction, failAction) {
    this.failResult(codegen_1$n.not(condition), successAction, failAction);
  }
  failResult(condition, successAction, failAction) {
    this.gen.if(condition);
    if (failAction)
      failAction();
    else
      this.error();
    if (successAction) {
      this.gen.else();
      successAction();
      if (this.allErrors)
        this.gen.endIf();
    } else {
      if (this.allErrors)
        this.gen.endIf();
      else
        this.gen.else();
    }
  }
  pass(condition, failAction) {
    this.failResult(codegen_1$n.not(condition), void 0, failAction);
  }
  fail(condition) {
    if (condition === void 0) {
      this.error();
      if (!this.allErrors)
        this.gen.if(false);
      return;
    }
    this.gen.if(condition);
    this.error();
    if (this.allErrors)
      this.gen.endIf();
    else
      this.gen.else();
  }
  fail$data(condition) {
    if (!this.$data)
      return this.fail(condition);
    const { schemaCode } = this;
    this.fail(codegen_1$n._`${schemaCode} !== undefined && (${codegen_1$n.or(this.invalid$data(), condition)})`);
  }
  error(append, errorParams, errorPaths) {
    if (errorParams) {
      this.setParams(errorParams);
      this._error(append, errorPaths);
      this.setParams({});
      return;
    }
    this._error(append, errorPaths);
  }
  _error(append, errorPaths) {
    (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
  }
  $dataError() {
    errors_1.reportError(this, this.def.$dataError || errors_1.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    errors_1.resetErrorsCount(this.gen, this.errsCount);
  }
  ok(cond) {
    if (!this.allErrors)
      this.gen.if(cond);
  }
  setParams(obj, assign) {
    if (assign)
      Object.assign(this.params, obj);
    else
      this.params = obj;
  }
  block$data(valid2, codeBlock, $dataValid = codegen_1$n.nil) {
    this.gen.block(() => {
      this.check$data(valid2, $dataValid);
      codeBlock();
    });
  }
  check$data(valid2 = codegen_1$n.nil, $dataValid = codegen_1$n.nil) {
    if (!this.$data)
      return;
    const { gen, schemaCode, schemaType, def: def2 } = this;
    gen.if(codegen_1$n.or(codegen_1$n._`${schemaCode} === undefined`, $dataValid));
    if (valid2 !== codegen_1$n.nil)
      gen.assign(valid2, true);
    if (schemaType.length || def2.validateSchema) {
      gen.elseIf(this.invalid$data());
      this.$dataError();
      if (valid2 !== codegen_1$n.nil)
        gen.assign(valid2, false);
    }
    gen.else();
  }
  invalid$data() {
    const { gen, schemaCode, schemaType, def: def2, it } = this;
    return codegen_1$n.or(wrong$DataType(), invalid$DataSchema());
    function wrong$DataType() {
      if (schemaType.length) {
        if (!(schemaCode instanceof codegen_1$n.Name))
          throw new Error("ajv implementation error");
        const st = Array.isArray(schemaType) ? schemaType : [schemaType];
        return codegen_1$n._`${dataType_2.checkDataTypes(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
      }
      return codegen_1$n.nil;
    }
    function invalid$DataSchema() {
      if (def2.validateSchema) {
        const validateSchemaRef = gen.scopeValue("validate$data", { ref: def2.validateSchema });
        return codegen_1$n._`!${validateSchemaRef}(${schemaCode})`;
      }
      return codegen_1$n.nil;
    }
  }
  subschema(appl, valid2) {
    const subschema2 = subschema_1.getSubschema(this.it, appl);
    subschema_1.extendSubschemaData(subschema2, this.it, appl);
    subschema_1.extendSubschemaMode(subschema2, appl);
    const nextContext = __spreadProps(__spreadValues(__spreadValues({}, this.it), subschema2), { items: void 0, props: void 0 });
    subschemaCode(nextContext, valid2);
    return nextContext;
  }
  mergeEvaluated(schemaCxt, toName) {
    const { it, gen } = this;
    if (!it.opts.unevaluated)
      return;
    if (it.props !== true && schemaCxt.props !== void 0) {
      it.props = util_1$k.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
    }
    if (it.items !== true && schemaCxt.items !== void 0) {
      it.items = util_1$k.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
    }
  }
  mergeValidEvaluated(schemaCxt, valid2) {
    const { it, gen } = this;
    if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
      gen.if(valid2, () => this.mergeEvaluated(schemaCxt, codegen_1$n.Name));
      return true;
    }
  }
}
validate.KeywordCxt = KeywordCxt;
function keywordCode(it, keyword2, def2, ruleType) {
  const cxt = new KeywordCxt(it, def2, keyword2);
  if ("code" in def2) {
    def2.code(cxt, ruleType);
  } else if (cxt.$data && def2.validate) {
    keyword_1.funcKeywordCode(cxt, def2);
  } else if ("macro" in def2) {
    keyword_1.macroKeywordCode(cxt, def2);
  } else if (def2.compile || def2.validate) {
    keyword_1.funcKeywordCode(cxt, def2);
  }
}
const JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
const RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function getData($data, { dataLevel, dataNames, dataPathArr }) {
  let jsonPointer;
  let data;
  if ($data === "")
    return names_1$3.default.rootData;
  if ($data[0] === "/") {
    if (!JSON_POINTER.test($data))
      throw new Error(`Invalid JSON-pointer: ${$data}`);
    jsonPointer = $data;
    data = names_1$3.default.rootData;
  } else {
    const matches = RELATIVE_JSON_POINTER.exec($data);
    if (!matches)
      throw new Error(`Invalid JSON-pointer: ${$data}`);
    const up = +matches[1];
    jsonPointer = matches[2];
    if (jsonPointer === "#") {
      if (up >= dataLevel)
        throw new Error(errorMsg("property/index", up));
      return dataPathArr[dataLevel - up];
    }
    if (up > dataLevel)
      throw new Error(errorMsg("data", up));
    data = dataNames[dataLevel - up];
    if (!jsonPointer)
      return data;
  }
  let expr = data;
  const segments = jsonPointer.split("/");
  for (const segment of segments) {
    if (segment) {
      data = codegen_1$n._`${data}${codegen_1$n.getProperty(util_1$k.unescapeJsonPointer(segment))}`;
      expr = codegen_1$n._`${expr} && ${data}`;
    }
  }
  return expr;
  function errorMsg(pointerType, up) {
    return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
  }
}
validate.getData = getData;
var validation_error = {};
Object.defineProperty(validation_error, "__esModule", { value: true });
class ValidationError extends Error {
  constructor(errors2) {
    super("validation failed");
    this.errors = errors2;
    this.ajv = this.validation = true;
  }
}
validation_error.default = ValidationError;
var ref_error = {};
Object.defineProperty(ref_error, "__esModule", { value: true });
const resolve_1$1 = resolve$1;
class MissingRefError extends Error {
  constructor(baseId, ref2, msg) {
    super(msg || `can't resolve reference ${ref2} from id ${baseId}`);
    this.missingRef = resolve_1$1.resolveUrl(baseId, ref2);
    this.missingSchema = resolve_1$1.normalizeId(resolve_1$1.getFullPath(this.missingRef));
  }
}
ref_error.default = MissingRefError;
var compile = {};
Object.defineProperty(compile, "__esModule", { value: true });
compile.resolveSchema = compile.getCompilingSchema = compile.resolveRef = compile.compileSchema = compile.SchemaEnv = void 0;
const codegen_1$m = codegen;
const validation_error_1 = validation_error;
const names_1$2 = names$1;
const resolve_1 = resolve$1;
const util_1$j = util;
const validate_1$1 = validate;
const URI = uri_all.exports;
class SchemaEnv {
  constructor(env2) {
    var _a;
    this.refs = {};
    this.dynamicAnchors = {};
    let schema2;
    if (typeof env2.schema == "object")
      schema2 = env2.schema;
    this.schema = env2.schema;
    this.schemaId = env2.schemaId;
    this.root = env2.root || this;
    this.baseId = (_a = env2.baseId) !== null && _a !== void 0 ? _a : resolve_1.normalizeId(schema2 === null || schema2 === void 0 ? void 0 : schema2[env2.schemaId || "$id"]);
    this.schemaPath = env2.schemaPath;
    this.localRefs = env2.localRefs;
    this.meta = env2.meta;
    this.$async = schema2 === null || schema2 === void 0 ? void 0 : schema2.$async;
    this.refs = {};
  }
}
compile.SchemaEnv = SchemaEnv;
function compileSchema(sch) {
  const _sch = getCompilingSchema.call(this, sch);
  if (_sch)
    return _sch;
  const rootId = resolve_1.getFullPath(sch.root.baseId);
  const { es5, lines } = this.opts.code;
  const { ownProperties } = this.opts;
  const gen = new codegen_1$m.CodeGen(this.scope, { es5, lines, ownProperties });
  let _ValidationError;
  if (sch.$async) {
    _ValidationError = gen.scopeValue("Error", {
      ref: validation_error_1.default,
      code: codegen_1$m._`require("ajv/dist/runtime/validation_error").default`
    });
  }
  const validateName = gen.scopeName("validate");
  sch.validateName = validateName;
  const schemaCxt = {
    gen,
    allErrors: this.opts.allErrors,
    data: names_1$2.default.data,
    parentData: names_1$2.default.parentData,
    parentDataProperty: names_1$2.default.parentDataProperty,
    dataNames: [names_1$2.default.data],
    dataPathArr: [codegen_1$m.nil],
    dataLevel: 0,
    dataTypes: [],
    definedProperties: new Set(),
    topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true ? { ref: sch.schema, code: codegen_1$m.stringify(sch.schema) } : { ref: sch.schema }),
    validateName,
    ValidationError: _ValidationError,
    schema: sch.schema,
    schemaEnv: sch,
    rootId,
    baseId: sch.baseId || rootId,
    schemaPath: codegen_1$m.nil,
    errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: codegen_1$m._`""`,
    opts: this.opts,
    self: this
  };
  let sourceCode;
  try {
    this._compilations.add(sch);
    validate_1$1.validateFunctionCode(schemaCxt);
    gen.optimize(this.opts.code.optimize);
    const validateCode = gen.toString();
    sourceCode = `${gen.scopeRefs(names_1$2.default.scope)}return ${validateCode}`;
    if (this.opts.code.process)
      sourceCode = this.opts.code.process(sourceCode, sch);
    const makeValidate = new Function(`${names_1$2.default.self}`, `${names_1$2.default.scope}`, sourceCode);
    const validate2 = makeValidate(this, this.scope.get());
    this.scope.value(validateName, { ref: validate2 });
    validate2.errors = null;
    validate2.schema = sch.schema;
    validate2.schemaEnv = sch;
    if (sch.$async)
      validate2.$async = true;
    if (this.opts.code.source === true) {
      validate2.source = { validateName, validateCode, scopeValues: gen._values };
    }
    if (this.opts.unevaluated) {
      const { props, items: items2 } = schemaCxt;
      validate2.evaluated = {
        props: props instanceof codegen_1$m.Name ? void 0 : props,
        items: items2 instanceof codegen_1$m.Name ? void 0 : items2,
        dynamicProps: props instanceof codegen_1$m.Name,
        dynamicItems: items2 instanceof codegen_1$m.Name
      };
      if (validate2.source)
        validate2.source.evaluated = codegen_1$m.stringify(validate2.evaluated);
    }
    sch.validate = validate2;
    return sch;
  } catch (e) {
    delete sch.validate;
    delete sch.validateName;
    if (sourceCode)
      this.logger.error("Error compiling schema, function code:", sourceCode);
    throw e;
  } finally {
    this._compilations.delete(sch);
  }
}
compile.compileSchema = compileSchema;
function resolveRef(root2, baseId, ref2) {
  var _a;
  ref2 = resolve_1.resolveUrl(baseId, ref2);
  const schOrFunc = root2.refs[ref2];
  if (schOrFunc)
    return schOrFunc;
  let _sch = resolve.call(this, root2, ref2);
  if (_sch === void 0) {
    const schema2 = (_a = root2.localRefs) === null || _a === void 0 ? void 0 : _a[ref2];
    const { schemaId } = this.opts;
    if (schema2)
      _sch = new SchemaEnv({ schema: schema2, schemaId, root: root2, baseId });
  }
  if (_sch === void 0)
    return;
  return root2.refs[ref2] = inlineOrCompile.call(this, _sch);
}
compile.resolveRef = resolveRef;
function inlineOrCompile(sch) {
  if (resolve_1.inlineRef(sch.schema, this.opts.inlineRefs))
    return sch.schema;
  return sch.validate ? sch : compileSchema.call(this, sch);
}
function getCompilingSchema(schEnv) {
  for (const sch of this._compilations) {
    if (sameSchemaEnv(sch, schEnv))
      return sch;
  }
}
compile.getCompilingSchema = getCompilingSchema;
function sameSchemaEnv(s1, s2) {
  return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
}
function resolve(root2, ref2) {
  let sch;
  while (typeof (sch = this.refs[ref2]) == "string")
    ref2 = sch;
  return sch || this.schemas[ref2] || resolveSchema.call(this, root2, ref2);
}
function resolveSchema(root2, ref2) {
  const p = URI.parse(ref2);
  const refPath = resolve_1._getFullPath(p);
  let baseId = resolve_1.getFullPath(root2.baseId);
  if (Object.keys(root2.schema).length > 0 && refPath === baseId) {
    return getJsonPointer.call(this, p, root2);
  }
  const id2 = resolve_1.normalizeId(refPath);
  const schOrRef = this.refs[id2] || this.schemas[id2];
  if (typeof schOrRef == "string") {
    const sch = resolveSchema.call(this, root2, schOrRef);
    if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
      return;
    return getJsonPointer.call(this, p, sch);
  }
  if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
    return;
  if (!schOrRef.validate)
    compileSchema.call(this, schOrRef);
  if (id2 === resolve_1.normalizeId(ref2)) {
    const { schema: schema2 } = schOrRef;
    const { schemaId } = this.opts;
    const schId = schema2[schemaId];
    if (schId)
      baseId = resolve_1.resolveUrl(baseId, schId);
    return new SchemaEnv({ schema: schema2, schemaId, root: root2, baseId });
  }
  return getJsonPointer.call(this, p, schOrRef);
}
compile.resolveSchema = resolveSchema;
const PREVENT_SCOPE_CHANGE = new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function getJsonPointer(parsedRef, { baseId, schema: schema2, root: root2 }) {
  var _a;
  if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
    return;
  for (const part of parsedRef.fragment.slice(1).split("/")) {
    if (typeof schema2 == "boolean")
      return;
    schema2 = schema2[util_1$j.unescapeFragment(part)];
    if (schema2 === void 0)
      return;
    const schId = typeof schema2 == "object" && schema2[this.opts.schemaId];
    if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
      baseId = resolve_1.resolveUrl(baseId, schId);
    }
  }
  let env2;
  if (typeof schema2 != "boolean" && schema2.$ref && !util_1$j.schemaHasRulesButRef(schema2, this.RULES)) {
    const $ref = resolve_1.resolveUrl(baseId, schema2.$ref);
    env2 = resolveSchema.call(this, root2, $ref);
  }
  const { schemaId } = this.opts;
  env2 = env2 || new SchemaEnv({ schema: schema2, schemaId, root: root2, baseId });
  if (env2.schema !== env2.root.schema)
    return env2;
  return void 0;
}
const $id$1 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#";
const description = "Meta-schema for $data reference (JSON AnySchema extension proposal)";
const type$1 = "object";
const required$1 = [
  "$data"
];
const properties$2 = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
};
const additionalProperties$1 = false;
var require$$9 = {
  $id: $id$1,
  description,
  type: type$1,
  required: required$1,
  properties: properties$2,
  additionalProperties: additionalProperties$1
};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
  var validate_12 = validate;
  Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
    return validate_12.KeywordCxt;
  } });
  var codegen_12 = codegen;
  Object.defineProperty(exports, "_", { enumerable: true, get: function() {
    return codegen_12._;
  } });
  Object.defineProperty(exports, "str", { enumerable: true, get: function() {
    return codegen_12.str;
  } });
  Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
    return codegen_12.stringify;
  } });
  Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
    return codegen_12.nil;
  } });
  Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
    return codegen_12.Name;
  } });
  Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
    return codegen_12.CodeGen;
  } });
  const validation_error_12 = validation_error;
  const ref_error_12 = ref_error;
  const rules_1 = rules;
  const compile_12 = compile;
  const codegen_2 = codegen;
  const resolve_12 = resolve$1;
  const dataType_12 = dataType;
  const util_12 = util;
  const $dataRefSchema = require$$9;
  const META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
  const EXT_SCOPE_NAMES = new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]);
  const removedOptions = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  };
  const deprecatedOptions = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  };
  const MAX_EXPRESSION = 200;
  function requiredOptions(o) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const s2 = o.strict;
    const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
    const optimize = _optz === true || _optz === void 0 ? 1 : _optz || 0;
    return {
      strictSchema: (_c = (_b = o.strictSchema) !== null && _b !== void 0 ? _b : s2) !== null && _c !== void 0 ? _c : true,
      strictNumbers: (_e = (_d = o.strictNumbers) !== null && _d !== void 0 ? _d : s2) !== null && _e !== void 0 ? _e : true,
      strictTypes: (_g = (_f = o.strictTypes) !== null && _f !== void 0 ? _f : s2) !== null && _g !== void 0 ? _g : "log",
      strictTuples: (_j = (_h = o.strictTuples) !== null && _h !== void 0 ? _h : s2) !== null && _j !== void 0 ? _j : "log",
      strictRequired: (_l = (_k = o.strictRequired) !== null && _k !== void 0 ? _k : s2) !== null && _l !== void 0 ? _l : false,
      code: o.code ? __spreadProps(__spreadValues({}, o.code), { optimize }) : { optimize },
      loopRequired: (_m = o.loopRequired) !== null && _m !== void 0 ? _m : MAX_EXPRESSION,
      loopEnum: (_o = o.loopEnum) !== null && _o !== void 0 ? _o : MAX_EXPRESSION,
      meta: (_p = o.meta) !== null && _p !== void 0 ? _p : true,
      messages: (_q = o.messages) !== null && _q !== void 0 ? _q : true,
      inlineRefs: (_r = o.inlineRefs) !== null && _r !== void 0 ? _r : true,
      schemaId: (_s = o.schemaId) !== null && _s !== void 0 ? _s : "$id",
      addUsedSchema: (_t = o.addUsedSchema) !== null && _t !== void 0 ? _t : true,
      validateSchema: (_u = o.validateSchema) !== null && _u !== void 0 ? _u : true,
      validateFormats: (_v = o.validateFormats) !== null && _v !== void 0 ? _v : true,
      unicodeRegExp: (_w = o.unicodeRegExp) !== null && _w !== void 0 ? _w : true,
      int32range: (_x = o.int32range) !== null && _x !== void 0 ? _x : true
    };
  }
  class Ajv {
    constructor(opts2 = {}) {
      this.schemas = {};
      this.refs = {};
      this.formats = {};
      this._compilations = new Set();
      this._loading = {};
      this._cache = new Map();
      opts2 = this.opts = __spreadValues(__spreadValues({}, opts2), requiredOptions(opts2));
      const { es5, lines } = this.opts.code;
      this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
      this.logger = getLogger(opts2.logger);
      const formatOpt = opts2.validateFormats;
      opts2.validateFormats = false;
      this.RULES = rules_1.getRules();
      checkOptions.call(this, removedOptions, opts2, "NOT SUPPORTED");
      checkOptions.call(this, deprecatedOptions, opts2, "DEPRECATED", "warn");
      this._metaOpts = getMetaSchemaOptions.call(this);
      if (opts2.formats)
        addInitialFormats.call(this);
      this._addVocabularies();
      this._addDefaultMetaSchema();
      if (opts2.keywords)
        addInitialKeywords.call(this, opts2.keywords);
      if (typeof opts2.meta == "object")
        this.addMetaSchema(opts2.meta);
      addInitialSchemas.call(this);
      opts2.validateFormats = formatOpt;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data, meta, schemaId } = this.opts;
      let _dataRefSchema = $dataRefSchema;
      if (schemaId === "id") {
        _dataRefSchema = __spreadValues({}, $dataRefSchema);
        _dataRefSchema.id = _dataRefSchema.$id;
        delete _dataRefSchema.$id;
      }
      if (meta && $data)
        this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
    }
    defaultMeta() {
      const { meta, schemaId } = this.opts;
      return this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : void 0;
    }
    validate(schemaKeyRef, data) {
      let v;
      if (typeof schemaKeyRef == "string") {
        v = this.getSchema(schemaKeyRef);
        if (!v)
          throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
      } else {
        v = this.compile(schemaKeyRef);
      }
      const valid2 = v(data);
      if (!("$async" in v))
        this.errors = v.errors;
      return valid2;
    }
    compile(schema2, _meta) {
      const sch = this._addSchema(schema2, _meta);
      return sch.validate || this._compileSchemaEnv(sch);
    }
    compileAsync(schema2, meta) {
      if (typeof this.opts.loadSchema != "function") {
        throw new Error("options.loadSchema should be a function");
      }
      const { loadSchema } = this.opts;
      return runCompileAsync.call(this, schema2, meta);
      async function runCompileAsync(_schema, _meta) {
        await loadMetaSchema.call(this, _schema.$schema);
        const sch = this._addSchema(_schema, _meta);
        return sch.validate || _compileAsync.call(this, sch);
      }
      async function loadMetaSchema($ref) {
        if ($ref && !this.getSchema($ref)) {
          await runCompileAsync.call(this, { $ref }, true);
        }
      }
      async function _compileAsync(sch) {
        try {
          return this._compileSchemaEnv(sch);
        } catch (e) {
          if (!(e instanceof ref_error_12.default))
            throw e;
          checkLoaded.call(this, e);
          await loadMissingSchema.call(this, e.missingSchema);
          return _compileAsync.call(this, sch);
        }
      }
      function checkLoaded({ missingSchema: ref2, missingRef }) {
        if (this.refs[ref2]) {
          throw new Error(`AnySchema ${ref2} is loaded but ${missingRef} cannot be resolved`);
        }
      }
      async function loadMissingSchema(ref2) {
        const _schema = await _loadSchema.call(this, ref2);
        if (!this.refs[ref2])
          await loadMetaSchema.call(this, _schema.$schema);
        if (!this.refs[ref2])
          this.addSchema(_schema, ref2, meta);
      }
      async function _loadSchema(ref2) {
        const p = this._loading[ref2];
        if (p)
          return p;
        try {
          return await (this._loading[ref2] = loadSchema(ref2));
        } finally {
          delete this._loading[ref2];
        }
      }
    }
    addSchema(schema2, key, _meta, _validateSchema = this.opts.validateSchema) {
      if (Array.isArray(schema2)) {
        for (const sch of schema2)
          this.addSchema(sch, void 0, _meta, _validateSchema);
        return this;
      }
      let id2;
      if (typeof schema2 === "object") {
        const { schemaId } = this.opts;
        id2 = schema2[schemaId];
        if (id2 !== void 0 && typeof id2 != "string") {
          throw new Error(`schema ${schemaId} must be string`);
        }
      }
      key = resolve_12.normalizeId(key || id2);
      this._checkUnique(key);
      this.schemas[key] = this._addSchema(schema2, _meta, key, _validateSchema, true);
      return this;
    }
    addMetaSchema(schema2, key, _validateSchema = this.opts.validateSchema) {
      this.addSchema(schema2, key, true, _validateSchema);
      return this;
    }
    validateSchema(schema2, throwOrLogError) {
      if (typeof schema2 == "boolean")
        return true;
      let $schema2;
      $schema2 = schema2.$schema;
      if ($schema2 !== void 0 && typeof $schema2 != "string") {
        throw new Error("$schema must be a string");
      }
      $schema2 = $schema2 || this.opts.defaultMeta || this.defaultMeta();
      if (!$schema2) {
        this.logger.warn("meta-schema not available");
        this.errors = null;
        return true;
      }
      const valid2 = this.validate($schema2, schema2);
      if (!valid2 && throwOrLogError) {
        const message = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(message);
        else
          throw new Error(message);
      }
      return valid2;
    }
    getSchema(keyRef) {
      let sch;
      while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
        keyRef = sch;
      if (sch === void 0) {
        const { schemaId } = this.opts;
        const root2 = new compile_12.SchemaEnv({ schema: {}, schemaId });
        sch = compile_12.resolveSchema.call(this, root2, keyRef);
        if (!sch)
          return;
        this.refs[keyRef] = sch;
      }
      return sch.validate || this._compileSchemaEnv(sch);
    }
    removeSchema(schemaKeyRef) {
      if (schemaKeyRef instanceof RegExp) {
        this._removeAllSchemas(this.schemas, schemaKeyRef);
        this._removeAllSchemas(this.refs, schemaKeyRef);
        return this;
      }
      switch (typeof schemaKeyRef) {
        case "undefined":
          this._removeAllSchemas(this.schemas);
          this._removeAllSchemas(this.refs);
          this._cache.clear();
          return this;
        case "string": {
          const sch = getSchEnv.call(this, schemaKeyRef);
          if (typeof sch == "object")
            this._cache.delete(sch.schema);
          delete this.schemas[schemaKeyRef];
          delete this.refs[schemaKeyRef];
          return this;
        }
        case "object": {
          const cacheKey = schemaKeyRef;
          this._cache.delete(cacheKey);
          let id2 = schemaKeyRef[this.opts.schemaId];
          if (id2) {
            id2 = resolve_12.normalizeId(id2);
            delete this.schemas[id2];
            delete this.refs[id2];
          }
          return this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    addVocabulary(definitions2) {
      for (const def2 of definitions2)
        this.addKeyword(def2);
      return this;
    }
    addKeyword(kwdOrDef, def2) {
      let keyword2;
      if (typeof kwdOrDef == "string") {
        keyword2 = kwdOrDef;
        if (typeof def2 == "object") {
          this.logger.warn("these parameters are deprecated, see docs for addKeyword");
          def2.keyword = keyword2;
        }
      } else if (typeof kwdOrDef == "object" && def2 === void 0) {
        def2 = kwdOrDef;
        keyword2 = def2.keyword;
        if (Array.isArray(keyword2) && !keyword2.length) {
          throw new Error("addKeywords: keyword must be string or non-empty array");
        }
      } else {
        throw new Error("invalid addKeywords parameters");
      }
      checkKeyword.call(this, keyword2, def2);
      if (!def2) {
        util_12.eachItem(keyword2, (kwd) => addRule.call(this, kwd));
        return this;
      }
      keywordMetaschema.call(this, def2);
      const definition = __spreadProps(__spreadValues({}, def2), {
        type: dataType_12.getJSONTypes(def2.type),
        schemaType: dataType_12.getJSONTypes(def2.schemaType)
      });
      util_12.eachItem(keyword2, definition.type.length === 0 ? (k) => addRule.call(this, k, definition) : (k) => definition.type.forEach((t2) => addRule.call(this, k, definition, t2)));
      return this;
    }
    getKeyword(keyword2) {
      const rule = this.RULES.all[keyword2];
      return typeof rule == "object" ? rule.definition : !!rule;
    }
    removeKeyword(keyword2) {
      const { RULES } = this;
      delete RULES.keywords[keyword2];
      delete RULES.all[keyword2];
      for (const group of RULES.rules) {
        const i2 = group.rules.findIndex((rule) => rule.keyword === keyword2);
        if (i2 >= 0)
          group.rules.splice(i2, 1);
      }
      return this;
    }
    addFormat(name, format2) {
      if (typeof format2 == "string")
        format2 = new RegExp(format2);
      this.formats[name] = format2;
      return this;
    }
    errorsText(errors2 = this.errors, { separator = ", ", dataVar = "data" } = {}) {
      if (!errors2 || errors2.length === 0)
        return "No errors";
      return errors2.map((e) => `${dataVar}${e.instancePath} ${e.message}`).reduce((text, msg) => text + separator + msg);
    }
    $dataMetaSchema(metaSchema, keywordsJsonPointers) {
      const rules2 = this.RULES.all;
      metaSchema = JSON.parse(JSON.stringify(metaSchema));
      for (const jsonPointer of keywordsJsonPointers) {
        const segments = jsonPointer.split("/").slice(1);
        let keywords = metaSchema;
        for (const seg of segments)
          keywords = keywords[seg];
        for (const key in rules2) {
          const rule = rules2[key];
          if (typeof rule != "object")
            continue;
          const { $data } = rule.definition;
          const schema2 = keywords[key];
          if ($data && schema2)
            keywords[key] = schemaOrData(schema2);
        }
      }
      return metaSchema;
    }
    _removeAllSchemas(schemas, regex) {
      for (const keyRef in schemas) {
        const sch = schemas[keyRef];
        if (!regex || regex.test(keyRef)) {
          if (typeof sch == "string") {
            delete schemas[keyRef];
          } else if (sch && !sch.meta) {
            this._cache.delete(sch.schema);
            delete schemas[keyRef];
          }
        }
      }
    }
    _addSchema(schema2, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
      let id2;
      const { schemaId } = this.opts;
      if (typeof schema2 == "object") {
        id2 = schema2[schemaId];
      } else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        else if (typeof schema2 != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let sch = this._cache.get(schema2);
      if (sch !== void 0)
        return sch;
      const localRefs = resolve_12.getSchemaRefs.call(this, schema2);
      baseId = resolve_12.normalizeId(id2 || baseId);
      sch = new compile_12.SchemaEnv({ schema: schema2, schemaId, meta, baseId, localRefs });
      this._cache.set(sch.schema, sch);
      if (addSchema && !baseId.startsWith("#")) {
        if (baseId)
          this._checkUnique(baseId);
        this.refs[baseId] = sch;
      }
      if (validateSchema)
        this.validateSchema(schema2, true);
      return sch;
    }
    _checkUnique(id2) {
      if (this.schemas[id2] || this.refs[id2]) {
        throw new Error(`schema with key or id "${id2}" already exists`);
      }
    }
    _compileSchemaEnv(sch) {
      if (sch.meta)
        this._compileMetaSchema(sch);
      else
        compile_12.compileSchema.call(this, sch);
      if (!sch.validate)
        throw new Error("ajv implementation error");
      return sch.validate;
    }
    _compileMetaSchema(sch) {
      const currentOpts = this.opts;
      this.opts = this._metaOpts;
      try {
        compile_12.compileSchema.call(this, sch);
      } finally {
        this.opts = currentOpts;
      }
    }
  }
  exports.default = Ajv;
  Ajv.ValidationError = validation_error_12.default;
  Ajv.MissingRefError = ref_error_12.default;
  function checkOptions(checkOpts, options, msg, log = "error") {
    for (const key in checkOpts) {
      const opt = key;
      if (opt in options)
        this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
    }
  }
  function getSchEnv(keyRef) {
    keyRef = resolve_12.normalizeId(keyRef);
    return this.schemas[keyRef] || this.refs[keyRef];
  }
  function addInitialSchemas() {
    const optsSchemas = this.opts.schemas;
    if (!optsSchemas)
      return;
    if (Array.isArray(optsSchemas))
      this.addSchema(optsSchemas);
    else
      for (const key in optsSchemas)
        this.addSchema(optsSchemas[key], key);
  }
  function addInitialFormats() {
    for (const name in this.opts.formats) {
      const format2 = this.opts.formats[name];
      if (format2)
        this.addFormat(name, format2);
    }
  }
  function addInitialKeywords(defs) {
    if (Array.isArray(defs)) {
      this.addVocabulary(defs);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const keyword2 in defs) {
      const def2 = defs[keyword2];
      if (!def2.keyword)
        def2.keyword = keyword2;
      this.addKeyword(def2);
    }
  }
  function getMetaSchemaOptions() {
    const metaOpts = __spreadValues({}, this.opts);
    for (const opt of META_IGNORE_OPTIONS)
      delete metaOpts[opt];
    return metaOpts;
  }
  const noLogs = { log() {
  }, warn() {
  }, error() {
  } };
  function getLogger(logger) {
    if (logger === false)
      return noLogs;
    if (logger === void 0)
      return console;
    if (logger.log && logger.warn && logger.error)
      return logger;
    throw new Error("logger must implement log, warn and error methods");
  }
  const KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
  function checkKeyword(keyword2, def2) {
    const { RULES } = this;
    util_12.eachItem(keyword2, (kwd) => {
      if (RULES.keywords[kwd])
        throw new Error(`Keyword ${kwd} is already defined`);
      if (!KEYWORD_NAME.test(kwd))
        throw new Error(`Keyword ${kwd} has invalid name`);
    });
    if (!def2)
      return;
    if (def2.$data && !("code" in def2 || "validate" in def2)) {
      throw new Error('$data keyword must have "code" or "validate" function');
    }
  }
  function addRule(keyword2, definition, dataType2) {
    var _a;
    const post = definition === null || definition === void 0 ? void 0 : definition.post;
    if (dataType2 && post)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES } = this;
    let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t2 }) => t2 === dataType2);
    if (!ruleGroup) {
      ruleGroup = { type: dataType2, rules: [] };
      RULES.rules.push(ruleGroup);
    }
    RULES.keywords[keyword2] = true;
    if (!definition)
      return;
    const rule = {
      keyword: keyword2,
      definition: __spreadProps(__spreadValues({}, definition), {
        type: dataType_12.getJSONTypes(definition.type),
        schemaType: dataType_12.getJSONTypes(definition.schemaType)
      })
    };
    if (definition.before)
      addBeforeRule.call(this, ruleGroup, rule, definition.before);
    else
      ruleGroup.rules.push(rule);
    RULES.all[keyword2] = rule;
    (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
  }
  function addBeforeRule(ruleGroup, rule, before) {
    const i2 = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
    if (i2 >= 0) {
      ruleGroup.rules.splice(i2, 0, rule);
    } else {
      ruleGroup.rules.push(rule);
      this.logger.warn(`rule ${before} is not defined`);
    }
  }
  function keywordMetaschema(def2) {
    let { metaSchema } = def2;
    if (metaSchema === void 0)
      return;
    if (def2.$data && this.opts.$data)
      metaSchema = schemaOrData(metaSchema);
    def2.validateSchema = this.compile(metaSchema, true);
  }
  const $dataRef = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function schemaOrData(schema2) {
    return { anyOf: [schema2, $dataRef] };
  }
})(core$2);
var draft7 = {};
var core$1 = {};
var id = {};
Object.defineProperty(id, "__esModule", { value: true });
const def$s = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
id.default = def$s;
var ref = {};
Object.defineProperty(ref, "__esModule", { value: true });
ref.callRef = ref.getValidate = void 0;
const ref_error_1 = ref_error;
const code_1$8 = code;
const codegen_1$l = codegen;
const names_1$1 = names$1;
const compile_1 = compile;
const util_1$i = util;
const def$r = {
  keyword: "$ref",
  schemaType: "string",
  code(cxt) {
    const { gen, schema: $ref, it } = cxt;
    const { baseId, schemaEnv: env2, validateName, opts: opts2, self: self2 } = it;
    const { root: root2 } = env2;
    if (($ref === "#" || $ref === "#/") && baseId === root2.baseId)
      return callRootRef();
    const schOrEnv = compile_1.resolveRef.call(self2, root2, baseId, $ref);
    if (schOrEnv === void 0)
      throw new ref_error_1.default(baseId, $ref);
    if (schOrEnv instanceof compile_1.SchemaEnv)
      return callValidate(schOrEnv);
    return inlineRefSchema(schOrEnv);
    function callRootRef() {
      if (env2 === root2)
        return callRef(cxt, validateName, env2, env2.$async);
      const rootName = gen.scopeValue("root", { ref: root2 });
      return callRef(cxt, codegen_1$l._`${rootName}.validate`, root2, root2.$async);
    }
    function callValidate(sch) {
      const v = getValidate(cxt, sch);
      callRef(cxt, v, sch, sch.$async);
    }
    function inlineRefSchema(sch) {
      const schName = gen.scopeValue("schema", opts2.code.source === true ? { ref: sch, code: codegen_1$l.stringify(sch) } : { ref: sch });
      const valid2 = gen.name("valid");
      const schCxt = cxt.subschema({
        schema: sch,
        dataTypes: [],
        schemaPath: codegen_1$l.nil,
        topSchemaRef: schName,
        errSchemaPath: $ref
      }, valid2);
      cxt.mergeEvaluated(schCxt);
      cxt.ok(valid2);
    }
  }
};
function getValidate(cxt, sch) {
  const { gen } = cxt;
  return sch.validate ? gen.scopeValue("validate", { ref: sch.validate }) : codegen_1$l._`${gen.scopeValue("wrapper", { ref: sch })}.validate`;
}
ref.getValidate = getValidate;
function callRef(cxt, v, sch, $async) {
  const { gen, it } = cxt;
  const { allErrors, schemaEnv: env2, opts: opts2 } = it;
  const passCxt = opts2.passContext ? names_1$1.default.this : codegen_1$l.nil;
  if ($async)
    callAsyncRef();
  else
    callSyncRef();
  function callAsyncRef() {
    if (!env2.$async)
      throw new Error("async schema referenced by sync schema");
    const valid2 = gen.let("valid");
    gen.try(() => {
      gen.code(codegen_1$l._`await ${code_1$8.callValidateCode(cxt, v, passCxt)}`);
      addEvaluatedFrom(v);
      if (!allErrors)
        gen.assign(valid2, true);
    }, (e) => {
      gen.if(codegen_1$l._`!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
      addErrorsFrom(e);
      if (!allErrors)
        gen.assign(valid2, false);
    });
    cxt.ok(valid2);
  }
  function callSyncRef() {
    cxt.result(code_1$8.callValidateCode(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
  }
  function addErrorsFrom(source2) {
    const errs = codegen_1$l._`${source2}.errors`;
    gen.assign(names_1$1.default.vErrors, codegen_1$l._`${names_1$1.default.vErrors} === null ? ${errs} : ${names_1$1.default.vErrors}.concat(${errs})`);
    gen.assign(names_1$1.default.errors, codegen_1$l._`${names_1$1.default.vErrors}.length`);
  }
  function addEvaluatedFrom(source2) {
    var _a;
    if (!it.opts.unevaluated)
      return;
    const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
    if (it.props !== true) {
      if (schEvaluated && !schEvaluated.dynamicProps) {
        if (schEvaluated.props !== void 0) {
          it.props = util_1$i.mergeEvaluated.props(gen, schEvaluated.props, it.props);
        }
      } else {
        const props = gen.var("props", codegen_1$l._`${source2}.evaluated.props`);
        it.props = util_1$i.mergeEvaluated.props(gen, props, it.props, codegen_1$l.Name);
      }
    }
    if (it.items !== true) {
      if (schEvaluated && !schEvaluated.dynamicItems) {
        if (schEvaluated.items !== void 0) {
          it.items = util_1$i.mergeEvaluated.items(gen, schEvaluated.items, it.items);
        }
      } else {
        const items2 = gen.var("items", codegen_1$l._`${source2}.evaluated.items`);
        it.items = util_1$i.mergeEvaluated.items(gen, items2, it.items, codegen_1$l.Name);
      }
    }
  }
}
ref.callRef = callRef;
ref.default = def$r;
Object.defineProperty(core$1, "__esModule", { value: true });
const id_1 = id;
const ref_1 = ref;
const core = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  id_1.default,
  ref_1.default
];
core$1.default = core;
var validation$1 = {};
var limitNumber = {};
Object.defineProperty(limitNumber, "__esModule", { value: true });
const codegen_1$k = codegen;
const ops = codegen_1$k.operators;
const KWDs = {
  maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
  minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
  exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
  exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE }
};
const error$i = {
  message: ({ keyword: keyword2, schemaCode }) => codegen_1$k.str`must be ${KWDs[keyword2].okStr} ${schemaCode}`,
  params: ({ keyword: keyword2, schemaCode }) => codegen_1$k._`{comparison: ${KWDs[keyword2].okStr}, limit: ${schemaCode}}`
};
const def$q = {
  keyword: Object.keys(KWDs),
  type: "number",
  schemaType: "number",
  $data: true,
  error: error$i,
  code(cxt) {
    const { keyword: keyword2, data, schemaCode } = cxt;
    cxt.fail$data(codegen_1$k._`${data} ${KWDs[keyword2].fail} ${schemaCode} || isNaN(${data})`);
  }
};
limitNumber.default = def$q;
var multipleOf = {};
Object.defineProperty(multipleOf, "__esModule", { value: true });
const codegen_1$j = codegen;
const error$h = {
  message: ({ schemaCode }) => codegen_1$j.str`must be multiple of ${schemaCode}`,
  params: ({ schemaCode }) => codegen_1$j._`{multipleOf: ${schemaCode}}`
};
const def$p = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: true,
  error: error$h,
  code(cxt) {
    const { gen, data, schemaCode, it } = cxt;
    const prec = it.opts.multipleOfPrecision;
    const res = gen.let("res");
    const invalid = prec ? codegen_1$j._`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}` : codegen_1$j._`${res} !== parseInt(${res})`;
    cxt.fail$data(codegen_1$j._`(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
  }
};
multipleOf.default = def$p;
var limitLength = {};
var ucs2length$1 = {};
Object.defineProperty(ucs2length$1, "__esModule", { value: true });
function ucs2length(str2) {
  const len = str2.length;
  let length = 0;
  let pos = 0;
  let value;
  while (pos < len) {
    length++;
    value = str2.charCodeAt(pos++);
    if (value >= 55296 && value <= 56319 && pos < len) {
      value = str2.charCodeAt(pos);
      if ((value & 64512) === 56320)
        pos++;
    }
  }
  return length;
}
ucs2length$1.default = ucs2length;
ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(limitLength, "__esModule", { value: true });
const codegen_1$i = codegen;
const util_1$h = util;
const ucs2length_1 = ucs2length$1;
const error$g = {
  message({ keyword: keyword2, schemaCode }) {
    const comp = keyword2 === "maxLength" ? "more" : "fewer";
    return codegen_1$i.str`must NOT have ${comp} than ${schemaCode} characters`;
  },
  params: ({ schemaCode }) => codegen_1$i._`{limit: ${schemaCode}}`
};
const def$o = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: true,
  error: error$g,
  code(cxt) {
    const { keyword: keyword2, data, schemaCode, it } = cxt;
    const op = keyword2 === "maxLength" ? codegen_1$i.operators.GT : codegen_1$i.operators.LT;
    const len = it.opts.unicode === false ? codegen_1$i._`${data}.length` : codegen_1$i._`${util_1$h.useFunc(cxt.gen, ucs2length_1.default)}(${data})`;
    cxt.fail$data(codegen_1$i._`${len} ${op} ${schemaCode}`);
  }
};
limitLength.default = def$o;
var pattern = {};
Object.defineProperty(pattern, "__esModule", { value: true });
const code_1$7 = code;
const codegen_1$h = codegen;
const error$f = {
  message: ({ schemaCode }) => codegen_1$h.str`must match pattern "${schemaCode}"`,
  params: ({ schemaCode }) => codegen_1$h._`{pattern: ${schemaCode}}`
};
const def$n = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: true,
  error: error$f,
  code(cxt) {
    const { data, $data, schema: schema2, schemaCode, it } = cxt;
    const u2 = it.opts.unicodeRegExp ? "u" : "";
    const regExp = $data ? codegen_1$h._`(new RegExp(${schemaCode}, ${u2}))` : code_1$7.usePattern(cxt, schema2);
    cxt.fail$data(codegen_1$h._`!${regExp}.test(${data})`);
  }
};
pattern.default = def$n;
var limitProperties = {};
Object.defineProperty(limitProperties, "__esModule", { value: true });
const codegen_1$g = codegen;
const error$e = {
  message({ keyword: keyword2, schemaCode }) {
    const comp = keyword2 === "maxProperties" ? "more" : "fewer";
    return codegen_1$g.str`must NOT have ${comp} than ${schemaCode} items`;
  },
  params: ({ schemaCode }) => codegen_1$g._`{limit: ${schemaCode}}`
};
const def$m = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: true,
  error: error$e,
  code(cxt) {
    const { keyword: keyword2, data, schemaCode } = cxt;
    const op = keyword2 === "maxProperties" ? codegen_1$g.operators.GT : codegen_1$g.operators.LT;
    cxt.fail$data(codegen_1$g._`Object.keys(${data}).length ${op} ${schemaCode}`);
  }
};
limitProperties.default = def$m;
var required = {};
Object.defineProperty(required, "__esModule", { value: true });
const code_1$6 = code;
const codegen_1$f = codegen;
const util_1$g = util;
const error$d = {
  message: ({ params: { missingProperty } }) => codegen_1$f.str`must have required property '${missingProperty}'`,
  params: ({ params: { missingProperty } }) => codegen_1$f._`{missingProperty: ${missingProperty}}`
};
const def$l = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: true,
  error: error$d,
  code(cxt) {
    const { gen, schema: schema2, schemaCode, data, $data, it } = cxt;
    const { opts: opts2 } = it;
    if (!$data && schema2.length === 0)
      return;
    const useLoop = schema2.length >= opts2.loopRequired;
    if (it.allErrors)
      allErrorsMode();
    else
      exitOnErrorMode();
    if (opts2.strictRequired) {
      const props = cxt.parentSchema.properties;
      const { definedProperties } = cxt.it;
      for (const requiredKey of schema2) {
        if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === void 0 && !definedProperties.has(requiredKey)) {
          const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
          const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
          util_1$g.checkStrictMode(it, msg, it.opts.strictRequired);
        }
      }
    }
    function allErrorsMode() {
      if (useLoop || $data) {
        cxt.block$data(codegen_1$f.nil, loopAllRequired);
      } else {
        for (const prop of schema2) {
          code_1$6.checkReportMissingProp(cxt, prop);
        }
      }
    }
    function exitOnErrorMode() {
      const missing = gen.let("missing");
      if (useLoop || $data) {
        const valid2 = gen.let("valid", true);
        cxt.block$data(valid2, () => loopUntilMissing(missing, valid2));
        cxt.ok(valid2);
      } else {
        gen.if(code_1$6.checkMissingProp(cxt, schema2, missing));
        code_1$6.reportMissingProp(cxt, missing);
        gen.else();
      }
    }
    function loopAllRequired() {
      gen.forOf("prop", schemaCode, (prop) => {
        cxt.setParams({ missingProperty: prop });
        gen.if(code_1$6.noPropertyInData(gen, data, prop, opts2.ownProperties), () => cxt.error());
      });
    }
    function loopUntilMissing(missing, valid2) {
      cxt.setParams({ missingProperty: missing });
      gen.forOf(missing, schemaCode, () => {
        gen.assign(valid2, code_1$6.propertyInData(gen, data, missing, opts2.ownProperties));
        gen.if(codegen_1$f.not(valid2), () => {
          cxt.error();
          gen.break();
        });
      }, codegen_1$f.nil);
    }
  }
};
required.default = def$l;
var limitItems = {};
Object.defineProperty(limitItems, "__esModule", { value: true });
const codegen_1$e = codegen;
const error$c = {
  message({ keyword: keyword2, schemaCode }) {
    const comp = keyword2 === "maxItems" ? "more" : "fewer";
    return codegen_1$e.str`must NOT have ${comp} than ${schemaCode} items`;
  },
  params: ({ schemaCode }) => codegen_1$e._`{limit: ${schemaCode}}`
};
const def$k = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: true,
  error: error$c,
  code(cxt) {
    const { keyword: keyword2, data, schemaCode } = cxt;
    const op = keyword2 === "maxItems" ? codegen_1$e.operators.GT : codegen_1$e.operators.LT;
    cxt.fail$data(codegen_1$e._`${data}.length ${op} ${schemaCode}`);
  }
};
limitItems.default = def$k;
var uniqueItems = {};
var equal$1 = {};
Object.defineProperty(equal$1, "__esModule", { value: true });
const equal = fastDeepEqual;
equal.code = 'require("ajv/dist/runtime/equal").default';
equal$1.default = equal;
Object.defineProperty(uniqueItems, "__esModule", { value: true });
const dataType_1 = dataType;
const codegen_1$d = codegen;
const util_1$f = util;
const equal_1$2 = equal$1;
const error$b = {
  message: ({ params: { i: i2, j } }) => codegen_1$d.str`must NOT have duplicate items (items ## ${j} and ${i2} are identical)`,
  params: ({ params: { i: i2, j } }) => codegen_1$d._`{i: ${i2}, j: ${j}}`
};
const def$j = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: true,
  error: error$b,
  code(cxt) {
    const { gen, data, $data, schema: schema2, parentSchema, schemaCode, it } = cxt;
    if (!$data && !schema2)
      return;
    const valid2 = gen.let("valid");
    const itemTypes = parentSchema.items ? dataType_1.getSchemaTypes(parentSchema.items) : [];
    cxt.block$data(valid2, validateUniqueItems, codegen_1$d._`${schemaCode} === false`);
    cxt.ok(valid2);
    function validateUniqueItems() {
      const i2 = gen.let("i", codegen_1$d._`${data}.length`);
      const j = gen.let("j");
      cxt.setParams({ i: i2, j });
      gen.assign(valid2, true);
      gen.if(codegen_1$d._`${i2} > 1`, () => (canOptimize() ? loopN : loopN2)(i2, j));
    }
    function canOptimize() {
      return itemTypes.length > 0 && !itemTypes.some((t2) => t2 === "object" || t2 === "array");
    }
    function loopN(i2, j) {
      const item = gen.name("item");
      const wrongType = dataType_1.checkDataTypes(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
      const indices = gen.const("indices", codegen_1$d._`{}`);
      gen.for(codegen_1$d._`;${i2}--;`, () => {
        gen.let(item, codegen_1$d._`${data}[${i2}]`);
        gen.if(wrongType, codegen_1$d._`continue`);
        if (itemTypes.length > 1)
          gen.if(codegen_1$d._`typeof ${item} == "string"`, codegen_1$d._`${item} += "_"`);
        gen.if(codegen_1$d._`typeof ${indices}[${item}] == "number"`, () => {
          gen.assign(j, codegen_1$d._`${indices}[${item}]`);
          cxt.error();
          gen.assign(valid2, false).break();
        }).code(codegen_1$d._`${indices}[${item}] = ${i2}`);
      });
    }
    function loopN2(i2, j) {
      const eql = util_1$f.useFunc(gen, equal_1$2.default);
      const outer = gen.name("outer");
      gen.label(outer).for(codegen_1$d._`;${i2}--;`, () => gen.for(codegen_1$d._`${j} = ${i2}; ${j}--;`, () => gen.if(codegen_1$d._`${eql}(${data}[${i2}], ${data}[${j}])`, () => {
        cxt.error();
        gen.assign(valid2, false).break(outer);
      })));
    }
  }
};
uniqueItems.default = def$j;
var _const = {};
Object.defineProperty(_const, "__esModule", { value: true });
const codegen_1$c = codegen;
const util_1$e = util;
const equal_1$1 = equal$1;
const error$a = {
  message: "must be equal to constant",
  params: ({ schemaCode }) => codegen_1$c._`{allowedValue: ${schemaCode}}`
};
const def$i = {
  keyword: "const",
  $data: true,
  error: error$a,
  code(cxt) {
    const { gen, data, $data, schemaCode, schema: schema2 } = cxt;
    if ($data || schema2 && typeof schema2 == "object") {
      cxt.fail$data(codegen_1$c._`!${util_1$e.useFunc(gen, equal_1$1.default)}(${data}, ${schemaCode})`);
    } else {
      cxt.fail(codegen_1$c._`${schema2} !== ${data}`);
    }
  }
};
_const.default = def$i;
var _enum = {};
Object.defineProperty(_enum, "__esModule", { value: true });
const codegen_1$b = codegen;
const util_1$d = util;
const equal_1 = equal$1;
const error$9 = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode }) => codegen_1$b._`{allowedValues: ${schemaCode}}`
};
const def$h = {
  keyword: "enum",
  schemaType: "array",
  $data: true,
  error: error$9,
  code(cxt) {
    const { gen, data, $data, schema: schema2, schemaCode, it } = cxt;
    if (!$data && schema2.length === 0)
      throw new Error("enum must have non-empty array");
    const useLoop = schema2.length >= it.opts.loopEnum;
    const eql = util_1$d.useFunc(gen, equal_1.default);
    let valid2;
    if (useLoop || $data) {
      valid2 = gen.let("valid");
      cxt.block$data(valid2, loopEnum);
    } else {
      if (!Array.isArray(schema2))
        throw new Error("ajv implementation error");
      const vSchema = gen.const("vSchema", schemaCode);
      valid2 = codegen_1$b.or(...schema2.map((_x, i2) => equalCode(vSchema, i2)));
    }
    cxt.pass(valid2);
    function loopEnum() {
      gen.assign(valid2, false);
      gen.forOf("v", schemaCode, (v) => gen.if(codegen_1$b._`${eql}(${data}, ${v})`, () => gen.assign(valid2, true).break()));
    }
    function equalCode(vSchema, i2) {
      const sch = schema2[i2];
      return typeof sch === "object" && sch !== null ? codegen_1$b._`${eql}(${data}, ${vSchema}[${i2}])` : codegen_1$b._`${data} === ${sch}`;
    }
  }
};
_enum.default = def$h;
Object.defineProperty(validation$1, "__esModule", { value: true });
const limitNumber_1 = limitNumber;
const multipleOf_1 = multipleOf;
const limitLength_1 = limitLength;
const pattern_1 = pattern;
const limitProperties_1 = limitProperties;
const required_1 = required;
const limitItems_1 = limitItems;
const uniqueItems_1 = uniqueItems;
const const_1 = _const;
const enum_1 = _enum;
const validation = [
  limitNumber_1.default,
  multipleOf_1.default,
  limitLength_1.default,
  pattern_1.default,
  limitProperties_1.default,
  required_1.default,
  limitItems_1.default,
  uniqueItems_1.default,
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  const_1.default,
  enum_1.default
];
validation$1.default = validation;
var applicator = {};
var additionalItems = {};
Object.defineProperty(additionalItems, "__esModule", { value: true });
additionalItems.validateAdditionalItems = void 0;
const codegen_1$a = codegen;
const util_1$c = util;
const error$8 = {
  message: ({ params: { len } }) => codegen_1$a.str`must NOT have more than ${len} items`,
  params: ({ params: { len } }) => codegen_1$a._`{limit: ${len}}`
};
const def$g = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: error$8,
  code(cxt) {
    const { parentSchema, it } = cxt;
    const { items: items2 } = parentSchema;
    if (!Array.isArray(items2)) {
      util_1$c.checkStrictMode(it, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    validateAdditionalItems(cxt, items2);
  }
};
function validateAdditionalItems(cxt, items2) {
  const { gen, schema: schema2, data, keyword: keyword2, it } = cxt;
  it.items = true;
  const len = gen.const("len", codegen_1$a._`${data}.length`);
  if (schema2 === false) {
    cxt.setParams({ len: items2.length });
    cxt.pass(codegen_1$a._`${len} <= ${items2.length}`);
  } else if (typeof schema2 == "object" && !util_1$c.alwaysValidSchema(it, schema2)) {
    const valid2 = gen.var("valid", codegen_1$a._`${len} <= ${items2.length}`);
    gen.if(codegen_1$a.not(valid2), () => validateItems(valid2));
    cxt.ok(valid2);
  }
  function validateItems(valid2) {
    gen.forRange("i", items2.length, len, (i2) => {
      cxt.subschema({ keyword: keyword2, dataProp: i2, dataPropType: util_1$c.Type.Num }, valid2);
      if (!it.allErrors)
        gen.if(codegen_1$a.not(valid2), () => gen.break());
    });
  }
}
additionalItems.validateAdditionalItems = validateAdditionalItems;
additionalItems.default = def$g;
var prefixItems = {};
var items = {};
Object.defineProperty(items, "__esModule", { value: true });
items.validateTuple = void 0;
const codegen_1$9 = codegen;
const util_1$b = util;
const code_1$5 = code;
const def$f = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(cxt) {
    const { schema: schema2, it } = cxt;
    if (Array.isArray(schema2))
      return validateTuple(cxt, "additionalItems", schema2);
    it.items = true;
    if (util_1$b.alwaysValidSchema(it, schema2))
      return;
    cxt.ok(code_1$5.validateArray(cxt));
  }
};
function validateTuple(cxt, extraItems, schArr = cxt.schema) {
  const { gen, parentSchema, data, keyword: keyword2, it } = cxt;
  checkStrictTuple(parentSchema);
  if (it.opts.unevaluated && schArr.length && it.items !== true) {
    it.items = util_1$b.mergeEvaluated.items(gen, schArr.length, it.items);
  }
  const valid2 = gen.name("valid");
  const len = gen.const("len", codegen_1$9._`${data}.length`);
  schArr.forEach((sch, i2) => {
    if (util_1$b.alwaysValidSchema(it, sch))
      return;
    gen.if(codegen_1$9._`${len} > ${i2}`, () => cxt.subschema({
      keyword: keyword2,
      schemaProp: i2,
      dataProp: i2
    }, valid2));
    cxt.ok(valid2);
  });
  function checkStrictTuple(sch) {
    const { opts: opts2, errSchemaPath } = it;
    const l = schArr.length;
    const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
    if (opts2.strictTuples && !fullTuple) {
      const msg = `"${keyword2}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
      util_1$b.checkStrictMode(it, msg, opts2.strictTuples);
    }
  }
}
items.validateTuple = validateTuple;
items.default = def$f;
Object.defineProperty(prefixItems, "__esModule", { value: true });
const items_1$1 = items;
const def$e = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (cxt) => items_1$1.validateTuple(cxt, "items")
};
prefixItems.default = def$e;
var items2020 = {};
Object.defineProperty(items2020, "__esModule", { value: true });
const codegen_1$8 = codegen;
const util_1$a = util;
const code_1$4 = code;
const additionalItems_1$1 = additionalItems;
const error$7 = {
  message: ({ params: { len } }) => codegen_1$8.str`must NOT have more than ${len} items`,
  params: ({ params: { len } }) => codegen_1$8._`{limit: ${len}}`
};
const def$d = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: error$7,
  code(cxt) {
    const { schema: schema2, parentSchema, it } = cxt;
    const { prefixItems: prefixItems2 } = parentSchema;
    it.items = true;
    if (util_1$a.alwaysValidSchema(it, schema2))
      return;
    if (prefixItems2)
      additionalItems_1$1.validateAdditionalItems(cxt, prefixItems2);
    else
      cxt.ok(code_1$4.validateArray(cxt));
  }
};
items2020.default = def$d;
var contains = {};
Object.defineProperty(contains, "__esModule", { value: true });
const codegen_1$7 = codegen;
const util_1$9 = util;
const error$6 = {
  message: ({ params: { min, max } }) => max === void 0 ? codegen_1$7.str`must contain at least ${min} valid item(s)` : codegen_1$7.str`must contain at least ${min} and no more than ${max} valid item(s)`,
  params: ({ params: { min, max } }) => max === void 0 ? codegen_1$7._`{minContains: ${min}}` : codegen_1$7._`{minContains: ${min}, maxContains: ${max}}`
};
const def$c = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: true,
  error: error$6,
  code(cxt) {
    const { gen, schema: schema2, parentSchema, data, it } = cxt;
    let min;
    let max;
    const { minContains, maxContains } = parentSchema;
    if (it.opts.next) {
      min = minContains === void 0 ? 1 : minContains;
      max = maxContains;
    } else {
      min = 1;
    }
    const len = gen.const("len", codegen_1$7._`${data}.length`);
    cxt.setParams({ min, max });
    if (max === void 0 && min === 0) {
      util_1$9.checkStrictMode(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
      return;
    }
    if (max !== void 0 && min > max) {
      util_1$9.checkStrictMode(it, `"minContains" > "maxContains" is always invalid`);
      cxt.fail();
      return;
    }
    if (util_1$9.alwaysValidSchema(it, schema2)) {
      let cond = codegen_1$7._`${len} >= ${min}`;
      if (max !== void 0)
        cond = codegen_1$7._`${cond} && ${len} <= ${max}`;
      cxt.pass(cond);
      return;
    }
    it.items = true;
    const valid2 = gen.name("valid");
    if (max === void 0 && min === 1) {
      validateItems(valid2, () => gen.if(valid2, () => gen.break()));
    } else {
      gen.let(valid2, false);
      const schValid = gen.name("_valid");
      const count = gen.let("count", 0);
      validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
    }
    cxt.result(valid2, () => cxt.reset());
    function validateItems(_valid, block) {
      gen.forRange("i", 0, len, (i2) => {
        cxt.subschema({
          keyword: "contains",
          dataProp: i2,
          dataPropType: util_1$9.Type.Num,
          compositeRule: true
        }, _valid);
        block();
      });
    }
    function checkLimits(count) {
      gen.code(codegen_1$7._`${count}++`);
      if (max === void 0) {
        gen.if(codegen_1$7._`${count} >= ${min}`, () => gen.assign(valid2, true).break());
      } else {
        gen.if(codegen_1$7._`${count} > ${max}`, () => gen.assign(valid2, false).break());
        if (min === 1)
          gen.assign(valid2, true);
        else
          gen.if(codegen_1$7._`${count} >= ${min}`, () => gen.assign(valid2, true));
      }
    }
  }
};
contains.default = def$c;
var dependencies = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
  const codegen_12 = codegen;
  const util_12 = util;
  const code_12 = code;
  exports.error = {
    message: ({ params: { property, depsCount, deps } }) => {
      const property_ies = depsCount === 1 ? "property" : "properties";
      return codegen_12.str`must have ${property_ies} ${deps} when property ${property} is present`;
    },
    params: ({ params: { property, depsCount, deps, missingProperty } }) => codegen_12._`{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`
  };
  const def2 = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: exports.error,
    code(cxt) {
      const [propDeps, schDeps] = splitDependencies(cxt);
      validatePropertyDeps(cxt, propDeps);
      validateSchemaDeps(cxt, schDeps);
    }
  };
  function splitDependencies({ schema: schema2 }) {
    const propertyDeps = {};
    const schemaDeps = {};
    for (const key in schema2) {
      if (key === "__proto__")
        continue;
      const deps = Array.isArray(schema2[key]) ? propertyDeps : schemaDeps;
      deps[key] = schema2[key];
    }
    return [propertyDeps, schemaDeps];
  }
  function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
    const { gen, data, it } = cxt;
    if (Object.keys(propertyDeps).length === 0)
      return;
    const missing = gen.let("missing");
    for (const prop in propertyDeps) {
      const deps = propertyDeps[prop];
      if (deps.length === 0)
        continue;
      const hasProperty = code_12.propertyInData(gen, data, prop, it.opts.ownProperties);
      cxt.setParams({
        property: prop,
        depsCount: deps.length,
        deps: deps.join(", ")
      });
      if (it.allErrors) {
        gen.if(hasProperty, () => {
          for (const depProp of deps) {
            code_12.checkReportMissingProp(cxt, depProp);
          }
        });
      } else {
        gen.if(codegen_12._`${hasProperty} && (${code_12.checkMissingProp(cxt, deps, missing)})`);
        code_12.reportMissingProp(cxt, missing);
        gen.else();
      }
    }
  }
  exports.validatePropertyDeps = validatePropertyDeps;
  function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
    const { gen, data, keyword: keyword2, it } = cxt;
    const valid2 = gen.name("valid");
    for (const prop in schemaDeps) {
      if (util_12.alwaysValidSchema(it, schemaDeps[prop]))
        continue;
      gen.if(code_12.propertyInData(gen, data, prop, it.opts.ownProperties), () => {
        const schCxt = cxt.subschema({ keyword: keyword2, schemaProp: prop }, valid2);
        cxt.mergeValidEvaluated(schCxt, valid2);
      }, () => gen.var(valid2, true));
      cxt.ok(valid2);
    }
  }
  exports.validateSchemaDeps = validateSchemaDeps;
  exports.default = def2;
})(dependencies);
var propertyNames = {};
Object.defineProperty(propertyNames, "__esModule", { value: true });
const codegen_1$6 = codegen;
const util_1$8 = util;
const error$5 = {
  message: "property name must be valid",
  params: ({ params }) => codegen_1$6._`{propertyName: ${params.propertyName}}`
};
const def$b = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: error$5,
  code(cxt) {
    const { gen, schema: schema2, data, it } = cxt;
    if (util_1$8.alwaysValidSchema(it, schema2))
      return;
    const valid2 = gen.name("valid");
    gen.forIn("key", data, (key) => {
      cxt.setParams({ propertyName: key });
      cxt.subschema({
        keyword: "propertyNames",
        data: key,
        dataTypes: ["string"],
        propertyName: key,
        compositeRule: true
      }, valid2);
      gen.if(codegen_1$6.not(valid2), () => {
        cxt.error(true);
        if (!it.allErrors)
          gen.break();
      });
    });
    cxt.ok(valid2);
  }
};
propertyNames.default = def$b;
var additionalProperties = {};
Object.defineProperty(additionalProperties, "__esModule", { value: true });
const code_1$3 = code;
const codegen_1$5 = codegen;
const names_1 = names$1;
const util_1$7 = util;
const error$4 = {
  message: "must NOT have additional properties",
  params: ({ params }) => codegen_1$5._`{additionalProperty: ${params.additionalProperty}}`
};
const def$a = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: true,
  trackErrors: true,
  error: error$4,
  code(cxt) {
    const { gen, schema: schema2, parentSchema, data, errsCount, it } = cxt;
    if (!errsCount)
      throw new Error("ajv implementation error");
    const { allErrors, opts: opts2 } = it;
    it.props = true;
    if (opts2.removeAdditional !== "all" && util_1$7.alwaysValidSchema(it, schema2))
      return;
    const props = code_1$3.allSchemaProperties(parentSchema.properties);
    const patProps = code_1$3.allSchemaProperties(parentSchema.patternProperties);
    checkAdditionalProperties();
    cxt.ok(codegen_1$5._`${errsCount} === ${names_1.default.errors}`);
    function checkAdditionalProperties() {
      gen.forIn("key", data, (key) => {
        if (!props.length && !patProps.length)
          additionalPropertyCode(key);
        else
          gen.if(isAdditional(key), () => additionalPropertyCode(key));
      });
    }
    function isAdditional(key) {
      let definedProp;
      if (props.length > 8) {
        const propsSchema = util_1$7.schemaRefOrVal(it, parentSchema.properties, "properties");
        definedProp = code_1$3.isOwnProperty(gen, propsSchema, key);
      } else if (props.length) {
        definedProp = codegen_1$5.or(...props.map((p) => codegen_1$5._`${key} === ${p}`));
      } else {
        definedProp = codegen_1$5.nil;
      }
      if (patProps.length) {
        definedProp = codegen_1$5.or(definedProp, ...patProps.map((p) => codegen_1$5._`${code_1$3.usePattern(cxt, p)}.test(${key})`));
      }
      return codegen_1$5.not(definedProp);
    }
    function deleteAdditional(key) {
      gen.code(codegen_1$5._`delete ${data}[${key}]`);
    }
    function additionalPropertyCode(key) {
      if (opts2.removeAdditional === "all" || opts2.removeAdditional && schema2 === false) {
        deleteAdditional(key);
        return;
      }
      if (schema2 === false) {
        cxt.setParams({ additionalProperty: key });
        cxt.error();
        if (!allErrors)
          gen.break();
        return;
      }
      if (typeof schema2 == "object" && !util_1$7.alwaysValidSchema(it, schema2)) {
        const valid2 = gen.name("valid");
        if (opts2.removeAdditional === "failing") {
          applyAdditionalSchema(key, valid2, false);
          gen.if(codegen_1$5.not(valid2), () => {
            cxt.reset();
            deleteAdditional(key);
          });
        } else {
          applyAdditionalSchema(key, valid2);
          if (!allErrors)
            gen.if(codegen_1$5.not(valid2), () => gen.break());
        }
      }
    }
    function applyAdditionalSchema(key, valid2, errors2) {
      const subschema2 = {
        keyword: "additionalProperties",
        dataProp: key,
        dataPropType: util_1$7.Type.Str
      };
      if (errors2 === false) {
        Object.assign(subschema2, {
          compositeRule: true,
          createErrors: false,
          allErrors: false
        });
      }
      cxt.subschema(subschema2, valid2);
    }
  }
};
additionalProperties.default = def$a;
var properties$1 = {};
Object.defineProperty(properties$1, "__esModule", { value: true });
const validate_1 = validate;
const code_1$2 = code;
const util_1$6 = util;
const additionalProperties_1$1 = additionalProperties;
const def$9 = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(cxt) {
    const { gen, schema: schema2, parentSchema, data, it } = cxt;
    if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === void 0) {
      additionalProperties_1$1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1$1.default, "additionalProperties"));
    }
    const allProps = code_1$2.allSchemaProperties(schema2);
    for (const prop of allProps) {
      it.definedProperties.add(prop);
    }
    if (it.opts.unevaluated && allProps.length && it.props !== true) {
      it.props = util_1$6.mergeEvaluated.props(gen, util_1$6.toHash(allProps), it.props);
    }
    const properties2 = allProps.filter((p) => !util_1$6.alwaysValidSchema(it, schema2[p]));
    if (properties2.length === 0)
      return;
    const valid2 = gen.name("valid");
    for (const prop of properties2) {
      if (hasDefault(prop)) {
        applyPropertySchema(prop);
      } else {
        gen.if(code_1$2.propertyInData(gen, data, prop, it.opts.ownProperties));
        applyPropertySchema(prop);
        if (!it.allErrors)
          gen.else().var(valid2, true);
        gen.endIf();
      }
      cxt.it.definedProperties.add(prop);
      cxt.ok(valid2);
    }
    function hasDefault(prop) {
      return it.opts.useDefaults && !it.compositeRule && schema2[prop].default !== void 0;
    }
    function applyPropertySchema(prop) {
      cxt.subschema({
        keyword: "properties",
        schemaProp: prop,
        dataProp: prop
      }, valid2);
    }
  }
};
properties$1.default = def$9;
var patternProperties = {};
Object.defineProperty(patternProperties, "__esModule", { value: true });
const code_1$1 = code;
const codegen_1$4 = codegen;
const util_1$5 = util;
const util_2 = util;
const def$8 = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(cxt) {
    const { gen, schema: schema2, data, parentSchema, it } = cxt;
    const { opts: opts2 } = it;
    const patterns = code_1$1.allSchemaProperties(schema2);
    const alwaysValidPatterns = patterns.filter((p) => util_1$5.alwaysValidSchema(it, schema2[p]));
    if (patterns.length === 0 || alwaysValidPatterns.length === patterns.length && (!it.opts.unevaluated || it.props === true)) {
      return;
    }
    const checkProperties = opts2.strictSchema && !opts2.allowMatchingProperties && parentSchema.properties;
    const valid2 = gen.name("valid");
    if (it.props !== true && !(it.props instanceof codegen_1$4.Name)) {
      it.props = util_2.evaluatedPropsToName(gen, it.props);
    }
    const { props } = it;
    validatePatternProperties();
    function validatePatternProperties() {
      for (const pat of patterns) {
        if (checkProperties)
          checkMatchingProperties(pat);
        if (it.allErrors) {
          validateProperties(pat);
        } else {
          gen.var(valid2, true);
          validateProperties(pat);
          gen.if(valid2);
        }
      }
    }
    function checkMatchingProperties(pat) {
      for (const prop in checkProperties) {
        if (new RegExp(pat).test(prop)) {
          util_1$5.checkStrictMode(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
        }
      }
    }
    function validateProperties(pat) {
      gen.forIn("key", data, (key) => {
        gen.if(codegen_1$4._`${code_1$1.usePattern(cxt, pat)}.test(${key})`, () => {
          const alwaysValid = alwaysValidPatterns.includes(pat);
          if (!alwaysValid) {
            cxt.subschema({
              keyword: "patternProperties",
              schemaProp: pat,
              dataProp: key,
              dataPropType: util_2.Type.Str
            }, valid2);
          }
          if (it.opts.unevaluated && props !== true) {
            gen.assign(codegen_1$4._`${props}[${key}]`, true);
          } else if (!alwaysValid && !it.allErrors) {
            gen.if(codegen_1$4.not(valid2), () => gen.break());
          }
        });
      });
    }
  }
};
patternProperties.default = def$8;
var not = {};
Object.defineProperty(not, "__esModule", { value: true });
const util_1$4 = util;
const def$7 = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: true,
  code(cxt) {
    const { gen, schema: schema2, it } = cxt;
    if (util_1$4.alwaysValidSchema(it, schema2)) {
      cxt.fail();
      return;
    }
    const valid2 = gen.name("valid");
    cxt.subschema({
      keyword: "not",
      compositeRule: true,
      createErrors: false,
      allErrors: false
    }, valid2);
    cxt.failResult(valid2, () => cxt.reset(), () => cxt.error());
  },
  error: { message: "must NOT be valid" }
};
not.default = def$7;
var anyOf = {};
Object.defineProperty(anyOf, "__esModule", { value: true });
const code_1 = code;
const def$6 = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: true,
  code: code_1.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
anyOf.default = def$6;
var oneOf = {};
Object.defineProperty(oneOf, "__esModule", { value: true });
const codegen_1$3 = codegen;
const util_1$3 = util;
const error$3 = {
  message: "must match exactly one schema in oneOf",
  params: ({ params }) => codegen_1$3._`{passingSchemas: ${params.passing}}`
};
const def$5 = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: true,
  error: error$3,
  code(cxt) {
    const { gen, schema: schema2, parentSchema, it } = cxt;
    if (!Array.isArray(schema2))
      throw new Error("ajv implementation error");
    if (it.opts.discriminator && parentSchema.discriminator)
      return;
    const schArr = schema2;
    const valid2 = gen.let("valid", false);
    const passing = gen.let("passing", null);
    const schValid = gen.name("_valid");
    cxt.setParams({ passing });
    gen.block(validateOneOf);
    cxt.result(valid2, () => cxt.reset(), () => cxt.error(true));
    function validateOneOf() {
      schArr.forEach((sch, i2) => {
        let schCxt;
        if (util_1$3.alwaysValidSchema(it, sch)) {
          gen.var(schValid, true);
        } else {
          schCxt = cxt.subschema({
            keyword: "oneOf",
            schemaProp: i2,
            compositeRule: true
          }, schValid);
        }
        if (i2 > 0) {
          gen.if(codegen_1$3._`${schValid} && ${valid2}`).assign(valid2, false).assign(passing, codegen_1$3._`[${passing}, ${i2}]`).else();
        }
        gen.if(schValid, () => {
          gen.assign(valid2, true);
          gen.assign(passing, i2);
          if (schCxt)
            cxt.mergeEvaluated(schCxt, codegen_1$3.Name);
        });
      });
    }
  }
};
oneOf.default = def$5;
var allOf = {};
Object.defineProperty(allOf, "__esModule", { value: true });
const util_1$2 = util;
const def$4 = {
  keyword: "allOf",
  schemaType: "array",
  code(cxt) {
    const { gen, schema: schema2, it } = cxt;
    if (!Array.isArray(schema2))
      throw new Error("ajv implementation error");
    const valid2 = gen.name("valid");
    schema2.forEach((sch, i2) => {
      if (util_1$2.alwaysValidSchema(it, sch))
        return;
      const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i2 }, valid2);
      cxt.ok(valid2);
      cxt.mergeEvaluated(schCxt);
    });
  }
};
allOf.default = def$4;
var _if = {};
Object.defineProperty(_if, "__esModule", { value: true });
const codegen_1$2 = codegen;
const util_1$1 = util;
const error$2 = {
  message: ({ params }) => codegen_1$2.str`must match "${params.ifClause}" schema`,
  params: ({ params }) => codegen_1$2._`{failingKeyword: ${params.ifClause}}`
};
const def$3 = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: true,
  error: error$2,
  code(cxt) {
    const { gen, parentSchema, it } = cxt;
    if (parentSchema.then === void 0 && parentSchema.else === void 0) {
      util_1$1.checkStrictMode(it, '"if" without "then" and "else" is ignored');
    }
    const hasThen = hasSchema(it, "then");
    const hasElse = hasSchema(it, "else");
    if (!hasThen && !hasElse)
      return;
    const valid2 = gen.let("valid", true);
    const schValid = gen.name("_valid");
    validateIf();
    cxt.reset();
    if (hasThen && hasElse) {
      const ifClause = gen.let("ifClause");
      cxt.setParams({ ifClause });
      gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
    } else if (hasThen) {
      gen.if(schValid, validateClause("then"));
    } else {
      gen.if(codegen_1$2.not(schValid), validateClause("else"));
    }
    cxt.pass(valid2, () => cxt.error(true));
    function validateIf() {
      const schCxt = cxt.subschema({
        keyword: "if",
        compositeRule: true,
        createErrors: false,
        allErrors: false
      }, schValid);
      cxt.mergeEvaluated(schCxt);
    }
    function validateClause(keyword2, ifClause) {
      return () => {
        const schCxt = cxt.subschema({ keyword: keyword2 }, schValid);
        gen.assign(valid2, schValid);
        cxt.mergeValidEvaluated(schCxt, valid2);
        if (ifClause)
          gen.assign(ifClause, codegen_1$2._`${keyword2}`);
        else
          cxt.setParams({ ifClause: keyword2 });
      };
    }
  }
};
function hasSchema(it, keyword2) {
  const schema2 = it.schema[keyword2];
  return schema2 !== void 0 && !util_1$1.alwaysValidSchema(it, schema2);
}
_if.default = def$3;
var thenElse = {};
Object.defineProperty(thenElse, "__esModule", { value: true });
const util_1 = util;
const def$2 = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: keyword2, parentSchema, it }) {
    if (parentSchema.if === void 0)
      util_1.checkStrictMode(it, `"${keyword2}" without "if" is ignored`);
  }
};
thenElse.default = def$2;
Object.defineProperty(applicator, "__esModule", { value: true });
const additionalItems_1 = additionalItems;
const prefixItems_1 = prefixItems;
const items_1 = items;
const items2020_1 = items2020;
const contains_1 = contains;
const dependencies_1 = dependencies;
const propertyNames_1 = propertyNames;
const additionalProperties_1 = additionalProperties;
const properties_1 = properties$1;
const patternProperties_1 = patternProperties;
const not_1 = not;
const anyOf_1 = anyOf;
const oneOf_1 = oneOf;
const allOf_1 = allOf;
const if_1 = _if;
const thenElse_1 = thenElse;
function getApplicator(draft2020 = false) {
  const applicator2 = [
    not_1.default,
    anyOf_1.default,
    oneOf_1.default,
    allOf_1.default,
    if_1.default,
    thenElse_1.default,
    propertyNames_1.default,
    additionalProperties_1.default,
    dependencies_1.default,
    properties_1.default,
    patternProperties_1.default
  ];
  if (draft2020)
    applicator2.push(prefixItems_1.default, items2020_1.default);
  else
    applicator2.push(additionalItems_1.default, items_1.default);
  applicator2.push(contains_1.default);
  return applicator2;
}
applicator.default = getApplicator;
var format$2 = {};
var format$1 = {};
Object.defineProperty(format$1, "__esModule", { value: true });
const codegen_1$1 = codegen;
const error$1 = {
  message: ({ schemaCode }) => codegen_1$1.str`must match format "${schemaCode}"`,
  params: ({ schemaCode }) => codegen_1$1._`{format: ${schemaCode}}`
};
const def$1 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: true,
  error: error$1,
  code(cxt, ruleType) {
    const { gen, data, $data, schema: schema2, schemaCode, it } = cxt;
    const { opts: opts2, errSchemaPath, schemaEnv, self: self2 } = it;
    if (!opts2.validateFormats)
      return;
    if ($data)
      validate$DataFormat();
    else
      validateFormat();
    function validate$DataFormat() {
      const fmts = gen.scopeValue("formats", {
        ref: self2.formats,
        code: opts2.code.formats
      });
      const fDef = gen.const("fDef", codegen_1$1._`${fmts}[${schemaCode}]`);
      const fType = gen.let("fType");
      const format2 = gen.let("format");
      gen.if(codegen_1$1._`typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, codegen_1$1._`${fDef}.type || "string"`).assign(format2, codegen_1$1._`${fDef}.validate`), () => gen.assign(fType, codegen_1$1._`"string"`).assign(format2, fDef));
      cxt.fail$data(codegen_1$1.or(unknownFmt(), invalidFmt()));
      function unknownFmt() {
        if (opts2.strictSchema === false)
          return codegen_1$1.nil;
        return codegen_1$1._`${schemaCode} && !${format2}`;
      }
      function invalidFmt() {
        const callFormat = schemaEnv.$async ? codegen_1$1._`(${fDef}.async ? await ${format2}(${data}) : ${format2}(${data}))` : codegen_1$1._`${format2}(${data})`;
        const validData = codegen_1$1._`(typeof ${format2} == "function" ? ${callFormat} : ${format2}.test(${data}))`;
        return codegen_1$1._`${format2} && ${format2} !== true && ${fType} === ${ruleType} && !${validData}`;
      }
    }
    function validateFormat() {
      const formatDef = self2.formats[schema2];
      if (!formatDef) {
        unknownFormat();
        return;
      }
      if (formatDef === true)
        return;
      const [fmtType, format2, fmtRef] = getFormat(formatDef);
      if (fmtType === ruleType)
        cxt.pass(validCondition());
      function unknownFormat() {
        if (opts2.strictSchema === false) {
          self2.logger.warn(unknownMsg());
          return;
        }
        throw new Error(unknownMsg());
        function unknownMsg() {
          return `unknown format "${schema2}" ignored in schema at path "${errSchemaPath}"`;
        }
      }
      function getFormat(fmtDef) {
        const code2 = fmtDef instanceof RegExp ? codegen_1$1.regexpCode(fmtDef) : opts2.code.formats ? codegen_1$1._`${opts2.code.formats}${codegen_1$1.getProperty(schema2)}` : void 0;
        const fmt = gen.scopeValue("formats", { key: schema2, ref: fmtDef, code: code2 });
        if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
          return [fmtDef.type || "string", fmtDef.validate, codegen_1$1._`${fmt}.validate`];
        }
        return ["string", fmtDef, fmt];
      }
      function validCondition() {
        if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
          if (!schemaEnv.$async)
            throw new Error("async format in sync schema");
          return codegen_1$1._`await ${fmtRef}(${data})`;
        }
        return typeof format2 == "function" ? codegen_1$1._`${fmtRef}(${data})` : codegen_1$1._`${fmtRef}.test(${data})`;
      }
    }
  }
};
format$1.default = def$1;
Object.defineProperty(format$2, "__esModule", { value: true });
const format_1$1 = format$1;
const format = [format_1$1.default];
format$2.default = format;
var metadata = {};
Object.defineProperty(metadata, "__esModule", { value: true });
metadata.contentVocabulary = metadata.metadataVocabulary = void 0;
metadata.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
metadata.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(draft7, "__esModule", { value: true });
const core_1 = core$1;
const validation_1 = validation$1;
const applicator_1 = applicator;
const format_1 = format$2;
const metadata_1 = metadata;
const draft7Vocabularies = [
  core_1.default,
  validation_1.default,
  applicator_1.default(),
  format_1.default,
  metadata_1.metadataVocabulary,
  metadata_1.contentVocabulary
];
draft7.default = draft7Vocabularies;
var discriminator = {};
var types = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DiscrError = void 0;
  (function(DiscrError) {
    DiscrError["Tag"] = "tag";
    DiscrError["Mapping"] = "mapping";
  })(exports.DiscrError || (exports.DiscrError = {}));
})(types);
Object.defineProperty(discriminator, "__esModule", { value: true });
const codegen_1 = codegen;
const types_1 = types;
const error = {
  message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag ? `tag "${tagName}" must be string` : `value of tag "${tagName}" must be in oneOf`,
  params: ({ params: { discrError, tag, tagName } }) => codegen_1._`{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`
};
const def = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error,
  code(cxt) {
    const { gen, data, schema: schema2, parentSchema, it } = cxt;
    const { oneOf: oneOf2 } = parentSchema;
    if (!it.opts.discriminator) {
      throw new Error("discriminator: requires discriminator option");
    }
    const tagName = schema2.propertyName;
    if (typeof tagName != "string")
      throw new Error("discriminator: requires propertyName");
    if (schema2.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!oneOf2)
      throw new Error("discriminator: requires oneOf keyword");
    const valid2 = gen.let("valid", false);
    const tag = gen.const("tag", codegen_1._`${data}${codegen_1.getProperty(tagName)}`);
    gen.if(codegen_1._`typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
    cxt.ok(valid2);
    function validateMapping() {
      const mapping = getMapping();
      gen.if(false);
      for (const tagValue in mapping) {
        gen.elseIf(codegen_1._`${tag} === ${tagValue}`);
        gen.assign(valid2, applyTagSchema(mapping[tagValue]));
      }
      gen.else();
      cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
      gen.endIf();
    }
    function applyTagSchema(schemaProp) {
      const _valid = gen.name("valid");
      const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
      cxt.mergeEvaluated(schCxt, codegen_1.Name);
      return _valid;
    }
    function getMapping() {
      var _a;
      const oneOfMapping = {};
      const topRequired = hasRequired(parentSchema);
      let tagRequired = true;
      for (let i2 = 0; i2 < oneOf2.length; i2++) {
        const sch = oneOf2[i2];
        const propSch = (_a = sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
        if (typeof propSch != "object") {
          throw new Error(`discriminator: oneOf schemas must have "properties/${tagName}"`);
        }
        tagRequired = tagRequired && (topRequired || hasRequired(sch));
        addMappings(propSch, i2);
      }
      if (!tagRequired)
        throw new Error(`discriminator: "${tagName}" must be required`);
      return oneOfMapping;
      function hasRequired({ required: required2 }) {
        return Array.isArray(required2) && required2.includes(tagName);
      }
      function addMappings(sch, i2) {
        if (sch.const) {
          addMapping(sch.const, i2);
        } else if (sch.enum) {
          for (const tagValue of sch.enum) {
            addMapping(tagValue, i2);
          }
        } else {
          throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
        }
      }
      function addMapping(tagValue, i2) {
        if (typeof tagValue != "string" || tagValue in oneOfMapping) {
          throw new Error(`discriminator: "${tagName}" values must be unique strings`);
        }
        oneOfMapping[tagValue] = i2;
      }
    }
  }
};
discriminator.default = def;
const $schema = "http://json-schema.org/draft-07/schema#";
const $id = "http://json-schema.org/draft-07/schema#";
const title = "Core schema meta-schema";
const definitions = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        "default": 0
      }
    ]
  },
  simpleTypes: {
    "enum": [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: true,
    "default": []
  }
};
const type = [
  "object",
  "boolean"
];
const properties = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  "default": true,
  readOnly: {
    type: "boolean",
    "default": false
  },
  examples: {
    type: "array",
    items: true
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    "default": true
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    "default": false
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    "default": {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    "default": {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    "default": {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  "const": true,
  "enum": {
    type: "array",
    items: true,
    minItems: 1,
    uniqueItems: true
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: true
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  "if": {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  "else": {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
};
var require$$3 = {
  $schema,
  $id,
  title,
  definitions,
  type,
  properties,
  "default": true
};
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
  const core_12 = core$2;
  const draft7_1 = draft7;
  const discriminator_1 = discriminator;
  const draft7MetaSchema = require$$3;
  const META_SUPPORT_DATA = ["/properties"];
  const META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
  class Ajv extends core_12.default {
    _addVocabularies() {
      super._addVocabularies();
      draft7_1.default.forEach((v) => this.addVocabulary(v));
      if (this.opts.discriminator)
        this.addKeyword(discriminator_1.default);
    }
    _addDefaultMetaSchema() {
      super._addDefaultMetaSchema();
      if (!this.opts.meta)
        return;
      const metaSchema = this.opts.$data ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA) : draft7MetaSchema;
      this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
      this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
    }
  }
  module.exports = exports = Ajv;
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = Ajv;
  var validate_12 = validate;
  Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
    return validate_12.KeywordCxt;
  } });
  var codegen_12 = codegen;
  Object.defineProperty(exports, "_", { enumerable: true, get: function() {
    return codegen_12._;
  } });
  Object.defineProperty(exports, "str", { enumerable: true, get: function() {
    return codegen_12.str;
  } });
  Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
    return codegen_12.stringify;
  } });
  Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
    return codegen_12.nil;
  } });
  Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
    return codegen_12.Name;
  } });
  Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
    return codegen_12.CodeGen;
  } });
})(ajv, ajv.exports);
var dist = { exports: {} };
var formats = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.formatNames = exports.fastFormats = exports.fullFormats = void 0;
  function fmtDef(validate2, compare2) {
    return { validate: validate2, compare: compare2 };
  }
  exports.fullFormats = {
    date: fmtDef(date, compareDate),
    time: fmtDef(time, compareTime),
    "date-time": fmtDef(date_time, compareDateTime),
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex,
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    byte,
    int32: { type: "number", validate: validateInt32 },
    int64: { type: "number", validate: validateInt64 },
    float: { type: "number", validate: validateNumber },
    double: { type: "number", validate: validateNumber },
    password: true,
    binary: true
  };
  exports.fastFormats = __spreadProps(__spreadValues({}, exports.fullFormats), {
    date: fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, compareDate),
    time: fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareTime),
    "date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareDateTime),
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  });
  exports.formatNames = Object.keys(exports.fullFormats);
  function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }
  const DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
  const DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function date(str2) {
    const matches = DATE.exec(str2);
    if (!matches)
      return false;
    const year = +matches[1];
    const month = +matches[2];
    const day = +matches[3];
    return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
  }
  function compareDate(d1, d2) {
    if (!(d1 && d2))
      return void 0;
    if (d1 > d2)
      return 1;
    if (d1 < d2)
      return -1;
    return 0;
  }
  const TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function time(str2, withTimeZone) {
    const matches = TIME.exec(str2);
    if (!matches)
      return false;
    const hour = +matches[1];
    const minute = +matches[2];
    const second = +matches[3];
    const timeZone = matches[5];
    return (hour <= 23 && minute <= 59 && second <= 59 || hour === 23 && minute === 59 && second === 60) && (!withTimeZone || timeZone !== "");
  }
  function compareTime(t1, t2) {
    if (!(t1 && t2))
      return void 0;
    const a1 = TIME.exec(t1);
    const a2 = TIME.exec(t2);
    if (!(a1 && a2))
      return void 0;
    t1 = a1[1] + a1[2] + a1[3] + (a1[4] || "");
    t2 = a2[1] + a2[2] + a2[3] + (a2[4] || "");
    if (t1 > t2)
      return 1;
    if (t1 < t2)
      return -1;
    return 0;
  }
  const DATE_TIME_SEPARATOR = /t|\s/i;
  function date_time(str2) {
    const dateTime = str2.split(DATE_TIME_SEPARATOR);
    return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1], true);
  }
  function compareDateTime(dt1, dt2) {
    if (!(dt1 && dt2))
      return void 0;
    const [d1, t1] = dt1.split(DATE_TIME_SEPARATOR);
    const [d2, t2] = dt2.split(DATE_TIME_SEPARATOR);
    const res = compareDate(d1, d2);
    if (res === void 0)
      return void 0;
    return res || compareTime(t1, t2);
  }
  const NOT_URI_FRAGMENT = /\/|:/;
  const URI2 = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function uri(str2) {
    return NOT_URI_FRAGMENT.test(str2) && URI2.test(str2);
  }
  const BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function byte(str2) {
    BYTE.lastIndex = 0;
    return BYTE.test(str2);
  }
  const MIN_INT32 = -(2 ** 31);
  const MAX_INT32 = 2 ** 31 - 1;
  function validateInt32(value) {
    return Number.isInteger(value) && value <= MAX_INT32 && value >= MIN_INT32;
  }
  function validateInt64(value) {
    return Number.isInteger(value);
  }
  function validateNumber() {
    return true;
  }
  const Z_ANCHOR = /[^\\]\\Z/;
  function regex(str2) {
    if (Z_ANCHOR.test(str2))
      return false;
    try {
      new RegExp(str2);
      return true;
    } catch (e) {
      return false;
    }
  }
})(formats);
var limit = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.formatLimitDefinition = void 0;
  const ajv_1 = ajv.exports;
  const codegen_12 = codegen;
  const ops2 = codegen_12.operators;
  const KWDs2 = {
    formatMaximum: { okStr: "<=", ok: ops2.LTE, fail: ops2.GT },
    formatMinimum: { okStr: ">=", ok: ops2.GTE, fail: ops2.LT },
    formatExclusiveMaximum: { okStr: "<", ok: ops2.LT, fail: ops2.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: ops2.GT, fail: ops2.LTE }
  };
  const error2 = {
    message: ({ keyword: keyword2, schemaCode }) => codegen_12.str`should be ${KWDs2[keyword2].okStr} ${schemaCode}`,
    params: ({ keyword: keyword2, schemaCode }) => codegen_12._`{comparison: ${KWDs2[keyword2].okStr}, limit: ${schemaCode}}`
  };
  exports.formatLimitDefinition = {
    keyword: Object.keys(KWDs2),
    type: "string",
    schemaType: "string",
    $data: true,
    error: error2,
    code(cxt) {
      const { gen, data, schemaCode, keyword: keyword2, it } = cxt;
      const { opts: opts2, self: self2 } = it;
      if (!opts2.validateFormats)
        return;
      const fCxt = new ajv_1.KeywordCxt(it, self2.RULES.all.format.definition, "format");
      if (fCxt.$data)
        validate$DataFormat();
      else
        validateFormat();
      function validate$DataFormat() {
        const fmts = gen.scopeValue("formats", {
          ref: self2.formats,
          code: opts2.code.formats
        });
        const fmt = gen.const("fmt", codegen_12._`${fmts}[${fCxt.schemaCode}]`);
        cxt.fail$data(codegen_12.or(codegen_12._`typeof ${fmt} != "object"`, codegen_12._`${fmt} instanceof RegExp`, codegen_12._`typeof ${fmt}.compare != "function"`, compareCode(fmt)));
      }
      function validateFormat() {
        const format2 = fCxt.schema;
        const fmtDef = self2.formats[format2];
        if (!fmtDef || fmtDef === true)
          return;
        if (typeof fmtDef != "object" || fmtDef instanceof RegExp || typeof fmtDef.compare != "function") {
          throw new Error(`"${keyword2}": format "${format2}" does not define "compare" function`);
        }
        const fmt = gen.scopeValue("formats", {
          key: format2,
          ref: fmtDef,
          code: opts2.code.formats ? codegen_12._`${opts2.code.formats}${codegen_12.getProperty(format2)}` : void 0
        });
        cxt.fail$data(compareCode(fmt));
      }
      function compareCode(fmt) {
        return codegen_12._`${fmt}.compare(${data}, ${schemaCode}) ${KWDs2[keyword2].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const formatLimitPlugin = (ajv2) => {
    ajv2.addKeyword(exports.formatLimitDefinition);
    return ajv2;
  };
  exports.default = formatLimitPlugin;
})(limit);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  const formats_1 = formats;
  const limit_1 = limit;
  const codegen_12 = codegen;
  const fullName = new codegen_12.Name("fullFormats");
  const fastName = new codegen_12.Name("fastFormats");
  const formatsPlugin = (ajv2, opts2 = { keywords: true }) => {
    if (Array.isArray(opts2)) {
      addFormats(ajv2, opts2, formats_1.fullFormats, fullName);
      return ajv2;
    }
    const [formats2, exportName] = opts2.mode === "fast" ? [formats_1.fastFormats, fastName] : [formats_1.fullFormats, fullName];
    const list = opts2.formats || formats_1.formatNames;
    addFormats(ajv2, list, formats2, exportName);
    if (opts2.keywords)
      limit_1.default(ajv2);
    return ajv2;
  };
  formatsPlugin.get = (name, mode = "full") => {
    const formats2 = mode === "fast" ? formats_1.fastFormats : formats_1.fullFormats;
    const f = formats2[name];
    if (!f)
      throw new Error(`Unknown format "${name}"`);
    return f;
  };
  function addFormats(ajv2, list, fs2, exportName) {
    var _a;
    var _b;
    (_a = (_b = ajv2.opts.code).formats) !== null && _a !== void 0 ? _a : _b.formats = codegen_12._`require("ajv-formats/dist/formats").${exportName}`;
    for (const f of list)
      ajv2.addFormat(f, fs2[f]);
  }
  module.exports = exports = formatsPlugin;
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = formatsPlugin;
})(dist, dist.exports);
const copyProperty = (to, from, property, ignoreNonConfigurable) => {
  if (property === "length" || property === "prototype") {
    return;
  }
  if (property === "arguments" || property === "caller") {
    return;
  }
  const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
  const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
    return;
  }
  Object.defineProperty(to, property, fromDescriptor);
};
const canCopyProperty = function(toDescriptor, fromDescriptor) {
  return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
};
const changePrototype = (to, from) => {
  const fromPrototype = Object.getPrototypeOf(from);
  if (fromPrototype === Object.getPrototypeOf(to)) {
    return;
  }
  Object.setPrototypeOf(to, fromPrototype);
};
const wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/
${fromBody}`;
const toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
const toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
const changeToString = (to, from, name) => {
  const withName = name === "" ? "" : `with ${name.trim()}() `;
  const newToString = wrappedToString.bind(null, withName, from.toString());
  Object.defineProperty(newToString, "name", toStringName);
  Object.defineProperty(to, "toString", __spreadProps(__spreadValues({}, toStringDescriptor), { value: newToString }));
};
const mimicFn$4 = (to, from, { ignoreNonConfigurable = false } = {}) => {
  const { name } = to;
  for (const property of Reflect.ownKeys(from)) {
    copyProperty(to, from, property, ignoreNonConfigurable);
  }
  changePrototype(to, from);
  changeToString(to, from, name);
  return to;
};
var mimicFn_1 = mimicFn$4;
const mimicFn$3 = mimicFn_1;
var debounceFn = (inputFunction, options = {}) => {
  if (typeof inputFunction !== "function") {
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof inputFunction}\``);
  }
  const {
    wait = 0,
    before = false,
    after = true
  } = options;
  if (!before && !after) {
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  }
  let timeout;
  let result;
  const debouncedFunction = function(...arguments_) {
    const context = this;
    const later = () => {
      timeout = void 0;
      if (after) {
        result = inputFunction.apply(context, arguments_);
      }
    };
    const shouldCallNow = before && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (shouldCallNow) {
      result = inputFunction.apply(context, arguments_);
    }
    return result;
  };
  mimicFn$3(debouncedFunction, inputFunction);
  debouncedFunction.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = void 0;
    }
  };
  return debouncedFunction;
};
var onetime$1 = { exports: {} };
var mimicFn$2 = { exports: {} };
const mimicFn$1 = (to, from) => {
  for (const prop of Reflect.ownKeys(from)) {
    Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
  }
  return to;
};
mimicFn$2.exports = mimicFn$1;
mimicFn$2.exports.default = mimicFn$1;
const mimicFn = mimicFn$2.exports;
const calledFunctions = new WeakMap();
const onetime = (function_, options = {}) => {
  if (typeof function_ !== "function") {
    throw new TypeError("Expected a function");
  }
  let returnValue;
  let callCount = 0;
  const functionName = function_.displayName || function_.name || "<anonymous>";
  const onetime2 = function(...arguments_) {
    calledFunctions.set(onetime2, ++callCount);
    if (callCount === 1) {
      returnValue = function_.apply(this, arguments_);
      function_ = null;
    } else if (options.throw === true) {
      throw new Error(`Function \`${functionName}\` can only be called once`);
    }
    return returnValue;
  };
  mimicFn(onetime2, function_);
  calledFunctions.set(onetime2, callCount);
  return onetime2;
};
onetime$1.exports = onetime;
onetime$1.exports.default = onetime;
onetime$1.exports.callCount = (function_) => {
  if (!calledFunctions.has(function_)) {
    throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
  }
  return calledFunctions.get(function_);
};
(function(module, exports) {
  var __classPrivateFieldSet = commonjsGlobal && commonjsGlobal.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet = commonjsGlobal && commonjsGlobal.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _a, _b;
  var _Conf_validator, _Conf_encryptionKey, _Conf_options, _Conf_defaultValues;
  Object.defineProperty(exports, "__esModule", { value: true });
  const util_12 = require$$4__default["default"];
  const fs2 = require$$0__default$2["default"];
  const path2 = require$$1__default$1["default"];
  const crypto = require$$0__default$4["default"];
  const assert2 = require$$5__default["default"];
  const events_12 = require$$0__default$3["default"];
  const dotProp$1 = dotProp;
  const pkgUp$1 = pkgUp.exports;
  const envPaths2 = envPaths$1.exports;
  const atomically = dist$1;
  const ajv_1 = ajv.exports;
  const ajv_formats_1 = dist.exports;
  const debounceFn$1 = debounceFn;
  const semver2 = semver$1;
  const onetime2 = onetime$1.exports;
  const encryptionAlgorithm = "aes-256-cbc";
  const createPlainObject = () => {
    return Object.create(null);
  };
  const isExist = (data) => {
    return data !== void 0 && data !== null;
  };
  let parentDir = "";
  try {
    delete require.cache[__filename];
    parentDir = path2.dirname((_b = (_a = module.parent) === null || _a === void 0 ? void 0 : _a.filename) !== null && _b !== void 0 ? _b : ".");
  } catch (_c) {
  }
  const checkValueType = (key, value) => {
    const nonJsonTypes = new Set([
      "undefined",
      "symbol",
      "function"
    ]);
    const type2 = typeof value;
    if (nonJsonTypes.has(type2)) {
      throw new TypeError(`Setting a value of type \`${type2}\` for key \`${key}\` is not allowed as it's not supported by JSON`);
    }
  };
  const INTERNAL_KEY = "__internal__";
  const MIGRATION_KEY = `${INTERNAL_KEY}.migrations.version`;
  class Conf2 {
    constructor(partialOptions = {}) {
      var _a2;
      _Conf_validator.set(this, void 0);
      _Conf_encryptionKey.set(this, void 0);
      _Conf_options.set(this, void 0);
      _Conf_defaultValues.set(this, {});
      this._deserialize = (value) => JSON.parse(value);
      this._serialize = (value) => JSON.stringify(value, void 0, "	");
      const options = __spreadValues({
        configName: "config",
        fileExtension: "json",
        projectSuffix: "nodejs",
        clearInvalidConfig: false,
        accessPropertiesByDotNotation: true
      }, partialOptions);
      const getPackageData = onetime2(() => {
        const packagePath = pkgUp$1.sync({ cwd: parentDir });
        const packageData = packagePath && JSON.parse(fs2.readFileSync(packagePath, "utf8"));
        return packageData !== null && packageData !== void 0 ? packageData : {};
      });
      if (!options.cwd) {
        if (!options.projectName) {
          options.projectName = getPackageData().name;
        }
        if (!options.projectName) {
          throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
        }
        options.cwd = envPaths2(options.projectName, { suffix: options.projectSuffix }).config;
      }
      __classPrivateFieldSet(this, _Conf_options, options, "f");
      if (options.schema) {
        if (typeof options.schema !== "object") {
          throw new TypeError("The `schema` option must be an object.");
        }
        const ajv2 = new ajv_1.default({
          allErrors: true,
          useDefaults: true
        });
        ajv_formats_1.default(ajv2);
        const schema2 = {
          type: "object",
          properties: options.schema
        };
        __classPrivateFieldSet(this, _Conf_validator, ajv2.compile(schema2), "f");
        for (const [key, value] of Object.entries(options.schema)) {
          if (value === null || value === void 0 ? void 0 : value.default) {
            __classPrivateFieldGet(this, _Conf_defaultValues, "f")[key] = value.default;
          }
        }
      }
      if (options.defaults) {
        __classPrivateFieldSet(this, _Conf_defaultValues, __spreadValues(__spreadValues({}, __classPrivateFieldGet(this, _Conf_defaultValues, "f")), options.defaults), "f");
      }
      if (options.serialize) {
        this._serialize = options.serialize;
      }
      if (options.deserialize) {
        this._deserialize = options.deserialize;
      }
      this.events = new events_12.EventEmitter();
      __classPrivateFieldSet(this, _Conf_encryptionKey, options.encryptionKey, "f");
      const fileExtension = options.fileExtension ? `.${options.fileExtension}` : "";
      this.path = path2.resolve(options.cwd, `${(_a2 = options.configName) !== null && _a2 !== void 0 ? _a2 : "config"}${fileExtension}`);
      const fileStore = this.store;
      const store2 = Object.assign(createPlainObject(), options.defaults, fileStore);
      this._validate(store2);
      try {
        assert2.deepEqual(fileStore, store2);
      } catch (_b2) {
        this.store = store2;
      }
      if (options.watch) {
        this._watch();
      }
      if (options.migrations) {
        if (!options.projectVersion) {
          options.projectVersion = getPackageData().version;
        }
        if (!options.projectVersion) {
          throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
        }
        this._migrate(options.migrations, options.projectVersion);
      }
    }
    get(key, defaultValue) {
      if (__classPrivateFieldGet(this, _Conf_options, "f").accessPropertiesByDotNotation) {
        return this._get(key, defaultValue);
      }
      const { store: store2 } = this;
      return key in store2 ? store2[key] : defaultValue;
    }
    set(key, value) {
      if (typeof key !== "string" && typeof key !== "object") {
        throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof key}`);
      }
      if (typeof key !== "object" && value === void 0) {
        throw new TypeError("Use `delete()` to clear values");
      }
      if (this._containsReservedKey(key)) {
        throw new TypeError(`Please don't use the ${INTERNAL_KEY} key, as it's used to manage this module internal operations.`);
      }
      const { store: store2 } = this;
      const set2 = (key2, value2) => {
        checkValueType(key2, value2);
        if (__classPrivateFieldGet(this, _Conf_options, "f").accessPropertiesByDotNotation) {
          dotProp$1.set(store2, key2, value2);
        } else {
          store2[key2] = value2;
        }
      };
      if (typeof key === "object") {
        const object = key;
        for (const [key2, value2] of Object.entries(object)) {
          set2(key2, value2);
        }
      } else {
        set2(key, value);
      }
      this.store = store2;
    }
    has(key) {
      if (__classPrivateFieldGet(this, _Conf_options, "f").accessPropertiesByDotNotation) {
        return dotProp$1.has(this.store, key);
      }
      return key in this.store;
    }
    reset(...keys) {
      for (const key of keys) {
        if (isExist(__classPrivateFieldGet(this, _Conf_defaultValues, "f")[key])) {
          this.set(key, __classPrivateFieldGet(this, _Conf_defaultValues, "f")[key]);
        }
      }
    }
    delete(key) {
      const { store: store2 } = this;
      if (__classPrivateFieldGet(this, _Conf_options, "f").accessPropertiesByDotNotation) {
        dotProp$1.delete(store2, key);
      } else {
        delete store2[key];
      }
      this.store = store2;
    }
    clear() {
      this.store = createPlainObject();
      for (const key of Object.keys(__classPrivateFieldGet(this, _Conf_defaultValues, "f"))) {
        this.reset(key);
      }
    }
    onDidChange(key, callback) {
      if (typeof key !== "string") {
        throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof key}`);
      }
      if (typeof callback !== "function") {
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof callback}`);
      }
      return this._handleChange(() => this.get(key), callback);
    }
    onDidAnyChange(callback) {
      if (typeof callback !== "function") {
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof callback}`);
      }
      return this._handleChange(() => this.store, callback);
    }
    get size() {
      return Object.keys(this.store).length;
    }
    get store() {
      try {
        const data = fs2.readFileSync(this.path, __classPrivateFieldGet(this, _Conf_encryptionKey, "f") ? null : "utf8");
        const dataString = this._encryptData(data);
        const deserializedData = this._deserialize(dataString);
        this._validate(deserializedData);
        return Object.assign(createPlainObject(), deserializedData);
      } catch (error2) {
        if (error2.code === "ENOENT") {
          this._ensureDirectory();
          return createPlainObject();
        }
        if (__classPrivateFieldGet(this, _Conf_options, "f").clearInvalidConfig && error2.name === "SyntaxError") {
          return createPlainObject();
        }
        throw error2;
      }
    }
    set store(value) {
      this._ensureDirectory();
      this._validate(value);
      this._write(value);
      this.events.emit("change");
    }
    *[(_Conf_validator = new WeakMap(), _Conf_encryptionKey = new WeakMap(), _Conf_options = new WeakMap(), _Conf_defaultValues = new WeakMap(), Symbol.iterator)]() {
      for (const [key, value] of Object.entries(this.store)) {
        yield [key, value];
      }
    }
    _encryptData(data) {
      if (!__classPrivateFieldGet(this, _Conf_encryptionKey, "f")) {
        return data.toString();
      }
      try {
        if (__classPrivateFieldGet(this, _Conf_encryptionKey, "f")) {
          try {
            if (data.slice(16, 17).toString() === ":") {
              const initializationVector = data.slice(0, 16);
              const password = crypto.pbkdf2Sync(__classPrivateFieldGet(this, _Conf_encryptionKey, "f"), initializationVector.toString(), 1e4, 32, "sha512");
              const decipher = crypto.createDecipheriv(encryptionAlgorithm, password, initializationVector);
              data = Buffer.concat([decipher.update(Buffer.from(data.slice(17))), decipher.final()]).toString("utf8");
            } else {
              const decipher = crypto.createDecipher(encryptionAlgorithm, __classPrivateFieldGet(this, _Conf_encryptionKey, "f"));
              data = Buffer.concat([decipher.update(Buffer.from(data)), decipher.final()]).toString("utf8");
            }
          } catch (_a2) {
          }
        }
      } catch (_b2) {
      }
      return data.toString();
    }
    _handleChange(getter, callback) {
      let currentValue = getter();
      const onChange = () => {
        const oldValue = currentValue;
        const newValue = getter();
        if (util_12.isDeepStrictEqual(newValue, oldValue)) {
          return;
        }
        currentValue = newValue;
        callback.call(this, newValue, oldValue);
      };
      this.events.on("change", onChange);
      return () => this.events.removeListener("change", onChange);
    }
    _validate(data) {
      if (!__classPrivateFieldGet(this, _Conf_validator, "f")) {
        return;
      }
      const valid2 = __classPrivateFieldGet(this, _Conf_validator, "f").call(this, data);
      if (valid2 || !__classPrivateFieldGet(this, _Conf_validator, "f").errors) {
        return;
      }
      const errors2 = __classPrivateFieldGet(this, _Conf_validator, "f").errors.map(({ instancePath, message = "" }) => `\`${instancePath.slice(1)}\` ${message}`);
      throw new Error("Config schema violation: " + errors2.join("; "));
    }
    _ensureDirectory() {
      fs2.mkdirSync(path2.dirname(this.path), { recursive: true });
    }
    _write(value) {
      let data = this._serialize(value);
      if (__classPrivateFieldGet(this, _Conf_encryptionKey, "f")) {
        const initializationVector = crypto.randomBytes(16);
        const password = crypto.pbkdf2Sync(__classPrivateFieldGet(this, _Conf_encryptionKey, "f"), initializationVector.toString(), 1e4, 32, "sha512");
        const cipher = crypto.createCipheriv(encryptionAlgorithm, password, initializationVector);
        data = Buffer.concat([initializationVector, Buffer.from(":"), cipher.update(Buffer.from(data)), cipher.final()]);
      }
      {
        try {
          atomically.writeFileSync(this.path, data);
        } catch (error2) {
          if (error2.code === "EXDEV") {
            fs2.writeFileSync(this.path, data);
            return;
          }
          throw error2;
        }
      }
    }
    _watch() {
      this._ensureDirectory();
      if (!fs2.existsSync(this.path)) {
        this._write(createPlainObject());
      }
      if (process.platform === "win32") {
        fs2.watch(this.path, { persistent: false }, debounceFn$1(() => {
          this.events.emit("change");
        }, { wait: 100 }));
      } else {
        fs2.watchFile(this.path, { persistent: false }, debounceFn$1(() => {
          this.events.emit("change");
        }, { wait: 5e3 }));
      }
    }
    _migrate(migrations, versionToMigrate) {
      let previousMigratedVersion = this._get(MIGRATION_KEY, "0.0.0");
      const newerVersions = Object.keys(migrations).filter((candidateVersion) => this._shouldPerformMigration(candidateVersion, previousMigratedVersion, versionToMigrate));
      let storeBackup = __spreadValues({}, this.store);
      for (const version of newerVersions) {
        try {
          const migration = migrations[version];
          migration(this);
          this._set(MIGRATION_KEY, version);
          previousMigratedVersion = version;
          storeBackup = __spreadValues({}, this.store);
        } catch (error2) {
          this.store = storeBackup;
          throw new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${error2}`);
        }
      }
      if (this._isVersionInRangeFormat(previousMigratedVersion) || !semver2.eq(previousMigratedVersion, versionToMigrate)) {
        this._set(MIGRATION_KEY, versionToMigrate);
      }
    }
    _containsReservedKey(key) {
      if (typeof key === "object") {
        const firsKey = Object.keys(key)[0];
        if (firsKey === INTERNAL_KEY) {
          return true;
        }
      }
      if (typeof key !== "string") {
        return false;
      }
      if (__classPrivateFieldGet(this, _Conf_options, "f").accessPropertiesByDotNotation) {
        if (key.startsWith(`${INTERNAL_KEY}.`)) {
          return true;
        }
        return false;
      }
      return false;
    }
    _isVersionInRangeFormat(version) {
      return semver2.clean(version) === null;
    }
    _shouldPerformMigration(candidateVersion, previousMigratedVersion, versionToMigrate) {
      if (this._isVersionInRangeFormat(candidateVersion)) {
        if (previousMigratedVersion !== "0.0.0" && semver2.satisfies(previousMigratedVersion, candidateVersion)) {
          return false;
        }
        return semver2.satisfies(versionToMigrate, candidateVersion);
      }
      if (semver2.lte(candidateVersion, previousMigratedVersion)) {
        return false;
      }
      if (semver2.gt(candidateVersion, versionToMigrate)) {
        return false;
      }
      return true;
    }
    _get(key, defaultValue) {
      return dotProp$1.get(this.store, key, defaultValue);
    }
    _set(key, value) {
      const { store: store2 } = this;
      dotProp$1.set(store2, key, value);
      this.store = store2;
    }
  }
  exports.default = Conf2;
  module.exports = Conf2;
  module.exports.default = Conf2;
})(source, source.exports);
const path = require$$1__default$1["default"];
const { app, ipcMain, ipcRenderer, shell } = require$$1__default["default"];
const Conf = source.exports;
let isInitialized = false;
const initDataListener = () => {
  if (!ipcMain || !app) {
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  }
  const appData = {
    defaultCwd: app.getPath("userData"),
    appVersion: app.getVersion()
  };
  if (isInitialized) {
    return appData;
  }
  ipcMain.on("electron-store-get-data", (event) => {
    event.returnValue = appData;
  });
  isInitialized = true;
  return appData;
};
class ElectronStore extends Conf {
  constructor(options) {
    let defaultCwd;
    let appVersion;
    if (ipcRenderer) {
      const appData = ipcRenderer.sendSync("electron-store-get-data");
      if (!appData) {
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      }
      ({ defaultCwd, appVersion } = appData);
    } else if (ipcMain && app) {
      ({ defaultCwd, appVersion } = initDataListener());
    }
    options = __spreadValues({
      name: "config"
    }, options);
    if (!options.projectVersion) {
      options.projectVersion = appVersion;
    }
    if (options.cwd) {
      options.cwd = path.isAbsolute(options.cwd) ? options.cwd : path.join(defaultCwd, options.cwd);
    } else {
      options.cwd = defaultCwd;
    }
    options.configName = options.name;
    delete options.name;
    super(options);
  }
  static initRenderer() {
    initDataListener();
  }
  openInEditor() {
    shell.openPath(this.path);
  }
}
var electronStore = ElectronStore;
const schema$1 = {
  notes: {
    type: "object",
    patternProperties: {
      "[A-Za-z0-9_-]": {
        type: "object",
        properties: {
          id: { type: "string", default: "" },
          title: { type: "string", default: "" },
          content: { type: "object", default: { type: "doc", content: [] } },
          labels: { type: "array", default: [] },
          createdAt: { type: "number", default: Date.now() },
          updatedAt: { type: "number", default: Date.now() },
          isBookmarked: { type: "boolean", default: false },
          isArchived: { type: "boolean", default: false },
          lastCursorPosition: { type: "number", default: 0 }
        }
      }
    }
  },
  labels: {
    type: "array"
  }
};
const store$1 = new electronStore({
  schema: schema$1,
  encryptionKey: {}.VITE_ENCRYPT_KEY
});
const schema = {
  dataDir: {
    type: "string",
    default: require$$1.app.getPath("userData")
  }
};
var settings = new electronStore({ name: "settings", schema, encryptionKey: {}.VITE_ENCRYPT_KEY });
var store = {
  data: store$1,
  settings
};
const isSingleInstance = require$$1.app.requestSingleInstanceLock();
if (!isSingleInstance) {
  require$$1.app.quit();
  process.exit(0);
}
require$$1.app.disableHardwareAcceleration();
const env = { "VITE_DEV_SERVER_URL": "http://localhost:3000/", "BASE_URL": "/", "MODE": "development", "DEV": true, "PROD": false };
{
  require$$1.app.whenReady().then(() => Promise.resolve().then(function() {
    return /* @__PURE__ */ _interopNamespace(require("electron-devtools-installer"));
  })).then(({ default: installExtension, VUEJS3_DEVTOOLS }) => installExtension(VUEJS3_DEVTOOLS, {
    loadExtensionOptions: {
      allowFileAccess: true
    }
  })).catch((e) => console.error("Failed install extension:", e));
}
let mainWindow = null;
const createWindow = async () => {
  mainWindow = new require$$1.BrowserWindow({
    show: false,
    width: 950,
    height: 600,
    webPreferences: {
      preload: require$$1$1.join(__dirname, "../../preload/dist/index.cjs"),
      contextIsolation: env.MODE !== "test",
      enableRemoteModule: env.MODE === "test"
    }
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.on("ready-to-show", () => {
    mainWindow == null ? void 0 : mainWindow.show();
    {
      mainWindow == null ? void 0 : mainWindow.webContents.openDevTools();
    }
  });
  mainWindow == null ? void 0 : mainWindow.webContents.on("new-window", function(event, url) {
    event.preventDefault();
    if (url.startsWith("note://"))
      return;
    require$$1.shell.openExternal(url);
  });
  const pageUrl = env.VITE_DEV_SERVER_URL;
  await mainWindow.loadURL(pageUrl);
};
require$$1.app.on("second-instance", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized())
      mainWindow.restore();
    mainWindow.focus();
  }
});
require$$1.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    require$$1.app.quit();
  }
});
require$$1.app.whenReady().then(async () => {
  require$$1.protocol.registerFileProtocol("assets", (request, callback) => {
    const url = request.url.substr(9);
    const dir = store.settings.get("dataDir");
    const imgPath = `${dir}/notes-assets/${url}`;
    callback({ path: require$$1$1.normalize(imgPath) });
  });
  await lib.ensureDir(require$$1$1.join(require$$1.app.getPath("userData"), "notes-assets"));
  await createWindow();
}).catch((e) => console.error("Failed create window:", e));
ipcMain$1.answerRenderer("app:info", () => ({
  name: require$$1.app.getName(),
  version: require$$1.app.getVersion()
}));
ipcMain$1.answerRenderer("dialog:open", (props) => require$$1.dialog.showOpenDialog(props));
ipcMain$1.answerRenderer("dialog:message", (props) => require$$1.dialog.showMessageBox(props));
ipcMain$1.answerRenderer("dialog:save", (props) => require$$1.dialog.showSaveDialog(props));
ipcMain$1.answerRenderer("fs:copy", ({ path: path2, dest }) => lib.copy(path2, dest));
ipcMain$1.answerRenderer("fs:output-json", ({ path: path2, data }) => lib.outputJson(path2, data));
ipcMain$1.answerRenderer("fs:read-json", (path2) => lib.readJson(path2));
ipcMain$1.answerRenderer("fs:ensureDir", (path2) => lib.ensureDir(path2));
ipcMain$1.answerRenderer("fs:pathExists", (path2) => lib.pathExistsSync(path2));
ipcMain$1.answerRenderer("fs:remove", (path2) => lib.remove(path2));
ipcMain$1.answerRenderer("helper:relaunch", (options = {}) => {
  require$$1.app.relaunch(__spreadValues({ args: process.argv.slice(1).concat(["--relaunch"]) }, options));
  require$$1.app.exit(0);
});
ipcMain$1.answerRenderer("helper:get-path", (name) => require$$1.app.getPath(name));
ipcMain$1.answerRenderer("helper:is-dark-theme", () => require$$1.nativeTheme.shouldUseDarkColors);
ipcMain$1.answerRenderer("storage:store", (name) => {
  var _a;
  return (_a = store[name]) == null ? void 0 : _a.store;
});
ipcMain$1.answerRenderer("storage:replace", ({ name, data }) => store[name].store = data);
ipcMain$1.answerRenderer("storage:get", ({ name, key, def: def2 }) => {
  var _a;
  return (_a = store[name]) == null ? void 0 : _a.get(key, def2);
});
ipcMain$1.answerRenderer("storage:set", ({ name, key, value }) => {
  var _a;
  return (_a = store[name]) == null ? void 0 : _a.set(key, value);
});
ipcMain$1.answerRenderer("storage:delete", ({ name, key }) => {
  var _a;
  return (_a = store[name]) == null ? void 0 : _a.delete(key);
});
ipcMain$1.answerRenderer("storage:has", ({ name, key }) => {
  var _a;
  return (_a = store[name]) == null ? void 0 : _a.has(key);
});
ipcMain$1.answerRenderer("storage:clear", (name) => {
  var _a;
  return (_a = store[name]) == null ? void 0 : _a.clear();
});