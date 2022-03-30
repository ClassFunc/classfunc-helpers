declare const toJSONString: (value: any, format?: boolean | undefined) => string;
declare const toObject: (value: any) => any;
declare const toJSON: (value: any) => any;
declare const omitByDeep: (obj: any, shouldOmit: any) => any;
declare const removeUndefined: (obj: any) => any;
declare const removeUndefinedDeep: (obj: any) => any;
declare const logJSON: (...value: any[]) => void;
export { toJSONString, toObject, toJSON, removeUndefinedDeep, omitByDeep, removeUndefined, logJSON };
