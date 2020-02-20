import { Application, Response } from "express"
import graphqlHttp from "express-graphql"
import config from "../config"
import Squema from "../graphql/Squema"
import { GraphQLError } from 'graphql'
import { ServerResponse, IncomingMessage } from "http"
import HttpError from "src/exceptions/HttpError"

export default async (server: Application) => {
    server.use(
        '/graphql',
        graphqlHttp((_: IncomingMessage, res: ServerResponse) => {
            return ({
                schema: Squema,
                graphiql: config('app.env') == 'local',
                customFormatErrorFn: (err: GraphQLError) => {
                    let code: number = 400
                    const origin = (<HttpError>err.originalError)

                    if (origin) {
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
            })
        })
    )
}
