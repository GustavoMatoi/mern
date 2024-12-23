import { useState, useEffect, useContext, useReducer } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserContext } from "./context/UserProvider";
import { EventoContext } from "./context/EventoProvider";

type Inputs = {
  categoria: string;
  titulo: string;
  criador: string;
  inicio: string;
  fim: string;
  local: string;
  data: string;
  dataFim?: string;
  _id?: string;
};

const initialState = {
  eventCreationAlertVisible: false,
  alertTitle: "",
  variant: "default",
  alertDescription: "",
};

type Action =
  | { type: "SET_FIELD"; field: keyof typeof initialState; value: any };

const reducer = (state: typeof initialState, action: Action) => {
  return { ...state, [action.field]: action.value };
};

export const criarEventoViewModel = () => {
  const { user } = useContext(UserContext);
  const { eventoEditando, setEventoEditando } = useContext(EventoContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const setAlertState = (field: keyof typeof initialState, value: any) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (eventoEditando) {
      await atualizarEvento(data);
      setEventoEditando(null);
    } else {
      await cadastrarEvento(data);
    }
    reset();
  };

  const isTimeGreater = (time1: string, time2: string) => {
    const [hours1, minutes1] = time1.split(":").map(Number);
    const [hours2, minutes2] = time2.split(":").map(Number);
    return hours1 > hours2 || (hours1 === hours2 && minutes1 > minutes2);
  };

  const atualizarEvento = async (data: Inputs) => {
    const { _id } = data;
    if (!user) {
      console.error("Usuário não autenticado.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/eventos");
      if (!response.ok) throw new Error("Erro ao buscar eventos.");

      const { data: eventos } = await response.json();
      const evento = eventos.find((evento: { _id: string }) => evento._id === _id);

      if (!evento) {
        console.error("Evento não encontrado.");
        return;
      }

      const updatedEvento = { ...evento, ...data };

      const updateResponse = await fetch(`http://localhost:5000/api/eventos/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvento),
      });

      if (updateResponse.ok) {
        console.log("Evento atualizado com sucesso.");
      } else {
        const errorData = await updateResponse.json();
        console.error("Erro ao atualizar evento:", errorData);
      }
    } catch (error) {
      console.error("Erro ao atualizar o evento:", error);
    }
  };

  const cadastrarEvento = async (data: Inputs) => {
    try {
      const eventosResponse = await fetch("http://localhost:5000/api/eventos");
      if (!eventosResponse.ok) throw new Error("Erro ao buscar eventos.");
  
      const { data: eventos } = await eventosResponse.json();
      const eventoDuplicado = eventos.find(
        (evento: { titulo: string }) => evento.titulo.toLowerCase() === data.titulo.toLowerCase()
      );
  
      if (eventoDuplicado) {
        setAlertState("eventCreationAlertVisible", true);
        setAlertState("alertTitle", "Título duplicado:");
        setAlertState(
          "alertDescription",
          `Já existe um evento cadastrado com o título "${data.titulo}".`
        );
        setAlertState("variant", "destructive");
        return;
      }
        const response = await fetch("http://localhost:5000/api/eventos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, criador: user?.email }),
      });
  
      if (response.ok) {
        setAlertState("eventCreationAlertVisible", true);
        setAlertState("alertTitle", "Evento cadastrado com sucesso:");
        setAlertState(
          "alertDescription",
          `O evento "${data.titulo}" foi cadastrado com sucesso!`
        );
        setAlertState("variant", "default");
      } else {
        const error = await response.json();
        setAlertState("eventCreationAlertVisible", true);
        setAlertState("alertTitle", "Ops...");
        setAlertState(
          "alertDescription",
          `Não foi possível cadastrar o evento. Erro: ${error.message}`
        );
        setAlertState("variant", "destructive");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setAlertState("eventCreationAlertVisible", true);
      setAlertState("alertTitle", "Erro inesperado:");
      setAlertState(
        "alertDescription",
        "Ocorreu um erro ao tentar cadastrar o evento. Tente novamente mais tarde."
      );
      setAlertState("variant", "destructive");
    }
  };
  
  return {
    register,
    handleSubmit,
    watch,
    onSubmit,
    state,
    errors,
    isTimeGreater,
    setValue,
    setAlertState
  };
};
