import { Document, Model } from "mongoose";

export interface IUser {
  _id?: string;
  username: string;
  full_name: string;
  email: string;
  shop_name?: string;
  shop_id?: string;
  password: string;
}

export type IUserPreview = Omit<IUser, "password">;

export type IUserDocument = IUser & Document;

export type IUsersModel = Model<IUser>;
