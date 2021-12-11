import { IProdDocument, IProdModel, IProd } from "../typings";
import { productsModel } from "./products.model";

class ProductsService {
  constructor(private readonly productsModel: IProdModel) {}

  public async findMany(): Promise<void> {}

  public async findOne(productId: string): Promise<void> {}

  public async create(): Promise<void> {}

  public async update(productId: string): Promise<void> {}

  public async remove(productId: string): Promise<void> {}
}

export const productsService: ProductsService = new ProductsService(productsModel);
