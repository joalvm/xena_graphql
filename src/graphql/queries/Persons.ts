import { Person as PersonType } from "../types"
import { GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLInputObjectType, GraphQLString } from "graphql"
import { getCustomRepository } from "typeorm-plus"
import { Persons as PersonsRepository } from "../../repositories"
import { MaritalStatus, Gender } from "../enums"
import {
    MaritalStatus as MaritalStatusEnum,
    Genders as GendersEnum
} from "../../enums"

interface PersonFilters {
    maritalStatus: keyof typeof MaritalStatusEnum
    genders: keyof typeof GendersEnum
    documentTypeId: number
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
        resolve(_:any, args: PersonFilters) {
            console.log(args.maritalStatus)
            return getCustomRepository(PersonsRepository).all()
        }
    },
    findPerson: {
        type: new GraphQLList(PersonType),
        description: 'Lista general de personas',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) }
        },
        resolve(_: any, { id }: { id: number }) {
            return getCustomRepository(PersonsRepository).find(id)
        }
    }
}
