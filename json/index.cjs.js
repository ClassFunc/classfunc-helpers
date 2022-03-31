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
var json_exports = {};
__export(json_exports, {
  logJSON: () => logJSON,
  omitByDeep: () => omitByDeep,
  removeUndefined: () => removeUndefined,
  removeUndefinedDeep: () => removeUndefinedDeep,
  toJSON: () => toJSON,
  toJSONString: () => toJSONString,
  toObject: () => toObject
});
module.exports = __toCommonJS(json_exports);
var import_clone = __toESM(require("lodash/clone"));
var import_forEach = __toESM(require("lodash/forEach"));
var import_isPlainObject = __toESM(require("lodash/isPlainObject"));
var import_isUndefined = __toESM(require("lodash/isUndefined"));
const toJSONString = (value, format = true) => {
  let fmt = format ? [null, 2] : [];
  if (typeof value === "undefined") {
    return "{}";
  }
  return JSON.stringify(value, ...fmt);
};
const toObject = (value) => {
  if (typeof value === "string")
    return JSON.parse(value);
  return JSON.parse(toJSONString(value, false));
};
const toJSON = toObject;
const omitByDeep = (obj, shouldOmit) => {
  obj = (0, import_clone.default)(obj);
  (0, import_forEach.default)(obj, (value, key) => {
    if (shouldOmit(value, key)) {
      delete obj[key];
    }
    if ((0, import_isPlainObject.default)(value)) {
      obj[key] = omitByDeep(value, shouldOmit);
    }
  });
  return obj;
};
const removeUndefined = (obj) => {
  return toObject(omitByDeep(obj, import_isUndefined.default));
};
const removeUndefinedDeep = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
const logJSON = (...value) => {
  for (const val of value) {
    console.log(toJSONString(val));
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  logJSON,
  omitByDeep,
  removeUndefined,
  removeUndefinedDeep,
  toJSON,
  toJSONString,
  toObject
});
