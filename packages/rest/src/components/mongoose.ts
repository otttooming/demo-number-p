import * as mongoose from "mongoose";
import * as config from "config";
import { Mockgoose } from "mockgoose";

class MongooseLib {
  constructor() {
    let mockgoose: Mockgoose = new Mockgoose(mongoose);

    mockgoose.prepareStorage().then(() => {
      mongoose.connect(
        config.get<string>("mongoose.uri"),
        config.get("mongoose.options")
      );
    });
  }
}

export default new MongooseLib();
