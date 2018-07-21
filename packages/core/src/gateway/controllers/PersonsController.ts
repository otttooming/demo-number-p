import { Base } from "../Base";
import { PageableRequest } from "../Api";

export class PersonsController extends Base {
  constructor() {
    super();
  }

  public async getPersons(request: PageableRequest): Promise<any> {
    const path = `/search`;

    return await super.post(path, request);
  }

  public async uploadCsv(file: Blob): Promise<any> {
    const path = `/import`;
    const formData = new FormData();
    formData.append("source", file);
    return await super.post(path, formData);
  }
}
