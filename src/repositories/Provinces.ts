import { AbstractRepository, EntityRepository, In } from 'typeorm-plus'
import { Provinces as ProvincesEntity } from '../entities/Provinces'

@EntityRepository(ProvincesEntity)
export default class Provinces extends AbstractRepository<ProvincesEntity> {
    constructor() {
        super()
    }

    async all(): Promise<ProvincesEntity[]> {
        return this.repository.find({ where: { deletedAt: null } })
    }

    async find(id: number): Promise<ProvincesEntity> {
        return this.repository.findOneOrFail(id, { where: { deletedAt: null } })
    }

    async findByIds(ids: number[]): Promise<ProvincesEntity[]> {
        return this.repository.find({
            where: {
                id: In(ids),
                deletedAt: null
            }
        })
    }

    async findByDepartment(department: number | number[]): Promise<ProvincesEntity[]> {
        if (typeof department == 'number') {
            return await this.repository.find({
                where: { departmentId: department, deletedAt: null },
            })
        } else {
            return await this.repository.find({
                where: { departmentId: In(department), deletedAt: null },
            })
        }
    }
}
