import { EntityRepository, AbstractRepository } from 'typeorm-plus'
import {EmployeeInterface} from '../interfaces'
import EmployeeEntity from '../entities/EmployeeEntity'
import { fill } from '../helpers'

@EntityRepository(EmployeeEntity)
export default class EmployeeRepository extends AbstractRepository<EmployeeEntity> {
  constructor() {
    super()
  }

  async all(): Promise<EmployeeEntity[]> {
    return await this.repository.find({where: {deleted_at: null}})
  }

  async find(id: number): Promise<EmployeeEntity | undefined> {
    return await this.repository.findOne(id, {where: {deleted_at: null}})
  }

  async save(data: EmployeeInterface): Promise<EmployeeEntity> {
    const employee = this.repository.create();

    fill(employee, data)

    return await this.repository.save(employee);
  }

  async update(id: number, data: EmployeeInterface): Promise<EmployeeEntity|null> {
    const employee: EmployeeEntity|undefined = await this.repository.findOne(id, {where: {deleted_at: null}})

    if (!employee) return null

    fill(employee, {...data, ...{updated_at: (new Date).toUTCString()}})

    await this.repository.update({ id: id }, employee)

    return employee
  }

  async delete(id: number): Promise<boolean> {
    return (await this.repository.softDelete({id})).affected == 1;
  }
}
