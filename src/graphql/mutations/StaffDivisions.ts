import { GraphQLNonNull, GraphQLResolveInfo, GraphQLInt, GraphQLBoolean } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import { Authentication } from '../../interfaces'
import { StaffDivision as StaffDivisionType } from '../types'
import { StaffDivision as StaffDivisionInput } from '../inputs'
import { StaffDivisions as StaffDivisionRepository } from '../../repositories'

export default {
    newStaffDivision: {
        type: StaffDivisionType,
        description: 'Crear una nueva Division del personal',
        args: {
            body: {
                type: new GraphQLNonNull(StaffDivisionInput())
            }
        },
        async resolve(_: any, args: any, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(StaffDivisionRepository)

            repository.setAuth(session, info.fieldName)

            return await repository.save(args.body)
        }
    },
    editStaffDivision: {
        type: StaffDivisionType,
        description: 'Editar una nueva Division de personal',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
            body: { type: new GraphQLNonNull(StaffDivisionInput(false)) }
        },
        async resolve(_: any, args: any, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(StaffDivisionRepository)

            repository.setAuth(session, info.fieldName)

            return await repository.update(args.id, args.body)
        }
    },
    deleteStaffDivision: {
        type: GraphQLBoolean,
        description: 'Eliminar una division de personal',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) }
        },
        async resolve(_: any, args: any, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(StaffDivisionRepository)

            repository.setAuth(session, info.fieldName)

            return await repository.delete(args.id)
        }
    }
}
