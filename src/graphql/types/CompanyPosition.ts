import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
import { resolveMeta } from '../../helpers';
import Company from './Company';

export default new GraphQLObjectType({
    name: 'CompanyPosition',
    description: 'Posiciones en la Empresa',
    fields: () => ({
        id: { type: GraphQLInt },
        company: { type: Company },
        name: { type: GraphQLString },
        createdAt: { type: GraphQLString, resolve: resolveMeta('createdAt') },
        updatedAt: { type: GraphQLString, resolve: resolveMeta('updatedAt') },
    })
})
