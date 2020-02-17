import { GraphQLNonNull, GraphQLString, GraphQLInputObjectType } from 'graphql'

/**
 * Se creo en funcion para permitir una carga dinamica para parametros opcionales
 * @param isSave boolean
 */
export default function(isSave = true) {
  const prefix = isSave ? 'New' : 'Edit'

  return new GraphQLInputObjectType({
    name: `${prefix}CompanyInput`,
    fields: () => ({
      name: { type: isSave ? GraphQLNonNull(GraphQLString) : GraphQLString },
      business_name: { type: isSave ? GraphQLNonNull(GraphQLString) : GraphQLString },
      ruc: { type: isSave ? GraphQLNonNull(GraphQLString) : GraphQLString },
      square_icon: { type: GraphQLString },
      rectangle_icon: { type: GraphQLString },
    }),
  })
}
