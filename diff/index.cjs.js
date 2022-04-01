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
var diff_exports = {};
__export(diff_exports, {
  diff2: () => diff2,
  diffObjects: () => diffObjects,
  diffValues: () => diffValues
});
module.exports = __toCommonJS(diff_exports);
var import_set = __toESM(require("lodash/set"));
var import_deep_diff = require("deep-diff");
var import_pick = __toESM(require("lodash/pick"));
const diff2 = (before, after, pickFields) => {
  const diffValues2 = (0, import_deep_diff.diff)(before, after);
  let ret = {};
  diffValues2.forEach((diff3) => {
    var _a, _b;
    switch (diff3.kind) {
      case "N":
      case "E":
      case "D":
        ret = (0, import_set.default)(ret, (_a = diff3 == null ? void 0 : diff3.path) == null ? void 0 : _a.join("."), { __b: diff3.lhs, __a: diff3.rhs });
        break;
      case "A":
        const p = ((_b = diff3 == null ? void 0 : diff3.path) == null ? void 0 : _b.join(".")) + `.${diff3.index}`;
        let val;
        if (diff3.item.kind === "N")
          val = { __a: diff3.item.rhs };
        else if (diff3.item.kind === "D")
          val = { __b: diff3.item.lhs };
        ret = (0, import_set.default)(ret, p, val);
        break;
    }
  });
  if (pickFields)
    return (0, import_pick.default)(ret, pickFields);
  return ret;
};
const diffObjects = diff2;
const diffValues = diff2;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  diff2,
  diffObjects,
  diffValues
});
