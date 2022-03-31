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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var db_exports = {};
__export(db_exports, {
  batchSetAsync: () => batchSetAsync,
  batchUpdateAsync: () => batchUpdateAsync
});
module.exports = __toCommonJS(db_exports);
var import_chunk = __toESM(require("lodash/chunk"));
var import_isFunction = __toESM(require("lodash/isFunction"));
var import_json = require("../json");
const batchSetAsync = (_0) => __async(void 0, [_0], function* ({
  db,
  values,
  collectionPath,
  idField,
  setObject,
  setOptions = { merge: true },
  size = 500,
  log = true
}) {
  const batchPromises = (0, import_chunk.default)(values, size).map((ck) => __async(void 0, null, function* () {
    return new Promise((resolve, reject) => {
      const batch = db.batch();
      ck.forEach((doc) => {
        let value;
        if ((0, import_isFunction.default)(setObject))
          value = setObject(doc);
        if (!value)
          value = doc;
        const docPath = (0, import_isFunction.default)(idField) ? idField(doc) : doc[idField];
        const docRef = db.collection(collectionPath).doc(docPath);
        if (log)
          (0, import_json.logJSON)("-- set -- ", docRef.path, value);
        batch.set(docRef, (0, import_json.toJSON)(value), setOptions);
      });
      batch.commit().then((results) => {
        if (log)
          (0, import_json.logJSON)("-- set success --");
        resolve(results);
      }).catch((e) => {
        reject(e);
      });
    });
  }));
  return yield Promise.all(batchPromises);
});
const batchUpdateAsync = (_0) => __async(void 0, [_0], function* ({
  db,
  values,
  collectionPath,
  idField,
  updateObject,
  size = 500,
  log = true
}) {
  const batchPromises = (0, import_chunk.default)(values, size).map((ck) => __async(void 0, null, function* () {
    return new Promise((resolve, reject) => {
      const batch = db.batch();
      ck.forEach((doc) => {
        let value;
        if ((0, import_isFunction.default)(updateObject))
          value = updateObject(doc);
        if (!value)
          value = doc;
        const docPath = (0, import_isFunction.default)(idField) ? idField(doc) : doc[idField];
        const docRef = db.collection(collectionPath).doc(docPath);
        if (log)
          (0, import_json.logJSON)("-- update -- ", docRef.path, value);
        batch.update(docRef, (0, import_json.toJSON)(value));
      });
      batch.commit().then((results) => {
        if (log)
          (0, import_json.logJSON)("-- update success --");
        resolve(results);
      }).catch((e) => {
        reject(e);
      });
    });
  }));
  return yield Promise.all(batchPromises);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  batchSetAsync,
  batchUpdateAsync
});
