import { Document, Model } from "mongoose";

export interface IProd {
  _id?: string;
  name: string;
  desc: string;
  cat: string;
  tags: string[];
  img: string;
  price: number;
  discount?: {
    expiries: string;
    amount: number;
  };
  shop_id: string;
}

export type IProdDocument = IProd & Document;

export type IProdModel = Model<IProdDocument>;
