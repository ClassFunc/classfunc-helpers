var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
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
  getEmulatorsConfig: () => getEmulatorsConfig,
  getFirebaseConfig: () => getFirebaseConfig,
  setFirebaseEmulators: () => setFirebaseEmulators
});
module.exports = __toCommonJS(env_exports);
var import_json = require("../json");
var import_get = __toESM(require("lodash/get"));
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
const getFirebaseConfig = (path) => {
  const pwd = process.env.PWD;
  if (!pwd)
    throw new Error("getFirebaseConfig error, ensure process.env.PWD exists?");
  const functionsRoot = pwd.split("/functions")[0];
  const firebaseJsonContent = eval("require")("fs").readFileSync(eval("require")("path").join(functionsRoot, "firebase.json"), "utf-8");
  const firebaseRcContent = eval("require")("fs").readFileSync(eval("require")("path").join(functionsRoot, ".firebaserc"), "utf-8");
  const conf = __spreadValues(__spreadValues({}, (0, import_json.toJSON)(firebaseJsonContent)), (0, import_json.toJSON)(firebaseRcContent));
  if (path)
    return (0, import_get.default)(conf, path);
  return conf;
};
const getEmulatorsConfig = () => {
  return (0, import_get.default)(getFirebaseConfig(), "emulators");
};
const setFirebaseEmulators = (debug) => {
  const fConfig = getFirebaseConfig();
  process.env.GCLOUD_PROJECT = (0, import_get.default)(fConfig, "projects.default");
  const authPort = (0, import_get.default)(fConfig, "emulators.auth.port");
  const functionsPort = (0, import_get.default)(fConfig, "emulators.functions.port");
  const firestorePort = (0, import_get.default)(fConfig, "emulators.firestore.port");
  const storagePort = (0, import_get.default)(fConfig, "emulators.storage.port");
  const localhost = (port) => `localhost:${port}`;
  if (authPort)
    process.env.FIREBASE_AUTH_EMULATOR_HOST = localhost(authPort);
  if (firestorePort)
    process.env.FIRESTORE_EMULATOR_HOST = localhost(firestorePort);
  if (storagePort)
    process.env.FIREBASE_STORAGE_EMULATOR_HOST = localhost(storagePort);
  if (debug) {
    (0, import_json.logJSON)(fConfig);
  }
};
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
  getEmulatorsConfig,
  getFirebaseConfig,
  setFirebaseEmulators
});
