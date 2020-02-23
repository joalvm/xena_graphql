import { Application } from "express"
import graphqlHttp from "express-graphql"
import { GraphQLError } from 'graphql'
import { IncomingMessage, ServerResponse } from "http"
import { verify } from 'jsonwebtoken'
import config from "../config"
import HttpError from "../exceptions/HttpError"
import Squema from "../graphql/Squema"

export default async (server: Application) => {

    server.use((req, res, next) => {
        const { authorization, company } = req.headers

        if (authorization) {
            const parts = authorization.split(' ');
            if (parts.length == 2) {
                const scheme = parts[0];
                const credentials = parts[1];

                if (/^Bearer$/i.test(scheme)) {
                    // eslint-disable-next-line
                    const token: any = verify(credentials, config('app.key'))

                    Object.defineProperty(req, 'session', {
                        enumerable: true,
                        configurable: true,
                        value: {
                            token: credentials,
                            sessionId: token.kid,
                            userId: token.uid,
                            isAdmin: token.adm,
                            currentCompany: company
                        }
                    })
                } else {
                    return next(new HttpError('BadSchemaToken', 'Format is Authorization: Bearer [token]', 400));
                }
            } else {
                return next(new HttpError('BadToken', 'Format is Authorization: Bearer [token]', 400));
            }
        }

        next()
    })

    server.use(
        '/graphql',
        graphqlHttp((_: IncomingMessage, res: ServerResponse) => {
            const formatError = (err: GraphQLError) => {
                let code = 400
                // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                const origin = (<HttpError>err.originalError)

                if (origin) {
                    if (Object.keys(origin).includes('code')) {
                        code = origin.code
                    } else {
                        switch (origin.name) {
                            case 'EntityNotFound': code = 404; break;
                            default: code = 400; break;
                        }
                    }
                }

                res.statusCode = code

                return {
                    ...{
                        message: err.message,
                        locations: err.locations,
                        path: err.path
                    }, ...err.originalError
                };
            }

            return ({
                schema: Squema,
                graphiql: config('app.env') == 'local',
                customFormatErrorFn: formatError
            })
        })
    )
}
