import express from "express"
import { createEvento, deleteEvento, getEventos, updateEvento } from "../controllers/evento.controller.js"

const router = express.Router()
router.get("/", getEventos)
router.post('/', createEvento)
router.delete("/:id", deleteEvento)
router.put("/:id", updateEvento);

export default router