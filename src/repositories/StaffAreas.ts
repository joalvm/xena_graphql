import { EntityRepository, SelectQueryBuilder } from 'typeorm-plus'
import { StaffArea as StaffAreaEntity } from '../entities/StaffArea'
import { Users as UsersEntity } from '../entities/Users'
import Repository from './Repository'

type Builder = SelectQueryBuilder<StaffAreaEntity>;

@EntityRepository(StaffAreaEntity)
export default class StaffArea extends Repository<StaffAreaEntity> {
    constructor () {
        super()
    }

    async all(): Promise<StaffAreaEntity[]> {
        this.checkAuthorization()
        return await this.builder().getMany()
    }

    async find(id: number): Promise<StaffAreaEntity> {
        this.checkAuthorization()
        return await this.repository.findOneOrFail({
            where: {
                id: id,
                userId: this.session.userId
            }
        })
    }

    async save(body: StaffAreaEntity): Promise<StaffAreaEntity> {
        this.checkAuthorization()

        const entity = this.repository.create({
            ...body,
            ...{ userId: this.session.userId }
        })

        return await this.repository.save(entity)
    }

    async update(id: number, body: Partial<StaffAreaEntity>): Promise<StaffAreaEntity> {
        this.checkAuthorization()

        await this.find(id)

        await this.repository.update({ id: id }, new StaffAreaEntity(body))

        return await this.find(id)
    }

    async delete(id: number): Promise<boolean> {
        this.checkAuthorization()

        await this.find(id)

        return (await this.repository.softDelete({ id: id })).affected == 1
    }

    builder(): Builder {
        return this.filter(
            this.manager.createQueryBuilder(StaffAreaEntity, 'sa')
                .innerJoin(UsersEntity, 'u', 'u.id = sa.user_id')
                .where({
                    'sa.deletedAt': null,
                    'u.deletedAt': null
                })
        )
    }

    private filter(builder: Builder): Builder {

        if (this.session.userId) {
            builder.andWhere('u.id = :userId', { userId: this.session.userId })
        }

        return builder
    }
}
