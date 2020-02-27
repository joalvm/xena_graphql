import { GraphQLNonNull, GraphQLString, GraphQLInputObjectType } from 'graphql';

export default function (isSave = true) {
    const name = isSave ? 'New' : 'Edit';

    return new GraphQLInputObjectType({
        name: `${name}OrganizationalUnitInput`,
        fields: () => ({
            name: {
                type: isSave
                    ? new GraphQLNonNull(GraphQLString)
                    : GraphQLString
            }
        })
    })
}
