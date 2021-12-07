import { IUserPreview } from "./users";
declare global {
  namespace Express {
    interface User extends IUserPreview {}
    interface Request {
      user?: IUserPreview;
    }
  }
}

export * from "./users";
export * from "./shops";
export * from "./products";
export * from "./category";
export * from "./tags";
