import { Express, Router, Request, Response } from "express";
import { IUser, IUserDocument } from "../typings";
import { createUserDto, updateUserDto } from "./dto";
import { usersService } from "./users.service";
import { CustomResponse, authGuard, adminGuard } from "../common";

export class UsersController {
  static use(app: Express): void {
    const router: Router = new UsersController().getRouter();
    app.use("/users", router);
  }

  private readonly router: Router;

  private constructor() {
    this.router = Router();

    this.router.get("/", adminGuard, async (req: Request, res: Response): Promise<void> => {
      try {
        const users: IUserDocument[] = await usersService.findAll();

        CustomResponse.Ok(res, "Users found", users);
      } catch (err) {
        CustomResponse.InternalError(res, String(err));
      }
    });

    this.router.get("/me", authGuard, async (req: Request, res: Response): Promise<void> => {
      try {
        if (!req.user?._id) throw "User session expired please login again";

        const userId: string = req.user?._id;
        const user: IUserDocument = await usersService.findOne({ _id: userId });
        if (!user) throw "User not found please sign up";

        CustomResponse.Ok(res, "User found", usersService.trimUser(user));
      } catch (err) {
        CustomResponse.NotFound(res, String(err));
      }
    });

    this.router.post("/", async (req: Request, res: Response): Promise<void> => {
      try {
        const userData: IUser = createUserDto(req.body);
        const createdUser: IUserDocument = await usersService.create(userData);

        CustomResponse.Ok(res, "User created", usersService.trimUser(createdUser));
      } catch (err) {
        CustomResponse.BadRequest(res, String(err));
      }
    });

    this.router.put("/me", authGuard, async (req: Request, res: Response): Promise<void> => {
      try {
        if (!req.user?._id) throw "User session expired please login again";

        const userId: string = req.user?._id;
        const userData: IUser = updateUserDto(req.body);
        const updatedUser: IUserDocument = await usersService.update(userId, userData);

        CustomResponse.Ok(res, "User info updated", usersService.trimUser(updatedUser));
      } catch (err) {
        CustomResponse.BadRequest(res, String(err));
      }
    });

    this.router.delete("/me", authGuard, async (req: Request, res: Response): Promise<void> => {
      try {
        if (!req.user?._id) throw "User session expired please login again";

        const userId: string = req.user._id;
        await usersService.remove(userId);

        CustomResponse.Ok(res, "User removed", []);
      } catch (err) {
        CustomResponse.BadRequest(res, String(err));
      }
    });

    this.router.delete("/", adminGuard, (req: Request, res: Response): void => {
      try {
        usersService.bulkRemove(req.body);

        CustomResponse.Ok(res);
      } catch (err) {
        CustomResponse.BadRequest(res, String(err));
      }
    });
  }

  getRouter(): Router {
    return this.router;
  }
}
