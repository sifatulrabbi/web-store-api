import { Request, Response, NextFunction } from "express";
import { CustomResponse } from "../helpers";

export function shopOwnerGuard(req: Request, res: Response, next: NextFunction): void {
  if (req.user && !req.user.shop_id) {
    CustomResponse.BadRequest(res, "You don't have any shops yet please create one");
    return;
  }

  if (req.user && req.user.shop_id !== req.params["shopId"]) {
    CustomResponse.Unauthorized(res, "Shop id incorrect");
    return;
  }

  next();
}
