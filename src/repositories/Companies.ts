import { AbstractRepository, EntityRepository, In, getCustomRepository } from 'typeorm-plus'
import { Companies as CompaniesEntity } from '../entities/Companies'
import { Users as UsersRepository } from '../repositories'
import { Company } from '../interfaces'
import { fill } from '../helpers'

@EntityRepository(CompaniesEntity)
export default class Companies extends AbstractRepository<CompaniesEntity> {
    constructor() {
        super()
    }

    async all(): Promise<CompaniesEntity[]> {
        return await this.repository.find({ where: { deletedAt: null } })
    }

    async find(id: number): Promise<CompaniesEntity> {
        return await this.repository.findOneOrFail(id, { where: { deletedAt: null } })
    }

    async save(userId: number, body: Company): Promise<CompaniesEntity> {
        const userEntity = await getCustomRepository(UsersRepository).find(userId)

        const companyEntity = this.repository.create()

        fill(companyEntity, body)
        companyEntity.user = userEntity

        return await this.repository.save(companyEntity)
    }

    async update(id: number, body: Company): Promise<CompaniesEntity> {
        const companyEntity = await this.find(id)

        fill(companyEntity, body)

        await this.repository.update({ id: id }, companyEntity)

        return companyEntity
    }

    async delete(id: number, body: Company): Promise<boolean> {
        return (await this.repository.softDelete({ id: id })).affected == 1
    }

    async findByIds(ids: number[]): Promise<CompaniesEntity[]> {
        return await this.repository.find({
            where: { id: In(ids), deletedAt: null },
        })
    }

    async findByUsers(userIds: number[]): Promise<CompaniesEntity[]> {
        return await this.repository.find({
            where: { userId: In(userIds), deletedAt: null },
        })
    }
}
