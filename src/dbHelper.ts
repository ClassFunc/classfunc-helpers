// @ts-nocheck

import chunk from "lodash/chunk";
import {toJSON} from "./jsonHelper";

const batchSetAsync = async (db: object,
                             values: any[],
                             collectionPath: string,
                             docIdField: string,
                             size = 500,
                             setOptions = {merge: true}) => {
    const batchPromises = chunk(values, size)
        .map(async ck => new Promise((resolve, reject) => {
            const batch = db.batch()
            ck.forEach(doc => {
                batch.set(
                    db.collection(collectionPath).doc(doc[docIdField]),
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
