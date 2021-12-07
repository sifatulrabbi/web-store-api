import { Document, Model } from "mongoose";

export interface ICat {
  _id?: string;
  name: string;
}

export type ICatDocument = ICat & Document;

export type ICateModel = Model<ICatDocument>;
