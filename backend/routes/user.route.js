import express from "express"
import {  createUser, deleteUser, getUsers, login, updateUser } from "../controllers/user.controller.js"

const userRouter = express.Router()
userRouter.get("/", getUsers)
userRouter.post('/', createUser)
userRouter.post('/login', login)
userRouter.delete("/:id", deleteUser)
userRouter.put("/", updateUser);  
export default userRouter