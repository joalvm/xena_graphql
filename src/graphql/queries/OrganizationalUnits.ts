import { GraphQLList, GraphQLResolveInfo, GraphQLNonNull, GraphQLInt } from 'graphql';
import { OrganizationalUnit as OrganizationalUnitType } from '../types';
import { getCustomRepository } from 'typeorm-plus';
import { OrganizationalUnits as OrganizationalUnitRepository } from '../../repositories';
import { Authentication } from '../../interfaces';

export default {
    listOrganizationalUnits: {
        type: new GraphQLList(OrganizationalUnitType),
        description: 'Lista todas las unidades organizativas',
        async resolve(_: any, args: any, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(OrganizationalUnitRepository)
            repository.setAuth(session, info.fieldName)

            return repository.all()
        }
    },
    findOrganizationalUnit: {
        type: OrganizationalUnitType,
        description: 'Busca una unidad organizativa',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) }
        },
        async resolve(_: any, { id }: { id: number }, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(OrganizationalUnitRepository)
            repository.setAuth(session, info.fieldName)
            return repository.find(id)
        }
    }
}
