import { GraphQLList, GraphQLResolveInfo, GraphQLNonNull, GraphQLInt } from 'graphql';
import { CostCenter as CostCenterType } from '../types';
import { getCustomRepository } from 'typeorm-plus';
import { CostCenters as CostCenterRepository } from '../../repositories';
import { Authentication } from '../../interfaces';

export default {
    listCostCenters: {
        type: new GraphQLList(CostCenterType),
        description: 'Lista todas los centros de costos',
        async resolve(_: any, args: any, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(CostCenterRepository)
            repository.setAuth(session, info.fieldName)

            return repository.all()
        }
    },
    findCostCenter: {
        type: CostCenterType,
        description: 'Busca un centro de costo',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) }
        },
        async resolve(_: any, { id }: { id: number }, { session }: { session: Authentication }, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(CostCenterRepository)
            repository.setAuth(session, info.fieldName)
            return repository.find(id)
        }
    }
}
