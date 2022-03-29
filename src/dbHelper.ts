// @ts-nocheck

import chunk from "lodash/chunk";
import isFunction from "lodash/isFunction";
import {toJSON} from "./jsonHelper";

const batchSetAsync = async (db: object,
                             values: any[],
                             collectionPath: string,
                             docIdField: string | Function,
                             size: number = 500,
                             setOptions: object = {merge: true}) => {
    const batchPromises = chunk(values, size)
        .map(async ck => new Promise((resolve, reject) => {
            const batch = db.batch()
            ck.forEach(doc => {
                const docPath = isFunction(docIdField) ? docIdField(doc) : doc[docIdField]
                batch.set(
                    db.collection(collectionPath).doc(docPath),
                    toJSON(doc)
                    , setOptions
                )
            })
            batch.commit()
                .then((results: any[]) => {
                    resolve(results)
                })
                .catch((e: any) => {
                    reject(e)
                })
        }))
    return await Promise.all(batchPromises)
}

export {
    batchSetAsync
}
