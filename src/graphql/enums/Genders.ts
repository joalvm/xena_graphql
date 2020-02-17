import { GraphQLEnumType } from 'graphql'

const GenderEnum = new GraphQLEnumType({
  name: 'Gender',
  values: {
    FEMALE: { value: 'FEMENINO' },
    MALE: { value: 'MASCULINO' }
  }
})

export default GenderEnum
