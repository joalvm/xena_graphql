import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean } from 'graphql'
import { resolveMeta } from '../../helpers'
import ProvinceType from './Province'
import dataloader from 'dataloader'
import { groupBy, map } from 'lodash'
import { getCustomRepository } from 'typeorm-plus'
import { Provinces as provincesRepository } from '../../repositories'

const provincesDL = new dataloader(
    async (keys) => {
        const provinceIds: number[] = Object.assign([], keys);

        return await getCustomRepository(provincesRepository)
            .findByIds(provinceIds)
    }
)

const type: GraphQLObjectType = new GraphQLObjectType({
    name: 'District',
    description: 'Provincias del Perú',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        code: { type: GraphQLString },
        province: {
            type: ProvinceType,
            resolve(source) {
                return provincesDL.load(source.provinceId)
            }
        },
        createdAt: { type: GraphQLString, resolve: resolveMeta('createdAt') },
        updatedAt: { type: GraphQLString, resolve: resolveMeta('updatedAt') },
    }),
})

export default type
