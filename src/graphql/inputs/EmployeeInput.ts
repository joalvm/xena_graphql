import { GraphQLNonNull, GraphQLString, GraphQLInputObjectType, GraphQLInt } from 'graphql'
import GenderEnum from '../enums/Genders'
import UserInput from './UserInput'

export default function(isSave = true) {
  const prefix: string = isSave ? 'new' : 'edit'

  return new GraphQLInputObjectType({
    name: `${prefix}EmployeeInput`,
    fields: () => ({
      name: { type: isSave ? new GraphQLNonNull(GraphQLString) : GraphQLString },
      lastname: { type: isSave ? new GraphQLNonNull(GraphQLString) : GraphQLString },
      gender: { type: isSave ? new GraphQLNonNull(GenderEnum) : GenderEnum },
      email: { type: GraphQLString },
      company: { type: isSave ? new GraphQLNonNull(GraphQLInt) : GraphQLInt },
      user: { type: UserInput }
    }),
  })
}
