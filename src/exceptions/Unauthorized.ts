import HttpError from "./HttpError"

export default class Unauthorized extends HttpError {
  constructor (message?: string) {
    super('Unauthorized', message || 'Unauthorized', 401)
  }
}
