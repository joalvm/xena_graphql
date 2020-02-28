import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLResolveInfo } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import { resolveMeta } from '../../helpers'
import NodeInterface from '../interfaces/Node'
import CompanyPositionType from './CompanyPosition'
import StaffAreaType from './StaffArea'
import CostCenterType from './CostCenter'
import StaffDivisionType from './StaffDivision'
import OrganizationalUnitType from './OrganizationalUnit'
import dataloader from 'dataloader'
import PersonType from './Person'
import {
    CompanyPositions as CompanyPositionsRepository,
    StaffAreas as StaffAreasRepository,
    CostCenters as CostCentersRepository,
    OrganizationalUnits as OrganizationalUnitsRepository,
    Persons as PersonsRepository
} from '../../repositories'
import { Authentication } from '../../interfaces'


const companyPositionDL = new dataloader(
    async (keys) => {
        const companyPositionIds: number[] = Object.assign([], keys);
        const repository = getCustomRepository(CompanyPositionsRepository);

        return await repository.builder().whereInIds(companyPositionIds).getMany()
    }
)

const staffAreaDL = new dataloader(
    async (keys) => {
        const ids: number[] = Object.assign([], keys);
        const repository = getCustomRepository(StaffAreasRepository);

        return await repository.builder().whereInIds(ids).getMany()
    }
)

const costCenterDL = new dataloader(
    async (keys) => {
        const ids: number[] = Object.assign([], keys);
        const repository = getCustomRepository(CostCentersRepository);

        return await repository.builder().whereInIds(ids).getMany()
    }
)

const staffDivisionDL = new dataloader(
    async (keys) => {
        const ids: number[] = Object.assign([], keys);
        const repository = getCustomRepository(CostCentersRepository);

        return await repository.builder().whereInIds(ids).getMany()
    }
)

const organizationalUnitDL = new dataloader(
    async (keys) => {
        const ids: number[] = Object.assign([], keys);
        const repository = getCustomRepository(OrganizationalUnitsRepository);

        return await repository.builder().whereInIds(ids).getMany()
    }
)

const personDL = (session: Authentication, fieldName: string) => {
    console.log(fieldName)
    return new dataloader(
        async (keys) => {
            const companyPositionIds: number[] = Object.assign([], keys);
            const repository = getCustomRepository(PersonsRepository);

            repository.setAuth(session, fieldName)

            return await repository.builder().andWhereInIds(companyPositionIds).getMany()
        }
    )
}

const type: GraphQLObjectType = new GraphQLObjectType({
    name: 'Employee',
    description: 'Empleados registrados',
    fields: () => ({
        id: { type: GraphQLInt },
        person: {
            type: PersonType,
            async resolve(root: any, args:any, {session}:{session: Authentication}, info: GraphQLResolveInfo) {
                if (root.personId) {
                    return await personDL(session, info.fieldName).load(root.personId)
                }
            }
        },
        dateEntry: {
            type: GraphQLString,
            description: 'Fecha de Ingreso'
        },
        email: {
            type: GraphQLString,
            description: 'Correo Electronico Empresarial'
        },
        companyPosition: {
            type: CompanyPositionType,
            description: 'Posición en la Compañia',
            async resolve(root: any) {
                if (root.companyPosition) {
                    return await companyPositionDL.load(root.companyPosition)
                }
            }
        },
        staffArea: {
            type: StaffAreaType,
            description: 'Area del Personal',
            async resolve(root: any) {
                if (root.staffArea) {
                    return await staffAreaDL.load(root.staffArea)
                }
            }
        },
        costCenter: {
            type: CostCenterType,
            description: 'Centro de Costos',
            async resolve(root: any) {
                if (root.costCenter) {
                    return await costCenterDL.load(root.costCenter)
                }
            }
        },
        staffDivision: {
            type: StaffDivisionType,
            description: 'División de Personal',
            async resolve(root: any) {
                if (root.staffDivision) {
                    return await staffDivisionDL.load(root.staffDivision)
                }
            }
        },
        organizationalUnit: {
            type: OrganizationalUnitType,
            description: 'Unidad Organizativa',
            async resolve(root: any) {
                if (root.staffDivision) {
                    return await organizationalUnitDL.load(root.organizationalUnit)
                }
            }
        },
        epsAffiliate: {
            type: GraphQLBoolean,
            description: 'Afiliación a una EPS'
        },
        epsPlan: {
            type: GraphQLString,
            description: 'Plan EPS'
        },
        epsOption: {
            type: GraphQLString,
            description: 'Opciones del Plan EPS'
        },
        affiliated: {
            type: GraphQLBoolean,
            description: 'Sindicalizado'
        },
        sctrAffiliate: {
            type: GraphQLBoolean,
            description: 'Afiliado al Seguro Complementario de Trabajo de Riesgo'
        },
        evAffiliate: {
            type: GraphQLBoolean,
            description: 'Afiliado a EsSalud Vidad'
        },
        createdAt: { type: GraphQLString, resolve: resolveMeta('createdAt') },
        updatedAt: { type: GraphQLString, resolve: resolveMeta('updatedAt') },
    }),
    interfaces: [NodeInterface]
})

export default type
