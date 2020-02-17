import {get} from 'lodash'
import app from './app'
import database from './database'

const configurations = {
  app,
  database
}

const config = (key: string) => get(configurations, key)

export default config
