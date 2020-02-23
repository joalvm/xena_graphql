import { GraphQLInterfaceType, GraphQLInt, GraphQLString } from "graphql";

export default new GraphQLInterfaceType({
    name: 'Node',
    fields: () => ({
        id: { type: GraphQLInt },
        createdAt: {type: GraphQLString },
        updatedAt: { type: GraphQLString }
    })
});
