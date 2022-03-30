// @ts-nocheck

import chunk from "lodash/chunk";
import isFunction from "lodash/isFunction";
import {logJSON, toJSON} from "../json";

export interface BatchSetAsyncParams {
    db: object;
    values: any[];
    collectionPath: string;
    idField: ((value: any) => string) | string;
    setObject?: (value: any) => object;
    setOptions?: { merge: boolean };
    size?: number;
    log?: boolean;
}

const batchSetAsync = async ({
                                 db,
                                 values,
                                 collectionPath,
                                 idField,
                                 setObject,
                                 setOptions = {merge: true},
                                 size = 500,
                                 log = true
                             }: BatchSetAsyncParams,
) => {
    const batchPromises = chunk(values, size)
        .map(async ck => new Promise((resolve, reject) => {
            const batch = db.batch()
            ck.forEach(doc => {
                let value
                if (isFunction(setObject))
                    value = setObject(doc)
                if (!value)
                    value = doc
                const docPath = isFunction(idField)
                    ? idField(doc)
                    : doc[idField]
                // set
                const docRef = db.collection(collectionPath).doc(docPath)
                if (log)
                    logJSON('-- set -- ', docRef.path, value)
                batch.set(
                    docRef,
                    toJSON(value),
                    setOptions
                )
            })
            batch.commit()
                .then((results: any[]) => {
                    if (log)
                        logJSON('-- set success --')
                    resolve(results)
                })
                .catch((e: any) => {
                    reject(e)
                })
        }))
    return await Promise.all(batchPromises)
}

export interface BatchUpdateAsyncParams {
    db: object;
    values: any[];
    collectionPath: string;
    idField: ((value: any) => string) | string;
    updateObject?: (value: any) => object;
    size?: number;
    log?: boolean;
}

const batchUpdateAsync = async ({
                                    db,
                                    values,
                                    collectionPath,
                                    idField,
                                    updateObject,
                                    size = 500,
                                    log = true
                                }: BatchUpdateAsyncParams
) => {
    const batchPromises = chunk(values, size)
        .map(async ck => new Promise((resolve, reject) => {
            const batch = db.batch()
            ck.forEach(doc => {
                let value
                if (isFunction(updateObject))
                    value = updateObject(doc)
                if (!value)
                    value = doc
                const docPath = isFunction(idField)
                    ? idField(doc)
                    : doc[idField]
                // set
                const docRef = db.collection(collectionPath).doc(docPath)
                if (log)
                    logJSON('-- update -- ', docRef.path, value)
                batch.update(
                    docRef,
                    toJSON(value)
                )
            })
            batch.commit()
                .then((results: any[]) => {
                    if (log)
                        logJSON('-- update success --')
                    resolve(results)
                })
                .catch((e: any) => {
                    reject(e)
                })
        }))
    return await Promise.all(batchPromises)
}

export {
    batchSetAsync,
    batchUpdateAsync
}
