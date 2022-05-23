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
  setHash: () => setHash,
  toHashObject: () => toHashObject,
  toHashString: () => toHashString
});
module.exports = __toCommonJS(hash_exports);
var import_isEmpty = __toESM(require("lodash/isEmpty"));
var import_isPlainObject = __toESM(require("lodash/isPlainObject"));
const toHashObject = (hash) => {
  if ((0, import_isEmpty.default)(hash))
    return null;
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
  if (!(0, import_isPlainObject.default)(obj))
    return "";
  let result = "";
  Object.keys(obj).forEach((k) => {
    const val = obj[k];
    result = result + `${k}:${val};`;
  });
  return result;
};
const setHash = (str) => {
  const newHash = window.location.hash + ";" + str;
  window.location.hash = toHashString(toHashObject(newHash));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setHash,
  toHashObject,
  toHashString
});
