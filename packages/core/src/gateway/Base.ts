import Api, { ApiProvider, RestParams, RequestStatusMethod } from "./Api";

export class Base {
  private api: ApiProvider;
  private status: RequestStatusMethod | undefined;

  constructor() {
    this.api = new Api();
  }

  public setStatus(status: RequestStatusMethod): this {
    this.status = status;

    this.api = new Api(status);

    return this;
  }

  protected get(url: string, data?: RestParams): Promise<any> {
    return this.api.get(url, data);
  }

  protected post(url: string, data: RestParams): Promise<any> {
    return this.api.post(url, data);
  }
}
