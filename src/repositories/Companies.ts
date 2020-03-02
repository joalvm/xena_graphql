import { EntityRepository, In, getCustomRepository, SelectQueryBuilder } from 'typeorm-plus'
import { Companies as CompaniesEntity } from '../entities/Companies'
import { Users as UsersRepository } from '../repositories'
import { Company } from '../interfaces'
import { fill } from '../helpers'
import Repository from './Repository'
import { Users as UsersEntity } from '../entities/Users'

type Builder = SelectQueryBuilder<CompaniesEntity>;

@EntityRepository(CompaniesEntity)
export default class Companies extends Repository<CompaniesEntity> {
    constructor() {
        super()
    }

    async all(isDefault?: boolean): Promise<CompaniesEntity[]> {
        await this.checkAuthorization()

        const where: Partial<CompaniesEntity> = {
            deletedAt: null,
            userId: this.session.userId
        }

        if (isDefault) {
            where.isDefault = isDefault
        }

        return await this.repository.find({where})
    }

    async find(id: number): Promise<CompaniesEntity> {
        await this.checkAuthorization()
        return await this.repository.findOneOrFail(id, { where: { deletedAt: null } })
    }

    async save(body: Company): Promise<CompaniesEntity> {
        await this.checkAuthorization()
        const userEntity = await getCustomRepository(UsersRepository).find(this.session.userId)

        const companyEntity = this.repository.create()

        fill(companyEntity, body)
        companyEntity.user = userEntity

        return await this.repository.save(companyEntity)
    }

    async update(id: number, body: Company): Promise<CompaniesEntity> {
        await this.checkAuthorization()

        const companyEntity = await this.find(id)

        fill(companyEntity, body)

        await this.repository.update({ id: id }, companyEntity)

        return companyEntity
    }

    async delete(id: number): Promise<boolean> {
        await this.checkAuthorization()
        return (await this.repository.softDelete({ id: id })).affected == 1
    }

    async findByIds(ids: number[]): Promise<CompaniesEntity[]> {
        await this.checkAuthorization()
        return await this.repository.find({
            where: { id: In(ids), deletedAt: null },
        })
    }

    async findByUsers(userIds: number[]): Promise<CompaniesEntity[]> {
        await this.checkAuthorization()
        return await this.repository.find({
            where: { userId: In(userIds), deletedAt: null },
        })
    }

    builder(): Builder {
        return this.filter(
            this.manager.createQueryBuilder(CompaniesEntity, 'c')
                .innerJoin(UsersEntity, 'u', 'u.id = c.user_id')
                .where({
                    'c.deleted_at': null,
                    'u.deleted_at': null
                })
        )
    }

    filter(builder: Builder): Builder {
        if (this.session.userId) {
            builder.andWhere('u.id=:userId', {userId: this.session.userId})
        }

        return builder
    }
}
