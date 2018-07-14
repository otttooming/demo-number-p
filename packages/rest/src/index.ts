import * as Koa from "koa";
import StatusController from "./controllers/status";

class Server {
  public app: Koa;

  constructor() {
    this.app = new Koa();
    this.routes();
  }

  private routes() {
    this.app.use(StatusController.routes());
  }
}

new Server().app.listen(3007);

console.log("listening on 3007");
