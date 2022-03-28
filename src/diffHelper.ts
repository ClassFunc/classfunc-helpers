import {isEqual, isPlainObject, transform} from 'lodash';

// @ts-ignore
import {diff} from 'deep-diff';
import {toJSON} from "./jsonHelper";

type IKind = 'N' | 'D' | 'E' | 'A'

interface IDiffObject {
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

const diffExplain = (...args: object[]): string[] => {
    // console.log({args})
    let diffValue;
    if (args.length === 2) {
        const [beforeData, afterData] = args;
        diffValue = diff(beforeData, afterData);
    } else {
        diffValue = args[0];
    }
    const diffArr: IDiffObject[] = JSON.parse(JSON.stringify(diffValue));
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
        return `${explain[diffObj.kind]} ${toJSON(
            diffObj.path?.join('.'))} ${diffObj.index > -1
            ? `at ${diffObj.index}`
            : ''} ${itemKind ? `${toJSON(kindExplain)} ${itemKind === 'N' ? toJSON(
            item.rhs) : toJSON(item.lhs)}` : `${toJSON(diffObj.lhs)} -> ${toJSON(
            diffObj.rhs)}`}`;
    });
};

const diffJson = (...args: object[]) => {
    let diffValue;
    if (args.length === 2) {
        const [beforeData, afterData] = args;
        diffValue = diff(beforeData, afterData);
    } else {
        diffValue = args[0];
    }
    return JSON.parse(JSON.stringify(diffValue));
};

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
function difference(object: object, base: object) {
    if (!base)//created
        return object;

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

    return changes(object, base);
}

export {
    diffExplain,
    diffJson,
    difference
}
