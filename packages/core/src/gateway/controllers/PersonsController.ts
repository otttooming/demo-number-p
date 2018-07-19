import { Base } from "../Base";

export class PersonsController extends Base {
  constructor() {
    super();
  }

  public async uploadCsv(file: Blob): Promise<any> {
    const path = `/import`;
    const formData = new FormData();
    formData.append("source", file);
    return await super.post(path, formData);
  }
}
