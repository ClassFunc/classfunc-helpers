"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchUpdateAsync = exports.batchSetAsync = void 0;
const chunk_1 = __importDefault(require("lodash/chunk"));
const isFunction_1 = __importDefault(require("lodash/isFunction"));
const json_1 = require("../json");
const batchSetAsync = ({ db, values, collectionPath, idField, setObject, setOptions = { merge: true }, size = 500, log = true }) => __awaiter(void 0, void 0, void 0, function* () {
    const batchPromises = (0, chunk_1.default)(values, size)
        .map((ck) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const batch = db.batch();
            ck.forEach(doc => {
                let value;
                if ((0, isFunction_1.default)(setObject))
                    value = setObject(doc);
                if (!value)
                    value = doc;
                const docPath = (0, isFunction_1.default)(idField)
                    ? idField(doc)
                    : doc[idField];
                // set
                if (log)
                    (0, json_1.logJSON)('-- set -- ', `${collectionPath}/${docPath}`, value);
                batch.set(db.collection(collectionPath).doc(docPath), (0, json_1.toJSON)(value), setOptions);
            });
            batch.commit()
                .then((results) => {
                resolve(results);
            })
                .catch((e) => {
                reject(e);
            });
        });
    }));
    return yield Promise.all(batchPromises);
});
exports.batchSetAsync = batchSetAsync;
const batchUpdateAsync = ({ db, values, collectionPath, idField, updateObject, size = 500, log = true }) => __awaiter(void 0, void 0, void 0, function* () {
    const batchPromises = (0, chunk_1.default)(values, size)
        .map((ck) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const batch = db.batch();
            ck.forEach(doc => {
                let value;
                if ((0, isFunction_1.default)(updateObject))
                    value = updateObject(doc);
                if (!value)
                    value = doc;
                const docPath = (0, isFunction_1.default)(idField)
                    ? idField(doc)
                    : doc[idField];
                // set
                if (log)
                    (0, json_1.logJSON)('-- update -- ', `${collectionPath}/${docPath}`, value);
                batch.update(db.collection(collectionPath).doc(docPath), (0, json_1.toJSON)(value));
            });
            batch.commit()
                .then((results) => {
                resolve(results);
            })
                .catch((e) => {
                reject(e);
            });
        });
    }));
    return yield Promise.all(batchPromises);
});
exports.batchUpdateAsync = batchUpdateAsync;
