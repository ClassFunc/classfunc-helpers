// @ts-ignore
import {isPlainObject} from 'lodash/lang';

export const toJSONString = (objOrString: object | string): string => {
    return JSON.stringify(objOrString, null, 2);
};

export const toObject = (string: any): any => {
    return JSON.parse(string);
};

export const removeUndefinedDeep = (obj: object): any => {
    return JSON.parse(JSON.stringify(obj));
};
