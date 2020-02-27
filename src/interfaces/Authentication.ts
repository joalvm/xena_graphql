export default interface Authentication extends Object {
    token: string,
    sessionId: number
    userId: number
    isAdmin: boolean
    currentCompany: number
}
