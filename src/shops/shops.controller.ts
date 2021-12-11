import { Express, Router, Request, Response } from "express";
import { CustomResponse, authGuard, adminGuard, shopOwnerGuard, validateShopData } from "../common";
import { IUserPreview } from "../typings";
import { shopsService } from "./shops.service";

export class ShopsController {
  static use(app: Express): void {
    const router: Router = new ShopsController().getRouter();
    app.use("/shops", router);
  }

  private readonly router: Router;

  constructor() {
    this.router = Router();

    this.router.get("/", adminGuard, async (req: Request, res: Response): Promise<void> => {
      try {
        const shops = await shopsService.findMany();

        CustomResponse.Ok(res, "Shops found", shops);
      } catch (err) {
        CustomResponse.BadRequest(res, String(err));
      }
    });

    this.router.post(
      "/",
      authGuard,
      validateShopData,
      async (req: Request, res: Response): Promise<void> => {
        try {
          const shop = await shopsService.create(
            req.body as { name: string; cats: string[]; desc?: string },
            req.user as IUserPreview,
          );

          CustomResponse.Created(res, "Shop created", shop);
        } catch (err) {
          CustomResponse.BadRequest(res);
        }
      },
    );

    this.router.get("/:shopId", authGuard, async (req: Request, res: Response): Promise<void> => {
      try {
        const shop = await shopsService.findOne(req.params["shopId"]);

        CustomResponse.Ok(res, "Shop found", shop);
      } catch (err) {
        CustomResponse.BadRequest(res);
      }
    });

    this.router.put(
      "/:shopId",
      authGuard,
      shopOwnerGuard,
      async (req: Request, res: Response): Promise<void> => {
        try {
          const data = req.body;

          const shop = await shopsService.update(req.params["shopId"], data);

          CustomResponse.Created(res, "Shop updated", shop);
        } catch (err) {
          CustomResponse.BadRequest(res);
        }
      },
    );

    this.router.delete(
      "/:shopId",
      authGuard,
      shopOwnerGuard,
      async (req: Request, res: Response): Promise<void> => {
        try {
          const msg = await shopsService.remove(req.params["shopId"]);

          CustomResponse.Ok(res, msg);
        } catch (err) {
          CustomResponse.BadRequest(res);
        }
      },
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
