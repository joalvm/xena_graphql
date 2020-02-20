import { Application, Request, Response, NextFunction } from "express";
import NotFoundError from "../exceptions/NotFound";
import HttpError from "../exceptions/HttpError";
import config from "../config";
import jwt = require("express-jwt");

export default async (server: Application) => {
    /// catch 404 and forward to error handler
    server.use((req: Request, res: Response, next: NextFunction) => {
        console.log('Ehmm');
        next(new NotFoundError);
    });

    server.use(jwt({secret: config('app.key'), }))

    /// error handlers
    server.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
        console.log(err.code)
        const code = typeof err.code == 'string' ? 401 : err.code
        /**
         * Handle 401 thrown by express-jwt library
         */
        res.status(code)

        if (err.name === 'UnauthorizedError') {
            return res
                .status(code)
                .send({ message: err.message })
                .end();
        }

        return next(err);
    });

    server.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
        res.status((typeof err.code == 'string' ? 401 : err.code) || 500);
        return res.json({
            errors: {
                message: err.message,
            },
        });
    });
}
