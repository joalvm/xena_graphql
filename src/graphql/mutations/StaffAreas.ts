import { StaffArea as StaffAreaType } from '../types'
import { GraphQLNonNull, GraphQLResolveInfo, GraphQLInt } from 'graphql'
import { Authentication } from '../../interfaces'
import { getCustomRepository } from 'typeorm-plus'
import { StaffArea as StaffAreaInput } from '../inputs'
import { StaffAreas as StaffAreaRepository } from '../../repositories'

export default {
    newStaffArea: {
        type: StaffAreaType,
        description: 'Crear un nuevo Area del personal',
        args: {
            body: {
                type: new GraphQLNonNull(StaffAreaInput())
            }
        },
        async resolve(_: any, args: any, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(StaffAreaRepository)

            repository.setAuth(session, info.fieldName)

            return await repository.save(args.body)
        }
    },
    editStaffArea: {
        type: StaffAreaType,
        description: 'Editar un nuevo Area del personal',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
            body: { type: new GraphQLNonNull(StaffAreaInput(false)) }
        },
        async resolve(_: any, args: any, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(StaffAreaRepository)

            repository.setAuth(session, info.fieldName)

            return await repository.update(args.id, args.body)
        }
    }
}
