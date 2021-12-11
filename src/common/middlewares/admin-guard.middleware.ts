import { config } from "../../configs";
import { Request, Response, NextFunction } from "express";
import { CustomResponse } from "../helpers";

export function adminGuard(req: Request, res: Response, next: NextFunction): void {
  try {
    if (!req.body.admin) {
      throw "You don't have enough permissions to enter this route";
    }

    if (!config.senderEmail && !config.senderEmailPass) {
      throw "Admin email not defined";
    }

    if (
      (req.body.admin.email && config.senderEmail !== req.body.admin.email) ||
      (req.body.admin.password && req.body.admin.password !== config.senderEmailPass)
    ) {
      throw "Unable to verify admin";
    }

    next();
  } catch (err) {
    CustomResponse.Unauthorized(res, String(err));
  }
}
