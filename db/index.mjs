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
import chunk from "lodash/chunk";
import isFunction from "lodash/isFunction";
import { logJSON, toJSON } from "../json";
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
  const batchPromises = chunk(values, size).map((ck) => __async(void 0, null, function* () {
    return new Promise((resolve, reject) => {
      const batch = db.batch();
      ck.forEach((doc) => {
        let value;
        if (isFunction(setObject))
          value = setObject(doc);
        if (!value)
          value = doc;
        const docPath = isFunction(idField) ? idField(doc) : doc[idField];
        const docRef = db.collection(collectionPath).doc(docPath);
        if (log)
          logJSON("-- set -- ", docRef.path, value);
        batch.set(docRef, toJSON(value), setOptions);
      });
      batch.commit().then((results) => {
        if (log)
          logJSON("-- set success --");
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
  const batchPromises = chunk(values, size).map((ck) => __async(void 0, null, function* () {
    return new Promise((resolve, reject) => {
      const batch = db.batch();
      ck.forEach((doc) => {
        let value;
        if (isFunction(updateObject))
          value = updateObject(doc);
        if (!value)
          value = doc;
        const docPath = isFunction(idField) ? idField(doc) : doc[idField];
        const docRef = db.collection(collectionPath).doc(docPath);
        if (log)
          logJSON("-- update -- ", docRef.path, value);
        batch.update(docRef, toJSON(value));
      });
      batch.commit().then((results) => {
        if (log)
          logJSON("-- update success --");
        resolve(results);
      }).catch((e) => {
        reject(e);
      });
    });
  }));
  return yield Promise.all(batchPromises);
});
export {
  batchSetAsync,
  batchUpdateAsync
};
