/* eslint-disable @typescript-eslint/camelcase */
import { EntityRepository, AbstractRepository } from 'typeorm-plus'
import CompaniesEntity from '../entities/CompanyEntity'
import { CompanyInterface } from '../interfaces'
import { fill } from '../helpers'

@EntityRepository(CompaniesEntity)
export default class CompanyRepository extends AbstractRepository<CompaniesEntity> {
  constructor() {
    super()
  }

  async all(): Promise<CompaniesEntity[]> {
    return await this.repository.find({where: {deleted_at: null}})
  }

  async find(id: number): Promise<CompaniesEntity | null> {
    return (await this.repository.findOne(id, {where: {deleted_at: null}})) ?? null
  }

  async save(data: CompanyInterface): Promise<CompaniesEntity> {
    const company = this.repository.create()

    fill(company, data)

    return await this.repository.save(company)
  }

  async update(id: number, data: CompanyInterface): Promise<CompaniesEntity|null> {
    const company: CompaniesEntity|undefined = await this.repository.findOne(id)

    if (!company) {
      return null
    }

    fill(company, {...data, ...{updated_at: (new Date).toUTCString()}})

    await this.repository.update({ id: id }, company)

    return company
  }

  async delete(id: number): Promise<boolean> {
    return (await this.repository.softDelete({id})).affected == 1;
  }
}
