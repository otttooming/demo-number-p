import { GlobalState } from "../../reducers";
import { createSelector } from "reselect";

export const getStatus = (state: GlobalState) => state.dashboardReducer.status;

export const selectStatus = createSelector(getStatus, status => {
  return {
    status,
  };
});
