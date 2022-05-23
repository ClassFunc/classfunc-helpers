import isEmpty from "lodash/isEmpty";
import isPlainObject from "lodash/isPlainObject";
const toHashObject = (hash) => {
  if (isEmpty(hash))
    return {};
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
  if (!isPlainObject(obj) || isEmpty(obj))
    return "";
  let result = "";
  Object.keys(obj).forEach((k) => {
    const val = obj[k];
    result += `${k}:${val};`;
  });
  return result;
};
const setHash = (hash) => {
  if (typeof hash === "undefined")
    return;
  let hashStr;
  if (isPlainObject(hash)) {
    hashStr = toHashString(hash);
  } else if (typeof hash === "string")
    hashStr = hash;
  const newHash = window.location.hash + ";" + hashStr;
  window.location.hash = toHashString(toHashObject(newHash));
};
const resetHash = (str) => {
  window.location.hash = str || "";
};
export {
  resetHash,
  setHash,
  toHashObject,
  toHashString
};
