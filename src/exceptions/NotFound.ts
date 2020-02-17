import HttpError from "./HttpError"

export default class NotFound extends HttpError {
  constructor (message?: string) {
    super('NotFound', message || 'Not Found', 404)
  }
}
