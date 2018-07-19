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

class PageableUrlParams {
  size: number;
  page: number;
  sort: string;
}

export default class Api implements ApiProvider {
  private host: string = "http://localhost:3007";
  private api: axios.AxiosInstance;

  constructor() {
    this.api = axios.default.create({ baseURL: this.host });
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

  private async getRequest(url: string, method: RestMethod, data?: RestParams) {
    const headers: { [key: string]: string } = {};
    headers["Accept"] = "application/json";
    if (data instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data";
    }

    const config: axios.AxiosRequestConfig = {
      method,
      headers,
    };

    if (method === RestMethod.POST) {
      return await this.api.post(url, data, config);
    }

    return await this.api.get(url, config);
  }
}
