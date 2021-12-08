import { Express, NextFunction, Request, Response, Router } from "express";
import { IUserPreview } from "../../typings";
import passport from "passport";
import { loginDto } from "./dto";
import { CustomResponse } from "../../common";

export class AuthController {
  static use(app: Express): void {
    const router: Router = new AuthController().getRouter();
    app.use("/auth", router);
  }

  private readonly router: Router;

  constructor() {
    this.router = Router();

    this.router.post(
      "/login",
      this.checkInputs,
      async (req: Request, res: Response): Promise<void> => {
        passport.authenticate(
          "local",
          async (err: unknown, user: IUserPreview, info: { message: string }): Promise<void> => {
            if (err) {
              CustomResponse.InternalError(res, String(err) + info.message);
              return;
            }

            if (!user) {
              CustomResponse.NotFound(res, "User not found, " + info.message);
              return;
            }

            req.logIn(user, (err: unknown): void => {
              if (err) {
                CustomResponse.Unauthorized(res, String(err));
                return;
              }
              CustomResponse.Ok(res, "Login successful", user);
            });
          },
        )(req, res);
      },
    );

    this.router.post("/logout", (req: Request, res: Response): void => {
      req.logout();
      CustomResponse.Ok(res, "Logout successful");
    });
  }

  private checkInputs(req: Request, res: Response, next: NextFunction): void {
    try {
      loginDto(req.body);
      next();
    } catch (err) {
      CustomResponse.NotFound(res, String(err));
    }
  }

  getRouter(): Router {
    return this.router;
  }
}
