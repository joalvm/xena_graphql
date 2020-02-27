import { GraphQLList, GraphQLResolveInfo, GraphQLNonNull, GraphQLInt } from 'graphql';
import { CompanyPosition as CompanyPositionType } from '../types';
import { getCustomRepository } from 'typeorm-plus';
import { CompanyPositions as CompanyPositionRepository } from '../../repositories';
import { Authentication } from '../../interfaces';

export default {
    listCompanyPositions: {
        type: new GraphQLList(CompanyPositionType),
        description: 'Lista todas las posiciones de la empresa',
        async resolve(_: any, args: any, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(CompanyPositionRepository)
            repository.setAuth(session, info.fieldName)

            return await repository.all()
        }
    },
    findCompanyPosition: {
        type: CompanyPositionType,
        description: 'Busca una posicion en la empresa',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) }
        },
        async resolve(_: any, { id }: { id: number }, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(CompanyPositionRepository)
            repository.setAuth(session, info.fieldName)

            return await repository.find(id)
        }
    }
}
