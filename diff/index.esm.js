import set from "lodash/set";
import { diff } from "deep-diff";
import pick from "lodash/pick";
const diff2 = (before, after, pickFields) => {
  const diffValues2 = diff(before, after);
  let ret = {};
  diffValues2.forEach((diff3) => {
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
const diffObjects = diff2;
const diffValues = diff2;
export {
  diff2,
  diffObjects,
  diffValues
};
