import mongoose from "mongoose";
import { IShop, IShopsModel } from "../typings";

class ShopsModel {
  private readonly model: IShopsModel;

  private readonly schema: mongoose.Schema<IShop>;

  constructor() {
    this.schema = new mongoose.Schema<IShop>({
      email: {
        type: String,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      owner_id: {
        type: String,
        required: true,
        unique: true,
      },
      desc: {
        type: String,
      },
      prod_ids: {
        type: [String],
      },
      cats: {
        type: [String],
      },
    });

    this.model = mongoose.model<IShop>("shops", this.schema);
  }

  public getModel(): IShopsModel {
    return this.model;
  }
}

export const shopsModel: ShopsModel = new ShopsModel();
