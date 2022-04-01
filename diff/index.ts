// @ts-nocheck

import isEqual from 'lodash/isEqual'
import isPlainObject from 'lodash/isPlainObject'
import set from 'lodash/set'
import transform from 'lodash/transform'
import {diff} from 'deep-diff';
import pick from "lodash/pick";

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

//
//
// const diffExplain = (before: object, after?: object): string[] => {
//     let diffArr = diffObjects(before, after);
//     const explain: Record<IKind, string> = {
//         'N': 'added',
//         'D': 'deleted',
//         'E': 'edited',
//         'A': 'array',
//     };
//     return diffArr.map((diffObj: IDiffObject) => {
//         const item = diffObj.item;
//         const itemKind = item?.kind;
//         let kindExplain: string = '';
//         if (itemKind) {
//             kindExplain = explain[item.kind];
//         }
//         return `${explain[diffObj.kind]} ${toJSONString(
//             diffObj.path?.join('.'))} ${diffObj.index > -1
//             ? `at ${diffObj.index}`
//             : ''} ${itemKind ? `${toJSONString(kindExplain)} ${itemKind === 'N' ? toJSONString(
//             item.rhs) : toJSONString(item.lhs)}` : `${toJSONString(diffObj.lhs)} -> ${toJSONString(
//             diffObj.rhs)}`}`;
//     });
// };
//
// const diffObjects = (before: any, after?: any, identities?: string[]): IDiffObject[] => {
//
//     if (!after) {
//         return diffObjects(before, isPlainObject(before) ? {} : []);
//     }
//     let diffValues = diff(before, after);
//     if (isEmpty(diffValues))
//         return []
//     logJSON(diffValues)
//     const mapValues = (diffValues: IDiffObject[]) => {
//         const pathMappedValues = diffValues.map((diff: IDiffObject) => {
//                 const pathArr = get(diff, 'path')
//                 if (isEmpty(pathArr))
//                     return {'__b': diff.lhs, '___afterfter': diff.rhs};
//                 return ({
//                     ...set(diff, pathArr.join('.'), {'__b': diff.lhs, '___afterfter': diff.rhs}),
//                     path: [...pathArr, pathArr.join('.')],
//                 })
//             },
//         )
//         identities = identities ?? uniq(pathMappedValues.map(r => get(r, 'path.0')))
//         return mapIdentities(pathMappedValues, identities)
//     }
//     const mapIdentities = (pathMappedValues: IDiffObject[], fields) => {
//         const val = pathMappedValues.map(diff => {
//             if (isEmpty(get(diff, 'path')))
//                 return diff;
//             return (!Array.isArray(fields) ? [fields] : fields).map(field => {
//                 const pathArr = get(diff, 'path');
//                 if (!pathArr?.includes(field))
//                     return;
//                 const changes = get(diff, field);
//                 if (changes)
//                     return {...changes, __field: field};
//             });
//         });
//         return groupBy(compact(flattenDeep(val)), '__field')
//     }
//     return toObject(mapValues(diffValues));
// };
// const diffValues = diffObjects

const diff2 = (before: any, after?: any, pickFields?: string[]) => {
    const diffValues = diff(before, after)
    let ret = {}
    diffValues.forEach(diff => {
        switch (diff.kind) {
            case 'N':
            case 'E':
            case 'D':
                ret = set(ret, diff?.path?.join('.'), {__b: diff.lhs, __a: diff.rhs})
                break;
            case 'A':
                const p = diff?.path?.join('.') + `.${diff.index}`
                let val;
                if (diff.item.kind === 'N')
                    val = {__a: diff.item.rhs}
                else if (diff.item.kind === 'D')
                    val = {__b: diff.item.lhs}
                ret = set(ret, p, val)
                break;
        }
    })
    if (pickFields)
        return pick(ret, pickFields)
    return ret;
}

/**
 * Deep diff between two after, using lodash
 * @param  {Object} after Object compared
 * @param  {Object} before   Object to compare with
 * @return {Object}        Return a new after who represent the diff
 */
const difference = (after: object, before?: object) => {
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

const diffBeforeAfter = (before: any, after: any) => difference(after, before)
const diffAfterBefore = (after: any, before: any) => difference(after, before)

export {
    // diffExplain,
    // diffObjects,
    // diffValues,
    diff2,
    difference,
    diffBeforeAfter,
    diffAfterBefore
}
