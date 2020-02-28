import { GraphQLList, GraphQLResolveInfo, GraphQLInt } from 'graphql';
import { getCustomRepository } from 'typeorm-plus';
import { Employee as EmployeeType } from '../types';
import {Employees as EmployeesRepository} from '../../repositories';

export default {
    listEmployees: {
        type: new GraphQLList(EmployeeType),
        description: 'Todos los empleados',
        resolve(_: any, _args: any, ctx: any, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(EmployeesRepository)

            repository.setAuth(ctx.session, info.fieldName)

            return repository.all()
        }
    },
    findEmployee: {
        type: EmployeeType,
        description: 'Buscar un empleado',
        args: {
            id: { type: GraphQLInt }
        },
        resolve(_: any, args: any, ctx: any, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(EmployeesRepository)

            repository.setAuth(ctx.session, info.fieldName)

            return repository.find(args.id)
        }
    }
}
