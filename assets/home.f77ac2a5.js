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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { r as react, j as jsx, F as Fragment, P as PropTypes, a as jsxs, R as React } from "./index.e8869c89.js";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
}
var COMMON_MIME_TYPES = /* @__PURE__ */ new Map([
  ["avi", "video/avi"],
  ["gif", "image/gif"],
  ["ico", "image/x-icon"],
  ["jpeg", "image/jpeg"],
  ["jpg", "image/jpeg"],
  ["mkv", "video/x-matroska"],
  ["mov", "video/quicktime"],
  ["mp4", "video/mp4"],
  ["pdf", "application/pdf"],
  ["png", "image/png"],
  ["zip", "application/zip"],
  ["doc", "application/msword"],
  ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
]);
function toFileWithPath(file, path) {
  var f = withMimeType(file);
  if (typeof f.path !== "string") {
    var webkitRelativePath = file.webkitRelativePath;
    Object.defineProperty(f, "path", {
      value: typeof path === "string" ? path : typeof webkitRelativePath === "string" && webkitRelativePath.length > 0 ? webkitRelativePath : file.name,
      writable: false,
      configurable: false,
      enumerable: true
    });
  }
  return f;
}
function withMimeType(file) {
  var name = file.name;
  var hasExtension = name && name.lastIndexOf(".") !== -1;
  if (hasExtension && !file.type) {
    var ext = name.split(".").pop().toLowerCase();
    var type = COMMON_MIME_TYPES.get(ext);
    if (type) {
      Object.defineProperty(file, "type", {
        value: type,
        writable: false,
        configurable: false,
        enumerable: true
      });
    }
  }
  return file;
}
var FILES_TO_IGNORE = [
  ".DS_Store",
  "Thumbs.db"
];
function fromEvent(evt) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [2, isDragEvt(evt) && evt.dataTransfer ? getDataTransferFiles(evt.dataTransfer, evt.type) : getInputFiles(evt)];
    });
  });
}
function isDragEvt(value) {
  return !!value.dataTransfer;
}
function getInputFiles(evt) {
  var files = isInput(evt.target) ? evt.target.files ? fromList(evt.target.files) : [] : [];
  return files.map(function(file) {
    return toFileWithPath(file);
  });
}
function isInput(value) {
  return value !== null;
}
function getDataTransferFiles(dt, type) {
  return __awaiter(this, void 0, void 0, function() {
    var items, files;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (!dt.items)
            return [3, 2];
          items = fromList(dt.items).filter(function(item) {
            return item.kind === "file";
          });
          if (type !== "drop") {
            return [2, items];
          }
          return [4, Promise.all(items.map(toFilePromises))];
        case 1:
          files = _a.sent();
          return [2, noIgnoredFiles(flatten(files))];
        case 2:
          return [2, noIgnoredFiles(fromList(dt.files).map(function(file) {
            return toFileWithPath(file);
          }))];
      }
    });
  });
}
function noIgnoredFiles(files) {
  return files.filter(function(file) {
    return FILES_TO_IGNORE.indexOf(file.name) === -1;
  });
}
function fromList(items) {
  var files = [];
  for (var i = 0; i < items.length; i++) {
    var file = items[i];
    files.push(file);
  }
  return files;
}
function toFilePromises(item) {
  if (typeof item.webkitGetAsEntry !== "function") {
    return fromDataTransferItem(item);
  }
  var entry = item.webkitGetAsEntry();
  if (entry && entry.isDirectory) {
    return fromDirEntry(entry);
  }
  return fromDataTransferItem(item);
}
function flatten(items) {
  return items.reduce(function(acc, files) {
    return __spread(acc, Array.isArray(files) ? flatten(files) : [files]);
  }, []);
}
function fromDataTransferItem(item) {
  var file = item.getAsFile();
  if (!file) {
    return Promise.reject(item + " is not a File");
  }
  var fwp = toFileWithPath(file);
  return Promise.resolve(fwp);
}
function fromEntry(entry) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [2, entry.isDirectory ? fromDirEntry(entry) : fromFileEntry(entry)];
    });
  });
}
function fromDirEntry(entry) {
  var reader = entry.createReader();
  return new Promise(function(resolve, reject) {
    var entries = [];
    function readEntries() {
      var _this = this;
      reader.readEntries(function(batch) {
        return __awaiter(_this, void 0, void 0, function() {
          var files, err_1, items;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                if (!!batch.length)
                  return [3, 5];
                _a.label = 1;
              case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, Promise.all(entries)];
              case 2:
                files = _a.sent();
                resolve(files);
                return [3, 4];
              case 3:
                err_1 = _a.sent();
                reject(err_1);
                return [3, 4];
              case 4:
                return [3, 6];
              case 5:
                items = Promise.all(batch.map(fromEntry));
                entries.push(items);
                readEntries();
                _a.label = 6;
              case 6:
                return [2];
            }
          });
        });
      }, function(err) {
        reject(err);
      });
    }
    readEntries();
  });
}
function fromFileEntry(entry) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [2, new Promise(function(resolve, reject) {
        entry.file(function(file) {
          var fwp = toFileWithPath(file, entry.fullPath);
          resolve(fwp);
        }, function(err) {
          reject(err);
        });
      })];
    });
  });
}
var _default = function(file, acceptedFiles) {
  if (file && acceptedFiles) {
    var acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(",");
    var fileName = file.name || "";
    var mimeType = (file.type || "").toLowerCase();
    var baseMimeType = mimeType.replace(/\/.*$/, "");
    return acceptedFilesArray.some(function(type) {
      var validType = type.trim().toLowerCase();
      if (validType.charAt(0) === ".") {
        return fileName.toLowerCase().endsWith(validType);
      } else if (validType.endsWith("/*")) {
        return baseMimeType === validType.replace(/\/.*$/, "");
      }
      return mimeType === validType;
    });
  }
  return true;
};
function fileAccepted(file, accept) {
  return file.type === "application/x-moz-file" || _default(file, accept);
}
function fileMatchSize(file, minSize, maxSize) {
  if (isDefined(file.size)) {
    if (isDefined(minSize) && isDefined(maxSize))
      return file.size >= minSize && file.size <= maxSize;
    else if (isDefined(minSize))
      return file.size >= minSize;
    else if (isDefined(maxSize))
      return file.size <= maxSize;
  }
  return true;
}
function isDefined(value) {
  return value !== void 0 && value !== null;
}
function allFilesAccepted(_ref) {
  var files = _ref.files, accept = _ref.accept, minSize = _ref.minSize, maxSize = _ref.maxSize, multiple = _ref.multiple;
  if (!multiple && files.length > 1) {
    return false;
  }
  return files.every(function(file) {
    return fileAccepted(file, accept) && fileMatchSize(file, minSize, maxSize);
  });
}
function isPropagationStopped(event) {
  if (typeof event.isPropagationStopped === "function") {
    return event.isPropagationStopped();
  } else if (typeof event.cancelBubble !== "undefined") {
    return event.cancelBubble;
  }
  return false;
}
function isEvtWithFiles(event) {
  if (!event.dataTransfer) {
    return !!event.target && !!event.target.files;
  }
  return Array.prototype.some.call(event.dataTransfer.types, function(type) {
    return type === "Files" || type === "application/x-moz-file";
  });
}
function onDocumentDragOver(event) {
  event.preventDefault();
}
function isIe(userAgent) {
  return userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident/") !== -1;
}
function isEdge(userAgent) {
  return userAgent.indexOf("Edge/") !== -1;
}
function isIeOrEdge() {
  var userAgent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.navigator.userAgent;
  return isIe(userAgent) || isEdge(userAgent);
}
function composeEventHandlers() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function(event) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return fns.some(function(fn) {
      if (!isPropagationStopped(event) && fn) {
        fn.apply(void 0, [event].concat(args));
      }
      return isPropagationStopped(event);
    });
  };
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]")
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = void 0;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var Dropzone = react.exports.forwardRef(function(_ref, ref) {
  var children = _ref.children, params = _objectWithoutProperties(_ref, ["children"]);
  var _useDropzone = useDropzone(params), open2 = _useDropzone.open, props = _objectWithoutProperties(_useDropzone, ["open"]);
  react.exports.useImperativeHandle(ref, function() {
    return {
      open: open2
    };
  }, [open2]);
  return /* @__PURE__ */ jsx(Fragment, {
    children: children(_objectSpread({}, props, {
      open: open2
    }))
  });
});
Dropzone.displayName = "Dropzone";
Dropzone.propTypes = {
  children: PropTypes.func,
  accept: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  multiple: PropTypes.bool,
  preventDropOnDocument: PropTypes.bool,
  noClick: PropTypes.bool,
  noKeyboard: PropTypes.bool,
  noDrag: PropTypes.bool,
  noDragEventsBubbling: PropTypes.bool,
  minSize: PropTypes.number,
  maxSize: PropTypes.number,
  disabled: PropTypes.bool,
  getFilesFromEvent: PropTypes.func,
  onFileDialogCancel: PropTypes.func,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDropRejected: PropTypes.func
};
var initialState = {
  isFocused: false,
  isFileDialogActive: false,
  isDragActive: false,
  isDragAccept: false,
  isDragReject: false,
  draggedFiles: [],
  acceptedFiles: [],
  rejectedFiles: []
};
function useDropzone() {
  var _ref2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, accept = _ref2.accept, _ref2$disabled = _ref2.disabled, disabled = _ref2$disabled === void 0 ? false : _ref2$disabled, _ref2$getFilesFromEve = _ref2.getFilesFromEvent, getFilesFromEvent = _ref2$getFilesFromEve === void 0 ? fromEvent : _ref2$getFilesFromEve, _ref2$maxSize = _ref2.maxSize, maxSize = _ref2$maxSize === void 0 ? Infinity : _ref2$maxSize, _ref2$minSize = _ref2.minSize, minSize = _ref2$minSize === void 0 ? 0 : _ref2$minSize, _ref2$multiple = _ref2.multiple, multiple = _ref2$multiple === void 0 ? true : _ref2$multiple, onDragEnter = _ref2.onDragEnter, onDragLeave = _ref2.onDragLeave, onDragOver = _ref2.onDragOver, onDrop = _ref2.onDrop, onDropAccepted = _ref2.onDropAccepted, onDropRejected = _ref2.onDropRejected, onFileDialogCancel = _ref2.onFileDialogCancel, _ref2$preventDropOnDo = _ref2.preventDropOnDocument, preventDropOnDocument = _ref2$preventDropOnDo === void 0 ? true : _ref2$preventDropOnDo, _ref2$noClick = _ref2.noClick, noClick = _ref2$noClick === void 0 ? false : _ref2$noClick, _ref2$noKeyboard = _ref2.noKeyboard, noKeyboard = _ref2$noKeyboard === void 0 ? false : _ref2$noKeyboard, _ref2$noDrag = _ref2.noDrag, noDrag = _ref2$noDrag === void 0 ? false : _ref2$noDrag, _ref2$noDragEventsBub = _ref2.noDragEventsBubbling, noDragEventsBubbling = _ref2$noDragEventsBub === void 0 ? false : _ref2$noDragEventsBub;
  var rootRef = react.exports.useRef(null);
  var inputRef = react.exports.useRef(null);
  var _useReducer = react.exports.useReducer(reducer, initialState), _useReducer2 = _slicedToArray(_useReducer, 2), state = _useReducer2[0], dispatch = _useReducer2[1];
  var isFocused = state.isFocused, isFileDialogActive = state.isFileDialogActive, draggedFiles = state.draggedFiles;
  var openFileDialog = react.exports.useCallback(function() {
    if (inputRef.current) {
      dispatch({
        type: "openDialog"
      });
      inputRef.current.value = null;
      inputRef.current.click();
    }
  }, [dispatch]);
  var onWindowFocus = function onWindowFocus2() {
    if (isFileDialogActive) {
      setTimeout(function() {
        if (inputRef.current) {
          var files = inputRef.current.files;
          if (!files.length) {
            dispatch({
              type: "closeDialog"
            });
            if (typeof onFileDialogCancel === "function") {
              onFileDialogCancel();
            }
          }
        }
      }, 300);
    }
  };
  react.exports.useEffect(function() {
    window.addEventListener("focus", onWindowFocus, false);
    return function() {
      window.removeEventListener("focus", onWindowFocus, false);
    };
  }, [inputRef, isFileDialogActive, onFileDialogCancel]);
  var onKeyDownCb = react.exports.useCallback(function(event) {
    if (!rootRef.current || !rootRef.current.isEqualNode(event.target)) {
      return;
    }
    if (event.keyCode === 32 || event.keyCode === 13) {
      event.preventDefault();
      openFileDialog();
    }
  }, [rootRef, inputRef]);
  var onFocusCb = react.exports.useCallback(function() {
    dispatch({
      type: "focus"
    });
  }, []);
  var onBlurCb = react.exports.useCallback(function() {
    dispatch({
      type: "blur"
    });
  }, []);
  var onClickCb = react.exports.useCallback(function() {
    if (noClick) {
      return;
    }
    if (isIeOrEdge()) {
      setTimeout(openFileDialog, 0);
    } else {
      openFileDialog();
    }
  }, [inputRef, noClick]);
  var dragTargetsRef = react.exports.useRef([]);
  var onDocumentDrop = function onDocumentDrop2(event) {
    if (rootRef.current && rootRef.current.contains(event.target)) {
      return;
    }
    event.preventDefault();
    dragTargetsRef.current = [];
  };
  react.exports.useEffect(function() {
    if (preventDropOnDocument) {
      document.addEventListener("dragover", onDocumentDragOver, false);
      document.addEventListener("drop", onDocumentDrop, false);
    }
    return function() {
      if (preventDropOnDocument) {
        document.removeEventListener("dragover", onDocumentDragOver);
        document.removeEventListener("drop", onDocumentDrop);
      }
    };
  }, [rootRef, preventDropOnDocument]);
  var onDragEnterCb = react.exports.useCallback(function(event) {
    event.preventDefault();
    event.persist();
    stopPropagation(event);
    if (dragTargetsRef.current.indexOf(event.target) === -1) {
      dragTargetsRef.current = [].concat(_toConsumableArray(dragTargetsRef.current), [event.target]);
    }
    if (isEvtWithFiles(event)) {
      Promise.resolve(getFilesFromEvent(event)).then(function(draggedFiles2) {
        if (isPropagationStopped(event) && !noDragEventsBubbling) {
          return;
        }
        dispatch({
          draggedFiles: draggedFiles2,
          isDragActive: true,
          type: "setDraggedFiles"
        });
        if (onDragEnter) {
          onDragEnter(event);
        }
      });
    }
  }, [getFilesFromEvent, onDragEnter, noDragEventsBubbling]);
  var onDragOverCb = react.exports.useCallback(function(event) {
    event.preventDefault();
    event.persist();
    stopPropagation(event);
    if (event.dataTransfer) {
      try {
        event.dataTransfer.dropEffect = "copy";
      } catch (_unused) {
      }
    }
    if (isEvtWithFiles(event) && onDragOver) {
      onDragOver(event);
    }
    return false;
  }, [onDragOver, noDragEventsBubbling]);
  var onDragLeaveCb = react.exports.useCallback(function(event) {
    event.preventDefault();
    event.persist();
    stopPropagation(event);
    var targets = dragTargetsRef.current.filter(function(target) {
      return target !== event.target && rootRef.current && rootRef.current.contains(target);
    });
    dragTargetsRef.current = targets;
    if (targets.length > 0) {
      return;
    }
    dispatch({
      isDragActive: false,
      type: "setDraggedFiles",
      draggedFiles: []
    });
    if (isEvtWithFiles(event) && onDragLeave) {
      onDragLeave(event);
    }
  }, [rootRef, onDragLeave, noDragEventsBubbling]);
  var onDropCb = react.exports.useCallback(function(event) {
    event.preventDefault();
    event.persist();
    stopPropagation(event);
    dragTargetsRef.current = [];
    if (isEvtWithFiles(event)) {
      Promise.resolve(getFilesFromEvent(event)).then(function(files) {
        if (isPropagationStopped(event) && !noDragEventsBubbling) {
          return;
        }
        var acceptedFiles = [];
        var rejectedFiles = [];
        files.forEach(function(file) {
          if (fileAccepted(file, accept) && fileMatchSize(file, minSize, maxSize)) {
            acceptedFiles.push(file);
          } else {
            rejectedFiles.push(file);
          }
        });
        if (!multiple && acceptedFiles.length > 1) {
          rejectedFiles.push.apply(rejectedFiles, _toConsumableArray(acceptedFiles.splice(0)));
        }
        dispatch({
          acceptedFiles,
          rejectedFiles,
          type: "setFiles"
        });
        if (onDrop) {
          onDrop(acceptedFiles, rejectedFiles, event);
        }
        if (rejectedFiles.length > 0 && onDropRejected) {
          onDropRejected(rejectedFiles, event);
        }
        if (acceptedFiles.length > 0 && onDropAccepted) {
          onDropAccepted(acceptedFiles, event);
        }
      });
    }
    dispatch({
      type: "reset"
    });
  }, [multiple, accept, minSize, maxSize, getFilesFromEvent, onDrop, onDropAccepted, onDropRejected, noDragEventsBubbling]);
  var composeHandler = function composeHandler2(fn) {
    return disabled ? null : fn;
  };
  var composeKeyboardHandler = function composeKeyboardHandler2(fn) {
    return noKeyboard ? null : composeHandler(fn);
  };
  var composeDragHandler = function composeDragHandler2(fn) {
    return noDrag ? null : composeHandler(fn);
  };
  var stopPropagation = function stopPropagation2(event) {
    if (noDragEventsBubbling) {
      event.stopPropagation();
    }
  };
  var getRootProps = react.exports.useMemo(function() {
    return function() {
      var _ref3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref3$refKey = _ref3.refKey, refKey = _ref3$refKey === void 0 ? "ref" : _ref3$refKey, onKeyDown = _ref3.onKeyDown, onFocus = _ref3.onFocus, onBlur = _ref3.onBlur, onClick = _ref3.onClick, onDragEnter2 = _ref3.onDragEnter, onDragOver2 = _ref3.onDragOver, onDragLeave2 = _ref3.onDragLeave, onDrop2 = _ref3.onDrop, rest = _objectWithoutProperties(_ref3, ["refKey", "onKeyDown", "onFocus", "onBlur", "onClick", "onDragEnter", "onDragOver", "onDragLeave", "onDrop"]);
      return _objectSpread(_defineProperty({
        onKeyDown: composeKeyboardHandler(composeEventHandlers(onKeyDown, onKeyDownCb)),
        onFocus: composeKeyboardHandler(composeEventHandlers(onFocus, onFocusCb)),
        onBlur: composeKeyboardHandler(composeEventHandlers(onBlur, onBlurCb)),
        onClick: composeHandler(composeEventHandlers(onClick, onClickCb)),
        onDragEnter: composeDragHandler(composeEventHandlers(onDragEnter2, onDragEnterCb)),
        onDragOver: composeDragHandler(composeEventHandlers(onDragOver2, onDragOverCb)),
        onDragLeave: composeDragHandler(composeEventHandlers(onDragLeave2, onDragLeaveCb)),
        onDrop: composeDragHandler(composeEventHandlers(onDrop2, onDropCb))
      }, refKey, rootRef), !disabled && !noKeyboard ? {
        tabIndex: 0
      } : {}, {}, rest);
    };
  }, [rootRef, onKeyDownCb, onFocusCb, onBlurCb, onClickCb, onDragEnterCb, onDragOverCb, onDragLeaveCb, onDropCb, noKeyboard, noDrag, disabled]);
  var onInputElementClick = react.exports.useCallback(function(event) {
    event.stopPropagation();
  }, []);
  var getInputProps = react.exports.useMemo(function() {
    return function() {
      var _ref4 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref4$refKey = _ref4.refKey, refKey = _ref4$refKey === void 0 ? "ref" : _ref4$refKey, onChange = _ref4.onChange, onClick = _ref4.onClick, rest = _objectWithoutProperties(_ref4, ["refKey", "onChange", "onClick"]);
      var inputProps = _defineProperty({
        accept,
        multiple,
        type: "file",
        style: {
          display: "none"
        },
        onChange: composeHandler(composeEventHandlers(onChange, onDropCb)),
        onClick: composeHandler(composeEventHandlers(onClick, onInputElementClick)),
        autoComplete: "off",
        tabIndex: -1
      }, refKey, inputRef);
      return _objectSpread({}, inputProps, {}, rest);
    };
  }, [inputRef, accept, multiple, onDropCb, disabled]);
  var fileCount = draggedFiles.length;
  var isDragAccept = fileCount > 0 && allFilesAccepted({
    files: draggedFiles,
    accept,
    minSize,
    maxSize,
    multiple
  });
  var isDragReject = fileCount > 0 && !isDragAccept;
  return _objectSpread({}, state, {
    isDragAccept,
    isDragReject,
    isFocused: isFocused && !disabled,
    getRootProps,
    getInputProps,
    rootRef,
    inputRef,
    open: composeHandler(openFileDialog)
  });
}
function reducer(state, action) {
  switch (action.type) {
    case "focus":
      return _objectSpread({}, state, {
        isFocused: true
      });
    case "blur":
      return _objectSpread({}, state, {
        isFocused: false
      });
    case "openDialog":
      return _objectSpread({}, state, {
        isFileDialogActive: true
      });
    case "closeDialog":
      return _objectSpread({}, state, {
        isFileDialogActive: false
      });
    case "setDraggedFiles":
      var isDragActive = action.isDragActive, draggedFiles = action.draggedFiles;
      return _objectSpread({}, state, {
        draggedFiles,
        isDragActive
      });
    case "setFiles":
      return _objectSpread({}, state, {
        acceptedFiles: action.acceptedFiles,
        rejectedFiles: action.rejectedFiles
      });
    case "reset":
      return _objectSpread({}, state, {
        isFileDialogActive: false,
        isDragActive: false,
        draggedFiles: [],
        acceptedFiles: [],
        rejectedFiles: []
      });
    default:
      return state;
  }
}
var styles$4 = "";
function convertUriToImageData(uri) {
  return new Promise(function(resolve, reject) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context)
      return reject();
    const image = new Image();
    image.addEventListener("load", function() {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(context.getImageData(0, 0, canvas.width, canvas.height));
    }, false);
    image.src = uri;
  });
}
const ImageUpload = ({
  onUpload
}) => {
  const onDrop = react.exports.useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        const dataUri = reader.result;
        if (dataUri) {
          const imageData = await convertUriToImageData(dataUri);
          onUpload(imageData);
        }
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: ["image/png", "image/gif", "image/jpeg"]
  });
  return /* @__PURE__ */ jsxs("div", __spreadProps(__spreadValues({
    className: "dragDrop"
  }, getRootProps()), {
    children: [/* @__PURE__ */ jsx("input", __spreadValues({}, getInputProps())), isDragActive ? /* @__PURE__ */ jsx("p", {
      children: "Drop the files here ..."
    }) : /* @__PURE__ */ jsx("p", {
      children: "Drag `n` drop some files here, or click to select files"
    })]
  }));
};
var FileSaver_min = { exports: {} };
(function(module, exports) {
  (function(a, b) {
    b();
  })(commonjsGlobal, function() {
    function b(a2, b2) {
      return typeof b2 == "undefined" ? b2 = { autoBom: false } : typeof b2 != "object" && (console.warn("Deprecated: Expected third argument to be a object"), b2 = { autoBom: !b2 }), b2.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a2.type) ? new Blob(["\uFEFF", a2], { type: a2.type }) : a2;
    }
    function c(a2, b2, c2) {
      var d2 = new XMLHttpRequest();
      d2.open("GET", a2), d2.responseType = "blob", d2.onload = function() {
        g(d2.response, b2, c2);
      }, d2.onerror = function() {
        console.error("could not download file");
      }, d2.send();
    }
    function d(a2) {
      var b2 = new XMLHttpRequest();
      b2.open("HEAD", a2, false);
      try {
        b2.send();
      } catch (a3) {
      }
      return 200 <= b2.status && 299 >= b2.status;
    }
    function e(a2) {
      try {
        a2.dispatchEvent(new MouseEvent("click"));
      } catch (c2) {
        var b2 = document.createEvent("MouseEvents");
        b2.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null), a2.dispatchEvent(b2);
      }
    }
    var f = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof commonjsGlobal == "object" && commonjsGlobal.global === commonjsGlobal ? commonjsGlobal : void 0, a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), g = f.saveAs || (typeof window != "object" || window !== f ? function() {
    } : "download" in HTMLAnchorElement.prototype && !a ? function(b2, g2, h) {
      var i = f.URL || f.webkitURL, j = document.createElement("a");
      g2 = g2 || b2.name || "download", j.download = g2, j.rel = "noopener", typeof b2 == "string" ? (j.href = b2, j.origin === location.origin ? e(j) : d(j.href) ? c(b2, g2, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b2), setTimeout(function() {
        i.revokeObjectURL(j.href);
      }, 4e4), setTimeout(function() {
        e(j);
      }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function(f2, g2, h) {
      if (g2 = g2 || f2.name || "download", typeof f2 != "string")
        navigator.msSaveOrOpenBlob(b(f2, h), g2);
      else if (d(f2))
        c(f2, g2, h);
      else {
        var i = document.createElement("a");
        i.href = f2, i.target = "_blank", setTimeout(function() {
          e(i);
        });
      }
    } : function(b2, d2, e2, g2) {
      if (g2 = g2 || open("", "_blank"), g2 && (g2.document.title = g2.document.body.innerText = "downloading..."), typeof b2 == "string")
        return c(b2, d2, e2);
      var h = b2.type === "application/octet-stream", i = /constructor/i.test(f.HTMLElement) || f.safari, j = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((j || h && i || a) && typeof FileReader != "undefined") {
        var k = new FileReader();
        k.onloadend = function() {
          var a2 = k.result;
          a2 = j ? a2 : a2.replace(/^data:[^;]*;/, "data:attachment/file;"), g2 ? g2.location.href = a2 : location = a2, g2 = null;
        }, k.readAsDataURL(b2);
      } else {
        var l = f.URL || f.webkitURL, m = l.createObjectURL(b2);
        g2 ? g2.location = m : location.href = m, g2 = null, setTimeout(function() {
          l.revokeObjectURL(m);
        }, 4e4);
      }
    });
    f.saveAs = g.saveAs = g, module.exports = g;
  });
})(FileSaver_min);
var fileSaver = FileSaver_min.exports;
const SaveImage = (image) => {
  const blobPromise = image.ToBlob();
  blobPromise.then((value) => {
    fileSaver.saveAs(value, "output.png");
  });
};
var MaskType = /* @__PURE__ */ ((MaskType2) => {
  MaskType2[MaskType2["Background"] = 0] = "Background";
  MaskType2[MaskType2["Foreground"] = 1] = "Foreground";
  MaskType2[MaskType2["ProbablyBackground"] = 2] = "ProbablyBackground";
  MaskType2[MaskType2["ProbablyForeground"] = 3] = "ProbablyForeground";
  return MaskType2;
})(MaskType || {});
var styles$3 = "";
var styles$2 = "";
const ResizeCanvas = (size, ctx) => {
  ctx.canvas.width = size.width;
  ctx.canvas.height = size.height;
};
const GetContext = (canvasRef) => {
  const canvas = canvasRef.current;
  if (!canvas)
    return null;
  const ctx = canvas.getContext("2d");
  if (!ctx)
    return null;
  return ctx;
};
class ExtendedCanvas extends React.Component {
  constructor(props) {
    super(props);
    __publicField(this, "canvasRef");
    this.canvasRef = React.createRef();
  }
  Draw() {
    const ctx = GetContext(this.canvasRef);
    if (!ctx)
      return;
    ctx.imageSmoothingEnabled = this.props.smoothingEnabled !== void 0 ? this.props.smoothingEnabled : true;
    ctx.save();
    ctx.resetTransform();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
    this.props.draw(ctx);
  }
  componentDidMount() {
    const ctx = GetContext(this.canvasRef);
    if (!ctx)
      return;
    ResizeCanvas(this.props.size, ctx);
    ctx.setTransform(this.props.scale, 0, 0, this.props.scale, this.props.position.x, this.props.position.y);
    this.Draw();
  }
  componentDidUpdate(prevProps) {
    const ctx = GetContext(this.canvasRef);
    if (!ctx)
      return;
    let dirty = this.props.position !== prevProps.position || this.props.scale !== prevProps.scale;
    if (this.props.size !== prevProps.size) {
      ResizeCanvas(this.props.size, ctx);
      dirty = true;
    }
    if (dirty) {
      ctx.setTransform(this.props.scale, 0, 0, this.props.scale, this.props.position.x, this.props.position.y);
      this.Draw();
    }
  }
  render() {
    return /* @__PURE__ */ jsx("canvas", {
      className: this.props.className,
      ref: this.canvasRef
    });
  }
}
const DrawableRenderer = ({
  className,
  position,
  scale,
  size,
  smoothingEnabled,
  drawable
}) => {
  const drawableCanvasRef = React.useRef(null);
  react.exports.useEffect(() => {
    if (drawableCanvasRef.current) {
      drawableCanvasRef.current.Draw();
    }
  }, [drawable]);
  return /* @__PURE__ */ jsx(ExtendedCanvas, {
    className,
    position,
    scale,
    size,
    smoothingEnabled,
    draw: (ctx) => {
      if (drawable)
        drawable.DrawToContext(0, 0, ctx);
    },
    ref: drawableCanvasRef
  });
};
const DynamicCanvas = ({
  className,
  position,
  scale,
  size,
  smoothingEnabled,
  drawable
}) => {
  const drawableCanvasRef = React.useRef(null);
  react.exports.useEffect(() => {
    const redraw = () => {
      if (drawableCanvasRef.current) {
        drawableCanvasRef.current.Draw();
      }
    };
    if (drawable) {
      redraw();
      drawable.onChange.push(redraw);
    }
  }, [drawable]);
  return /* @__PURE__ */ jsx(ExtendedCanvas, {
    className,
    position,
    scale,
    size,
    smoothingEnabled,
    draw: (ctx) => {
      if (drawable)
        drawable.DrawToContext(0, 0, ctx);
    },
    ref: drawableCanvasRef
  });
};
const MaskEditorRenderer = ({
  position,
  scale,
  size,
  baseImage,
  maskEditor,
  ghostRenderer,
  edgeRenderer,
  targetMaskType,
  brushSize,
  onMaskChanged
}) => {
  const divRef = React.useRef(null);
  const [drawingState, setDrawingState] = react.exports.useState({
    IsDrawing: false,
    LastX: 0,
    LastY: 0
  });
  react.exports.useMemo(() => {
    if (maskEditor) {
      maskEditor.SetBrush(Math.min(Math.ceil(brushSize / scale), brushSize), targetMaskType);
    }
  }, [maskEditor, targetMaskType, brushSize, scale]);
  react.exports.useMemo(() => {
    if (ghostRenderer) {
      ghostRenderer.SetBrush(Math.min(Math.ceil(brushSize / scale), brushSize), targetMaskType);
    }
  }, [ghostRenderer, targetMaskType, brushSize, scale]);
  return /* @__PURE__ */ jsxs("div", {
    className: "rendererDiv",
    ref: divRef,
    onPointerUp: () => {
      if (drawingState.IsDrawing) {
        if (maskEditor && onMaskChanged) {
          onMaskChanged();
        }
        setDrawingState(__spreadProps(__spreadValues({}, drawingState), {
          IsDrawing: false
        }));
      }
    },
    onPointerOut: () => {
      if (drawingState.IsDrawing) {
        if (maskEditor && onMaskChanged) {
          onMaskChanged();
        }
        setDrawingState(__spreadProps(__spreadValues({}, drawingState), {
          IsDrawing: false
        }));
      }
      if (ghostRenderer) {
        ghostRenderer.ClearGhost();
      }
    },
    onPointerDown: (evt) => {
      if ((evt.buttons & 1) !== 1)
        return;
      if (!maskEditor)
        return;
      if (!divRef.current)
        return;
      const rect = divRef.current.getBoundingClientRect();
      const x = (evt.clientX - rect.left - position.x) / scale;
      const y = (evt.clientY - rect.top - position.y) / scale;
      maskEditor.Draw(x, y);
      setDrawingState({
        IsDrawing: true,
        LastX: x,
        LastY: y
      });
    },
    onPointerMove: (evt) => {
      if (!divRef.current)
        return;
      const rect = divRef.current.getBoundingClientRect();
      const x = (evt.clientX - rect.left - position.x) / scale;
      const y = (evt.clientY - rect.top - position.y) / scale;
      if (ghostRenderer) {
        ghostRenderer.SetGhostPosition(x, y);
      }
      if ((evt.buttons & 1) !== 1)
        return;
      if (!drawingState.IsDrawing)
        return;
      if (!maskEditor)
        return;
      maskEditor.DrawLine(drawingState.LastX, drawingState.LastY, x, y);
      setDrawingState({
        IsDrawing: true,
        LastX: x,
        LastY: y
      });
    },
    children: [/* @__PURE__ */ jsx(DrawableRenderer, {
      className: "baseCanvas",
      position,
      scale,
      size,
      smoothingEnabled: false,
      drawable: baseImage
    }), /* @__PURE__ */ jsx(DynamicCanvas, {
      className: "stackedCanvas",
      position,
      scale,
      size,
      smoothingEnabled: false,
      drawable: maskEditor
    }), /* @__PURE__ */ jsx(DynamicCanvas, {
      className: "stackedCanvas",
      position,
      scale,
      size,
      smoothingEnabled: false,
      drawable: ghostRenderer
    }), /* @__PURE__ */ jsx(DynamicCanvas, {
      className: "stackedCanvas",
      position,
      scale,
      size,
      smoothingEnabled: true,
      drawable: edgeRenderer
    })]
  });
};
class DetachedCanvas {
  constructor(width, height) {
    __publicField(this, "canvas");
    __publicField(this, "ctx");
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    let pixelCtx = this.canvas.getContext("2d");
    if (!pixelCtx)
      throw "Could not create CanvasRenderingContext2D";
    this.ctx = pixelCtx;
  }
  DrawToContext(x, y, target) {
    target.drawImage(this.canvas, x, y);
  }
  ClearPixels() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  GetData() {
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }
}
const StepBresenhamLine = (x0, y0, x1, y1, step) => {
  let dx = Math.abs(x1 - x0);
  let sx = x0 < x1 ? 1 : -1;
  let dy = Math.abs(y1 - y0);
  let sy = y0 < y1 ? 1 : -1;
  let err = (dx > dy ? dx : -dy) / 2;
  while (true) {
    step(x0, y0);
    if (x0 === x1 && y0 === y1)
      break;
    var e2 = err;
    if (e2 > -dx) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dy) {
      err += dx;
      y0 += sy;
    }
  }
};
const DrawPixel = (x, y, ctx) => {
  ctx.fillRect(x, y, 1, 1);
};
const DrawHorizontalLine = (x0, y0, x1, ctx) => {
  for (let x = x0; x <= x1; ++x)
    DrawPixel(x, y0, ctx);
};
const Plot4Points = (cx, cy, x, y, ctx) => {
  DrawHorizontalLine(cx - x, cy + y, cx + x, ctx);
  if (y != 0)
    DrawHorizontalLine(cx - x, cy - y, cx + x, ctx);
};
const DrawCircle = (cx, cy, radius, ctx) => {
  let error = -radius;
  let x = radius;
  let y = 0;
  while (x >= y) {
    let lastY = y;
    error += y;
    ++y;
    error += y;
    Plot4Points(cx, cy, x, lastY, ctx);
    if (error >= 0) {
      if (x != lastY)
        Plot4Points(cx, cy, lastY, x, ctx);
      error -= x;
      --x;
      error -= x;
    }
  }
};
class CircleBrush {
  constructor(stepParameters) {
    __publicField(this, "stepCount");
    __publicField(this, "stepParameters");
    __publicField(this, "stepCanvases");
    this.stepCount = stepParameters.length;
    this.stepParameters = stepParameters;
    this.stepCanvases = [];
    this.stepParameters.forEach((p) => {
      if (p.size % 2 == 0)
        p.size++;
      var canvas = new DetachedCanvas(p.size, p.size);
      canvas.ctx.strokeStyle = p.colour;
      canvas.ctx.fillStyle = p.colour;
      DrawCircle(Math.floor(p.size / 2), Math.floor(p.size / 2), Math.floor(p.size / 2), canvas.ctx);
      this.stepCanvases.push(canvas);
    });
  }
  DrawToContext(x, y, target) {
    for (let i = 0; i < this.stepCount; i++) {
      const stepParameter = this.stepParameters[i];
      const stepCanvas = this.stepCanvases[i];
      target.globalCompositeOperation = stepParameter.compositeOperation;
      target.drawImage(stepCanvas.canvas, Math.round(x - stepParameter.size / 2), Math.round(y - stepParameter.size / 2));
    }
  }
}
function CircleClearBrush(size) {
  return new CircleBrush([
    {
      size,
      colour: "#000000",
      compositeOperation: "destination-out"
    }
  ]);
}
function CirclePixelBrush(size, colour) {
  return new CircleBrush([
    {
      size,
      colour: "#000000",
      compositeOperation: "destination-out"
    },
    {
      size,
      colour,
      compositeOperation: "source-over"
    }
  ]);
}
function DrawLineToContext(x0, y0, x1, y1, target, drawable) {
  x0 = Math.floor(x0);
  y0 = Math.floor(y0);
  x1 = Math.floor(x1);
  y1 = Math.floor(y1);
  StepBresenhamLine(x0, y0, x1, y1, (x, y) => drawable.DrawToContext(x, y, target));
}
class CachedImage {
  constructor(imageData) {
    __publicField(this, "detachedCanvas");
    this.detachedCanvas = new DetachedCanvas(imageData.width, imageData.height);
    this.detachedCanvas.ctx.putImageData(imageData, 0, 0);
  }
  DrawToContext(x, y, target) {
    target.drawImage(this.detachedCanvas.canvas, x, y);
  }
}
class DynamicImage {
  constructor() {
    __publicField(this, "detachedCanvas");
    __publicField(this, "onChange");
    this.detachedCanvas = new DetachedCanvas(0, 0);
    this.onChange = [];
  }
  DrawToContext(x, y, target) {
    target.drawImage(this.detachedCanvas.canvas, x, y);
  }
  UpdateImage(imageData) {
    this.detachedCanvas.canvas.width = imageData.width;
    this.detachedCanvas.canvas.height = imageData.height;
    this.detachedCanvas.ctx.putImageData(imageData, 0, 0);
    this.onChange.forEach((x) => x());
  }
  GetData() {
    return this.detachedCanvas.GetData();
  }
  ToBlob() {
    return new Promise((resolve, reject) => {
      this.detachedCanvas.canvas.toBlob((blob) => {
        if (blob)
          resolve(blob);
        else
          reject("Could not create blob");
      });
    });
  }
}
class GrabCutWorkerWrapper {
  constructor(imageData, resultCallback) {
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "grabCutWorker");
    __publicField(this, "waitingForResponse");
    __publicField(this, "bufferedMaskUpdatedMessage");
    this.width = imageData.width;
    this.height = imageData.height;
    this.grabCutWorker = new Worker("/honshou-mieru/assets/worker.39b6dcce.js", {
      type: "classic"
    });
    this.waitingForResponse = true;
    this.bufferedMaskUpdatedMessage = null;
    resultCallback(imageData, []);
    this.grabCutWorker.onmessage = (evt) => {
      switch (evt.data.action) {
        case "ready":
          {
            console.log("worker ready");
            this.grabCutWorker.postMessage({
              action: "initialize",
              sourceBuffer: imageData.data.buffer,
              width: this.width,
              height: this.height
            });
            this.waitingForResponse = false;
            if (this.bufferedMaskUpdatedMessage) {
              this.PostUpdateMask(this.bufferedMaskUpdatedMessage);
            }
          }
          break;
        case "result-updated":
          {
            resultCallback(new ImageData(new Uint8ClampedArray(evt.data.resultBuffer), this.width, this.height), evt.data.edgeBuffers.map((x) => new Int32Array(x)));
            this.waitingForResponse = false;
            if (this.bufferedMaskUpdatedMessage) {
              this.PostUpdateMask(this.bufferedMaskUpdatedMessage);
            }
          }
          break;
      }
    };
  }
  UpdateMask(maskImageData) {
    const newMessage = {
      buffer: maskImageData.data.buffer
    };
    this.PostUpdateMask(newMessage);
  }
  PostUpdateMask(message) {
    if (this.waitingForResponse) {
      this.bufferedMaskUpdatedMessage = message;
    } else {
      this.grabCutWorker.postMessage({
        action: "mask-updated",
        maskBuffer: message.buffer
      }, [message.buffer]);
      this.bufferedMaskUpdatedMessage = null;
      this.waitingForResponse = true;
    }
  }
  Dispose() {
    this.grabCutWorker.postMessage({ action: "dispose" });
  }
}
class PixelEditor {
  constructor(width, height) {
    __publicField(this, "detachedCanvas");
    __publicField(this, "brush");
    this.detachedCanvas = new DetachedCanvas(width, height);
  }
  SetBrush(size, color) {
    if (color) {
      this.brush = CirclePixelBrush(size, color);
    } else {
      this.brush = CircleClearBrush(size);
    }
  }
  Draw(x, y) {
    if (!this.brush)
      return;
    this.brush.DrawToContext(x, y, this.detachedCanvas.ctx);
  }
  DrawLine(x0, y0, x1, y1) {
    if (!this.brush)
      return;
    DrawLineToContext(x0, y0, x1, y1, this.detachedCanvas.ctx, this.brush);
  }
  DrawToContext(x, y, target) {
    this.detachedCanvas.DrawToContext(x, y, target);
  }
  ClearPixels() {
    this.detachedCanvas.ClearPixels();
  }
  GetData() {
    return this.detachedCanvas.GetData();
  }
}
class MaskEditor {
  constructor(width, height) {
    __publicField(this, "pixelEditor");
    __publicField(this, "onChange");
    this.pixelEditor = new PixelEditor(width, height);
    this.onChange = [];
  }
  SetBrush(size, maskType) {
    this.pixelEditor.SetBrush(size, this.ColorFromMaskType(maskType));
  }
  Draw(x, y) {
    this.pixelEditor.Draw(x, y);
    this.onChange.forEach((x2) => x2());
  }
  DrawLine(x0, y0, x1, y1) {
    this.pixelEditor.DrawLine(x0, y0, x1, y1);
    this.onChange.forEach((x) => x());
  }
  DrawToContext(x, y, target) {
    this.pixelEditor.DrawToContext(x, y, target);
  }
  GetData() {
    return this.pixelEditor.GetData();
  }
  ColorFromMaskType(maskType) {
    switch (maskType) {
      case MaskType.Background:
        return "rgba(255,0,0,0.5)";
      case MaskType.Foreground:
        return "rgba(0,255,0,0.5)";
      default:
        return null;
    }
  }
}
class GhostRenderer {
  constructor() {
    __publicField(this, "x");
    __publicField(this, "y");
    __publicField(this, "brush");
    __publicField(this, "hideBrush");
    __publicField(this, "onChange");
    this.x = 0;
    this.y = 0;
    this.hideBrush = false;
    this.onChange = [];
  }
  SetBrush(size, maskType) {
    this.brush = this.CreateBrush(size, maskType);
    this.onChange.forEach((x) => x());
  }
  ClearGhost() {
    this.x = 0;
    this.y = 0;
    this.hideBrush = true;
    this.onChange.forEach((x) => x());
  }
  SetGhostPosition(x, y) {
    this.x = x;
    this.y = y;
    this.hideBrush = false;
    this.onChange.forEach((x2) => x2());
  }
  DrawToContext(x, y, target) {
    if (this.brush && !this.hideBrush) {
      this.brush.DrawToContext(x + this.x, y + this.y, target);
    }
  }
  CreateBrush(size, maskType) {
    switch (maskType) {
      case MaskType.Background:
        return CirclePixelBrush(size, "rgba(255,0,0,0.5)");
      case MaskType.Foreground:
        return CirclePixelBrush(size, "rgba(0,255,0,0.5)");
      default:
        return CirclePixelBrush(size, "rgba(0,0,255,0.5)");
    }
  }
}
class EdgeRenderer {
  constructor() {
    __publicField(this, "edgeArray");
    __publicField(this, "lineWidth");
    __publicField(this, "onChange");
    this.onChange = [];
  }
  UpdateEdgeArray(edgeArray) {
    this.edgeArray = edgeArray;
    this.onChange.forEach((x) => x());
  }
  UpdateLineWidth(lineWidth) {
    this.lineWidth = lineWidth;
  }
  DrawToContext(x, y, target) {
    if (this.edgeArray && this.lineWidth) {
      target.lineWidth = this.lineWidth;
      target.strokeStyle = "yellow";
      for (let i = 0; i < this.edgeArray.length; i++) {
        const edges = this.edgeArray[i];
        target.beginPath();
        target.moveTo(x + edges[0] + 0.5, y + edges[1] + 0.5);
        for (let j = 2; j < edges.length + 2; j += 2) {
          target.lineTo(edges[j % edges.length] + 0.5, edges[(j + 1) % edges.length] + 0.5);
        }
        target.stroke();
      }
    }
  }
}
class SegmentWrapper {
  constructor(srcImageData) {
    __publicField(this, "sourceImage");
    __publicField(this, "resultImage");
    __publicField(this, "maskEditor");
    __publicField(this, "edgeRenderer");
    __publicField(this, "ghostRenderer");
    __publicField(this, "targetScale");
    __publicField(this, "worker");
    this.sourceImage = new CachedImage(srcImageData);
    this.resultImage = new DynamicImage();
    this.maskEditor = new MaskEditor(srcImageData.width, srcImageData.height);
    this.edgeRenderer = new EdgeRenderer();
    this.ghostRenderer = new GhostRenderer();
    this.targetScale = 1;
    this.worker = new GrabCutWorkerWrapper(srcImageData, (resultImageData, edgeArray) => {
      this.resultImage.UpdateImage(resultImageData);
      this.edgeRenderer.UpdateEdgeArray(edgeArray);
    });
  }
  get SourceImage() {
    return this.sourceImage;
  }
  get ResultDrawable() {
    return this.resultImage;
  }
  get EdgeDrawable() {
    return this.edgeRenderer;
  }
  get MaskEditor() {
    return this.maskEditor;
  }
  get GhostRenderer() {
    return this.ghostRenderer;
  }
  Segment() {
    this.worker.UpdateMask(this.maskEditor.GetData());
  }
  UpdateTargetScale(scale) {
    this.targetScale = scale;
    this.edgeRenderer.UpdateLineWidth(2.5 / this.targetScale);
  }
  Dispose() {
    this.worker.Dispose();
  }
}
var styles$1 = "";
const BrushSettings = ({
  className,
  maskType,
  brushSize,
  onMaskTypeChange,
  onBrushSizeChange
}) => {
  const targetMaskTypeChange = (element) => {
    if (onMaskTypeChange)
      onMaskTypeChange(parseInt(element.value));
  };
  return /* @__PURE__ */ jsxs("div", {
    className,
    children: [/* @__PURE__ */ jsxs("form", {
      className: "flexGroup",
      children: [/* @__PURE__ */ jsxs("label", {
        children: [/* @__PURE__ */ jsx("input", {
          id: "foreground",
          type: "radio",
          value: MaskType.Foreground,
          checked: maskType == MaskType.Foreground,
          onChange: (evt) => targetMaskTypeChange(evt.target)
        }), /* @__PURE__ */ jsx("span", {
          children: "Foreground"
        })]
      }), /* @__PURE__ */ jsxs("label", {
        children: [/* @__PURE__ */ jsx("input", {
          id: "background",
          type: "radio",
          value: MaskType.Background,
          checked: maskType == MaskType.Background,
          onChange: (evt) => targetMaskTypeChange(evt.target)
        }), /* @__PURE__ */ jsx("span", {
          children: "Background"
        })]
      }), /* @__PURE__ */ jsxs("label", {
        children: [/* @__PURE__ */ jsx("input", {
          id: "probablyBackground",
          type: "radio",
          value: MaskType.ProbablyBackground,
          checked: maskType == MaskType.ProbablyBackground,
          onChange: (evt) => targetMaskTypeChange(evt.target)
        }), /* @__PURE__ */ jsx("span", {
          children: "Clear"
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "flexGroup",
      children: [/* @__PURE__ */ jsx("input", {
        className: "brushSizeRange",
        type: "range",
        min: 5,
        max: 50,
        step: 5,
        value: brushSize,
        id: "brushSizeRange",
        onChange: (evt) => {
          const value = parseInt(evt.target.value);
          if (onBrushSizeChange)
            onBrushSizeChange(value);
        }
      }), /* @__PURE__ */ jsx("span", {
        children: brushSize
      })]
    })]
  });
};
const CalculateCanvasSize = (elementRef) => {
  let hOffset = 0;
  if (elementRef.current) {
    hOffset = elementRef.current.offsetTop;
  }
  const w = window.innerWidth;
  const h = window.innerHeight;
  return {
    width: w / 2,
    height: h - hOffset
  };
};
const Workspace = ({
  imageData
}) => {
  const divRef = React.useRef(null);
  const [segmentWrapper, setSegmentWrapper] = react.exports.useState();
  const [targetMaskType, setTargetMaskType] = react.exports.useState(MaskType.Foreground);
  const [brushSize, setBrushSize] = react.exports.useState(20);
  const [transformState, setTransformState] = react.exports.useState({
    LastX: 0,
    LastY: 0
  });
  const [canvasPosition, setCanvasPosition] = react.exports.useState({
    x: 0,
    y: 0
  });
  const [canvasScale, setCanvasScale] = react.exports.useState(1);
  const [canvasSize, setCanvasSize] = react.exports.useState({
    width: 0,
    height: 0
  });
  react.exports.useEffect(() => {
    const newBaseImageData = imageData;
    const newSegmentWrapper = new SegmentWrapper(newBaseImageData);
    setSegmentWrapper(newSegmentWrapper);
    const minScale = Math.min(canvasSize.width / imageData.width, canvasSize.height / imageData.height);
    setCanvasScale(minScale);
    return () => {
      newSegmentWrapper.Dispose();
    };
  }, [imageData]);
  react.exports.useEffect(() => {
    const handleResize = () => {
      setCanvasSize(CalculateCanvasSize(divRef));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  react.exports.useEffect(() => {
    const newSize = CalculateCanvasSize(divRef);
    const minScale = Math.min(newSize.width / imageData.width, newSize.height / imageData.height);
    setCanvasScale(minScale);
    setCanvasSize(newSize);
  }, [divRef]);
  react.exports.useMemo(() => {
    if (segmentWrapper)
      segmentWrapper.UpdateTargetScale(canvasScale);
  }, [canvasScale]);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("div", {
      className: "controlsHolder",
      children: /* @__PURE__ */ jsxs("div", {
        className: "controlsBox",
        children: [/* @__PURE__ */ jsx(BrushSettings, {
          className: "brushSettings",
          maskType: targetMaskType,
          brushSize,
          onMaskTypeChange: (newMaskType) => setTargetMaskType(newMaskType),
          onBrushSizeChange: (newBrushSize) => setBrushSize(newBrushSize)
        }), /* @__PURE__ */ jsx("button", {
          className: "save",
          onClick: () => {
            if (!segmentWrapper)
              return;
            SaveImage(segmentWrapper.ResultDrawable);
          },
          children: "Save"
        })]
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "canvasHolder",
      ref: divRef,
      onPointerDown: (evt) => {
        if ((evt.buttons & 4) !== 4)
          return;
        if (!divRef.current)
          return;
        const rect = evt.currentTarget.getBoundingClientRect();
        const x = evt.clientX - rect.left;
        const y = evt.clientY - rect.top;
        setTransformState({
          LastX: x,
          LastY: y
        });
      },
      onPointerMove: (evt) => {
        if (!divRef.current)
          return;
        if ((evt.buttons & 4) !== 4)
          return;
        const rect = evt.currentTarget.getBoundingClientRect();
        const x = evt.clientX - rect.left;
        const y = evt.clientY - rect.top;
        setCanvasPosition({
          x: canvasPosition.x + (x - transformState.LastX),
          y: canvasPosition.y + (y - transformState.LastY)
        });
        setTransformState({
          LastX: x,
          LastY: y
        });
      },
      onWheel: (evt) => {
        const rect = evt.currentTarget.getBoundingClientRect();
        const pointerX = (evt.clientX - rect.left) % canvasSize.width;
        const pointerY = (evt.clientY - rect.top) % canvasSize.height;
        const deltaX = pointerX - canvasPosition.x;
        const deltaY = pointerY - canvasPosition.y;
        let scaleFactor = 0.9;
        if (evt.deltaY < 0)
          scaleFactor = 1 / scaleFactor;
        setCanvasScale(canvasScale * scaleFactor);
        setCanvasPosition({
          x: pointerX - deltaX * scaleFactor,
          y: pointerY - deltaY * scaleFactor
        });
      },
      children: [segmentWrapper && /* @__PURE__ */ jsx(MaskEditorRenderer, {
        position: canvasPosition,
        scale: canvasScale,
        size: canvasSize,
        baseImage: segmentWrapper.SourceImage,
        maskEditor: segmentWrapper.MaskEditor,
        ghostRenderer: segmentWrapper.GhostRenderer,
        edgeRenderer: segmentWrapper.EdgeDrawable,
        targetMaskType,
        brushSize,
        onMaskChanged: () => {
          if (segmentWrapper)
            segmentWrapper.Segment();
        }
      }), segmentWrapper && /* @__PURE__ */ jsxs("div", {
        className: "rendererDiv",
        children: [/* @__PURE__ */ jsx(DynamicCanvas, {
          className: "baseCanvas",
          position: canvasPosition,
          scale: canvasScale,
          size: canvasSize,
          smoothingEnabled: false,
          drawable: segmentWrapper.ResultDrawable
        }), /* @__PURE__ */ jsx(DynamicCanvas, {
          className: "stackedCanvas",
          position: canvasPosition,
          scale: canvasScale,
          size: canvasSize,
          smoothingEnabled: false,
          drawable: segmentWrapper.GhostRenderer
        })]
      })]
    })]
  });
};
var styles = "";
const Home = () => {
  const [imageData, setImageData] = react.exports.useState();
  return /* @__PURE__ */ jsxs("div", {
    className: "center",
    children: [!imageData && /* @__PURE__ */ jsx(ImageUpload, {
      onUpload: (imageData2) => {
        setImageData(imageData2);
      }
    }), imageData && /* @__PURE__ */ jsx(Workspace, {
      imageData
    })]
  });
};
export { Home as default };
