import { shopsModel } from "./shops.model";
import { IShop, IShopDocument, IShopsModel, IUserPreview } from "../typings";

type ICreate = (
  data: {
    name: string;
    cats: string[];
    desc?: string;
  },
  user: IUserPreview,
) => Promise<IShopDocument>;

type IUpdate = (
  shopId: string,
  data: {
    email?: string;
    name?: string;
    desc?: string;
    cats?: string[];
  },
) => Promise<IShopDocument>;

class ShopsService {
  constructor(private readonly shopsModel: IShopsModel) {}

  public async findMany(): Promise<IShopDocument[]> {
    const shops: IShopDocument[] = await this.shopsModel.find({});

    return shops;
  }

  public async findOne(shopId: string): Promise<IShopDocument> {
    const shop: IShopDocument | null = await this.shopsModel.findById(shopId);

    if (!shop) {
      throw { statusCode: 404, message: "Shop not found" };
    }

    return shop;
  }

  public create: ICreate = async (data, user) => {
    if (!user._id) throw "User id not found";
    const shopData: IShop = {
      name: data.name,
      desc: data.desc,
      cats: data.cats,
      email: user.email,
      owner_id: user._id,
    };

    const newShop: IShopDocument = await new this.shopsModel(shopData).save();
    return newShop;
  };

  public update: IUpdate = async (shopId: string, data) => {
    const shop: IShopDocument | null = await this.shopsModel.findById(shopId);

    if (!shop) {
      throw { statusCode: 404, message: "Shop not found" };
    }

    return shop.updateOne(
      {
        name: data.name,
        desc: data.desc,
        cats: data.cats,
        email: data.email,
      },
      { new: true },
    );
  };

  public async addProduct(shopId: string, prodId: string): Promise<void> {
    const shop: IShopDocument | null = await this.shopsModel.findById(shopId);

    if (!shop || !prodId) {
      throw { statusCode: 404, message: "Shop not found" };
    }

    let updateData: string[] = [];
    if (shop.prod_ids) {
      updateData = [...shop.prod_ids, prodId];
    } else updateData = [prodId];

    return shop.updateOne({ prod_ids: updateData }, { new: true });
  }

  public async remove(shopId: string): Promise<string> {
    await this.shopsModel.findByIdAndRemove(shopId).catch((err: unknown): void => {
      throw { statusCode: 400, message: err };
    });

    return "Shop removed";
  }
}

export const shopsService: ShopsService = new ShopsService(shopsModel.getModel());
