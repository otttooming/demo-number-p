// import { stringify } from "query-string";
import * as axios from "axios";

export interface RequestResponse<T> {
  data: T;
}

/**
 * Request for a Page resource
 */
export interface PageableRequest {
  number: number | undefined;
  size: number | undefined;
  sort: any | undefined;
}

export interface Page<T = any> {
  content: T[];
  /**
   * Page size - maximum number of items in content that this page should contain
   */
  size: number;
  first: boolean;
  last: boolean;
  /**
   * Page number using 0-based numbering
   */
  number: number;
  /**
   * Elements returned with this page: content.length
   */
  numberOfElements: number;
  sort?: any;
  /**
   * total amount of elements (some may be left out from this page)
   */
  totalElements: number;
  /**
   * number of total pages
   */
  totalPages: number;
}

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
      const response = await this.api.post(url, data, config);
      return response.data;
    }

    return await this.api.get(url, config);
  }
}
