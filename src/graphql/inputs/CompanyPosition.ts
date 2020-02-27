import { GraphQLNonNull, GraphQLString, GraphQLInputObjectType, GraphQLInt } from 'graphql';

export default function (isSave = true) {
    const name = isSave ? 'New' : 'Edit';

    return new GraphQLInputObjectType({
        name: `${name}CompanyPositionInput`,
        fields: () => ({
            name: { type: isSave ? new GraphQLNonNull(GraphQLString) : GraphQLString },
            company: { type: isSave ? new GraphQLNonNull(GraphQLInt) : GraphQLInt },
        })
    })
}
