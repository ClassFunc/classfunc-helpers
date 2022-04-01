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
export declare const diff2: (before: any, after?: any, pickFields?: string[] | undefined) => {};
declare function difference(after: object, before?: object): unknown;
declare const diffBeforeAfter: (before: any, after: any) => unknown;
declare const diffAfterBefore: (after: any, before: any) => unknown;
export { diffExplain, diffObjects, diffValues, difference, diffBeforeAfter, diffAfterBefore };
