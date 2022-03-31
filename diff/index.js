var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
  diffAfterBefore: () => diffAfterBefore,
  diffBeforeAfter: () => diffBeforeAfter,
  diffExplain: () => diffExplain,
  diffObjects: () => diffObjects,
  diffValues: () => diffValues,
  difference: () => difference
});
module.exports = __toCommonJS(diff_exports);
var import_isEmpty = __toESM(require("lodash/isEmpty"));
var import_isEqual = __toESM(require("lodash/isEqual"));
var import_isPlainObject = __toESM(require("lodash/isPlainObject"));
var import_set = __toESM(require("lodash/set"));
var import_transform = __toESM(require("lodash/transform"));
var import_uniq = __toESM(require("lodash/uniq"));
var import_deep_diff = require("deep-diff");
var import_json = require("../json");
var import_get = __toESM(require("lodash/get"));
var import_groupBy = __toESM(require("lodash/groupBy"));
var import_compact = __toESM(require("lodash/compact"));
var import_flattenDeep = __toESM(require("lodash/flattenDeep"));
const diffExplain = (before, after) => {
  let diffArr = diffObjects(before, after);
  const explain = {
    "N": "added",
    "D": "deleted",
    "E": "edited",
    "A": "array"
  };
  return diffArr.map((diffObj) => {
    var _a;
    const item = diffObj.item;
    const itemKind = item == null ? void 0 : item.kind;
    let kindExplain = "";
    if (itemKind) {
      kindExplain = explain[item.kind];
    }
    return `${explain[diffObj.kind]} ${(0, import_json.toJSONString)((_a = diffObj.path) == null ? void 0 : _a.join("."))} ${diffObj.index > -1 ? `at ${diffObj.index}` : ""} ${itemKind ? `${(0, import_json.toJSONString)(kindExplain)} ${itemKind === "N" ? (0, import_json.toJSONString)(item.rhs) : (0, import_json.toJSONString)(item.lhs)}` : `${(0, import_json.toJSONString)(diffObj.lhs)} -> ${(0, import_json.toJSONString)(diffObj.rhs)}`}`;
  });
};
const diffObjects = (before, after, identities) => {
  let diffValue = (0, import_deep_diff.diff)(before, after);
  if ((0, import_isEmpty.default)(diffValue))
    return [];
  const mapValues = (values) => {
    const ret = values.map((o) => {
      return __spreadProps(__spreadValues({}, (0, import_set.default)(o, o.path.join("."), { before: o.lhs, after: o.rhs })), {
        path: [...o.path, o.path.join(".")]
      });
    });
    identities = identities != null ? identities : (0, import_uniq.default)(ret.map((r) => r.path[0]));
    return mapIdentities(ret, identities);
  };
  const mapIdentities = (values, ids) => {
    const val = values.map((d) => {
      return (!Array.isArray(ids) ? [ids] : ids).map((id) => {
        const path = (0, import_get.default)(d, "path");
        if (!path.includes(id))
          return;
        const changes = (0, import_get.default)(d, id);
        if (changes)
          return __spreadProps(__spreadValues({}, changes), { __identity__: id });
      });
    });
    return (0, import_groupBy.default)((0, import_compact.default)((0, import_flattenDeep.default)(val)), "__identity__");
  };
  return (0, import_json.toObject)(mapValues(diffValue));
};
const diffValues = diffObjects;
function difference(after, before) {
  if (!before)
    return after;
  function changes(object, base) {
    return (0, import_transform.default)(object, function(result, value, key) {
      if (!(0, import_isEqual.default)(value, base[key])) {
        result[key] = (0, import_isPlainObject.default)(value) && (0, import_isPlainObject.default)(base[key]) ? changes(value, base[key]) : value;
      }
    });
  }
  return changes(after, before);
}
const diffBeforeAfter = (before, after) => difference(after, before);
const diffAfterBefore = (after, before) => difference(after, before);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  diffAfterBefore,
  diffBeforeAfter,
  diffExplain,
  diffObjects,
  diffValues,
  difference
});
