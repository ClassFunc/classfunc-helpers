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
var classfunc_helpers_exports = {};
__export(classfunc_helpers_exports, {
  db: () => db,
  diff: () => diff,
  env: () => env,
  firebase: () => firebase,
  json: () => json
});
module.exports = __toCommonJS(classfunc_helpers_exports);
var diff = __toESM(require("./diff"));
var json = __toESM(require("./json"));
var env = __toESM(require("./env"));
var firebase = __toESM(require("./firebase"));
var db = __toESM(require("./db"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  db,
  diff,
  env,
  firebase,
  json
});
