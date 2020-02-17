import { Application, Response } from "express"
import graphqlHttp from "express-graphql"
import config from "../config"
import Squema from "../graphql/Squema"
import { GraphQLError } from 'graphql'

export default async (server: Application) => {
  server.use(
    '/graphql',
    graphqlHttp({
      schema: Squema,
      graphiql: config('app.env') == 'local',
      customFormatErrorFn: (err: GraphQLError) => {
        return {...{
          message: err.message,
          locations: err.locations,
          path: err.path
        }, ...err.originalError};
      }
    })
  )
}
