import { GraphQLNonNull, GraphQLResolveInfo, GraphQLInt, GraphQLBoolean } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import { Authentication } from '../../interfaces'
import { CostCenter as CostCenterType } from '../types'
import { CostCenter as CostCenterInput } from '../inputs'
import { CostCenters as CostCenterRepository } from '../../repositories'

export default {
    newCostCenter: {
        type: CostCenterType,
        description: 'Crear un nuevo centro de costos',
        args: {
            body: {
                type: new GraphQLNonNull(CostCenterInput())
            }
        },
        async resolve(_: any, args: any, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(CostCenterRepository)

            repository.setAuth(session, info.fieldName)

            return await repository.save(args.body)
        }
    },
    editCostCenter: {
        type: CostCenterType,
        description: 'Editar un centro de costos',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
            body: { type: new GraphQLNonNull(CostCenterInput(false)) }
        },
        async resolve(_: any, args: any, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(CostCenterRepository)

            repository.setAuth(session, info.fieldName)

            return await repository.update(args.id, args.body)
        }
    },
    deleteCostCenter: {
        type: GraphQLBoolean,
        description: 'Eliminar un centro de costos',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) }
        },
        async resolve(_: any, args: any, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(CostCenterRepository)

            repository.setAuth(session, info.fieldName)

            return await repository.delete(args.id)
        }
    }
}
