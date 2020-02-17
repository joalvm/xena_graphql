import { GraphQLEnumType } from 'graphql'

const MaritalStatus = new GraphQLEnumType({
  name: 'MaritalStatus',
  values: {
    NOT_SPECIFIED: { value: 'NO_ESPECIFICADO' },
    SINGLE: { value: 'SOLTERO' },
    MARRIED: { value: 'CASADO' },
    LIVING: { value: 'CONVIVIENTE' },
    DIVORCED: { value: 'DIVORCIADO' },
    WIDOW: { value: 'VIUDO' }
  }
})

export default MaritalStatus