import { GraphQLNonNull, GraphQLString, GraphQLInputObjectType } from 'graphql';

export default function (isSave = true) {
    const name = isSave ? 'New' : 'Edit';

    return new GraphQLInputObjectType({
        name: `${name}CostCenterInput`,
        fields: () => ({
            code: { type: isSave ? new GraphQLNonNull(GraphQLString) : GraphQLString },
            name: { type: isSave ? new GraphQLNonNull(GraphQLString) : GraphQLString }
        })
    })
}
