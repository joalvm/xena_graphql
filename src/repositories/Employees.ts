import Repository from './Repository';
import {Employees as EmployeesEntity} from '../entities/Employees'
import { Persons as PersonsEntity } from '../entities/Persons';
import { EntityRepository, SelectQueryBuilder } from 'typeorm-plus';

type SelectEmployee = SelectQueryBuilder<EmployeesEntity>;

@EntityRepository(EmployeesEntity)
export default class Employees extends Repository<EmployeesEntity> {
    constructor() {
        super()
    }

    async all(): Promise<EmployeesEntity[]> {
        this.checkAuthorization()

        return await this.builder().getMany()
    }

    builder(): SelectEmployee {
        return this.filter(
            this.manager
                .createQueryBuilder(EmployeesEntity, 'e')
                .innerJoin(PersonsEntity, 'p', 'p.id = e.person_id')
        )
    }

    filter(builder: SelectEmployee): SelectEmployee {
        builder.where('p.deleted_at IS NULL')

        if (this.session.userId) {
            builder.andWhere('p.user_id = :user_id', {user_id: this.session.userId})
        }

        return builder;
    }
}
