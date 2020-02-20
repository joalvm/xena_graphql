import { GraphQLInt, GraphQLNonNull } from "graphql"
import { Company as CompanyType } from "../types"
import { Companies as CompaniesRepository } from "../../repositories"
import { Company as ICompany } from "../../interfaces"
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
        resolve(_: any, { body }: { body: ICompany }) {
            return getCustomRepository(CompaniesRepository).save(body)
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
        resolve(_: any, { id, body }: { id: number, body: ICompany }) {
            const repository = getCustomRepository(CompaniesRepository)
            return repository.update(id, body)
        }
    }
}
