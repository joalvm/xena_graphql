import { GraphQLInputObjectType, GraphQLEnumType, GraphQLObjectType, GraphQLEnumValueConfigMap } from "graphql";
import { snakeCase } from 'lodash'

export default function (parentFields: GraphQLObjectType, except: string[] = []) {
    const pFields: object = Object.assign({}, parentFields.getFields());
    let fieldValues: GraphQLEnumValueConfigMap = {}

    for (const key in pFields) {
        if (pFields.hasOwnProperty(key) && !except.includes(key)) {
            fieldValues = Object.assign(fieldValues, {
                [snakeCase(key).toUpperCase()]: { value: key }
            })
        }
    }

    const modes = new GraphQLEnumType({
        name: `${parentFields.name}OrderingModes`,
        values: {
            ASC: { value: 'asc' },
            DESC: { value: 'desc' },
        }
    })

    const fields = new GraphQLEnumType({
        name: `${parentFields.name}OrderingFields`,
        values: fieldValues
    })

    return new GraphQLInputObjectType({
        name: `${parentFields.name}OrderingInput`,
        fields: () => ({
            field: { type: fields, defaultValue: 'id' },
            mode: { type: modes, defaultValue: 'desc' }
        }),
    })
}
