import mongoose from "mongoose"
import User from "../models/user.model.js"
import dotenv from 'dotenv';
dotenv.config();



export const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({ success: true, data: users })
    } catch (error) {
        console.log("Erro ao buscar os eventos", error.message)
        res.status(500).json({ success: false, message: "Erro do servidor" })
    }
}

export const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ success: false, message: 'Email e senha são obrigatórios.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Usuário não encontrado.' });
        }

        if (user.senha !== senha) {
            return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
        }

        return res.status(200).json({
            success: true,
            message: 'Login bem-sucedido!',
            user: { nome: user.nome, email: user.email, interesses: user.interesses, endereco: { rua: user.rua, cidade: user.cidade, estado: user.estado }, notificacoes: user.notificacoes },
        });
    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ success: false, message: 'Erro do servidor.' });
    }
}


export const createUser = async (req, res) => {
    const { nome, email, senha, rua, cidade, estado, interesses } = req.body;

    console.log("Corpo da requisição recebido:", req.body);

    if (!nome || !email || !senha || !rua || !cidade || !estado || !interesses) {
        return res.status(400).json({ success: false, message: "Informe todos os campos" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Usuário com este e-mail já cadastrado" });
        }

        const user = {
            nome: nome,
            email: email,
            senha: senha,
            rua: rua,
            cidade: cidade,
            estado: estado,
            interesses: interesses
        };


        console.log('user', user)
        const newUser = new User(user);
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.error("Ocorreu um erro ao cadastrar o usuário", error);
        return res.status(500).json({ success: false, message: "Erro do servidor" });
    }
};


export const deleteUser = async (req, res) => {
    const { id } = req.params
    console.log("id: ", id)
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Usuário deletado com sucesso!" })
    } catch (error) {
        console.log("Erro ao excluir item:", error)
        res.status(500).json({ success: false, message: "Erro ao excluir o usuário" })
    }
}

export const updateUser = async (req, res) => {
    const { email, updatedUser } = req.body;  

    if (!email) {
        return res.status(400).json({ success: false, message: "Email é obrigatório" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "Usuário não encontrado" });
        }

        const updated = await User.findOneAndUpdate(
            { email },
            { ...updatedUser },
            { new: true }
        );

        res.status(200).json({ success: true, message: "Usuário atualizado com sucesso", data: updated });
    } catch (error) {
        console.error("Erro ao atualizar o usuário", error);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};

