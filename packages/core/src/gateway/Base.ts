import Api, { ApiProvider, RestParams } from "./Api";

export class Base {
  private api: ApiProvider;

  constructor() {
    this.api = new Api();
  }

  protected get(url: string, data?: RestParams): Promise<any> {
    return this.api.get(url, data);
  }

  protected post(url: string, data: RestParams): Promise<any> {
    return this.api.post(url, data);
  }
}
