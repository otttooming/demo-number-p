import * as Router from "koa-router";
import * as Koa from "koa";
import { RenderCtx } from "../components/render";
import { IController } from "../typings/controller.interface";
import { KoaRequestOverride } from "../typings/request.interface";
import { IPersonModel, Person, IPerson } from "../models/person";

class StatusController implements IController {
  private Router = new Router({
    prefix: "/status",
  });

  private renderCtx = new RenderCtx();

  constructor() {}

  public router(): Router {
    return this.Router.get("/", this.status.bind(this));
  }

  private async status(ctx: Koa.Context) {
    const books: Array<IPersonModel> = await Person.find({});
    const booksData: Array<IPerson> = books.map((book: IPersonModel) =>
      book.toPlainObject()
    );

    const renderData = {
      body: "Hello world!",
      booksData,
    };

    this.renderCtx.renderSuccess(ctx, 200, "status", renderData);
  }
}

export default new StatusController().router();
