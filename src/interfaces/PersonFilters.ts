import {MaritalStatus, Gender} from '../graphql/enums'

export default interface PersonFilters {
    maritalStatus?: keyof typeof MaritalStatus
    genders?: keyof typeof Gender
    documentTypeId?: number
    documentNumber?: string
}
