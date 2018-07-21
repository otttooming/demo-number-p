import * as Router from "koa-router";
import * as Koa from "koa";
import { RenderCtx } from "../components/render";
import { IController } from "../typings/controller.interface";
import { IPersonModel, Person, IPerson } from "../models/person";
import { PageableRequest } from "../typings/page.interface";
import PageableResource from "../components/pageableResource";

class SearchController implements IController {
  private Router = new Router({
    prefix: "/search",
  });

  private renderCtx = new RenderCtx();
  private pageableResource = new PageableResource();

  constructor() {}

  public router(): Router {
    return this.Router.post("/", this.list.bind(this));
  }

  private async list(ctx: Koa.Context) {
    const request: PageableRequest = ctx.request.body;
    const {
      size = this.pageableResource.size,
      number = this.pageableResource.number,
    }: PageableRequest = request;

    const totalElements: number = await Person.find({}).count();

    const books: Array<IPersonModel> = await Person.find({})
      .limit(size)
      .skip(number);

    const booksData: Array<IPerson> = books.map((book: IPersonModel) =>
      book.toPlainObject()
    );

    this.pageableResource.setPage(request, booksData, totalElements);

    const data = this.pageableResource.createPage();

    this.renderCtx.renderSuccess(ctx, 200, "status", data);
  }
}

export default new SearchController().router();
