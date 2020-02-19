import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql'
import { resolveMeta } from '../../helpers'
import { Province as ProvinceType } from '../types'
import { getCustomRepository } from 'typeorm-plus'
import { Provinces as ProvincesRepository } from '../../repositories'
import dataloader from 'dataloader'
import {groupBy, map} from 'lodash'
import { Provinces as ProvincesEntity } from '../../entities/Provinces'

const ProvincesDL = new dataloader(
    async (keys) => {
        const departmentIds: number[] = Object.assign([], keys);

        const data = await getCustomRepository(ProvincesRepository)
            .findByDepartment(departmentIds)

        const group = groupBy(data, (item: ProvincesEntity)  => item.departmentId)

        return map(departmentIds, (departmentId: number) => group[departmentId]);
    }
)

const type: GraphQLObjectType = new GraphQLObjectType({
  name: 'Department',
  description: 'Departamentos del Perú',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    code: { type: GraphQLString },
    provinces: {
      type: new GraphQLList(ProvinceType),
      async resolve({ id }: { id: number }) {
        return await ProvincesDL.load(id)
      },
    },
    createdAt: { type: GraphQLString, resolve: resolveMeta('createdAt') },
    updatedAt: { type: GraphQLString, resolve: resolveMeta('updatedAt') },
  }),
})

export default type
