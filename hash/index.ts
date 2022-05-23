import isEmpty from "lodash/isEmpty";
import isPlainObject from "lodash/isPlainObject";

export const toHashObject = (hash: string): object => {

    if (isEmpty(hash))
        return {};
    hash = hash.replace('#', '')

    return hash.split(';')
        .map(h => h.split(':'))
        .reduce((obj, curr) => {
            if (!curr[1])
                return obj;
            const k = curr[0];
            // @ts-ignore
            obj[k] = curr[1]
            return obj;
        }, {})
}

export const toHashString = (obj: any): string => {
    if (!isPlainObject(obj) || isEmpty(obj))
        return '';
    let result = '';

    // @ts-ignore
    Object.keys(obj).forEach(k => {
        // @ts-ignore
        const val = obj[k]
        result += `${k}:${val};`
    })

    return result;
}

export const setHash = (hash: string | object) => {
    if (typeof hash === "undefined")
        return;
    let hashStr;
    if (isPlainObject(hash)) { // @ts-ignore
        hashStr = toHashString(hash);
    } else if (typeof hash === 'string')
        hashStr = hash;

    const newHash = window.location.hash + ';' + hashStr;
    window.location.hash = toHashString(toHashObject(newHash));
}

export const resetHash = (str?: string) => {
    window.location.hash = str || '';
}
