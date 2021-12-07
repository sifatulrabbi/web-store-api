import { Router, Request, Response } from "express";
import { CustomResponse } from "../../libs";

export class MainController {
  static use(): Router {
    return new MainController().Router;
  }

  private readonly router: Router;

  private constructor() {
    this.router = Router();

    this.router.get("/", (req: Request, res: Response): void => {
      CustomResponse.Ok(res, "Server is working fine", []);
    });
  }

  get Router(): Router {
    return this.router;
  }
}
