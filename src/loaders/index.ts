import expressLoader from './express';
import { Application } from 'express';
import typeormLoader from './typeorm';

export default async (app: Application) => {
  await expressLoader(app)
  await typeormLoader(app)

  console.log('Express Intialized');
}
