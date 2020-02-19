import "reflect-metadata"

import loaders from './loaders'
import config from './config'
import express from 'express'
import { setMaxListeners } from 'process'

setMaxListeners(200);

(async () => {
  const server = express();

  await loaders(server);

  server.listen(config('app.port'), () => {
    console.log('server in port ', config('app.port'))
  })
})()



