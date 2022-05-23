import isEmpty from "lodash/isEmpty";
import isPlainObject from "lodash/isPlainObject";

export const toHashObject = (hash: string): object | null => {

    if (isEmpty(hash))
        return null;
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

export const toHashString = (obj: Object | null): string => {
    if (!isPlainObject(obj))
        return '';
    let result = ''

    // @ts-ignore
    Object.keys(obj).forEach(k => {
        // @ts-ignore
        const val = obj[k]
        result = result + `${k}:${val};`
    })

    return result;
}

export const setHash = (str: string) => {
    const newHash = window.location.hash + ';' + str;
    window.location.hash = toHashString(toHashObject(newHash));
}


