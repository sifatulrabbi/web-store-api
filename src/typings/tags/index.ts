import { Document, Model } from "mongoose";

export interface ITag {
  _id?: string;
  name: string;
}

export type ITagDocument = ITag & Document;

export type ITagModel = Model<ITagDocument>;
