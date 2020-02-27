import { EntityRepository, SelectQueryBuilder } from 'typeorm-plus'
import { CostCenters as CostCentersEntity } from '../entities/CostCenters'
import { Users as UsersEntity } from '../entities/Users'
import Repository from './Repository'

type Builder = SelectQueryBuilder<CostCentersEntity>;

@EntityRepository(CostCentersEntity)
export default class CostCenters extends Repository<CostCentersEntity> {
    constructor () {
        super()
    }

    async all(): Promise<CostCentersEntity[]> {
        this.checkAuthorization()
        return await this.builder().getMany()
    }

    async find(id: number): Promise<CostCentersEntity> {
        this.checkAuthorization()
        return await this.repository.findOneOrFail({
            where: {
                id: id,
                userId: this.session.userId
            }
        })
    }

    async save(body: CostCentersEntity): Promise<CostCentersEntity> {
        this.checkAuthorization()

        const entity = this.repository.create({
            ...body,
            ...{ userId: this.session.userId }
        })

        return await this.repository.save(entity)
    }

    async update(id: number, body: Partial<CostCentersEntity>): Promise<CostCentersEntity> {
        this.checkAuthorization()

        await this.find(id)

        await this.repository.update({ id: id }, new CostCentersEntity(body))

        return await this.find(id)
    }

    async delete(id: number): Promise<boolean> {
        this.checkAuthorization()

        await this.find(id)

        return (await this.repository.softDelete({ id: id })).affected == 1
    }

    builder(): Builder {
        return this.filter(
            this.manager.createQueryBuilder(CostCentersEntity, 'sa')
                .innerJoin(UsersEntity, 'u', 'u.id = sa.user_id')
                .where({
                    'sa.deletedAt': null,
                    'u.deletedAt': null
                })
        )
    }

    private filter(builder: Builder): Builder {

        if (this.session.sessionId) {
            builder.andWhere('u.id = :userId', { userId: this.session.userId })
        }

        return builder
    }
}
