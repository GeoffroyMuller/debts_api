import { Model, Pojo } from "objection"
import Operation from "./operation.model"

export default class User extends Model {

    id?: number
    firstname?: string
    lastname?: string
    email?: string
    password?: string

    operations_debt?: Operation[]
    operations_credit?: Operation[]


    $formatJson(json: Pojo): Pojo {
        json = super.$formatJson(json)
        delete json.password
        return json
    }

    static get tableName() {
        return 'users'
    }


    static relationMappings = {
        operations_debt: {
            relation: Model.HasManyRelation,
            modelClass: Operation,
            join: {
                from: 'users.id',
                to: 'operations.debtorId'
            }
        },
        operations_credit: {
            relation: Model.HasManyRelation,
            modelClass: Operation,
            join: {
                from: 'users.id',
                to: 'operations.creditorId'
            }
        },
    }
}