import * as Router from "koa-router";
import * as Koa from "koa";
import * as fs from "fs";
import * as csvtojson from "csvtojson";
import { RenderCtx } from "../components/render";
import { IController } from "../typings/controller.interface";
import { KoaRequestOverride } from "../typings/request.interface";
import { IPersonModel, Person, IPerson } from "../models/person";

export enum PersonHeaders {
  PERSONID = "personId",
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
      const persons: IPerson[] = await this.getParsedCsvToJson();

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

  private getParsedCsvToJson = async (): Promise<IPerson[]> => {
    const file: fs.ReadStream | undefined = this.getFile();

    if (!file) {
      return [];
    }

    const headers: string[] = Object.values(PersonHeaders);
    const persons: IPerson[] = [];

    await csvtojson({
      headers,
      noheader: true,
      checkType: true,
    })
      .fromStream(file)
      .subscribe((json, lineNumber) => {
        return new Promise((resolve, reject) => {
          persons.push(json);

          this.create(json);

          return resolve();
        });
      });

    return persons;
  };

  private create = async (person: IPerson) => {
    try {
      const personEntry: IPersonModel = new Person(person);

      await personEntry.save();
    } catch (err) {
      console.log(err);
    }
  };
}

export default new ImportController().router();
