// @ts-nocheck

import clone from 'lodash/clone'
import forEach from "lodash/forEach";
import isPlainObject from 'lodash/isPlainObject';
import isUndefined from "lodash/isUndefined";

const toJSONString = (value: any, format? = true): string => {
    let fmt = format ? [null, 2] : []
    if (typeof value === "undefined") {
        return '{}'
    }
    return JSON.stringify(value, ...fmt);
};

const toObject = (value: any): any => {
    return JSON.parse(toJSONString(value, false));
};
const toJSON = toObject

const omitByDeep = (obj, shouldOmit) => {
    obj = clone(obj);
    forEach(obj, (value, key) => {
        if (shouldOmit(value, key)) {
            delete obj[key];
        }
        if (isPlainObject(value)) {
            obj[key] = omitByDeep(value, shouldOmit);
        }
    })
    return obj;
}

const removeUndefined = obj => {
    return toObject(omitByDeep(obj, isUndefined))
}

const removeUndefinedDeep = (obj): any => {
    return JSON.parse(JSON.stringify(obj));
};

const logJSON = (...value: any[]) => {
    for (const val of value) {
        console.log(toJSONString(val))
    }
}

export {
    toJSONString,
    toObject,
    toJSON,
    removeUndefinedDeep,
    omitByDeep,
    removeUndefined,
    logJSON
}
