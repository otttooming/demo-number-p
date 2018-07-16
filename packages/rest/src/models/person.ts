import { Document, Schema, Model, model, NativeError } from "mongoose";
import * as mongoose from "mongoose";
import * as crypto from "crypto";
import * as slug from "slug";

export interface IPerson {
  personId: number;
  name: string;
  age: number;
  address: string;
  team: string;
}

export interface IPersonModel extends IPerson, mongoose.Document {
  toPlainObject(): IPerson;
}

const personSchema: Schema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  personId: {
    type: Number,
    required: "PersonID is required",
  },
  name: {
    type: String,
    required: "Name is required",
  },
  age: {
    type: Number,
    required: "Age is required",
  },
  address: {
    type: String,
    required: "Address is required",
  },
  team: {
    type: String,
    required: "Team is required",
  },
});

personSchema.methods.toPlainObject = function(): IPerson {
  return {
    personId: this.personId,
    name: this.name,
    age: this.age,
    address: this.address,
    team: this.team,
  };
};

export const Person: Model<IPersonModel> = model<IPersonModel>(
  "person",
  personSchema
);
