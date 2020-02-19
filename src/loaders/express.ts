import { Application, Request, Response } from 'express'
import { express as superagent } from 'express-useragent'
import config from '../config'
import graphqlLoader from './graphql'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import errorHandler from 'errorhandler'
import errorsLoader from './errors'
import methodOverride from 'method-override'

export default async (server: Application) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  server.get('/status', (req: Request, res: Response) => {
    res.status(200).end()
  })
  server.head('/status', (req: Request, res: Response) => {
    res.status(200).end()
  })

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  server.enable('trust proxy')

  server.use(cors())

  // Some sauce that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  server.use(methodOverride())

  server.use(bodyParser.urlencoded({ extended: false }))
  server.use(bodyParser.json())
  server.use(morgan('dev'))

  if (config('app.env') === 'local') {
    // only use in development
    server.use(errorHandler())
  }

  server.use(superagent())

  graphqlLoader(server)
  errorsLoader(server)
}
