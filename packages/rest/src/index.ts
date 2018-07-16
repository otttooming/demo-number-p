import * as Koa from "koa";

process.env.NODE_CONFIG_DIR = "./src/config";
import * as config from "config";

import StatusController from "./controllers/status";
import ImportController from "./controllers/import";
import * as koaBody from "koa-body";
import MongooseLib from "./components/mongoose";

class Server {
  public app: Koa;
  private handlers: { [key: string]: string } = {};
  private mongoose: any;

  constructor() {
    this.app = new Koa();
    this.middelwares();
    this.routes();
    this.mongoose = MongooseLib;
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
