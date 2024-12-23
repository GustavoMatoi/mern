import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { Evento, EventProps } from "@/types";

export default function meusEventosViewModel() {
  const [eventos, setEventos] = useState([])
  const [eventosFiltrados, setEventosFiltrados] = useState([])
  const { user } = useContext(UserContext)
  const getEventos = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/eventos/")
      if (!response.ok) {
        throw new Error(`Erro ao fazer login: ${response.status}`);
      }
      const data = await response.json();
      console.log("dados dos eventos", data.data)
      setEventos(data.data)

    } catch (error: any) {
      console.error("Ocorreu um erro:", error.toString());
    }
  }

  useEffect(() => {
    const filtrarEventos = async () => {
      await getEventos();  
    };

    filtrarEventos();
  }, []); 

  useEffect(() => {
    if (eventos.length > 0 && user) {
      const eventosFiltrados = eventos.filter((item: Evento) => 
        item.criador === user.email || item.usuariosAssociados.includes(user.email)
      );
      setEventosFiltrados(eventosFiltrados);  
    }
  }, [eventos]);
  

return { getEventos, eventos, setEventos, user, eventosFiltrados }

}