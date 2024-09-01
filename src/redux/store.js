import reducers from "./user/reducers";
import { legacy_createStore as createStore } from "redux";

export function configureStore(initialState) {
  const store = createStore(reducers, initialState);

  return store;
}

export const storeInstance = configureStore();
