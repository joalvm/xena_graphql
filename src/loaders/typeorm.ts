/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application } from 'express'
import { createConnection, ConnectionOptions } from 'typeorm-plus'
import HttpError from '../exceptions/HttpError'
import { resolve } from 'path'
import config from '../config'

export default async (_server: Application) => {
  const defaultConnection: string = config('database.default')

  const options: ConnectionOptions = {
    name: 'default',
    ...config(`database.connections.${defaultConnection}`),
    entities: [resolve(__dirname, '../entities/*.{ts,js}')],
    debug: config('app.env') == 'local',
    logging: config('app.env') == 'local'
  }

  await createConnection(options)
    .then(() => console.log('typeorm initalized'))
    .catch((error: HttpError) => console.log(error.message))
}
