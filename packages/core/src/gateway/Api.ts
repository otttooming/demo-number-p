// import { stringify } from "query-string";
import * as axios from "axios";

export type RestParams = { [name: string]: any };

export enum RestMethod {
  GET = "GET",
  POST = "POST",
}

export interface ApiProvider {
  get(url: string, data?: RestParams): Promise<any>;

  post(url: string, data: RestParams): Promise<any>;
}

export interface RequestStatus {
  progress: number;
}

export type RequestStatusMethod = (status: RequestStatus) => void;

class PageableUrlParams {
  size: number;
  page: number;
  sort: string;
}

export default class Api implements ApiProvider {
  private host: string = "http://localhost:3007";
  private api: axios.AxiosInstance;
  private status: RequestStatusMethod | undefined;

  constructor(status?: RequestStatusMethod) {
    this.api = axios.default.create({ baseURL: this.host });
    this.status = status;
  }

  private createUrl(url: string): string {
    return `${this.host}${url}`;
  }

  public get(url: string, data?: RestParams) {
    return this.getRequest(url, RestMethod.GET, data);
  }

  public post(url: string, data: RestParams) {
    return this.getRequest(url, RestMethod.POST, data);
  }

  public setTransferStatus = (event: any) => {
    if (this.status) {
      this.status({ progress: (event.loaded / event.total) * 100 });
    }
  };

  private async getRequest(url: string, method: RestMethod, data?: RestParams) {
    const headers: { [key: string]: string } = {};
    headers["Accept"] = "application/json";
    if (data instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data";
    }

    const config: axios.AxiosRequestConfig = {
      method,
      headers,
      onUploadProgress: this.setTransferStatus,
    };

    if (method === RestMethod.POST) {
      return await this.api.post(url, data, config);
    }

    return await this.api.get(url, config);
  }
}
