import { GraphQLInputObjectType, GraphQLString, GraphQLBoolean, GraphQLNonNull } from 'graphql'
import GenderEnum from '../enums/Genders'

export default function(isSave = true) {
  const preffix = isSave ? 'new' : 'edit'

  return new GraphQLInputObjectType({
    name: `${preffix}UserInput`,
    fields: () => ({
      name: { type: isSave ? new GraphQLNonNull(GraphQLString) : GraphQLString },
      lastname: { type: isSave ? new GraphQLNonNull(GraphQLString) : GraphQLString },
      gender: { type: isSave ? new GraphQLNonNull(GenderEnum) : GenderEnum },
      email: { type: isSave ? new GraphQLNonNull(GraphQLString) : GraphQLString },
      avatarUrl: { type: GraphQLString },
      username: { type: isSave ? new GraphQLNonNull(GraphQLString) : GraphQLString },
      password: { type: GraphQLString },
      enabled: { type: GraphQLBoolean },
    }),
  })
}
