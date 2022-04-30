import { Knex } from "knex"


const tableName = 'operations'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, (table) => {
        table.increments('id')
        table.text('description')
        table.float('amount')
        table.integer('debtorId')
        table.integer('creditorId')
        table.date('operationDate')

    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(tableName)
}

