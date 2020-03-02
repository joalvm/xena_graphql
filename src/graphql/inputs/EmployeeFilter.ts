import { GraphQLInputObjectType, GraphQLInt, GraphQLString } from "graphql";
import { MaritalStatus, Gender } from "../enums";

export default new GraphQLInputObjectType({
    name: 'EmployeeFilterInput',
    fields: () => ({
        name: { type: GraphQLString },
        lastname: { type: GraphQLString },
        fullname: { type: GraphQLString },
        code: { type: GraphQLString },
        maritalStatus: { type: MaritalStatus },
        gender: { type: Gender },
        documentTypeId: { type: GraphQLInt },
        documentNumber: { type: GraphQLString }
    }),
})
