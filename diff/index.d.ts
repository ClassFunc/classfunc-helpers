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
declare const diff2: (before: any, after?: any, pickFields?: string[] | undefined) => {};
declare const difference: (after: object, before?: object | undefined) => unknown;
declare const diffBeforeAfter: (before: any, after: any) => unknown;
declare const diffAfterBefore: (after: any, before: any) => unknown;
export { diff2, difference, diffBeforeAfter, diffAfterBefore };
