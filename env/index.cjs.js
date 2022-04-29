var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var env_exports = {};
__export(env_exports, {
  ENV: () => ENV,
  FIREBASE_AUTH_EMULATOR_HOST: () => FIREBASE_AUTH_EMULATOR_HOST,
  FIREBASE_CONFIG: () => FIREBASE_CONFIG,
  FIREBASE_DATABASE_EMULATOR_HOST: () => FIREBASE_DATABASE_EMULATOR_HOST,
  FIREBASE_DEBUG_MODE: () => FIREBASE_DEBUG_MODE,
  FIREBASE_STORAGE_EMULATOR_HOST: () => FIREBASE_STORAGE_EMULATOR_HOST,
  FIRESTORE_EMULATOR_HOST: () => FIRESTORE_EMULATOR_HOST,
  FUNCTIONS_EMULATOR: () => FUNCTIONS_EMULATOR,
  GCLOUD_PROJECT: () => GCLOUD_PROJECT,
  GOOGLE_APPLICATION_CREDENTIALS: () => GOOGLE_APPLICATION_CREDENTIALS,
  IS_DEV: () => IS_DEV,
  IS_FIREBASE_CLI: () => IS_FIREBASE_CLI,
  IS_PROD: () => IS_PROD,
  IS_STG: () => IS_STG,
});
module.exports = __toCommonJS(env_exports);
const ENV = process.env.REACT_APP_ENV || process.env.NODE_ENV;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
    IS_STG,
});
