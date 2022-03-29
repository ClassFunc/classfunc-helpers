// @ts-nocheck

import clone from 'lodash/clone'
import forEach from "lodash/forEach";
import isPlainObject from 'lodash/isPlainObject';
import isUndefined from "lodash/isUndefined";

const toJSONString = (objOrString: object | string): string => {
    return JSON.stringify(objOrString, null, 2);
};

const toObject = (string: any): any => {
    return JSON.parse(string);
};

const removeUndefinedDeep = (obj: object): any => {
    return JSON.parse(JSON.stringify(obj));
};

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
    return omitByDeep(obj, isUndefined)
}

const logJSON = (value: any) => {
    console.log(toJSONString(value))
}

export {
    toJSONString,
    toObject,
    removeUndefinedDeep,
    omitByDeep,
    removeUndefined,
    logJSON
}
