// @ts-ignore
import {isPlainObject} from 'lodash/lang';

export const toJSONString = (objOrString: object | string): string => {
    if (typeof objOrString === 'string') {
        try {
            objOrString = JSON.parse(objOrString);
        } catch (e) {
            objOrString = {};
        }
    }
    return JSON.stringify(objOrString, null, 2);
};

export const toObject = (string: string): any => {
    return JSON.parse(string);
};

export const removeUndefinedDeep = (obj: object): any => {
    if (!isPlainObject(obj)) {
        return;
    }
    return JSON.parse(JSON.stringify(obj));
};
