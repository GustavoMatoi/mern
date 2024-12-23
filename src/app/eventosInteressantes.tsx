import Evento from "@/components/Evento";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";
import eventosInteressantesViewModel from "./eventosInteressantesViewModel";



export default function EventosInteressantes() {

    const { eventosFiltrados, user, todosEventos } = eventosInteressantesViewModel()

    return (
        <div className="p-3 bg-white mt-5">
            <p className="text-center font-bold text-lg">Eventos que talvez você se interesse:</p>
            <div className="w-full flex flex-wrap justify-between">
                {eventosFiltrados.map((item, index) => (
                    <div key={index} className="ml-10">
                        <Evento key={index}
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
                ))}
            </div>

            <p className="text-center font-bold text-lg">Todos os eventos:</p>
            <div className="w-full flex flex-wrap justify-between">
                {todosEventos.map((item, index) => (
                    <div key={index} className="ml-10">
                        <Evento key={index}
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
                ))}

            </div>
        </div>
    );
}