import { GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import { District as DistrictType } from '../types'
import { Districts as DistrictsRepository } from '../../repositories'

export default {
    listDistricts: {
        type: new GraphQLList(DistrictType),
        args: {
            province: { type: GraphQLInt }
        },
        description: 'Lista de Distritos',
        resolve(_: any, { province }: { province: number }) {
            const repository = getCustomRepository(DistrictsRepository)
            return !province ? repository.all() : repository.findByProvinces(province)
        },
    },
    findDistrict: {
        type: DistrictType,
        description: 'Busca un Distrito',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) }
        },
        resolve(_: any, { id }: { id: number }) {
            return getCustomRepository(DistrictsRepository).find(id)
        },
    },
    findDistrictByUbigeo: {
        type: DistrictType,
        description: 'Busca un Distrito mediante el ubigeo',
        args: {
            ubigeo: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(_: any, { ubigeo }: { ubigeo: string }) {
            return getCustomRepository(DistrictsRepository).findByUbigeoCode(ubigeo)
        },
    },
}
