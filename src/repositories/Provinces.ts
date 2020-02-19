import { AbstractRepository, EntityRepository, In } from 'typeorm-plus'
import { Provinces as ProvincesEntity } from '../entities/Provinces'

@EntityRepository(ProvincesEntity)
export default class Provinces extends AbstractRepository<ProvincesEntity> {
  constructor() {
    super()
  }

  async all(): Promise<ProvincesEntity[]> {
    return this.repository.find({
      where: { deletedAt: null },
    })
  }

  async find(id: number): Promise<ProvincesEntity> {
    return this.repository.findOneOrFail(id, { where: { deletedAt: null } })
  }

  async findByDepartment(department: number | number[]): Promise<ProvincesEntity | ProvincesEntity[] | undefined> {
    if (typeof department == 'number') {
      return await this.repository.findOne({
        relations: ['department'],
        where: { department: department, deletedAt: null },
      })
    } else {
      return await this.repository.find({
        relations: ['department'],
        where: { department: In(department), deletedAt: null },
      })
    }
  }
}
