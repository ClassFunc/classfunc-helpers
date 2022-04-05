// @ts-nocheck

import {logJSON, toJSON} from "../json";
import get from "lodash/get";

const ENV = process.env.REACT_APP_ENV || process.env.NODE_ENV
const IS_DEV = ENV === 'development' || ENV === 'dev'
const IS_STG = ENV === 'stg' || ENV === 'staging'
const IS_PROD = ENV === 'production' || ENV === 'prod'

const IS_FIREBASE_CLI = process.env.IS_FIREBASE_CLI === 'true';
const FUNCTIONS_EMULATOR = process.env.FUNCTIONS_EMULATOR === 'true';
const FIREBASE_DEBUG_MODE = process.env.FIREBASE_DEBUG_MODE === 'true';
const FIREBASE_AUTH_EMULATOR_HOST = process.env.FIREBASE_AUTH_EMULATOR_HOST;
const FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST;
const FIREBASE_DATABASE_EMULATOR_HOST = process.env.FIREBASE_DATABASE_EMULATOR_HOST;
const FIREBASE_STORAGE_EMULATOR_HOST = process.env.FIREBASE_STORAGE_EMULATOR_HOST;
const GCLOUD_PROJECT = process.env.GCLOUD_PROJECT;
const FIREBASE_CONFIG = process.env.FIREBASE_CONFIG;
const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

const getFirebaseConfig = (path?: string | any[]) => {
    const pwd = process.env.PWD
    if(!pwd)
        throw new Error('getFirebaseConfig error, ensure process.env.PWD exists?')
    const functionsRoot = pwd.split('/functions')[0]
    const firebaseJsonContent = eval('require')('fs').readFileSync(eval('require')('path').join(functionsRoot, 'firebase.json'), 'utf-8');
    const firebaseRcContent = eval('require')('fs').readFileSync(eval('require')('path').join(functionsRoot, '.firebaserc'), 'utf-8');
    const conf = {...toJSON(firebaseJsonContent), ...toJSON(firebaseRcContent)}
    if (path)
        return get(conf, path)
    return conf;
}

const getEmulatorsConfig = () => {
    return get(getFirebaseConfig(), 'emulators')
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

export {
    IS_DEV,
    IS_STG,
    IS_PROD,
    ENV,
    IS_FIREBASE_CLI,
    FUNCTIONS_EMULATOR,
    FIREBASE_DEBUG_MODE,
    FIREBASE_AUTH_EMULATOR_HOST,
    FIRESTORE_EMULATOR_HOST,
    FIREBASE_DATABASE_EMULATOR_HOST,
    FIREBASE_STORAGE_EMULATOR_HOST,
    GCLOUD_PROJECT,
    FIREBASE_CONFIG,
    GOOGLE_APPLICATION_CREDENTIALS,
    getEmulatorsConfig,
    getFirebaseConfig,
    setFirebaseEmulators,
}

