import { EntityRepository, SelectQueryBuilder, getCustomRepository } from 'typeorm-plus'
import { CompanyPositions as CompanyPositionsEntity } from '../entities/CompanyPositions'
import { Companies as CompaniesEntity } from '../entities/Companies'
import Repository from './Repository'
import CompaniesRepository from './Companies'

type Builder = SelectQueryBuilder<CompanyPositionsEntity>;

@EntityRepository(CompanyPositionsEntity)
export default class CompanyPositions extends Repository<CompanyPositionsEntity> {
    constructor () {
        super()
    }

    async all(): Promise<CompanyPositionsEntity[]> {
        this.checkAuthorization()

        return await this.builder().getMany()
    }

    async find(id: number): Promise<CompanyPositionsEntity> {
        this.checkAuthorization()

        return await this.repository.findOneOrFail({
            join: { alias: 'cp', innerJoin: { company: 'cp.company' } },
            where: Object.assign(
                { 'cp.user_id': this.session.userId, id: id },
                this.session.currentCompany
                    ? { 'company.id': this.session.currentCompany }
                    : {}
            )
        })
    }

    async save(body: { name: string, company: number }): Promise<CompanyPositionsEntity> {
        this.checkAuthorization()

        const company = await getCustomRepository(CompaniesRepository).find(
            body.company || this.session.currentCompany
        )

        const entity = this.repository.create({
            ...body,
            ...{ company }
        });

        return await this.repository.save(entity)
    }

    async update(id: number, body: Partial<CompanyPositionsEntity>): Promise<CompanyPositionsEntity> {
        this.checkAuthorization()

        await this.find(id)

        await this.repository.update({ id: id }, new CompanyPositionsEntity(body))

        return await this.find(id)
    }

    async delete(id: number): Promise<boolean> {
        this.checkAuthorization()

        await this.find(id)

        return (await this.repository.softDelete({ id: id })).affected == 1
    }

    builder(): Builder {
        return this.filter(
            this.manager.createQueryBuilder(CompanyPositionsEntity, 'cp')
                .innerJoin(CompaniesEntity, 'c', 'c.id = cp.company_id')
                .where({
                    'cp.deletedAt': null,
                    'c.deletedAt': null
                })
        )
    }

    private filter(builder: Builder): Builder {

        if (this.session.userId) {
            builder.andWhere('c.user_id = :userId', { userId: this.session.sessionId })
        }

        if (this.session.currentCompany) {
            builder.andWhere('c.id = :companyId', { companyId: this.session.currentCompany })
        }

        return builder
    }
}
