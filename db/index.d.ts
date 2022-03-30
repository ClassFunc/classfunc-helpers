export interface BatchSetAsyncParams {
    db: object;
    values: any[];
    collectionPath: string;
    idField: ((value: any) => string) | string;
    setObject?: (value: any) => object;
    setOptions?: {
        merge: boolean;
    };
    size?: number;
    log?: boolean;
}
declare const batchSetAsync: ({ db, values, collectionPath, idField, setObject, setOptions, size, log }: BatchSetAsyncParams) => Promise<unknown[]>;
export interface BatchUpdateAsyncParams {
    db: object;
    values: any[];
    collectionPath: string;
    idField: ((value: any) => string) | string;
    updateObject?: (value: any) => object;
    size?: number;
    log?: boolean;
}
declare const batchUpdateAsync: ({ db, values, collectionPath, idField, updateObject, size, log }: BatchUpdateAsyncParams) => Promise<unknown[]>;
export { batchSetAsync, batchUpdateAsync };
