import { GraphQLList, GraphQLInt, GraphQLNonNull } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import { Province as ProvinceType } from '../types'
import { Provinces as ProvincesRepository } from '../../repositories'

export default {
    listProvinces: {
        type: new GraphQLList(ProvinceType),
        args: {
            department: { type: GraphQLInt }
        },
        description: 'Lista de Provincias',
        resolve(_: any, { department }: { department: number }) {
            const repository = getCustomRepository(ProvincesRepository)
            return !department
                ? repository.all()
                : repository.findByDepartment([department])
        },
    },
    findProvince: {
        type: ProvinceType,
        description: 'Busca una Provincia',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve(_: any, { id }: { id: number }) {
            return getCustomRepository(ProvincesRepository).find(id)
        },
    },
}
