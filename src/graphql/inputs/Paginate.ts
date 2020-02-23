import { GraphQLInputObjectType, GraphQLInt } from "graphql";

export default new GraphQLInputObjectType({
    name: 'PaginateInput',
    fields: () => ({
        limit: { type: GraphQLInt, defaultValue: 10 },
        offset: { type: GraphQLInt, defaultValue: 0 }
    }),
})
