import { Express, Router, Request, Response } from "express";
import { CustomResponse } from "../../common";

export class MainController {
  static use(app: Express): void {
    const router: Router = new MainController().getRouter();
    app.use("/", router);
  }

  private readonly router: Router;

  private constructor() {
    this.router = Router();

    this.router.get("/", (req: Request, res: Response): void => {
      CustomResponse.Ok(res, "Server is working fine", []);
    });
  }

  getRouter(): Router {
    return this.router;
  }
}
