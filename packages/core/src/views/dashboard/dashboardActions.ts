import { createAction } from "redux-actions";
import { Dispatch, Action } from "redux";
import gw from "../../gateway/gateway";

const ns: string = "dashboard/";

export interface IGetPersonsResponse {
  status: string;
  data?: any;
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

export const uploadCsvRequest = createAction(`${ns}GET_PERSONS_REQUEST`);
export const uploadCsvSuccess = createAction(`${ns}GET_PERSONS_SUCCESS`);
export const uploadCsvError = createAction(`${ns}GET_PERSONS_ERROR`);

export const uploadCsv = (file: Blob) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(uploadCsvRequest());
      const data = gw.persons.uploadCsv(file);

      const response: IGetPersonsResponse = {
        status: "Hello world!",
        data,
      };

      dispatch(uploadCsvSuccess(response));
    } catch (error) {
      dispatch(uploadCsvError(error));
    }
  };
};
