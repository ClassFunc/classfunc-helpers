const ENV = process.env.REACT_APP_ENV || "development";
const IS_DEV = ENV === "development" || ENV === "dev";
const IS_STG = ENV === "stg" || ENV === "staging";
const IS_PROD = ENV === "production" || ENV === "prod";
const IS_FIREBASE_CLI = process.env.IS_FIREBASE_CLI === "true";
const FUNCTIONS_EMULATOR = process.env.FUNCTIONS_EMULATOR === "true";
const FIREBASE_DEBUG_MODE = process.env.FIREBASE_DEBUG_MODE === "true";
const FIREBASE_AUTH_EMULATOR_HOST = process.env.FIREBASE_AUTH_EMULATOR_HOST;
const FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST;
const FIREBASE_DATABASE_EMULATOR_HOST = process.env.FIREBASE_DATABASE_EMULATOR_HOST;
const FIREBASE_STORAGE_EMULATOR_HOST = process.env.FIREBASE_STORAGE_EMULATOR_HOST;
const GCLOUD_PROJECT = process.env.GCLOUD_PROJECT;
const FIREBASE_CONFIG = process.env.FIREBASE_CONFIG;
const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;
export {
  ENV,
  FIREBASE_AUTH_EMULATOR_HOST,
  FIREBASE_CONFIG,
  FIREBASE_DATABASE_EMULATOR_HOST,
  FIREBASE_DEBUG_MODE,
  FIREBASE_STORAGE_EMULATOR_HOST,
  FIRESTORE_EMULATOR_HOST,
  FUNCTIONS_EMULATOR,
  GCLOUD_PROJECT,
  GOOGLE_APPLICATION_CREDENTIALS,
  IS_DEV,
  IS_FIREBASE_CLI,
  IS_PROD,
  IS_STG
};
