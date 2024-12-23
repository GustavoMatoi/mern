"use client"

import ProfileInfo from "@/components/profileInfo"
import "../../app/globals.css"
import { useContext, useState } from "react"
import CriarEvento from "../criarEvento"
import EventosInteressantes from "../eventosInteressantes"
import Notification from "@/components/notification"
import { UserContext } from "../context/UserProvider"
import { NotificationProps } from "@/types"



export default function Notifications() {
    const [opcaoSelecionada, setOpcaoSelecionada] = useState(0)

    const { user } = useContext(UserContext)

    console.log("User", user?.notificacoes)
    return (
        <div className="md:ml-[290px] justify-around p-2 m-2 bg-white w-11/12 h-full ">
            <div className=" w-full">
                <div className="font-bold text-2xl text-center w-full p-3">Notificações</div>
                <div className="w-full flex flex-col">
                    {user?.notificacoes && user.notificacoes.length > 0 ? (
                        user.notificacoes.map((item, index) => (
                            <Notification key={index} titulo={item.titulo} corpo={item.corpo} />
                        ))
                    ) : (
                        <div className="mt-4 ms-4">
                            <p className="font-bold">Você ainda não tem notificações. Quando um usuário te convidar para algum evento, uma notificação será cadastrada.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}