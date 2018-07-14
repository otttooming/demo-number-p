import * as Router from "koa-router";
import * as Koa from "koa";
import { RenderCtx } from "../components/render";
import { IController } from "../typings/controller.interface";

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
    const renderData = {
      body: "Hello world!",
    };

    this.renderCtx.renderSuccess(ctx, 200, "status", renderData);
  }
}

export default new StatusController().router();
