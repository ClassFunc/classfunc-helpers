// @ts-nocheck

import {isEmpty, isEqual, isPlainObject, set, transform, uniq} from 'lodash';
import {diff} from 'deep-diff';
import {toJSONString, toObject} from "./jsonHelper";
import get from "lodash/get";
import groupBy from "lodash/groupBy";
import compact from "lodash/compact";
import flattenDeep from "lodash/flattenDeep";

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

const diffObjects = (before: any, after?: any, identities?: string[]): IDiffObject[] => {
    let diffValue = diff(before, after);
    if (isEmpty(diffValue))
        return []
    const mapValues = (values: IDiffObject[]) => {
        const ret = values.map((o: IDiffObject) => {
                return ({
                    ...set(o, o.path.join('.'), {before: o.lhs, after: o.rhs}),
                    path: [...o.path, o.path.join('.')],
                })
            },
        )
        identities = identities ?? uniq(ret.map(r => r.path[0]))
        return mapIdentities(ret, identities)
    }
    const mapIdentities = (values: IDiffObject[], ids) => {
        const val = values.map(d => {
            return (!Array.isArray(ids) ? [ids] : ids).map(id => {
                const path = get(d, 'path');
                if (!path.includes(id))
                    return;
                const changes = get(d, id);
                if (changes)
                    return {...changes, __identity__: id};
            });
        });
        return groupBy(compact(flattenDeep(val)), '__identity__')
    }
    return toObject(mapValues(diffValue))
};
const diffValues = diffObjects

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

const diffBeforeAfter = (before: any, after: any) => difference(after, before)
const diffAfterBefore = (after: any, before: any) => difference(after, before)

export {
    diffExplain,
    diffObjects,
    diffValues,
    difference,
    diffBeforeAfter,
    diffAfterBefore
}
