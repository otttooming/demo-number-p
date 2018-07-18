import { Base } from "../Base";

export class StatusController extends Base {
  constructor() {
    super();
  }

  public async getStatus(): Promise<any> {
    const path = `/status`;
    return await super.get(path);
  }
}
