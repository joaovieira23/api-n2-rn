import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const temTabelaTipoAtividade = await knex.schema.hasTable("tipo_atividade");

  if (!temTabelaTipoAtividade) {
    return knex.schema.createTable("tipo_atividade", (table) => {
      table.increments();

      table.string("tipo_atividade").notNullable();
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable("tipo_atividade")) {
    return knex.schema.dropTable("tipo_atividade");
  }
}
