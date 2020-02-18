import { get, set } from 'lodash';

export default function fill(entity: any, attributes: object, except:string[] = []) {
  attributes = Object.assign({}, attributes || {})
  for (const key in attributes) {
    if (attributes.hasOwnProperty(key) && !except.includes(key)) {
      set(entity, key, get(attributes, key))
    }
  }

  return entity;
}
