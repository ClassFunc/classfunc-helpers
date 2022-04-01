import isEqual from "lodash/isEqual";
import isPlainObject from "lodash/isPlainObject";
import set from "lodash/set";
import transform from "lodash/transform";
import { diff } from "deep-diff";
import pick from "lodash/pick";
const diff2 = (before, after, pickFields) => {
  const diffValues = diff(before, after);
  let ret = {};
  diffValues.forEach((diff3) => {
    var _a, _b;
    switch (diff3.kind) {
      case "N":
      case "E":
      case "D":
        ret = set(ret, (_a = diff3 == null ? void 0 : diff3.path) == null ? void 0 : _a.join("."), { __b: diff3.lhs, __a: diff3.rhs });
        break;
      case "A":
        const p = ((_b = diff3 == null ? void 0 : diff3.path) == null ? void 0 : _b.join(".")) + `.${diff3.index}`;
        let val;
        if (diff3.item.kind === "N")
          val = { __a: diff3.item.rhs };
        else if (diff3.item.kind === "D")
          val = { __b: diff3.item.lhs };
        ret = set(ret, p, val);
        break;
    }
  });
  if (pickFields)
    return pick(ret, pickFields);
  return ret;
};
const difference = (after, before) => {
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
};
const diffBeforeAfter = (before, after) => difference(after, before);
const diffAfterBefore = (after, before) => difference(after, before);
export {
  diff2,
  diffAfterBefore,
  diffBeforeAfter,
  difference
};
