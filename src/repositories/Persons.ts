import { EntityRepository, FindManyOptions } from 'typeorm-plus'
import { Persons as PersonsEntity } from '../entities/Persons'
import Repository from './Repository'
import { PersonFilters, Pagination, Ordering } from '../interfaces'

@EntityRepository(PersonsEntity)
export default class Persons extends Repository<PersonsEntity> {
  constructor() {
    super()
  }

  async all(filters: PersonFilters, pagination: Pagination, ordering: Ordering[]): Promise<PersonsEntity[]> {
    filters = filters || {}

    this.checkAuthorization()

    let options: FindManyOptions<PersonsEntity> = {
      where: {
        ...filters,
        ...{
          deletedAt: null,
          userId: this.session.userId,
        },
      },
    }

    if (pagination) {
      options = Object.assign(options, {
        skip: pagination.offset,
        take: pagination.limit,
      })
    }

    if (ordering) {
      let order = {}

      for (let i = 0; i < ordering.length; i++) {
        order = Object.assign(order, {
          [ordering[i].field]: ordering[i].mode,
        })
      }

      options = Object.assign(options, { order: order })
    }

    return await this.repository.find(options)
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

  async save(body: Person): Promise<PersonsEntity> {
    this.checkAuthorization()

    return await this.repository.findOneOrFail({
      where: {
        id: id,
        deletedAt: null,
        userId: this.session.userId,
      },
    })
  }
}
