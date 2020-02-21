import { GraphQLInt, GraphQLNonNull, GraphQLResolveInfo } from "graphql"
import { Company as CompanyType } from "../types"
import { Companies as CompaniesRepository } from "../../repositories"
import CompanyInput from "../inputs/Company"
import { getCustomRepository } from "typeorm-plus"

export default {
    newCompany: {
        type: CompanyType,
        description: 'Creacion de empresas',
        args: {
            body: {
                type: new GraphQLNonNull(CompanyInput())
            }
        },
        resolve(_: any, args: any, ctx:any, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(CompaniesRepository)

            repository.setAuth(ctx.session, info.fieldName)
            repository.enableCheckAutorization()

            return repository.save(args.body)
        }
    },
    editCompany: {
        type: CompanyType,
        description: 'Editar una empresas',
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLInt),
                description: 'Id del usuario en session'
            },
            body: {
                type: CompanyInput(false)
            }
        },
        async resolve(_: any, args: any, ctx: any, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(CompaniesRepository)

            repository.setAuth(ctx.session, info.fieldName)
            repository.enableCheckAutorization()

            return await repository.update(args.id, args.body)
        }
    }
}
