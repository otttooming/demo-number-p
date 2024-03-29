import { GlobalState } from "../../reducers";
import { createSelector } from "reselect";

export const getStatus = (state: GlobalState) => state.dashboardReducer.status;

export const selectStatus = createSelector(getStatus, status => {
  return {
    status,
  };
});

export const getUpload = (state: GlobalState) => state.dashboardReducer.upload;

export const getUploadStatus = (state: GlobalState) =>
  state.dashboardReducer.uploadStatus;

export const selectPersons = (state: GlobalState) =>
  state.dashboardReducer.persons;
