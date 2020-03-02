import { GraphQLList, GraphQLResolveInfo, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { getCustomRepository } from 'typeorm-plus';
import { Employees as EmployeesRepository} from '../../repositories';
import {
    Employee as EmployeeType,
    PageInfo as PageInfoType,
    Person as PersonType
} from '../types';
import {
    Paginate as PaginateInput,
    Ordering as OrderingInput,
    EmployeeFilter as EmployeeFilterInput
} from '../inputs'


export default {
    listEmployees: {
        type: new GraphQLObjectType({
            name: 'EmployeePaginationType',
            fields: {
                edges: { type: new GraphQLList(EmployeeType) },
                pageInfo: { type: PageInfoType }
            },
        }),
        description: 'Todos los empleados',
        args: {
            filter: { type: EmployeeFilterInput },
            search: { type: GraphQLString },
            paginate: { type: new GraphQLNonNull(PaginateInput) },
            ordering: { type: new GraphQLList(OrderingInput(EmployeeType, [], [PersonType])) },
        },
        resolve(_: any, args: any, ctx: any, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(EmployeesRepository)

            repository.setAuth(ctx.session, info.fieldName)

            return repository.all(args)
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
