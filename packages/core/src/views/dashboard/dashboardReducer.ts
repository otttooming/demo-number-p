import { handleActions } from "redux-actions";
import {
  IGetPersonsResponse,
  getPersonsSuccess,
  uploadCsvSuccess,
} from "./dashboardActions";
import { AsyncAction } from "redux-loading-promise-middleware";

class State {
  status: string | null = null;
  upload: any = null;
  error = null;
}

export default handleActions<State, any>(
  {
    [getPersonsSuccess.toString()]: (
      state,
      action: AsyncAction<IGetPersonsResponse>
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
        status: action.payload.status,
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
  },
  new State()
);

export { State as DashboardState };
