import { Router, Request, Response } from "express";
import { IUser, IUserDocument, IUserPreview } from "../../typings";
import { createUserDto, updateUserDto } from "./dto";
import { usersService } from "./users.service";
import { CustomResponse } from "../../libs";

export class UsersController {
  static use(): Router {
    return new UsersController().Router;
  }

  private readonly router: Router;

  private constructor() {
    this.router = Router();

    this.router.get("/users", async (req: Request, res: Response): Promise<void> => {
      try {
        const users: IUserDocument[] = await usersService.findAll();

        CustomResponse.Ok(res, "Users found", users);
      } catch (err) {
        CustomResponse.InternalError(res, String(err));
      }
    });

    this.router.get("/users/:userId", async (req: Request, res: Response): Promise<void> => {
      try {
        const userId: string = req.params["userId"];
        const user: IUserDocument = await usersService.findOne({ _id: userId });
        if (!user) throw "User not found";

        CustomResponse.Ok(res, "User found", usersService.trimUser(user));
      } catch (err) {
        CustomResponse.NotFound(res, String(err));
      }
    });

    this.router.post("/users", async (req: Request, res: Response): Promise<void> => {
      try {
        const userData: IUser = createUserDto(req.body);
        const createdUser: IUserDocument = await usersService.create(userData);

        CustomResponse.Ok(res, "User created", usersService.trimUser(createdUser));
      } catch (err) {
        CustomResponse.BadRequest(res, String(err));
      }
    });

    this.router.put("/users/:userId", async (req: Request, res: Response): Promise<void> => {
      try {
        const userId: string = req.params["userId"];
        const userData: IUser = updateUserDto(req.body);
        const updatedUser: IUserDocument = await usersService.update(userId, userData);

        CustomResponse.Ok(res, "User info updated", usersService.trimUser(updatedUser));
      } catch (err) {
        CustomResponse.BadRequest(res, String(err));
      }
    });

    this.router.delete("/users/:userId", async (req: Request, res: Response): Promise<void> => {
      try {
        const userId: string = req.params["userId"];
        await usersService.remove(userId);

        CustomResponse.Ok(res, "User removed", []);
      } catch (err) {
        CustomResponse.BadRequest(res, String(err));
      }
    });
  }

  get Router(): Router {
    return this.router;
  }
}
