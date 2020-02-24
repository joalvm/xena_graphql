import { Person as PersonType } from "../types"
import { GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLResolveInfo } from "graphql"
import { getCustomRepository } from "typeorm-plus"
import { Persons as PersonsRepository } from "../../repositories"
import PersonFiltersInput from '../inputs/PersonFilter'
import PaginateInput from '../inputs/Paginate'
import OrderingInput from '../inputs/Ordering'
import { PersonFilters, Pagination, Ordering } from '../../interfaces'

export default {
    listPersons: {
        type: new GraphQLList(PersonType),
        description: 'Lista general de personas',
        args: {
            filters: { type: PersonFiltersInput},
            paginate: { type: PaginateInput },
            ordering: { type: new GraphQLList(OrderingInput(PersonType)) }
        },
        resolve(_: any, args: any, ctx: any, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(PersonsRepository)

            const filters: PersonFilters = args.filters
            const pagination: Pagination = args.paginate
            const ordering: Ordering[] = args.ordering

            repository.setAuth(ctx.session, info.fieldName)

            return repository.all(filters, pagination, ordering)
        }
    },
    findPerson: {
        type: new GraphQLList(PersonType),
        description: 'Lista general de personas',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) }
        },
        resolve(_: any, args: any, ctx: any, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(PersonsRepository)

            repository.setAuth(ctx.session, info.fieldName)

            return repository.find(args.id)
        }
    }
}
