import { Person as PersonType } from "../types"
import { GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLInputObjectType, GraphQLResolveInfo } from "graphql"
import { getCustomRepository } from "typeorm-plus"
import { Persons as PersonsRepository } from "../../repositories"
import { MaritalStatus, Gender } from "../enums"
import {
    MaritalStatus as MaritalStatusEnum,
    Genders as GendersEnum
} from "../../enums"

interface PersonFilters {
    maritalStatus?: keyof typeof MaritalStatusEnum
    genders?: keyof typeof GendersEnum
    documentTypeId?: number
}

export default {
    listPersons: {
        type: new GraphQLList(PersonType),
        description: 'Lista general de personas',
        args: {
            filters: {
                type: new GraphQLInputObjectType({
                    name: 'PersonFilterInput',
                    fields: () => ({
                        maritalStatus: { type: MaritalStatus },
                        gender: { type: Gender },
                        documentTypeId: { type: GraphQLInt }
                    }),
                })
            }
        },
        resolve(_: any, args: any, ctx: any, info: GraphQLResolveInfo) {
            const filters: PersonFilters = args.filters
            const repository = getCustomRepository(PersonsRepository)

            repository.setAuth(ctx.session, info.fieldName)

            return repository.all(filters)
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
