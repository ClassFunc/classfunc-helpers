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
var firebase_exports = {};
__export(firebase_exports, {
  getDefaultProjectName: () => getDefaultProjectName,
  getEmulatorConfig: () => getEmulatorConfig,
  getEmulatorHost: () => getEmulatorHost,
  getFirebaseConfig: () => getFirebaseConfig,
  httpsFunctionEndpoint: () => httpsFunctionEndpoint,
  isBrowser: () => isBrowser,
  isNode: () => isNode,
  setFirebaseEmulators: () => setFirebaseEmulators
});
module.exports = __toCommonJS(firebase_exports);
var import_json = require("../json");
var import_env = require("../env");
var import_get = __toESM(require("lodash/get"));
const isBrowser = () => ![typeof window, typeof document].includes("undefined");
const isNode = () => typeof process !== "undefined" && !!process.versions && !!process.versions.node;
const getFirebaseConfig = (path) => {
  if (isBrowser()) {
    console.warn("this function is server-only function");
    return;
  }
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
const getEmulatorConfig = (selector) => {
  const allConfig = (0, import_get.default)(getFirebaseConfig(), "emulators");
  if (selector)
    return (0, import_get.default)(allConfig, selector);
  return allConfig;
};
const getEmulatorHost = (emulator, hostname = "localhost") => {
  const fConfig = getFirebaseConfig();
  const host = (port) => `${hostname}:${port}`;
  return host((0, import_get.default)(fConfig, `emulators.${emulator}.port`));
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
const getDefaultProjectName = () => {
  return getFirebaseConfig("projects.default");
};
const httpsFunctionEndpoint = (functionName, region = "asia-northeast1") => {
  const functionHost = getEmulatorHost("functions");
  const project = getDefaultProjectName();
  return import_env.IS_FIREBASE_CLI ? `http://${functionHost}/${project}/${region}/${functionName || process.env.FUNCTION_NAME}` : `https://${region}-${project}.cloudfunctions.net/${functionName || process.env.FUNCTION_NAME}`;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDefaultProjectName,
  getEmulatorConfig,
  getEmulatorHost,
  getFirebaseConfig,
  httpsFunctionEndpoint,
  isBrowser,
  isNode,
  setFirebaseEmulators
});
