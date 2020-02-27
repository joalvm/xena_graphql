import { GraphQLList, GraphQLResolveInfo, GraphQLNonNull, GraphQLInt } from 'graphql';
import { StaffArea as StaffAreaType } from '../types';
import { getCustomRepository } from 'typeorm-plus';
import { StaffAreas as StaffAreaRepository } from '../../repositories';
import { Authentication } from '../../interfaces';

export default {
    listStaffAreas: {
        type: new GraphQLList(StaffAreaType),
        description: 'Lista todas las areas del personal',
        async resolve(_: any, args: any, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(StaffAreaRepository)
            repository.setAuth(session, info.fieldName)

            return repository.all()
        }
    },
    findStaffArea: {
        type: StaffAreaType,
        description: 'Busca un area del personal',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) }
        },
        async resolve(_: any, { id }: { id: number }, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(StaffAreaRepository)
            repository.setAuth(session, info.fieldName)
            return repository.find(id)
        }
    }
}
