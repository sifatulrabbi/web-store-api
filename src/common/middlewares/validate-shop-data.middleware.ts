import { Request, Response, NextFunction } from "express";
import { CustomResponse } from "../helpers";

export function validateShopData(req: Request, res: Response, next: NextFunction): void {
  const body = req.body;

  if (!body.name || !body.cats) {
    CustomResponse.NotFound(res, "Shop name and categories is required");
    return;
  }

  next();
}
