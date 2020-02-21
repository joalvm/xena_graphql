import { Genders, MaritalStatus } from "src/enums";

export default interface Person {
    userId: number,
    name: string,
    lastname: string,
    gender: keyof typeof Genders,
    maritalStatus: keyof typeof MaritalStatus
    documentTypeId: number,
    documentNumber: string,
    dateOfBirth: string,
    districtId: number,

}
