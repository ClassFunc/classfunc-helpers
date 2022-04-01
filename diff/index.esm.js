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
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import isPlainObject from "lodash/isPlainObject";
import set from "lodash/set";
import transform from "lodash/transform";
import uniq from "lodash/uniq";
import { diff } from "deep-diff";
import { logJSON, toJSONString, toObject } from "../json";
import get from "lodash/get";
import pick from "lodash/pick";
import groupBy from "lodash/groupBy";
import compact from "lodash/compact";
import flattenDeep from "lodash/flattenDeep";
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
    return `${explain[diffObj.kind]} ${toJSONString((_a = diffObj.path) == null ? void 0 : _a.join("."))} ${diffObj.index > -1 ? `at ${diffObj.index}` : ""} ${itemKind ? `${toJSONString(kindExplain)} ${itemKind === "N" ? toJSONString(item.rhs) : toJSONString(item.lhs)}` : `${toJSONString(diffObj.lhs)} -> ${toJSONString(diffObj.rhs)}`}`;
  });
};
const diffObjects = (before, after, identities) => {
  if (!after) {
    return diffObjects(before, isPlainObject(before) ? {} : []);
  }
  let diffValues2 = diff(before, after);
  if (isEmpty(diffValues2))
    return [];
  logJSON(diffValues2);
  const mapValues = (diffValues3) => {
    const pathMappedValues = diffValues3.map((diff3) => {
      const pathArr = get(diff3, "path");
      if (isEmpty(pathArr))
        return { "__before": diff3.lhs, "__after": diff3.rhs };
      return __spreadProps(__spreadValues({}, set(diff3, pathArr.join("."), { "__before": diff3.lhs, "__after": diff3.rhs })), {
        path: [...pathArr, pathArr.join(".")]
      });
    });
    identities = identities != null ? identities : uniq(pathMappedValues.map((r) => get(r, "path.0")));
    return mapIdentities(pathMappedValues, identities);
  };
  const mapIdentities = (pathMappedValues, fields) => {
    const val = pathMappedValues.map((diff3) => {
      if (isEmpty(get(diff3, "path")))
        return diff3;
      return (!Array.isArray(fields) ? [fields] : fields).map((field) => {
        const pathArr = get(diff3, "path");
        if (!(pathArr == null ? void 0 : pathArr.includes(field)))
          return;
        const changes = get(diff3, field);
        if (changes)
          return __spreadProps(__spreadValues({}, changes), { __field: field });
      });
    });
    return groupBy(compact(flattenDeep(val)), "__field");
  };
  return toObject(mapValues(diffValues2));
};
const diffValues = diffObjects;
const diff2 = (before, after, pickFields) => {
  const diffValues2 = diff(before, after);
  let ret = {};
  diffValues2.forEach((diff3) => {
    var _a, _b;
    switch (diff3.kind) {
      case "N":
      case "E":
      case "D":
        ret = set(ret, (_a = diff3 == null ? void 0 : diff3.path) == null ? void 0 : _a.join("."), { _b: diff3.lhs, _a: diff3.rhs });
        break;
      case "A":
        const p = ((_b = diff3 == null ? void 0 : diff3.path) == null ? void 0 : _b.join(".")) + `.${diff3.index}`;
        let val;
        if (diff3.item.kind === "N")
          val = { _a: diff3.item.rhs };
        else if (diff3.item.kind === "D")
          val = { _b: diff3.item.lhs };
        ret = set(ret, p, val);
        break;
    }
  });
  if (pickFields)
    return pick(ret, pickFields);
  return ret;
};
function difference(after, before) {
  if (!before)
    return after;
  function changes(object, base) {
    return transform(object, function(result, value, key) {
      if (!isEqual(value, base[key])) {
        result[key] = isPlainObject(value) && isPlainObject(base[key]) ? changes(value, base[key]) : value;
      }
    });
  }
  return changes(after, before);
}
const diffBeforeAfter = (before, after) => difference(after, before);
const diffAfterBefore = (after, before) => difference(after, before);
export {
  diff2,
  diffAfterBefore,
  diffBeforeAfter,
  diffExplain,
  diffObjects,
  diffValues,
  difference
};
