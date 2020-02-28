import HttpError from "./HttpError"

export default class UnprocessableEntity extends HttpError {
  constructor (message?: string) {
    super('UnprocessableEntity', message || 'UnprocessableEntity', 422)
  }
}
