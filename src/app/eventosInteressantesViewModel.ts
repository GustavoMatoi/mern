import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserProvider";
import { Evento } from "@/types";


export default function eventosInteressantesViewModel() {
  const [eventos, setEventos] = useState([])
  const [eventosFiltrados, setEventosFiltrados] = useState([])
  const [todosEventos, setTodosEventos] = useState([])
  const { user } = useContext(UserContext)
  const getEventos = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/eventos/")
      if (!response.ok) {
        throw new Error(`Erro ao buscar eventos: ${response.status}`);
      }
      const data = await response.json();
      console.log("dados dos eventos", data.data)
      setEventos(data.data)

    } catch (error: any) {
      console.error("Ocorreu um erro:", error.toString());
    }
  }

  useEffect(() => {
    getEventos()
  }, [])



  useEffect(() => {
    const filtrarEventos = async () => {
      await getEventos();
    };

    filtrarEventos();
  }, []);


  useEffect(() => {
    if (eventos.length > 0 && user) {
      const eventosFiltrados = eventos.filter((item: Evento) => {
        const usuariosAssociados = item.usuariosAssociados || [];
        const categoriaEvento = item.categoria;
        const interessesUsuario = user.interesses || [];
        const categoriaValida = interessesUsuario.includes(categoriaEvento);

        return item.criador !== user.email &&
          !usuariosAssociados.includes(user.email) &&
          categoriaValida;
      });

      setEventosFiltrados(eventosFiltrados);
      console.log('Eventos filtrados:', eventosFiltrados);
    }
  }, [eventos, user?.email, JSON.stringify(user?.interesses)]);
  
  useEffect(() => {
    if (eventos.length > 0 && user) {
      const eventosFiltrados = eventos.filter((item: Evento) => {
        const usuariosAssociados = item.usuariosAssociados || [];
        return item.criador !== user.email && !usuariosAssociados.includes(user.email);
      });
      setTodosEventos(eventosFiltrados);
      console.log('Eventos filtrados:', eventosFiltrados);
    }
  }, [eventos, user?.email]);


  return { getEventos, eventos, user, eventosFiltrados, todosEventos}

}