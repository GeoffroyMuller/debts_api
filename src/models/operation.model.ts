import { Model, Pojo } from "objection"
import User from "./user.model";

export default class Operation extends Model {

    id?: number
    debtorId?: number
    creditorId?: number
    description?: string
    date?: string
    operationDate?: string
    amount?: number

    debtor?: User
    creditor?: User
   

    $formatJson(json: Pojo): Pojo {
        json = super.$formatJson(json)
        json.date = json.operationDate
        delete json.operationDate
        return json
    }

    static get tableName() {
        return 'operations'
    }

    static relationMappings = {
        debtor: {
            relation: Model.BelongsToOneRelation,
            modelClass: __dirname + '/user.model.ts',
            join: {
                from: 'operations.debtorId',
                to: 'users.id'
            }
        }, 
        creditor: {
            relation: Model.BelongsToOneRelation,
            modelClass: __dirname + '/user.model.ts',
            join: {
                from: 'operations.creditorId',
                to: 'users.id'
            }
        }
    }
}