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
import { IS_FIREBASE_CLI } from "../env";
import get from "lodash/get";
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
  const conf = __spreadValues(__spreadValues({}, toJSON(firebaseJsonContent)), toJSON(firebaseRcContent));
  if (path)
    return get(conf, path);
  return conf;
};
const getEmulatorConfig = (selector) => {
  const allConfig = get(getFirebaseConfig(), "emulators");
  if (selector)
    return get(allConfig, selector);
  return allConfig;
};
const getEmulatorHost = (emulator, hostname = "localhost") => {
  const fConfig = getFirebaseConfig();
  const host = (port) => `${hostname}:${port}`;
  return host(get(fConfig, `emulators.${emulator}.port`));
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
const getDefaultProjectName = () => {
  return getFirebaseConfig("projects.default");
};
const httpsFunctionEndpoint = (emulatorsFunctionsPort, functionName, region = "asia-northeast1") => {
  const { projectId, locationId } = JSON.parse(process.env.FIREBASE_CONFIG);
  return IS_FIREBASE_CLI ? `http://localhost:${emulatorsFunctionsPort}/${projectId}/${region || locationId}/${functionName || process.env.FUNCTION_NAME}` : `https://${region || locationId}-${projectId}.cloudfunctions.net/${functionName || process.env.FUNCTION_NAME}`;
};
export {
  getDefaultProjectName,
  getEmulatorConfig,
  getEmulatorHost,
  getFirebaseConfig,
  httpsFunctionEndpoint,
  isBrowser,
  isNode,
  setFirebaseEmulators
};
