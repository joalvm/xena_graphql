import { GraphQLInputObjectType, GraphQLInt, GraphQLString } from "graphql";
import { MaritalStatus, Gender } from "../enums";

export default new GraphQLInputObjectType({
    name: 'PersonFilterInput',
    fields: () => ({
        maritalStatus: { type: MaritalStatus },
        gender: { type: Gender },
        documentTypeId: { type: GraphQLInt },
        documentNumber: { type: GraphQLString }
    }),
})
