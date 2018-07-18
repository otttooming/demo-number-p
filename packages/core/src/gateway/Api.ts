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
    return await fetch(this.createUrl(url), {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  }
}
