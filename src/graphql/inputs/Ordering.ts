import { GraphQLInputObjectType, GraphQLEnumType, GraphQLObjectType, GraphQLEnumValueConfigMap, GraphQLType, FieldNode } from "graphql";
import { snakeCase, each } from 'lodash'

export default function (parentFields: GraphQLObjectType, except: string[] = [], includes: GraphQLObjectType[] = []) {
    const pFields: {name?: string, field: string}[] = [];
    let fieldValues: GraphQLEnumValueConfigMap = {}

    const mainFields = parentFields.getFields()
    for (const key in mainFields) {
        pFields.push({name: '', field: mainFields[key].name})
    }

    each(includes, async (objectType: GraphQLObjectType) => {
        each(objectType.getFields(), (field) => {
            if (!['id', 'createdAt', 'updatedAt'].includes(field.name)) {
                pFields.push({name: objectType.name, field: field.name})
            }
        })
    })

    each(pFields, async (item) => {
        const key = `${item.name}_${item.field}`
        if (!except.includes(key)) {
            fieldValues = Object.assign(fieldValues, {
                [snakeCase(key).toUpperCase()]: { value: key }
            })
        }
    })

    const modes = new GraphQLEnumType({
        name: `${parentFields.name}OrderingModes`,
        values: {
            ASC: { value: 1 },
            DESC: { value: -1 },
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
            mode: { type: modes, defaultValue: -1 }
        }),
    })
}
