import { GraphQLNonNull, GraphQLResolveInfo, GraphQLInt, GraphQLBoolean } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import { Authentication } from '../../interfaces'
import { OrganizationalUnit as OrganizationalUnitType } from '../types'
import { OrganizationalUnit as OrganizationalUnitInput } from '../inputs'
import { OrganizationalUnits as OrganizationalUnitRepository } from '../../repositories'

export default {
    newOrganizationalUnit: {
        type: OrganizationalUnitType,
        description: 'Crear una nueva Unidad Organizativa',
        args: {
            body: {
                type: new GraphQLNonNull(OrganizationalUnitInput())
            }
        },
        async resolve(_: any, args: any, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(OrganizationalUnitRepository)

            repository.setAuth(session, info.fieldName)

            return await repository.save(args.body)
        }
    },
    editOrganizationalUnit: {
        type: OrganizationalUnitType,
        description: 'Editar una unidad organizativa',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
            body: { type: new GraphQLNonNull(OrganizationalUnitInput(false)) }
        },
        async resolve(_: any, args: any, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(OrganizationalUnitRepository)

            repository.setAuth(session, info.fieldName)

            return await repository.update(args.id, args.body)
        }
    },
    deleteOrganizationalUnit: {
        type: GraphQLBoolean,
        description: 'Eliminar una unidad organizativa',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) }
        },
        async resolve(_: any, args: any, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(OrganizationalUnitRepository)

            repository.setAuth(session, info.fieldName)

            return await repository.delete(args.id)
        }
    }
}
