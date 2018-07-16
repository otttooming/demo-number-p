import * as Router from "koa-router";
import * as Koa from "koa";
import { RenderCtx } from "../components/render";
import { IController } from "../typings/controller.interface";
import { IPersonModel, Person, IPerson } from "../models/person";
import { Pageable } from "@panderalabs/koa-pageable";

class SearchController implements IController {
  private Router = new Router({
    prefix: "/search",
  });

  private renderCtx = new RenderCtx();

  constructor() {}

  public router(): Router {
    return this.Router.get("/", this.status.bind(this));
  }

  private async status(ctx: Koa.Context) {
    const pageable: Pageable = ctx.state.pageable;

    const books: Array<IPersonModel> = await Person.find({})
      .limit(pageable.size)
      .skip(pageable.page);

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

export default new SearchController().router();
