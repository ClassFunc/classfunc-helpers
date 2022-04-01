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
declare const diffObjects: (before: any, after?: any, pickFields?: string[] | undefined) => {};
declare const diffValues: (before: any, after?: any, pickFields?: string[] | undefined) => {};
export { diffObjects, diffValues, diff2, };
