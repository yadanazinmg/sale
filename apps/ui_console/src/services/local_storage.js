import localforage from "localforage";
import { isFunc } from "../helpers/utils";

const USER_STORAGE_KEY = "__$ECERT_USER_STORAGE_KEY$__";

localforage.config({
  driver: localforage.INDEXEDDB,
  name: "TWC Localstorage",
  version: 1.0,
  size: 4980736,
  storeName: "twc_localstorage",
  description: "TWC Localstorage",
});

export const saveUserAsync = async (user) => await localforage.setItem(USER_STORAGE_KEY, { ...user });
export const loadUserAsync = async () => await localforage.getItem(USER_STORAGE_KEY);
export const removeUserAsync = async () => await localforage.removeItem(USER_STORAGE_KEY);

export const saveUser2Local = (user, cb) =>
  localforage
    .setItem(USER_STORAGE_KEY, { ...user })
    .then((user) => {
      console.log("saveUser");
      if (isFunc(cb)) cb();
    })
    .catch((err) => {
      console.log("saveUser error");
      console.log(err);
    });

export const loadUserFromLocal = (cb) =>
  localforage
    .getItem(USER_STORAGE_KEY)
    .then((user) => {
      console.log("loadUser");
      console.log(user);
      if (isFunc(cb)) cb(user);
    })
    .catch((err) => {
      console.log("loadUser error");
      console.log(err);
    });

export const removeUserFromLocal = (cb) =>
  localforage
    .removeItem(USER_STORAGE_KEY)
    .then(() => {
      console.log("removeUser");
      if (isFunc(cb)) cb();
    })
    .catch((err) => {
      console.log("removeUser error");
      console.log(err);
    });
