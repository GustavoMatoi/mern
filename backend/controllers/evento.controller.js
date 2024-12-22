import Evento from "../models/evento.model.js"
import mongoose from "mongoose"

export const getEventos = async (req, res) => {
    try {
        const eventos = await Evento.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: eventos })
    } catch (error) {
        console.log("Erro ao buscar os eventos", error.message)
        res.status(500).json({ success: false, message: "Erro do servidor" })
    }
}


export const createEvento = async (req, res) => {
    const evento = req.body

    console.log("Corpo da requisição recebido:", evento)

    if (!evento.titulo || !evento.categoria || !evento.data || !evento.inicio || !evento.fim) {
        return res.status(400).json({
            success: false,
            message: "Informe todos os campos obrigatórios"
        });
    }

    const newEvento = new Evento(evento);

    try {
        await newEvento.save();
        return res.status(201).json({
            success: true,
            data: newEvento
        });
    } catch (error) {
        console.error("Ocorreu um erro ao cadastrar evento:", error);
        return res.status(500).json({
            success: false,
            message: "Erro ao cadastrar evento no servidor"
        });
    }
};

export const deleteEvento = async (req, res) => {
    const { id } = req.body
    console.log("id: ", id)
    try {
        await Evento.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Evento deletado com sucesso!" })
    } catch (error) {
        console.log("Erro ao excluir item:", error)
        res.status(500).json({ success: false, message: "Erro ao excluir evento" })
    }
}

export const updateEvento = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Id do evento inválido" });
    }
    const evento = { ...req.body, ...req.query };

    try {
        const eventoAtualizado = await Evento.findByIdAndUpdate(id, evento, { new: true });
        if (!eventoAtualizado) {
            return res.status(404).json({ success: false, message: "Evento não encontrado" });
        }
        res.status(200).json({ success: true, message: "Evento atualizado com sucesso", data: eventoAtualizado });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro no servidor" });
        console.error("Erro ao atualizar o Evento", error.message);
    }
}