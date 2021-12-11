import { Request, Response, Express, Router } from "express";
import { IProd } from "../typings";
import { CustomResponse } from "../common";
import { productsService } from "./products.service";

export class ProductsController {
  static use(app: Express): void {
    app.use("/projects", new ProductsController().getRouter());
  }

  private readonly router!: Router;

  constructor() {
    this.router.get("/", async (req: Request, res: Response): Promise<void> => {
      try {
        CustomResponse.Ok(res, "Products found", []);
      } catch (err) {
        CustomResponse.BadRequest(res, `Unable to find any products\n${err}`);
      }
    });

    this.router.get("/:productId", async (req: Request, res: Response): Promise<void> => {
      try {
        CustomResponse.Ok(res, "Product found", []);
      } catch (err) {
        CustomResponse.NotFound(res, `Product not found\n${err}`);
      }
    });

    this.router.post("/", async (req: Request, res: Response): Promise<void> => {
      try {
        CustomResponse.Created(res, "Product created", []);
      } catch (err) {
        CustomResponse.BadRequest(res, `Unable to create product\n${err}`);
      }
    });

    this.router.put("/:productId", async (req: Request, res: Response): Promise<void> => {
      try {
        CustomResponse.Created(res, "Product updated", []);
      } catch (err) {
        CustomResponse.BadRequest(res, `Unable to update product\n${err}`);
      }
    });

    this.router.delete("/:productId", async (req: Request, res: Response): Promise<void> => {
      try {
        CustomResponse.Ok(res, "Product deleted");
      } catch (err) {
        CustomResponse.BadRequest(res, `Unable to delete product\n${err}`);
      }
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}
