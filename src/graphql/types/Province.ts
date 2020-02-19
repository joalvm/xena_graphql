import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import { resolveMeta } from '../../helpers'
import DepartmentType from './Department'
import DistrictType from './District'
import dataloader from 'dataloader'
import { groupBy, map } from 'lodash'
import { Districts as DistrictsEntity } from '../../entities/Districts'
import {
    Departments as DepartmentsRepository,
    Districts as DistrictsRepository
} from '../../repositories'

const departmentsDL = new dataloader(
    async (keys) => {
        const departmentIds: number[] = Object.assign([], keys);

        return await getCustomRepository(DepartmentsRepository)
            .findByIds(departmentIds)
    }
)

const DistrictsDL = new dataloader(
    async (keys) => {
        const provinceIds: number[] = Object.assign([], keys);

        const data = await getCustomRepository(DistrictsRepository)
            .findByProvinces(provinceIds)

        const group = groupBy(data, (item: DistrictsEntity) => item.provinceId)

        return map(provinceIds, (departmentId: number) => group[departmentId]);
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
            async resolve(source) {
                return await departmentsDL.load(source.departmentId)
            }
        },
        districts: {
            type: new GraphQLList(DistrictType),
            async resolve({ id }: { id: number }) {
                return await DistrictsDL.load(id)
            }
        },
        createdAt: { type: GraphQLString, resolve: resolveMeta('createdAt') },
        updatedAt: { type: GraphQLString, resolve: resolveMeta('updatedAt') },
    }),
})
