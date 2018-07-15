import * as Koa from "koa";
import StatusController from "./controllers/status";
import ImportController from "./controllers/import";
import * as koaBody from "koa-body";

class Server {
  public app: Koa;
  private handlers: { [key: string]: string } = {};

  constructor() {
    this.app = new Koa();
    this.middelwares();
    this.routes();
  }

  private middelwares() {
    this.app.use(koaBody({ multipart: true }));
  }

  private routes() {
    this.app.use(StatusController.routes());
    this.app.use(ImportController.routes());
  }
}

new Server().app.listen(3007);

console.log("listening on 3007");
