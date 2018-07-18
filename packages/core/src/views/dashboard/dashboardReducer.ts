import { handleActions } from "redux-actions";
import { IGetPersonsResponse, getPersonsSuccess } from "./dashboardActions";
import { AsyncAction } from "redux-loading-promise-middleware";

class State {
  status: string | null = null;
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
  },
  new State()
);

export { State as DashboardState };
