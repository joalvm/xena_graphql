export default interface Session {
  token: string,
  expire: string,
  ip: string,
  browser: string,
  version: string,
  platform: string,
  closed_at: string
}
