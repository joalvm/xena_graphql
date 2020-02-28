import HttpError from "./HttpError"

export default class NotAcceptable extends HttpError {
  constructor (message?: string) {
    super('NotAcceptable', message || 'NotAcceptable', 406)
  }
}
