import { createAction } from "redux-actions";
import { Dispatch, Action } from "redux";

const ns: string = "dashboard/";

export interface IGetPersonsResponse {
  status: string;
}

export const getPersonsRequest = createAction(`${ns}GET_PERSONS_REQUEST`);
export const getPersonsSuccess = createAction(`${ns}GET_PERSONS_SUCCESS`);
export const getPersonsError = createAction(`${ns}GET_PERSONS_ERROR`);

export const getPersons = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getPersonsRequest());

      const response: IGetPersonsResponse = {
        status: "Hello world!",
      };

      dispatch(getPersonsSuccess(response));
    } catch (error) {
      dispatch(getPersonsError(error));
    }
  };
};
