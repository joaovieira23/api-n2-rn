import { Router } from "express";
import { getTipoAtividade, postTipoAtividade } from "./modules/TiposDeAtividades";
import { getAtividade, postAtividade } from "./modules/Atividades";

const router = Router();

//TiposDeAtividades
router.get("/tipo-atividades", getTipoAtividade);
router.post("/tipo-atividades", postTipoAtividade);

//Atividades
router.get("/atividades", getAtividade);
router.post("/atividades", postAtividade);


export default router;
