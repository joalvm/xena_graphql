import { Application } from "express"
import graphqlHttp from "express-graphql"
import config from "../config"
import Squema from "../graphql/Squema"
import { GraphQLError } from 'graphql'
import { ServerResponse, IncomingMessage } from "http"
import HttpError from "../exceptions/HttpError"
import {verify} from 'jsonwebtoken'

export default async (server: Application) => {

    server.use((req, res, next) => {
        const { authorization } = req.headers

        if (authorization) {
            var parts = authorization.split(' ');
            if (parts.length == 2) {
                const scheme = parts[0];
                const credentials = parts[1];

                if (/^Bearer$/i.test(scheme)) {
                    const token = verify(credentials, config('app.key'))
                    console.log(token)
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
                let code: number = 400
                const origin = (<HttpError>err.originalError)

                if (origin) {
                    console.log(origin)
                    if (origin && origin.hasOwnProperty(code)) {
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
                rootValue: {
                    session: (args, req) => {
                        return { hola: "mundo" }
                        console.dir("cuando te ejecutas", req)
                    }
                },
                customFormatErrorFn: formatError
            })
        })
    )
}
