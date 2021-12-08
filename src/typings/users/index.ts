import { Document, Model } from "mongoose";

export interface IUser {
  _id?: string;
  email: string;
  name: string;
  password: string;
  shop_name?: string;
  shop_id?: string;
}

export type IUserPreview = Omit<IUser, "password">;

export type IUserDocument = IUser & Document;

export type IUsersModel = Model<IUser>;
