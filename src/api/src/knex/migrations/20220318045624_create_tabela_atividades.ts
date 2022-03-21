import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const temTabelaAtividades = await knex.schema.hasTable("atividades");

  if (!temTabelaAtividades) {
    return knex.schema.createTable("atividades", (table) => {
      table.increments();
      table.string("local").notNullable();
      table.date("data_entrega").notNullable();
      table.date("hora_entrega").notNullable();
      table.string("status").notNullable();

      table
        .integer("atividade")
        .notNullable()
        .references("id")
        .inTable("tipo_atividade")
        .onDelete("cascade");

      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable("atividades")) {
    return knex.schema.dropTable("atividades");
  }
}
