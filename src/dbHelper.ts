// @ts-nocheck

import chunk from "lodash/chunk";
import isFunction from "lodash/isFunction";
import {toJSON} from "./jsonHelper";

export {
    batchSetAsync
}

const batchSetAsync = async (db: object,
                             values: any[],
                             collectionPath: string,
                             idField: ((value: any) => string) | string,
                             setValue?: ((value: any) => object),
                             setOptions? = {merge: true},
                             size? = 500,
) => {
    const batchPromises = chunk(values, size)
        .map(async ck => new Promise((resolve, reject) => {
            const batch = db.batch()
            ck.forEach(doc => {
                let value
                if (isFunction(setValue))
                    value = setValue(doc)
                if (!value)
                    value = doc
                const docPath = isFunction(idField)
                    ? idField(doc)
                    : doc[idField]
                // set
                batch.set(
                    db.collection(collectionPath).doc(docPath),
                    toJSON(value),
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
