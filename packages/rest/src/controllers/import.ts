import * as Router from "koa-router";
import * as Koa from "koa";
import * as fs from "fs";
import * as csvtojson from "csvtojson";
import { RenderCtx } from "../components/render";
import { IController } from "../typings/controller.interface";
import { KoaRequestOverride } from "../typings/request.interface";

export interface Person {
  id: number;
  name: string;
  age: number;
  address: string;
  team: string;
}

export enum PersonHeaders {
  ID = "id",
  NAME = "name",
  AGE = "age",
  ADDRESS = "address",
  TEAM = "team",
}

class ImportController implements IController {
  private Router = new Router({
    prefix: "/import",
  });

  private renderCtx = new RenderCtx();

  private request: KoaRequestOverride | undefined;

  public router(): Router {
    return this.Router.post("/", this.import.bind(this));
  }

  private async import(ctx: Koa.Context) {
    this.request = ctx.request as KoaRequestOverride;

    if (this.request && this.request.files) {
      const persons: Person[] = await this.getParsedCsvToJson();

      const renderData = {
        body: `Successfully imported ${persons.length} persons`,
        ctx: `Request Body: ${JSON.stringify(this.request.body)}`,
      };

      this.renderCtx.renderSuccess(ctx, 200, "persons", renderData);
    } else {
      this.renderCtx.renderFaild(ctx, 400, "error", [
        "Invalid Login Credential",
      ]);
    }
  }

  private getFile = (): fs.ReadStream | undefined => {
    if (!this.request || !this.request.files) {
      return;
    }

    return fs.createReadStream(this.request.files.source.path, "utf8");
  };

  private getParsedCsvToJson = async (): Promise<Person[]> => {
    const file: fs.ReadStream | undefined = this.getFile();

    if (!file) {
      return [];
    }

    const headers: string[] = Object.values(PersonHeaders);
    const persons: Person[] = [];

    await csvtojson({
      headers,
      noheader: true,
      checkType: true,
    })
      .fromStream(file)
      .subscribe((json, lineNumber) => {
        return new Promise((resolve, reject) => {
          persons.push(json);

          return resolve();
        });
      });

    return persons;
  };
}

export default new ImportController().router();
