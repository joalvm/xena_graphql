import { GraphQLNonNull, GraphQLResolveInfo, GraphQLInt, GraphQLBoolean } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import { Authentication } from '../../interfaces'
import { CompanyPosition as CompanyPositionType } from '../types'
import { CompanyPosition as CompanyPositionInput } from '../inputs'
import { CompanyPositions as CompanyPositionRepository } from '../../repositories'

export default {
    newCompanyPosition: {
        type: CompanyPositionType,
        description: 'Crear un nuevo centro de costos',
        args: {
            body: {
                type: new GraphQLNonNull(CompanyPositionInput())
            }
        },
        async resolve(_: any, args: any, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(CompanyPositionRepository)

            repository.setAuth(session, info.fieldName)

            return await repository.save(args.body)
        }
    },
    editCompanyPosition: {
        type: CompanyPositionType,
        description: 'Editar un centro de costos',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
            body: { type: new GraphQLNonNull(CompanyPositionInput(false)) }
        },
        async resolve(_: any, args: any, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(CompanyPositionRepository)

            repository.setAuth(session, info.fieldName)

            return await repository.update(args.id, args.body)
        }
    },
    deleteCompanyPosition: {
        type: GraphQLBoolean,
        description: 'Eliminar un centro de costos',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) }
        },
        async resolve(_: any, args: any, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(CompanyPositionRepository)

            repository.setAuth(session, info.fieldName)

            return await repository.delete(args.id)
        }
    }
}
