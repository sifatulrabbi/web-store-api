import mongoose from "mongoose";
import { IUser, IUsersModel } from "../../typings";

class UsersModel {
  private readonly schema: mongoose.Schema<IUser>;

  private readonly model: IUsersModel;

  constructor() {
    this.schema = new mongoose.Schema<IUser>(
      {
        email: {
          type: String,
          required: true,
          unique: true,
        },
        username: {
          type: String,
          required: true,
          unique: true,
        },
        full_name: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
        shop_id: {
          type: String,
          unique: true,
        },
        shop_name: {
          type: String,
        },
      },
      {
        timestamps: true,
      },
    );

    this.model = mongoose.model<IUser>("users", this.schema);
  }

  public getModel(): IUsersModel {
    return this.model;
  }
}

export const usersModel: UsersModel = new UsersModel();
