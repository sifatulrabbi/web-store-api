import { Schema, model } from "mongoose";
import { IProd, IProdModel } from "../typings";

class ProductsModel {
  private readonly schema!: Schema<IProd>;
  private readonly model: IProdModel;

  constructor() {
    this.schema = new Schema<IProd>({
      name: { type: String, required: true },
      desc: { type: String, required: true },
      cat: { type: String, required: true },
      tags: { type: [String] },
      img: { type: String },
      price: { type: Number, required: true },
      shop_id: { type: String, required: true },
    });

    this.model = model<IProd>("products", this.schema);
  }

  public getModel(): IProdModel {
    return this.model;
  }
}

export const productsModel: IProdModel = new ProductsModel().getModel();
