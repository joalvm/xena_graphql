import { get, set } from 'lodash';

export default function fill(entity: any, attributes: object) {
  attributes = Object.assign({}, attributes || {})
  for (const key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      set(entity, key, get(attributes, key))
    }
  }

  return entity;
}
