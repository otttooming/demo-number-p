import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import configureStore from "./store";

const root: HTMLElement | null = document.getElementById("app");
const rootStore = configureStore();

(async function init() {
  ReactDOM.render(
    <Provider store={rootStore.store}>
      <App />
    </Provider>,
    root
  );
})();
