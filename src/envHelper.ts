// @ts-nocheck

const ENV = process.env.REACT_APP_ENV || process.env.NODE_ENV
const IS_DEV = ENV === 'development' || ENV === 'dev'
const IS_STG = ENV === 'stg' || ENV === 'staging'
const IS_PROD = ENV === 'production' || ENV === 'prod'

const IS_FIREBASE_CLI = process.env.IS_FIREBASE_CLI === 'true';
const FIREBASE_AUTH_EMULATOR_HOST = process.env.FIREBASE_AUTH_EMULATOR_HOST;
const FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST;
const FIREBASE_DATABASE_EMULATOR_HOST = process.env.FIREBASE_DATABASE_EMULATOR_HOST;
const FIREBASE_STORAGE_EMULATOR_HOST = process.env.FIREBASE_STORAGE_EMULATOR_HOST;


export {
    IS_DEV,
    IS_STG,
    IS_PROD,
    IS_FIREBASE_CLI,
    FIREBASE_AUTH_EMULATOR_HOST,
    FIRESTORE_EMULATOR_HOST,
    FIREBASE_DATABASE_EMULATOR_HOST,
    FIREBASE_STORAGE_EMULATOR_HOST
}
