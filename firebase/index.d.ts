declare const isBrowser: () => boolean;
declare const isNode: () => boolean;
declare const getFirebaseConfig: (path?: string | any[] | undefined) => any;
declare const getEmulatorConfig: (selector?: string | undefined) => any;
declare const getEmulatorHost: (emulator: string, hostname?: string | undefined) => string;
declare const setFirebaseEmulators: (debug?: boolean | undefined) => void;
export declare const getDefaultProjectName: () => string;
export declare const httpsFunctionEndpoint: (emulatorsFunctionsPort: any, functionName?: string | undefined, region?: string | undefined) => string;
export { getEmulatorConfig, getFirebaseConfig, setFirebaseEmulators, getEmulatorHost, isBrowser, isNode };
