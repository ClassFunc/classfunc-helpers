export declare type IKind = 'N' | 'D' | 'E' | 'A';
export interface IDiffObject {
    item: {
        kind: IKind;
        lhs: object;
        rhs: object;
    };
    kind: IKind;
    path: string[];
    index: number;
    lhs: object;
    rhs: object;
}
declare const diffExplain: (before: object, after?: object | undefined) => string[];
declare const diffObjects: (before: any, after?: any, identities?: string[] | undefined) => IDiffObject[];
declare const diffValues: (before: any, after?: any, identities?: string[] | undefined) => IDiffObject[];
/**
 * Deep diff between two after, using lodash
 * @param  {Object} after Object compared
 * @param  {Object} before   Object to compare with
 * @return {Object}        Return a new after who represent the diff
 */
declare function difference(after: object, before?: object): unknown;
declare const diffBeforeAfter: (before: any, after: any) => unknown;
declare const diffAfterBefore: (after: any, before: any) => unknown;
export { diffExplain, diffObjects, diffValues, difference, diffBeforeAfter, diffAfterBefore };
