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
  diff2: () => diff2,
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
var import_pick = __toESM(require("lodash/pick"));
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
  if (!after) {
    return diffObjects(before, (0, import_isPlainObject.default)(before) ? {} : []);
  }
  let diffValues2 = (0, import_deep_diff.diff)(before, after);
  if ((0, import_isEmpty.default)(diffValues2))
    return [];
  (0, import_json.logJSON)(diffValues2);
  const mapValues = (diffValues3) => {
    const pathMappedValues = diffValues3.map((diff3) => {
      const pathArr = (0, import_get.default)(diff3, "path");
      if ((0, import_isEmpty.default)(pathArr))
        return { "__before": diff3.lhs, "__after": diff3.rhs };
      return __spreadProps(__spreadValues({}, (0, import_set.default)(diff3, pathArr.join("."), { "__before": diff3.lhs, "__after": diff3.rhs })), {
        path: [...pathArr, pathArr.join(".")]
      });
    });
    identities = identities != null ? identities : (0, import_uniq.default)(pathMappedValues.map((r) => (0, import_get.default)(r, "path.0")));
    return mapIdentities(pathMappedValues, identities);
  };
  const mapIdentities = (pathMappedValues, fields) => {
    const val = pathMappedValues.map((diff3) => {
      if ((0, import_isEmpty.default)((0, import_get.default)(diff3, "path")))
        return diff3;
      return (!Array.isArray(fields) ? [fields] : fields).map((field) => {
        const pathArr = (0, import_get.default)(diff3, "path");
        if (!(pathArr == null ? void 0 : pathArr.includes(field)))
          return;
        const changes = (0, import_get.default)(diff3, field);
        if (changes)
          return __spreadProps(__spreadValues({}, changes), { __field: field });
      });
    });
    return (0, import_groupBy.default)((0, import_compact.default)((0, import_flattenDeep.default)(val)), "__field");
  };
  return (0, import_json.toObject)(mapValues(diffValues2));
};
const diffValues = diffObjects;
const diff2 = (before, after, pickFields) => {
  const diffValues2 = (0, import_deep_diff.diff)(before, after);
  let ret = {};
  diffValues2.forEach((diff3) => {
    var _a, _b;
    switch (diff3.kind) {
      case "N":
      case "E":
      case "D":
        ret = (0, import_set.default)(ret, (_a = diff3 == null ? void 0 : diff3.path) == null ? void 0 : _a.join("."), { _b: diff3.lhs, _a: diff3.rhs });
        break;
      case "A":
        const p = ((_b = diff3 == null ? void 0 : diff3.path) == null ? void 0 : _b.join(".")) + `.${diff3.index}`;
        let val;
        if (diff3.item.kind === "N")
          val = { _a: diff3.item.rhs };
        else if (diff3.item.kind === "D")
          val = { _b: diff3.item.lhs };
        ret = (0, import_set.default)(ret, p, val);
        break;
    }
  });
  if (pickFields)
    return (0, import_pick.default)(ret, pickFields);
  return ret;
};
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
  diff2,
  diffAfterBefore,
  diffBeforeAfter,
  diffExplain,
  diffObjects,
  diffValues,
  difference
});
