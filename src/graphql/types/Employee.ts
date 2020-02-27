import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import { resolveMeta } from '../../helpers'
import NodeInterface from '../interfaces/Node'
import CompanyPositionType from './CompanyPosition'
import StaffAreaType from './StaffArea'
import CostCenterType from './CostCenter'
import StaffDivisionType from './StaffDivision'
import OrganizationalUnitType from './OrganizationalUnit'
import dataloader from 'dataloader'
import {CompanyPositions as CompanyPositionsRepository} from '../../repositories'

const companyPositionDL = new dataloader(
    async (keys) => {
        const companyPositionIds: number[] = Object.assign([], keys);

        return await getCustomRepository(CompanyPositionsRepository)
            .builder()
            .whereInIds(companyPositionIds)
            .getMany()
    }
)

const type: GraphQLObjectType = new GraphQLObjectType({
    name: 'Employee',
    description: 'Empleados registrados',
    fields: () => ({
        id: { type: GraphQLInt },
        dateEntry: { type: GraphQLString },
        email: { type: GraphQLString },
        companyPosition: {
            type: CompanyPositionType,
            async resolve(root: any) {
                if (root.companyPosition) {
                    return await companyPositionDL.load(root.companyPosition)
                }
            }
        },
        estaffArea: {
            type: StaffAreaType
        },
        costCenter: { type: CostCenterType },
        staffDivision: { type: StaffDivisionType },
        organizationalUnit: { type: OrganizationalUnitType },
        epsAffiliate: { type: GraphQLBoolean },
        epsPlan: { type: GraphQLString },
        epsOption: { type: GraphQLString },
        affiliated: { type: GraphQLBoolean },
        sctrAffiliate: { type: GraphQLBoolean },
        evAffiliate: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString, resolve: resolveMeta('createdAt') },
        updatedAt: { type: GraphQLString, resolve: resolveMeta('updatedAt') },
    }),
    interfaces: [NodeInterface]
})

export default type
