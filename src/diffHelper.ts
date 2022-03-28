import {isEqual, isPlainObject, transform} from 'lodash';

// @ts-ignore
import {diff} from 'deep-diff';
import {toJSONString} from "./jsonHelper";

export type IKind = 'N' | 'D' | 'E' | 'A'

export interface IDiffObject {
    item: {
        kind: IKind,
        lhs: object,
        rhs: object
    },
    kind: IKind,
    path: string[],
    index: number,
    lhs: object,
    rhs: object
}


const diffExplain = (before: object, after?: object): string[] => {
    let diffArr = diffObjects(before, after);
    const explain: Record<IKind, string> = {
        'N': 'added',
        'D': 'deleted',
        'E': 'edited',
        'A': 'array',
    };
    return diffArr.map((diffObj: IDiffObject) => {
        const item = diffObj.item;
        const itemKind = item?.kind;
        let kindExplain: string = '';
        if (itemKind) {
            kindExplain = explain[item.kind];
        }
        return `${explain[diffObj.kind]} ${toJSONString(
            diffObj.path?.join('.'))} ${diffObj.index > -1
            ? `at ${diffObj.index}`
            : ''} ${itemKind ? `${toJSONString(kindExplain)} ${itemKind === 'N' ? toJSONString(
            item.rhs) : toJSONString(item.lhs)}` : `${toJSONString(diffObj.lhs)} -> ${toJSONString(
            diffObj.rhs)}`}`;
    });
};

const diffObjects = (before: object, after?: object): IDiffObject[] => {
    let diffValue = diff(before, after);
    return JSON.parse(JSON.stringify(diffValue));
};

/**
 * Deep diff between two after, using lodash
 * @param  {Object} after Object compared
 * @param  {Object} before   Object to compare with
 * @return {Object}        Return a new after who represent the diff
 */
function difference(after: object, before?: object) {
    if (!before)//created
        return after;

    // else updated or deleted;
    function changes(object: object, base: object) {
        return transform(object, function (result, value, key) {
            if (!isEqual(value, base[key])) {
                // @ts-ignore
                result[key] = (isPlainObject(value) && isPlainObject(base[key]))
                    ? changes(value, base[key])
                    : value;
            }
        });
    }

    return changes(after, before);
}

export {
    diffExplain,
    diffObjects,
    difference
}
