import { Knex } from "knex"


const tableName = 'users'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, (table) => {
        table.increments('id')
        table.string('firstname')
        table.string('lastname')
        table.string('email').unique()
        table.string('password', 255)
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(tableName)
}

