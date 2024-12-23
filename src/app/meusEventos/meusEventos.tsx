import Evento from "@/components/Evento";
import meusEventosViewModel from "./meusEventosViewModel";
import { useEffect } from "react";

export default function MeusEventos() {
    const { getEventos, eventos, user, eventosFiltrados } = meusEventosViewModel();

    console.log("eventosFiltrados", eventosFiltrados)

    return (
        <div className="w-full flex flex-wrap justify-between">
            {eventosFiltrados.length > 0 ? (
                user && eventosFiltrados.map((item, index) => (
                    <div key={index} className="ml-16 md:ml-10">
                        <Evento
                            horaInicio={item.inicio}
                            horaFim={item.fim}
                            data={item.data}
                            usuariosAssociados={item.usuariosAssociados}
                            titulo={item.titulo}
                            categoria={item.categoria}
                            proprietario={item.criador === user.email}
                            criador={item.criador}
                            dataFim={item.dataFim}
                            id={item._id}
                            inscrito={item.usuariosAssociados.includes(user.email)}
                            cancelado={item.cancelado}
                        />
                    </div>
                ))
            ) : (
                <div className=" ">
                    <p className="mt-4 ms-4 font-bold">Você ainda não tem eventos cadastrados. Cadastre um evento e tente novamente.</p>

                </div>
            )}

        </div>
    )
}