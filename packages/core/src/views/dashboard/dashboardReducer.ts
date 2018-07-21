import { handleActions } from "redux-actions";
import {
  IGetPersonsResponse,
  getPersonsSuccess,
  uploadCsvSuccess,
  uploadCsvStatus,
  IPerson,
} from "./dashboardActions";
import { AsyncAction } from "redux-loading-promise-middleware";
import { RequestStatus, Page, RequestResponse } from "../../gateway/Api";

class State {
  status: string | null = null;
  upload: any = null;
  uploadStatus: RequestStatus | undefined;
  error = null;
  persons: Page<IPerson>[] | null = null;
}

export default handleActions<State, any>(
  {
    [getPersonsSuccess.toString()]: (
      state,
      action: AsyncAction<RequestResponse<Page<IPerson>[]>>
    ): State => {
      if (action.isLoading) {
        return {
          ...state,
        };
      }
      if (action.error) {
        return {
          ...state,
          error: action.error,
        };
      }
      return {
        ...state,
        persons: action.payload.data,
        error: null,
      };
    },
    [uploadCsvSuccess.toString()]: (state, action: AsyncAction<any>): State => {
      if (action.isLoading) {
        return {
          ...state,
        };
      }
      if (action.error) {
        return {
          ...state,
          error: action.error,
        };
      }
      return {
        ...state,
        status: action.payload.status,
        upload: action.payload,
        error: null,
      };
    },
    [uploadCsvStatus.toString()]: (
      state,
      action: AsyncAction<RequestStatus>
    ): State => {
      return {
        ...state,
        uploadStatus: action.payload,
      };
    },
  },
  new State()
);

export { State as DashboardState };
