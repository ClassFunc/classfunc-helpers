"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.diffAfterBefore = exports.diffBeforeAfter = exports.difference = exports.diffValues = exports.diffObjects = exports.diffExplain = void 0;
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const isEqual_1 = __importDefault(require("lodash/isEqual"));
const isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
const set_1 = __importDefault(require("lodash/set"));
const transform_1 = __importDefault(require("lodash/transform"));
const uniq_1 = __importDefault(require("lodash/uniq"));
const deep_diff_1 = require("deep-diff");
const json_1 = require("../json");
const get_1 = __importDefault(require("lodash/get"));
const groupBy_1 = __importDefault(require("lodash/groupBy"));
const compact_1 = __importDefault(require("lodash/compact"));
const flattenDeep_1 = __importDefault(require("lodash/flattenDeep"));
const diffExplain = (before, after) => {
    let diffArr = diffObjects(before, after);
    const explain = {
        'N': 'added',
        'D': 'deleted',
        'E': 'edited',
        'A': 'array',
    };
    return diffArr.map((diffObj) => {
        var _a;
        const item = diffObj.item;
        const itemKind = item === null || item === void 0 ? void 0 : item.kind;
        let kindExplain = '';
        if (itemKind) {
            kindExplain = explain[item.kind];
        }
        return `${explain[diffObj.kind]} ${(0, json_1.toJSONString)((_a = diffObj.path) === null || _a === void 0 ? void 0 : _a.join('.'))} ${diffObj.index > -1
            ? `at ${diffObj.index}`
            : ''} ${itemKind ? `${(0, json_1.toJSONString)(kindExplain)} ${itemKind === 'N' ? (0, json_1.toJSONString)(item.rhs) : (0, json_1.toJSONString)(item.lhs)}` : `${(0, json_1.toJSONString)(diffObj.lhs)} -> ${(0, json_1.toJSONString)(diffObj.rhs)}`}`;
    });
};
exports.diffExplain = diffExplain;
const diffObjects = (before, after, identities) => {
    let diffValue = (0, deep_diff_1.diff)(before, after);
    if ((0, isEmpty_1.default)(diffValue))
        return [];
    const mapValues = (values) => {
        const ret = values.map((o) => {
            return (Object.assign(Object.assign({}, (0, set_1.default)(o, o.path.join('.'), { before: o.lhs, after: o.rhs })), { path: [...o.path, o.path.join('.')] }));
        });
        identities = identities !== null && identities !== void 0 ? identities : (0, uniq_1.default)(ret.map(r => r.path[0]));
        return mapIdentities(ret, identities);
    };
    const mapIdentities = (values, ids) => {
        const val = values.map(d => {
            return (!Array.isArray(ids) ? [ids] : ids).map(id => {
                const path = (0, get_1.default)(d, 'path');
                if (!path.includes(id))
                    return;
                const changes = (0, get_1.default)(d, id);
                if (changes)
                    return Object.assign(Object.assign({}, changes), { __identity__: id });
            });
        });
        return (0, groupBy_1.default)((0, compact_1.default)((0, flattenDeep_1.default)(val)), '__identity__');
    };
    return (0, json_1.toObject)(mapValues(diffValue));
};
exports.diffObjects = diffObjects;
const diffValues = diffObjects;
exports.diffValues = diffValues;
/**
 * Deep diff between two after, using lodash
 * @param  {Object} after Object compared
 * @param  {Object} before   Object to compare with
 * @return {Object}        Return a new after who represent the diff
 */
function difference(after, before) {
    if (!before) //created
        return after;
    // else updated or deleted;
    function changes(object, base) {
        return (0, transform_1.default)(object, function (result, value, key) {
            if (!(0, isEqual_1.default)(value, base[key])) {
                // @ts-ignore
                result[key] = ((0, isPlainObject_1.default)(value) && (0, isPlainObject_1.default)(base[key]))
                    ? changes(value, base[key])
                    : value;
            }
        });
    }
    return changes(after, before);
}
exports.difference = difference;
const diffBeforeAfter = (before, after) => difference(after, before);
exports.diffBeforeAfter = diffBeforeAfter;
const diffAfterBefore = (after, before) => difference(after, before);
exports.diffAfterBefore = diffAfterBefore;
