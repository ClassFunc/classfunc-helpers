declare const batchSetAsync: (db: object, values: any[], collectionPath: string, idField: string | ((value: any) => string), setObject?: ((value: any) => object) | undefined, setOptions?: {
    merge: boolean;
} | undefined, size?: number | undefined) => Promise<unknown[]>;
declare const batchUpdateAsync: (db: object, values: any[], collectionPath: string, idField: string | ((value: any) => string), updateObject?: ((value: any) => object) | undefined, setOptions?: {
    merge: boolean;
} | undefined, size?: number | undefined) => Promise<unknown[]>;
export { batchSetAsync, batchUpdateAsync };
