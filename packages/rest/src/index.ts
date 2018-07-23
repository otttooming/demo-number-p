import * as Koa from "koa";

process.env.NODE_CONFIG_DIR = "./src/config";
import * as config from "config";

import StatusController from "./controllers/status";
import SearchController from "./controllers/search";
import ImportController from "./controllers/import";
import * as koaBody from "koa-body";
import * as cors from "@koa/cors";
import MongooseLib from "./components/mongoose";
import { Pageable, IndexedPage, paginate } from "@panderalabs/koa-pageable";
import * as serve from "koa-static";

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
    this.app.use(serve("./static"));
    this.app.use(koaBody({ multipart: true }));
    this.app.use(paginate);
    this.app.use(cors({ origin: "*" }));
  }

  private routes() {
    this.app.use(StatusController.routes());
    this.app.use(SearchController.routes());
    this.app.use(ImportController.routes());
  }
}

new Server().app.listen(3007);

console.log("listening on 3007");
