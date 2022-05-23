var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var hash_exports = {};
__export(hash_exports, {
  resetHash: () => resetHash,
  setHash: () => setHash,
  toHashObject: () => toHashObject,
  toHashString: () => toHashString
});
module.exports = __toCommonJS(hash_exports);
var import_isEmpty = __toESM(require("lodash/isEmpty"));
var import_isPlainObject = __toESM(require("lodash/isPlainObject"));
const toHashObject = (hash) => {
  if ((0, import_isEmpty.default)(hash))
    return {};
  hash = hash.replace("#", "");
  return hash.split(";").map((h) => h.split(":")).reduce((obj, curr) => {
    if (!curr[1])
      return obj;
    const k = curr[0];
    obj[k] = curr[1];
    return obj;
  }, {});
};
const toHashString = (obj) => {
  if (!(0, import_isPlainObject.default)(obj) || (0, import_isEmpty.default)(obj))
    return "";
  let result = "";
  Object.keys(obj).forEach((k) => {
    const val = obj[k];
    result += `${k}:${val};`;
  });
  return result;
};
const setHash = (hash) => {
  if (typeof hash === "undefined")
    return;
  let hashStr;
  if ((0, import_isPlainObject.default)(hash)) {
    hashStr = toHashString(hash);
  } else if (typeof hash === "string")
    hashStr = hash;
  const newHash = window.location.hash + ";" + hashStr;
  window.location.hash = toHashString(toHashObject(newHash));
};
const resetHash = (str) => {
  window.location.hash = str || "";
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  resetHash,
  setHash,
  toHashObject,
  toHashString
});
