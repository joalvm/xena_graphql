import { Application, Request, Response, NextFunction } from "express";
import NotFoundError from "../exceptions/NotFound";
import HttpError from "../exceptions/HttpError";

export default async (server: Application) => {
  /// catch 404 and forward to error handler
  server.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError);
  });

  /// error handlers
  server.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    res.status(err.code)

    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.code)
        .send({ message: err.message })
        .end();
    }

    return next(err);
  });

  server.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {

    res.status(err.code || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
}
