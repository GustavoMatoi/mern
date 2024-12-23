import { Evento } from "@/types";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface EventoContextType {
    opcaoSelecionada: number;
    setOpcaoSelecionada: (opcao: number) => void;
    eventoEditando: Evento | null ;
    setEventoEditando: (evento: Evento | null) => void
}

interface EventoProviderProps {
    children: ReactNode
}

export const EventoContext = createContext<EventoContextType>({
    opcaoSelecionada: 0,
    setOpcaoSelecionada: () => {},
    eventoEditando: null, 
    setEventoEditando: () => {}

}) 

export const EventoProvider = ({children}: EventoProviderProps) => {
    const [opcaoSelecionada, setOpcaoSelecionada] = useState(0)
    const [eventoEditando, setEventoEditando] = useState<Evento|null>(null)

    return (
        <EventoContext.Provider value={{opcaoSelecionada, setOpcaoSelecionada, eventoEditando, setEventoEditando}}>
            {children}
        </EventoContext.Provider>
    )
}

