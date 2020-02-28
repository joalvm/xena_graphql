import { EntityRepository, SelectQueryBuilder } from 'typeorm-plus';
import { Persons as PersonsEntity } from '../entities/Persons';
import { Employees as EmployeesEntity } from '../entities/Employees'
import { Companies as CompaniesEntity } from '../entities/Companies';
import { Users as UsersEntity } from '../entities/Users';
import Repository from './Repository';
import { NotFound } from '../exceptions';

type Builder = SelectQueryBuilder<EmployeesEntity>;

@EntityRepository(EmployeesEntity)
export default class Employees extends Repository<EmployeesEntity> {
    constructor () {
        super()
    }

    async all(): Promise<EmployeesEntity[]> {
        this.checkAuthorization()

        return await this.builder().getMany()
    }

    async find(id: number): Promise<EmployeesEntity> {
        this.checkAuthorization()

        const entity = await this.builder().andWhere('e.id = :id', { id: id }).getOne()

        if (entity === undefined) throw new NotFound('Employee Not Found')

        return new EmployeesEntity(entity)
    }

    builder(): Builder {
        return this.filter(
            this.manager.createQueryBuilder(EmployeesEntity, 'e')
                .innerJoin(PersonsEntity, 'p', 'p.id = e.person_id')
                .innerJoin(UsersEntity, 'u', 'u.id = p.user_id')
                .innerJoin(CompaniesEntity, 'c', 'c.id = e.company_id')
        )
    }

    filter(builder: Builder): Builder {

        builder.where('p.deleted_at IS NULL')
        builder.andWhere('c.deleted_at IS NULL')

        builder.andWhere('u.id = :userId', {
            userId: this.session.userId
        })

        if (this.session.currentCompany) {
            builder.andWhere('c.id = :companyId', {
                companyId: this.session.currentCompany
            })
        }

        return builder;
    }
}
