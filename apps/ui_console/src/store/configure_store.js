import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { persistStore, persistReducer } from "redux-persist";
import expireReducer from "redux-persist-expire";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";
import rootEpic from "../epics";

const persistConfig = {
  key: "pc-mdy1",
  storage,
  transforms: [expireReducer("user", { expireSeconds: 3600 * 24, expiredState: null })],
};

export let store = null;

const configureStore = (preloadedState) => {
  const epicMiddleware = createEpicMiddleware();

  const middlewares = [];
  const middlewareEnhancer = applyMiddleware(...middlewares, epicMiddleware);

  const enhancers = [middlewareEnhancer];

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  // In development, use the browser's Redux dev tools extension if installed
  const isDevelopment = process.env.NODE_ENV === "development";
  if (isDevelopment && typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 }));
  }

  const composedEnhancers = compose(...enhancers);

  store = createStore(persistedReducer, preloadedState, composedEnhancers);
  let persistor = persistStore(store);

  epicMiddleware.run(rootEpic);

  return { store, persistor };
};

export default configureStore;
