import { GraphQLList, GraphQLInt, GraphQLNonNull } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import { Province as ProvinceType } from '../types'

export default {
    listProvinces: {
        type: new GraphQLList(ProvinceType),
        args: {
            department: { type: GraphQLInt }
        },
        description: 'Lista de Provincias',
        resolve() {
            return []
        },
    },
    findProvince: {
        type: ProvinceType,
        description: 'Busca una Provincia',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve(_: any, { id }: { id: number }) {
            return null
        },
    },
}
