import { Request, Response, NextFunction } from "express";
import { CustomResponse } from "../helpers";

export function authGuard(req: Request, res: Response, next: NextFunction): void {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  CustomResponse.Unauthorized(res, "You are not logged in, please login");
}
