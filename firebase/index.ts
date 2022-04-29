// @ts-nocheck

import {logJSON, toJSON} from "../json";
import {IS_FIREBASE_CLI} from '../env';
import get from "lodash/get";

const isBrowser = () => ![typeof window, typeof document].includes('undefined');
const isNode = () =>
    typeof process !== 'undefined' &&
    !!process.versions &&
    !!process.versions.node;

/*
*  server-only functions
* */

const getFirebaseConfig = (path?: string | any[]) => {
    if (isBrowser()) {
        console.warn('this function is server-only function');
        return
    }
    const pwd = process.env.PWD
    if (!pwd)
        throw new Error('getFirebaseConfig error, ensure process.env.PWD exists?')
    const functionsRoot = pwd.split('/functions')[0]
    const firebaseJsonContent = eval('require')('fs').readFileSync(eval('require')('path').join(functionsRoot, 'firebase.json'), 'utf-8');
    const firebaseRcContent = eval('require')('fs').readFileSync(eval('require')('path').join(functionsRoot, '.firebaserc'), 'utf-8');
    const conf = {...toJSON(firebaseJsonContent), ...toJSON(firebaseRcContent)}
    if (path)
        return get(conf, path)
    return conf;
}

const getEmulatorConfig = (selector?: string) => {
    const allConfig = get(getFirebaseConfig(), 'emulators')
    if (selector)
        return get(allConfig, selector)
    return allConfig
}

const getEmulatorHost = (emulator: string, hostname?: string = 'localhost'): string => {
    const fConfig = getFirebaseConfig()
    const host = port => `${hostname}:${port}`
    return host(get(fConfig, `emulators.${emulator}.port`))
}

const setFirebaseEmulators = (debug?: boolean) => {
    const fConfig = getFirebaseConfig()
    process.env.GCLOUD_PROJECT = get(fConfig, 'projects.default')

    const authPort = get(fConfig, 'emulators.auth.port')
    const functionsPort = get(fConfig, 'emulators.functions.port')
    const firestorePort = get(fConfig, 'emulators.firestore.port')
    const storagePort = get(fConfig, 'emulators.storage.port')
    const localhost = port => `localhost:${port}`
    if (authPort)
        process.env.FIREBASE_AUTH_EMULATOR_HOST = localhost(authPort)
    if (firestorePort)
        process.env.FIRESTORE_EMULATOR_HOST = localhost(firestorePort)
    if (storagePort)
        process.env.FIREBASE_STORAGE_EMULATOR_HOST = localhost(storagePort)

    if (debug) {
        logJSON(fConfig)
    }
}

export const getDefaultProjectName = (): string => {
    return getFirebaseConfig('projects.default');
}

export const httpsFunctionEndpoint = (functionName?: string, region?: string = 'asia-northeast1'): string => {
    const functionHost = getEmulatorHost('functions');
    const project = getDefaultProjectName();
    return IS_FIREBASE_CLI ?
        `http://${functionHost}/${project}/${region}/${functionName || process.env.FUNCTION_NAME}` :
        `https://${region}-${project}.cloudfunctions.net/${functionName || process.env.FUNCTION_NAME}`;
}

export {
    getEmulatorConfig,
    getFirebaseConfig,
    setFirebaseEmulators,
    getEmulatorHost,
    onRequestFunctionUrl,
    isBrowser,
    isNode
}

