declare const isBrowser: () => boolean;
declare const isNode: () => boolean;
declare const getFirebaseConfig: (path?: string | any[] | undefined) => any;
declare const getEmulatorsConfig: () => any;
declare const getEmulatorHost: string;
declare const setFirebaseEmulators: (debug?: boolean | undefined) => void;
declare const onRequestFunctionUrl: string;
export { getEmulatorsConfig, getFirebaseConfig, setFirebaseEmulators, getEmulatorHost, onRequestFunctionUrl, isBrowser, isNode };
