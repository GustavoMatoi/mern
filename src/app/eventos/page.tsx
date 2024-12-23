"use client"
import EventosInteressantes from "../eventosInteressantes"
import MeusEventos from "../meusEventos/meusEventos"
import CriarEvento from "../criarEvento"
import { useContext, useState } from "react"
import { EventoContext } from "../context/EventoProvider"

export default function EventoPage(){
    
    const { opcaoSelecionada, setOpcaoSelecionada, eventoEditando, setEventoEditando  } = useContext(EventoContext) ?? { opcaoSelecionada: 0, eventoEditando: null  };

    return (
        <div className="h-screen w-full md:w-9/12  items-center flex flex-col">
            <div className="md:w-full w-11/12  md:p-5 rounded-lg flex items-center justify-around bg-white ">
                <button onClick={() => setOpcaoSelecionada(0)} className={`linkEventos ${opcaoSelecionada === 0 ? "sidebarAtiva" : null}`}><span className="font-bold fontCorNormal">Meus eventos</span></button>
                <button onClick={() => setOpcaoSelecionada(1)} className={`linkEventos ${opcaoSelecionada === 1 ? "sidebarAtiva" : null}`}><span className="font-bold fontCorNormal" >Criar evento</span></button>
                <button onClick={() => setOpcaoSelecionada(2)} className={`linkEventos ${opcaoSelecionada === 2 ? "sidebarAtiva" : null}`}><span className="font-bold fontCorNormal">Eventos do meu interesse</span></button>
            </div>

            <div className="w-full h-5/7">
                {opcaoSelecionada === 0 ?
                    <MeusEventos /> :
                    opcaoSelecionada === 1 ?
                        <CriarEvento /> :
                        <EventosInteressantes />
                }
            </div>

        </div>
    )
}