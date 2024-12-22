import express from 'express'
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import eventoRouter from './routes/evento.route.js'
import userRouter from './routes/user.route.js';
import cors from 'cors'

const app = express()
app.use(cors({
    origin: 'http://localhost:3001',  
}));


dotenv.config({path: '../.env'})
const PORT = process.env.PORT 

app.use(express.json())

app.use('/api/eventos', eventoRouter)
app.use('/api/users', userRouter)

app.listen(PORT, () => {
    connectDB()
    console.log("Servidor rodando na porta 5000")
})