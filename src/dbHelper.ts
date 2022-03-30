// @ts-nocheck

import chunk from "lodash/chunk";
import isFunction from "lodash/isFunction";
import {toJSON} from "./jsonHelper";

const batchSetAsync = async (db: object,
                             values: any[],
                             collectionPath: string,
                             docIdField: string | Function,
                             setValueFunc: Function | null | undefined,
                             setOptions: object = {merge: true},
                             size: number = 500,
) => {
    const batchPromises = chunk(values, size)
        .map(async ck => new Promise((resolve, reject) => {
            const batch = db.batch()
            ck.forEach(doc => {
                const data = isFunction(setValueFunc)
                    ? setValueFunc(doc)
                    : doc
                const docPath = isFunction(docIdField)
                    ? docIdField(doc)
                    : doc[docIdField]
                // set
                batch.set(
                    db.collection(collectionPath).doc(docPath),
                    toJSON(data),
                    setOptions
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
