import dotenv from 'dotenv'
import {env} from '../helpers'

dotenv.config()

export default {
  env: env('ENV', 'local'),
  port: env('PORT', 3000),
  key: 'orklUp8BpKUPa3uY0oOrufYQRMRWLmBJ'
};
