import { createAction } from "redux-actions";
import { Dispatch, Action } from "redux";
import gw from "../../gateway/gateway";
import {
  RequestStatus,
  PageableRequest,
  Page,
  RequestResponse,
} from "../../gateway/Api";

const ns: string = "dashboard/";

export interface IPerson {
  personId: number;
  name: string;
  age: number;
  address: string;
  team: string;
}

export type IndexedPersons =  { [key: string]: IPerson };

export interface IGetPersonsResponse {
  status: string;
  data?: any;
}

export const getPersonsRequest = createAction(`${ns}GET_PERSONS_REQUEST`);
export const getPersonsSuccess = createAction(`${ns}GET_PERSONS_SUCCESS`);
export const getPersonsError = createAction(`${ns}GET_PERSONS_ERROR`);

export const getPersons = (request: PageableRequest) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getPersonsRequest());

      const response: RequestResponse<
        Page<IPerson>
      > = await gw.persons.getPersons(request);

      dispatch(getPersonsSuccess(response));
    } catch (error) {
      dispatch(getPersonsError(error));
    }
  };
};

export const uploadCsvRequest = createAction(`${ns}UPLOAD_CSV_REQUEST`);
export const uploadCsvStatus = createAction(`${ns}UPLOAD_CSV_STATUS`);
export const uploadCsvSuccess = createAction(`${ns}UPLOAD_CSV_SUCCESS`);
export const uploadCsvError = createAction(`${ns}UPLOAD_CSV_ERROR`);

export const uploadCsv = (file: Blob) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(uploadCsvRequest());

      function status(report: RequestStatus) {
        console.log(`${report.progress}% uploaded`);
        dispatch(uploadCsvStatus(report));
      }

      const data = await gw.persons.setStatus(status).uploadCsv(file);

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
