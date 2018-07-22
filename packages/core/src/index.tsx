import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import configureStore from "./store";
import { ThemeProvider } from "./common/styled";
import { theme } from "./common/styled/theme";

const root: HTMLElement | null = document.getElementById("app");
const rootStore = configureStore();

(async function init() {
  ReactDOM.render(
    <Provider store={rootStore.store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>,
    root
  );
})();
