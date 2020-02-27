import { GraphQLList, GraphQLResolveInfo, GraphQLNonNull, GraphQLInt } from 'graphql';
import { StaffDivision as StaffDivisionType } from '../types';
import { getCustomRepository } from 'typeorm-plus';
import { StaffDivisions as StaffDivisionRepository } from '../../repositories';
import { Authentication } from '../../interfaces';

export default {
    listStaffDivisions: {
        type: new GraphQLList(StaffDivisionType),
        description: 'Lista todas las divisiones del personal',
        async resolve(_: any, args: any, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(StaffDivisionRepository)
            repository.setAuth(session, info.fieldName)

            return repository.all()
        }
    },
    findStaffDivision: {
        type: StaffDivisionType,
        description: 'Busca una division de personal',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) }
        },
        async resolve(_: any, { id }: { id: number }, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(StaffDivisionRepository)
            repository.setAuth(session, info.fieldName)
            return repository.find(id)
        }
    }
}
