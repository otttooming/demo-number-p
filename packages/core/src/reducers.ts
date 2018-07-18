import { combineReducers } from "redux";

import dashboardReducer, {
  DashboardState,
} from "./views/dashboard/dashboardReducer";

const rootReducer = combineReducers({
  dashboardReducer,
});

export interface GlobalState {
  dashboardReducer: DashboardState;
}

export default rootReducer;
