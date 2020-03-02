import { EntityRepository, SelectQueryBuilder } from 'typeorm-plus';
import { Persons as PersonsEntity } from '../entities/Persons';
import { Employees as EmployeesEntity } from '../entities/Employees'
import { Companies as CompaniesEntity } from '../entities/Companies';
import { Users as UsersEntity } from '../entities/Users';
import Repository from './Repository';
import { NotFound } from '../exceptions';
import { Pagination, Ordering } from '../interfaces';
import { isEmpty } from 'lodash';

type Builder = SelectQueryBuilder<EmployeesEntity>;

interface Options {
    filter: object,
    search: string,
    paginate: Pagination,
    ordering: Ordering[]
}

@EntityRepository(EmployeesEntity)
export default class Employees extends Repository<EmployeesEntity> {
    private filters = {}
    private search = ""
    private paginate: Pagination = { offset: 1, limit: 10 }
    private ordering: Ordering[] = []

    constructor () {
        super()
    }

    async all(args: Options) {
        this.checkAuthorization()

        this.filters = args.filter
        this.search = args.search
        this.paginate = args.paginate
        // this.ordering = args.ordering

        const data = await this.builder().getManyAndCount()

        return {
            edges: data[0],
            pageInfo: {
                totalCount: data[1],
                lastPage: Math.ceil(data[1] / this.paginate.limit)
            }
        }
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

        builder.andWhere('u.id = :userId', { userId: this.session.userId })

        if (this.session.currentCompany) {
            builder.andWhere('c.id = :companyId', {companyId: this.session.currentCompany})
        }

        if (!isEmpty(this.search)) {
            builder.andWhere(
                'lower(p.name||\' \'||p.lastname|| \' \' ||p.document_number|| \' \' ||e.code) like lower(:search)',
                {search: `%${this.search}%`}
            )
        }

        this.initPaginate(builder)

        return builder;
    }

    private initPaginate(builder: Builder) {
        const offset = this.paginate.offset < 1 ? 1 : this.paginate.offset

        builder.paginate(offset, this.paginate.limit || 10)
    }
}
