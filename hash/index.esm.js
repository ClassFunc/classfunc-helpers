import isEmpty from "lodash/isEmpty";
import isPlainObject from "lodash/isPlainObject";
const toHashObject = (hash) => {
  if (isEmpty(hash))
    return null;
  hash = hash.replace("#", "");
  return hash.split(";").map((h) => h.split(":")).reduce((obj, curr) => {
    if (!curr[1])
      return obj;
    const k = curr[0];
    obj[k] = curr[1];
    return obj;
  }, {});
};
const toHashString = (obj) => {
  if (!isPlainObject(obj))
    return "";
  let result = "";
  Object.keys(obj).forEach((k) => {
    const val = obj[k];
    result = result + `${k}:${val};`;
  });
  return result;
};
const setHash = (str) => {
  const newHash = window.location.hash + ";" + str;
  window.location.hash = toHashString(toHashObject(newHash));
};
export {
  setHash,
  toHashObject,
  toHashString
};
