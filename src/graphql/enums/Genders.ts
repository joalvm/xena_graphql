import { GraphQLEnumType } from 'graphql'

const GenderEnum = new GraphQLEnumType({
  name: 'Gender',
  values: {
    FEMALE: { value: 'f' },
    MALE: { value: 'm' }
  }
})

export default GenderEnum
