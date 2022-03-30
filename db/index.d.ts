declare const batchSetAsync: (db: object, values: any[], collectionPath: string, idField: string | ((value: any) => string), setValue?: ((value: any) => object) | undefined, setOptions?: {
    merge: boolean;
} | undefined, size?: number | undefined) => Promise<unknown[]>;
export { batchSetAsync };
