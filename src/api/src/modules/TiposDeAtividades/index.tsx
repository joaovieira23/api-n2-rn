import { Request, Response } from "express";
import { Atividades } from "../../@types/Atividades";
import knex from "../../db";


export async function postTipoAtividade(req: Request, res: Response) {
  const { tipo_atividade } = req.body as {
    tipo_atividade?: string;
  };

  const transaction = await knex.transaction();

  if (tipo_atividade) {
    const insertTipoAtividade = await transaction("tipo_atividade")
      .insert([{ tipo_atividade: tipo_atividade }])
      .returning('*')

    await transaction.commit();

    if (insertTipoAtividade) {
      return res.status(201).send(insertTipoAtividade);
    }
  }
}

export async function getTipoAtividade(req: Request, res: Response) {
  const { id } = req.query as {
    id: string;
  };

  const transaction = await knex.transaction();

  if (id) {
    const tipoAtividade = await transaction("tipo_atividade")
      .select('*')
      .where('id', '=', id)

    if (tipoAtividade) {
      return res.status(201).send(tipoAtividade);
    }
  }
}

export async function putTipoAtividade(req: Request, res: Response) {
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

export async function deleteTipoAtividade(req: Request, res: Response) {
  const { id } = req.query as {
    id: string;
  };

  if (id) {
    await knex<Atividades>("tipo_atividade")
      .where("id", "=", id)
      .delete()
  }

  return res.status(204).end();
}


