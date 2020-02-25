import { EntityRepository, FindManyOptions, Not } from 'typeorm-plus'
import { Persons as PersonsEntity } from '../entities/Persons'
import Repository from './Repository'
import { PersonFilters, Pagination, Ordering } from '../interfaces'

interface PersonPagination {
    edges: PersonsEntity[]|never[],
    pageInfo: {
        totalCount?: number,
        lastPage?: number
    }|null
}

@EntityRepository(PersonsEntity)
export default class Persons extends Repository<PersonsEntity> {
    constructor () {
        super()
    }

    async all(filters: PersonFilters, pagination: Pagination, ordering: Ordering[]): Promise<PersonPagination> {
        filters = filters || {}

        this.checkAuthorization()

        const where = {
            ...filters,
            ...{
                deletedAt: null,
                userId: this.session.userId,
            },
        }

        let options: FindManyOptions<PersonsEntity> = {
            where: where
        }
        const totalCount = await this.manager.createQueryBuilder('Persons', 'p').where(where).getCount()

        if (!totalCount) {
            return {edges: [], pageInfo: null}
        }

        options = this.setPagination(options, pagination)
        options = this.setOrdering(options, ordering)

        const edges = await this.repository.find(options)

        return {
            edges,
            pageInfo: {
                lastPage: Math.ceil(totalCount / pagination.limit),
                totalCount
            }
        }
    }

    async find(id: number): Promise<PersonsEntity> {
        this.checkAuthorization()

        return await this.repository.findOneOrFail({
            where: {
                id: id,
                deletedAt: null,
                userId: this.session.userId,
            },
        })
    }

    private setPagination(options: FindManyOptions<PersonsEntity>, pagination: Pagination): FindManyOptions<PersonsEntity> {
        pagination.offset = ((pagination.offset || 0) - 1) < 0 ? 1 : pagination.offset
        pagination.limit = pagination.limit || 10

        pagination.offset = (pagination.offset - 1) * pagination.limit
        pagination.limit = pagination.limit > 100 ? 100 : pagination.limit

        options = Object.assign(options, {
            skip: pagination.offset,
            take: pagination.limit,
        })

        return options
    }

    private setOrdering(options: FindManyOptions<PersonsEntity>, ordering: Ordering[]): FindManyOptions<PersonsEntity> {
        if (ordering) {
            let order = {}

            for (let i = 0; i < ordering.length; i++) {
                order = Object.assign(order, {
                    [ordering[i].field]: ordering[i].mode,
                })
            }

            options = Object.assign(options, { order: order })
        }

        return options
    }
}
