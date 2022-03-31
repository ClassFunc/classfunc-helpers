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
  let diffValue = diff(before, after);
  if (isEmpty(diffValue))
    return [];
  const mapValues = (values) => {
    const ret = values.map((o) => {
      return __spreadProps(__spreadValues({}, set(o, o.path.join("."), { before: o.lhs, after: o.rhs })), {
        path: [...o.path, o.path.join(".")]
      });
    });
    identities = identities != null ? identities : uniq(ret.map((r) => r.path[0]));
    return mapIdentities(ret, identities);
  };
  const mapIdentities = (values, ids) => {
    const val = values.map((d) => {
      return (!Array.isArray(ids) ? [ids] : ids).map((id) => {
        const path = get(d, "path");
        if (!path.includes(id))
          return;
        const changes = get(d, id);
        if (changes)
          return __spreadProps(__spreadValues({}, changes), { __identity__: id });
      });
    });
    return groupBy(compact(flattenDeep(val)), "__identity__");
  };
  return toObject(mapValues(diffValue));
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
