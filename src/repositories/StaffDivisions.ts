import { EntityRepository, SelectQueryBuilder } from 'typeorm-plus'
import { StaffDivision as StaffDivisionEntity } from '../entities/StaffDivision'
import { Users as UsersEntity } from '../entities/Users'
import Repository from './Repository'

type Builder = SelectQueryBuilder<StaffDivisionEntity>;

@EntityRepository(StaffDivisionEntity)
export default class StaffDivisions extends Repository<StaffDivisionEntity> {
    constructor () {
        super()
    }

    async all(): Promise<StaffDivisionEntity[]> {
        this.checkAuthorization()
        return await this.builder().getMany()
    }

    async find(id: number): Promise<StaffDivisionEntity> {
        this.checkAuthorization()

        return await this.repository.findOneOrFail({
            where: {
                id: id,
                user: {
                    id: this.session.userId
                }
            }
        })
    }

    async save(body: StaffDivisionEntity): Promise<StaffDivisionEntity> {
        this.checkAuthorization()

        const entity = this.repository.create({
            ...body,
            ...{ userId: this.session.userId }
        })

        return await this.repository.save(entity)
    }

    async update(id: number, body: Partial<StaffDivisionEntity>): Promise<StaffDivisionEntity> {
        this.checkAuthorization()

        await this.find(id)

        await this.repository.update({ id: id }, new StaffDivisionEntity(body))

        return await this.find(id)
    }

    async delete(id: number): Promise<boolean> {
        this.checkAuthorization()

        await this.find(id)

        return (await this.repository.softDelete({ id: id })).affected == 1
    }

    builder(): Builder {
        return this.filter(
            this.manager.createQueryBuilder(StaffDivisionEntity, 'sa')
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
