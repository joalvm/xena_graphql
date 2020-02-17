import { EntityRepository, AbstractRepository, getCustomRepository } from 'typeorm-plus'
import UserEntity from '../entities/UserEntity'
import {hashSync} from 'bcrypt'
import { random } from '../helpers'
import EmployeeRepository from './EmployeeRepository'

@EntityRepository(UserEntity)
export default class UserRepository extends AbstractRepository<UserEntity> {
  constructor() {
    super()
  }

  async save(employeeId: number, username: string, password: string): Promise<UserEntity> {
    const entity = this.repository.create()

    entity.salt = random(16)
    entity.employee = await getCustomRepository(EmployeeRepository).find(employeeId)
    entity.username = username
    entity.password = hashSync(`${entity.salt}:${password}`, 12)

    return await this.repository.save(entity)
  }
}
