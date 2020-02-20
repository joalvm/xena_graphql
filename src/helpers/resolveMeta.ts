import { get } from 'lodash'

export default function resolveMeta(field: string) {
  return (source:object) => {
    const value = get(source, field, null);

    if (value) {
      return (new Date(value)).toUTCString();
    }

    return null
  }
}
