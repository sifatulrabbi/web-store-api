import { Request, Response, NextFunction } from "express";
import { CustomResponse } from "../helpers";

export function validateUserData(req: Request, res: Response, next: NextFunction): void {
  const body = req.body;

  if (!body.name || !body.email || !body.password || !body.confirm_pass) {
    CustomResponse.NotFound(res, "Name, email, password and confirm_pass fields are required");
    return;
  }

  next();
}
