import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-loading-promise-middleware";
import rootReducer from "./reducers";

export default function configureStore() {
  const composeEnhancer: typeof compose =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(promiseMiddleware, thunk))
  );

  return { store };
}
