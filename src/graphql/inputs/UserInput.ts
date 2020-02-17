import { GraphQLInputObjectType, GraphQLString } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'UserInput',
  fields: () => ({
    username: { type: GraphQLString },
    password: { type: GraphQLString }
  })
})
