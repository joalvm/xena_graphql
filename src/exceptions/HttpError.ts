export default class HttpError extends Error {
  public code: number;
  constructor (name: string, message: string, code: number) {
    super(message)
    this.name = name
    this.code = code
  }
}
