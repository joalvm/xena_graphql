import { Genders } from '../enums'

export default interface User {
    username: string
    password: string
    salt: string
    is_admin: boolean
    recovery_token?: string
    enabled?: boolean
    name: string
    lastname: string
    gender: keyof typeof Genders
    email: string
    avatar_url?: string
}
