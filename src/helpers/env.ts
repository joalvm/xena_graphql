import {get} from 'lodash'
import dotenv from 'dotenv'

dotenv.config()

export default function env(key: string, _default: any = null): any {
  return get(process.env, key, _default);;
}
