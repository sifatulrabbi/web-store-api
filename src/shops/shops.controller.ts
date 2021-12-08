import { Express, Router, Request, Response } from "express";
import { CustomResponse } from "../common";

export class ShopsController {
  static use(app: Express): void {
    const router: Router = new ShopsController().getRouter();
    app.use("/shops", router);
  }

  private readonly router: Router;

  constructor() {
    this.router = Router();

    this.router.get("/", async (req: Request, res: Response): Promise<void> => {
      try {
        CustomResponse.Ok(res);
      } catch (err) {
        CustomResponse.BadRequest(res);
      }
    });

    this.router.post("/", async (req: Request, res: Response): Promise<void> => {
      try {
        CustomResponse.Ok(res);
      } catch (err) {
        CustomResponse.BadRequest(res);
      }
    });

    this.router.get("/:shopId", async (req: Request, res: Response): Promise<void> => {
      try {
        CustomResponse.Ok(res);
      } catch (err) {
        CustomResponse.BadRequest(res);
      }
    });

    this.router.put("/:shopId", async (req: Request, res: Response): Promise<void> => {
      try {
        CustomResponse.Ok(res);
      } catch (err) {
        CustomResponse.BadRequest(res);
      }
    });

    this.router.delete("/:shopId", async (req: Request, res: Response): Promise<void> => {
      try {
        CustomResponse.Ok(res);
      } catch (err) {
        CustomResponse.BadRequest(res);
      }
    });
  }

  getRouter(): Router {
    return this.router;
  }
}
