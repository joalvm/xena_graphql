import { AbstractRepository, EntityRepository, In } from "typeorm-plus";
import { Departments as DepartmentsEntity } from "../entities/Departments";

@EntityRepository(DepartmentsEntity)
export default class Departments extends AbstractRepository<DepartmentsEntity> {
    constructor() {
        super()
    }

    async all(): Promise<DepartmentsEntity[]> {
        return await this.repository.find({where: {deletedAt: null}})
    }

    async find(id: number): Promise<DepartmentsEntity> {
        return await this.repository.findOneOrFail(id, {where: {deletedAt: null}})
    }

    async findByIds(ids: number[]): Promise<DepartmentsEntity[]> {
        return await this.repository.find({
            where: {id: In(ids), deletedAt: null}
        })
    }
}
