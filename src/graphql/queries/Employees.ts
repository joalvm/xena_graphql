import { GraphQLList, GraphQLResolveInfo } from 'graphql';
import { Employee } from '../types';
import {Employees as EmployeesRepository} from '../../repositories';
import { getCustomRepository } from 'typeorm-plus';

export default {
    listEmployees: {
        type: new GraphQLList(Employee),
        description: 'Todos los empleados',
        resolve(_: any, _args: any, ctx: any, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(EmployeesRepository)

            repository.setAuth(ctx.session, info.fieldName)

            return repository.all()
        }
    }
}
