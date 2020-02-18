import { GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import { Province as ProvinceType } from '../types'

export default {
    listDistricts: {
        type: new GraphQLList(ProvinceType),
        args: {
            department: { type: GraphQLInt },
            province: { type: GraphQLInt }
        },
        description: 'Lista de Distritos',
        resolve(_:any, {department, province}: {department: string, province: string}) {
            return []
        },
    },
    findDistrict: {
        type: ProvinceType,
        description: 'Busca un Distrito',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) }
        },
        resolve(_: any, { id }: { id: number }) {
            return null
        },
    },
    findDistrictByUbigeo: {
        type: ProvinceType,
        description: 'Busca un Distrito mediante el ubigeo',
        args: {
            ubigeo: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(_: any, { ubigeo }: { ubigeo: string }) {
            return null
        },
    },
}
