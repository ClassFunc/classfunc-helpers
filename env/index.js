"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFirebaseEmulators = exports.getFirebaseConfig = exports.getEmulatorsConfig = exports.GOOGLE_APPLICATION_CREDENTIALS = exports.FIREBASE_CONFIG = exports.GCLOUD_PROJECT = exports.FIREBASE_STORAGE_EMULATOR_HOST = exports.FIREBASE_DATABASE_EMULATOR_HOST = exports.FIRESTORE_EMULATOR_HOST = exports.FIREBASE_AUTH_EMULATOR_HOST = exports.FIREBASE_DEBUG_MODE = exports.FUNCTIONS_EMULATOR = exports.IS_FIREBASE_CLI = exports.ENV = exports.IS_PROD = exports.IS_STG = exports.IS_DEV = void 0;
const json_1 = require("../json");
const get_1 = __importDefault(require("lodash/get"));
const ENV = process.env.REACT_APP_ENV || process.env.NODE_ENV;
exports.ENV = ENV;
const IS_DEV = ENV === 'development' || ENV === 'dev';
exports.IS_DEV = IS_DEV;
const IS_STG = ENV === 'stg' || ENV === 'staging';
exports.IS_STG = IS_STG;
const IS_PROD = ENV === 'production' || ENV === 'prod';
exports.IS_PROD = IS_PROD;
const IS_FIREBASE_CLI = process.env.IS_FIREBASE_CLI === 'true';
exports.IS_FIREBASE_CLI = IS_FIREBASE_CLI;
const FUNCTIONS_EMULATOR = process.env.FUNCTIONS_EMULATOR === 'true';
exports.FUNCTIONS_EMULATOR = FUNCTIONS_EMULATOR;
const FIREBASE_DEBUG_MODE = process.env.FIREBASE_DEBUG_MODE === 'true';
exports.FIREBASE_DEBUG_MODE = FIREBASE_DEBUG_MODE;
const FIREBASE_AUTH_EMULATOR_HOST = process.env.FIREBASE_AUTH_EMULATOR_HOST;
exports.FIREBASE_AUTH_EMULATOR_HOST = FIREBASE_AUTH_EMULATOR_HOST;
const FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST;
exports.FIRESTORE_EMULATOR_HOST = FIRESTORE_EMULATOR_HOST;
const FIREBASE_DATABASE_EMULATOR_HOST = process.env.FIREBASE_DATABASE_EMULATOR_HOST;
exports.FIREBASE_DATABASE_EMULATOR_HOST = FIREBASE_DATABASE_EMULATOR_HOST;
const FIREBASE_STORAGE_EMULATOR_HOST = process.env.FIREBASE_STORAGE_EMULATOR_HOST;
exports.FIREBASE_STORAGE_EMULATOR_HOST = FIREBASE_STORAGE_EMULATOR_HOST;
const GCLOUD_PROJECT = process.env.GCLOUD_PROJECT;
exports.GCLOUD_PROJECT = GCLOUD_PROJECT;
const FIREBASE_CONFIG = process.env.FIREBASE_CONFIG;
exports.FIREBASE_CONFIG = FIREBASE_CONFIG;
const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;
exports.GOOGLE_APPLICATION_CREDENTIALS = GOOGLE_APPLICATION_CREDENTIALS;
const getFirebaseConfig = () => {
    const pwd = process.env.PWD;
    const functionsRoot = pwd.split('/functions')[0];
    const firebaseJsonContent = eval('require')('fs').readFileSync(eval('require')('path').join(functionsRoot, 'firebase.json'), 'utf-8');
    const firebaseRcContent = eval('require')('fs').readFileSync(eval('require')('path').join(functionsRoot, '.firebaserc'), 'utf-8');
    return Object.assign(Object.assign({}, (0, json_1.toJSON)(firebaseJsonContent)), (0, json_1.toJSON)(firebaseRcContent));
};
exports.getFirebaseConfig = getFirebaseConfig;
const getEmulatorsConfig = () => {
    return (0, get_1.default)(getFirebaseConfig(), 'emulators');
};
exports.getEmulatorsConfig = getEmulatorsConfig;
const setFirebaseEmulators = () => {
    const fConfig = getFirebaseConfig();
    process.env.GCLOUD_PROJECT = (0, get_1.default)(fConfig, 'projects.default');
    const authPort = (0, get_1.default)(fConfig, 'emulators.auth.port');
    const functionsPort = (0, get_1.default)(fConfig, 'emulators.functions.port');
    const firestorePort = (0, get_1.default)(fConfig, 'emulators.firestore.port');
    const storagePort = (0, get_1.default)(fConfig, 'emulators.storage.port');
    const localhost = port => `localhost:${port}`;
    if (authPort)
        process.env.FIREBASE_AUTH_EMULATOR_HOST = localhost(authPort);
    if (firestorePort)
        process.env.FIRESTORE_EMULATOR_HOST = localhost(firestorePort);
    if (storagePort)
        process.env.FIREBASE_STORAGE_EMULATOR_HOST = localhost(storagePort);
};
exports.setFirebaseEmulators = setFirebaseEmulators;
