import { Document, Model } from "mongoose";

export interface IShop {
  _id?: string;
  name: string;
  email: string;
  owner_id: string;
  cats: string[];
  desc?: string;
  prod_ids?: string[];
}

export type IShopDocument = IShop & Document;

export type IShopsModel = Model<IShopDocument>;
