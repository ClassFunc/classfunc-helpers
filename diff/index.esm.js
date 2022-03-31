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
import { toJSONString, toObject } from "../json";
import get from "lodash/get";
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
  const mapValues = (diffValues3) => {
    const pathMappedValues = diffValues3.map((diff2) => {
      const pathArr = get(diff2, "path");
      if (isEmpty(pathArr))
        return { "__before": diff2.lhs, "__after": diff2.rhs };
      return __spreadProps(__spreadValues({}, set(diff2, pathArr.join("."), { "__before": diff2.lhs, "__after": diff2.rhs })), {
        path: [...pathArr, pathArr.join(".")]
      });
    });
    identities = identities != null ? identities : uniq(pathMappedValues.map((r) => get(r, "path.0")));
    return mapIdentities(pathMappedValues, identities);
  };
  const mapIdentities = (pathMappedValues, fields) => {
    const val = pathMappedValues.map((diff2) => {
      if (isEmpty(get(diff2, "path")))
        return diff2;
      return (!Array.isArray(fields) ? [fields] : fields).map((field) => {
        const pathArr = get(diff2, "path");
        if (!(pathArr == null ? void 0 : pathArr.includes(field)))
          return;
        const changes = get(diff2, field);
        if (changes)
          return __spreadProps(__spreadValues({}, changes), { __field: field });
      });
    });
    return groupBy(compact(flattenDeep(val)), "__field");
  };
  return toObject(mapValues(diffValues2));
};
const diffValues = diffObjects;
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
  diffAfterBefore,
  diffBeforeAfter,
  diffExplain,
  diffObjects,
  diffValues,
  difference
};
