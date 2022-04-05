var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { logJSON, toJSON } from "../json";
import get from "lodash/get";
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
const getFirebaseConfig = (path) => {
  const pwd = process.env.PWD;
  if (!pwd)
    throw new Error("getFirebaseConfig error, ensure process.env.PWD exists?");
  const functionsRoot = pwd.split("/functions")[0];
  const firebaseJsonContent = eval("require")("fs").readFileSync(eval("require")("path").join(functionsRoot, "firebase.json"), "utf-8");
  const firebaseRcContent = eval("require")("fs").readFileSync(eval("require")("path").join(functionsRoot, ".firebaserc"), "utf-8");
  const conf = __spreadValues(__spreadValues({}, toJSON(firebaseJsonContent)), toJSON(firebaseRcContent));
  if (path)
    return get(conf, path);
  return conf;
};
const getEmulatorsConfig = () => {
  return get(getFirebaseConfig(), "emulators");
};
const setFirebaseEmulators = (debug) => {
  const fConfig = getFirebaseConfig();
  process.env.GCLOUD_PROJECT = get(fConfig, "projects.default");
  const authPort = get(fConfig, "emulators.auth.port");
  const functionsPort = get(fConfig, "emulators.functions.port");
  const firestorePort = get(fConfig, "emulators.firestore.port");
  const storagePort = get(fConfig, "emulators.storage.port");
  const localhost = (port) => `localhost:${port}`;
  if (authPort)
    process.env.FIREBASE_AUTH_EMULATOR_HOST = localhost(authPort);
  if (firestorePort)
    process.env.FIRESTORE_EMULATOR_HOST = localhost(firestorePort);
  if (storagePort)
    process.env.FIREBASE_STORAGE_EMULATOR_HOST = localhost(storagePort);
  if (debug) {
    logJSON(fConfig);
  }
};
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
  IS_STG,
  getEmulatorsConfig,
  getFirebaseConfig,
  setFirebaseEmulators
};
