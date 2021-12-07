import { Response } from "express";

export class CustomResponse {
  constructor(
    public readonly res: Response,
    public readonly success: boolean,
    public readonly statusCode: number,
    public readonly message: string,
    public readonly data?: any,
  ) {
    res.status(statusCode).json({
      success,
      statusCode,
      message,
      data,
    });
  }

  static BadRequest(res: Response, message: string = "Bad request"): CustomResponse {
    return new CustomResponse(res, false, 400, message);
  }

  static NotFound(res: Response, message: string = "Not found"): CustomResponse {
    return new CustomResponse(res, false, 404, message);
  }

  static Unauthorized(res: Response, message: string = "Unauthorized"): CustomResponse {
    return new CustomResponse(res, false, 401, message);
  }

  static Ok(res: Response, message: string = "Ok", data: any): CustomResponse {
    return new CustomResponse(res, true, 200, message, data);
  }

  static Created(res: Response, message: string = "Created", data: any): CustomResponse {
    return new CustomResponse(res, true, 201, message, data);
  }

  static InternalError(res: Response, message: string = "Internal server error"): CustomResponse {
    return new CustomResponse(res, false, 500, message);
  }
}
