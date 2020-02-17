import CompanyEntity from "../entities/CompanyEntity"
import { Gender } from "../entities/EmployeeEntity"

export default interface EmployeeInterface {
  name: string,
  lastname: string,
  gender: Gender,
  company: Promise<CompanyEntity>
}
