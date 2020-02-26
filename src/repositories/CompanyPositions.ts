import { EntityRepository, SelectQueryBuilder } from 'typeorm-plus'
import { CompanyPositions as CompanyPositionsEntity } from '../entities/CompanyPositions'
import { Companies as CompaniesEntity } from '../entities/Companies'
import Repository from './Repository'

@EntityRepository(CompanyPositionsEntity)
export default class CompanyPositions extends Repository<CompanyPositionsEntity> {
    constructor () {
        super()
    }

    async all(): Promise<CompanyPositionsEntity[]> {
        this.checkAuthorization()
        return await this.builder().getMany()
    }

    async find(id: number): Promise<CompanyPositionsEntity | undefined> {
        return await this.builder().andWhere('id=:id', { id }).getOne()
    }

    builder(): SelectQueryBuilder<CompanyPositionsEntity> {
        return this.manager.createQueryBuilder(CompanyPositionsEntity, 'cp')
            .innerJoin(CompaniesEntity, 'c', 'cp.company_id = c.id')
            .where({
                'cp.deletedAt': null,
                'c.deletedAt': null,
                'c.user_id': this.session.sessionId
            })
    }
}
