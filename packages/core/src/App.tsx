import * as React from "react";
import DashboardView from "./views/dashboard/dashboardWrapper";
import { injectGlobal } from "./common/styled";
import { reset } from "./common/styled/reset";

injectGlobal`
  ${reset}
  html {
    font-family: 'Montserrat', sans-serif;
  }
  body {
    background: linear-gradient(to right, #F8F8FB, #F8F8FB);
  }
`;

export default class App extends React.Component<{}, {}> {
  render() {
    return <DashboardView />;
  }
}
