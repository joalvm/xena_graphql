export default interface TokenSession extends Object {
    kid: number,
    uid: number,
    adm: boolean,
    iat: Date,
    exp: Date
}
