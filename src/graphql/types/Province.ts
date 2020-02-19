import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLNonNull, GraphQLList } from 'graphql'
import { resolveMeta } from '../../helpers'
import DepartmentType from './Department'
import DistrictType from './District'
import { getCustomRepository } from 'typeorm-plus'
import {
    Departments as DepartmentsRepository,
    Provinces as ProvincesRepository
} from '../../repositories'

import dataloader from 'dataloader'
import {groupBy, map} from 'lodash'

const departmentsDL = new dataloader(
    async (keys) => {
        const departmentIds: number[] = Object.assign([], keys);

        return await getCustomRepository(DepartmentsRepository)
            .findByIds(departmentIds)
    }
)

export default new GraphQLObjectType({
    name: 'Province',
    description: 'Provincias del Perú',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        code: { type: GraphQLString },
        department: {
            type: DepartmentType,
            async resolve({departmentId}:{departmentId: number}) {
                return await departmentsDL.load(departmentId)
            }
        },
        districts: {
            type: new GraphQLList(DistrictType),
            resolve() {

            }
        },
        createdAt: { type: GraphQLString, resolve: resolveMeta('createdAt') },
        updatedAt: { type: GraphQLString, resolve: resolveMeta('updatedAt') },
    }),
})
