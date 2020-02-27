import { AbstractRepository, ObjectLiteral, getRepository } from "typeorm-plus";
import { UsersSessions } from "../entities/UsersSessions";
import Unauthorized from "../exceptions/Unauthorized";
import {isUndefined} from 'lodash'
import { Authentication } from '../interfaces'

export default class Repository<Entity extends ObjectLiteral> extends AbstractRepository<Entity> {
    private queryName = ''
    protected checkAuth = false
    protected omitQueries = ['login']
    protected authenticated = false
    protected session: Authentication = {
        token: '',
        sessionId: 0,
        userId: 0,
        isAdmin: false,
        currentCompany: 0
    }

    constructor() {
        super()
    }

    setAuth(session: Authentication, queryName: string) {
        this.session = {...this.session, ...session}
        this.queryName = queryName

        return this
    }

    protected async checkAuthorization() {
        if (this.checkAuth && !this.authenticated) {
            if (!this.omitQueries.includes(this.queryName)) {
                if (!(await this.isSessionActived())) {
                    throw new Unauthorized
                }
                this.authenticated = true
            }
        }
    }

    async isSessionActived(): Promise<boolean> {
        const repository = getRepository(UsersSessions);

        const session = await repository.findOne(
            this.session.sessionId,
            { where: { closedAt: null } }
        )
            console.log(this.session);
        return !isUndefined(session)
    }

    enableCheckAutorization() {
        this.checkAuth = true
        return this
    }
}
