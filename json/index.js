"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logJSON = exports.removeUndefined = exports.omitByDeep = exports.removeUndefinedDeep = exports.toJSON = exports.toObject = exports.toJSONString = void 0;
const clone_1 = __importDefault(require("lodash/clone"));
const forEach_1 = __importDefault(require("lodash/forEach"));
const isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
const isUndefined_1 = __importDefault(require("lodash/isUndefined"));
const toJSONString = (value, format = true) => {
    let fmt = format ? [null, 2] : [];
    if (typeof value === "undefined") {
        return '{}';
    }
    return JSON.stringify(value, ...fmt);
};
exports.toJSONString = toJSONString;
const toObject = (value) => {
    if (typeof value === "string")
        return JSON.parse(value);
    return JSON.parse(toJSONString(value, false));
};
exports.toObject = toObject;
const toJSON = toObject;
exports.toJSON = toJSON;
const omitByDeep = (obj, shouldOmit) => {
    obj = (0, clone_1.default)(obj);
    (0, forEach_1.default)(obj, (value, key) => {
        if (shouldOmit(value, key)) {
            delete obj[key];
        }
        if ((0, isPlainObject_1.default)(value)) {
            obj[key] = omitByDeep(value, shouldOmit);
        }
    });
    return obj;
};
exports.omitByDeep = omitByDeep;
const removeUndefined = obj => {
    return toObject(omitByDeep(obj, isUndefined_1.default));
};
exports.removeUndefined = removeUndefined;
const removeUndefinedDeep = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};
exports.removeUndefinedDeep = removeUndefinedDeep;
const logJSON = (...value) => {
    for (const val of value) {
        console.log(toJSONString(val));
    }
};
exports.logJSON = logJSON;
