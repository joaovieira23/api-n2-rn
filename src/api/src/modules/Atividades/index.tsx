import { Request, Response } from "express";
import { Atividades } from "../../@types/Atividades";
import knex from "../../db";


export async function postAtividade(req: Request, res: Response) {
  const { local, data_entrega, hora_entrega, status, id_tipo_atividade } = req.body as {
    local: string;
    data_entrega: Date;
    hora_entrega: Date;
    status: string
    id_tipo_atividade: number;
  };

  const transaction = await knex.transaction();

  // if (loca) {
  const insertTipoAtividade = await transaction("atividades")
    .insert([{ local: local, data_entrega, hora_entrega, status, atividade: id_tipo_atividade }])
    .returning('*')

  await transaction.commit();

  if (insertTipoAtividade) {
    return res.status(201).send(insertTipoAtividade);
  }
  // }
}

export async function getAtividade(req: Request, res: Response) {
  const { id } = req.query as {
    id: string;
  };

  const transaction = await knex.transaction();

  if (id) {
    const atividade = await transaction("atividades")
      .select('*')
      .where('id', '=', id)

    if (atividade) {
      return res.status(201).send(atividade);
    }
  }
}

export async function putAtividade(req: Request, res: Response) {
  const { id, tipo_atividade } = req.body as {
    id: number;
    tipo_atividade: string;
  };

  if (id) {
    await knex<Atividades>("tipo_atividade")
      .where("id", "=", id)
      .update({
        tipo_atividade
      });
  }

  return res.status(204).end();
}

export async function deleteAtividade(req: Request, res: Response) {
  const { id } = req.body as {
    id: number;
  };

  if (id) {
    await knex<Atividades>("atividades")
      .where("id", "=", id)
      .delete()
  }

  return res.status(204).end();
}


