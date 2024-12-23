"use client";

import RadioGroup from "@/components/radioButton";
import { criarEventoViewModel } from "./criarEventoViewModel";
import { useContext, useEffect, useState } from "react";
import { EventoContext } from "./context/EventoProvider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Evento() {
    const { handleSubmit, onSubmit, state, setAlertState, register, watch, errors, isTimeGreater, setValue } =
        criarEventoViewModel();
    const [selecionado, setSelecionado] = useState('')
    const inicio = watch("inicio");
    const fim = watch("fim");

    const { eventoEditando, setEventoEditando } = useContext(EventoContext)

    const handleRadioChange = (value: string) => {
        setValue('categoria', value);
    };
    const onSubmitHandler = (data: any) => {
        const eventoData = { ...data, _id: eventoEditando?.id };
        onSubmit(eventoData);
    };

    console.log("EVENTO NO EDITAR", eventoEditando)

    return (
        <div className="bg-white w-full p-5">
            {state.eventCreationAlertVisible ?
                <Dialog className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" open={state.eventCreationAlertVisible}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{state.alertTitle}</DialogTitle>
                            <DialogDescription>
                                {state.alertDescription}
                                <span className="w-fullitems-center flex justify-center">
                                    <Button className="bgAzul" onClick={() => setAlertState("eventCreationAlertVisible", false)}>
                                        Entendido
                                    </Button>
                                </span>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog> :
                <form className="bg-white w-full p-5" onSubmit={handleSubmit(onSubmitHandler)}>
                    <p className="text-center text font-bold text-lg">
                        Informe os dados do seu novo evento
                    </p>

                    <div className="w-full flex flex-col mt-3 mb-3">
                        <label className="font-bold">Título do evento:</label>
                        <input
                            className="border-gray-100 border-2 p-1 md:w-8/12"
                            placeholder="Informe o título do evento"
                            defaultValue={eventoEditando?.titulo}
                            {...register("titulo", { required: "Este campo é obrigatório" })}
                        />
                        {errors.titulo && (
                            <span>{errors.titulo.message}</span>
                        )}
                    </div>

                    <div className="w-full flex flex-col mt-3 mb-3">
                        <RadioGroup selecionado={eventoEditando?.categoria} onSelectionChange={handleRadioChange} />
                    </div>

                    <div className="w-full flex flex-col mt-3 mb-3">
                        <label className="font-bold">Data do evento:</label>
                        <input
                            className="border-gray-100 border-2 p-1 md:w-8/12"
                            type="date"
                            defaultValue={eventoEditando?.data}

                            {...register("data", { required: "Este campo é obrigatório" })}
                        />
                        {errors.data && <span>{errors.data.message}</span>}
                    </div>

                    <div className="w-full flex flex-col mt-3 mb-3">
                        <label className="font-bold">Início do evento:</label>
                        <input
                            className="border-gray-100 border-2 p-1 md:w-8/12"
                            placeholder="hh:mm"
                            defaultValue={eventoEditando?.horaInicio}
                            type="time"
                            {...register("inicio", { required: "Este campo é obrigatório" })}
                        />
                        {errors.inicio && <span>{errors.inicio.message}</span>}
                    </div>

                    <div className="w-full flex flex-col mt-3 mb-3">
                        <label className="font-bold">Fim do evento:</label>
                        <input
                            className="border-gray-100 border-2 p-1 md:w-8/12"
                            placeholder="hh:mm"
                            defaultValue={eventoEditando?.horaFim}
                            type="time"
                            {...register("fim", { required: "Este campo é obrigatório" })}
                        />
                        {errors.fim && <span>{errors.fim.message}</span>}
                        <p >Observação: Se o horário de término for anterior ao horário de início, será necessário informar a data de término do evento.</p>

                    </div>

                    {inicio && fim && (
                        <div>

                            <div>
                                <div className="w-full flex flex-col mt-3 mb-3">
                                    <label className="font-bold">Data final do evento:</label>
                                    <input
                                        className="border-gray-100 border-2 p-1 md:w-8/12"
                                        placeholder="dd/mm/aaaa"
                                        type="date"
                                        defaultValue={eventoEditando?.dataFim}
                                        {...register("dataFim")}
                                    />
                                    {isTimeGreater(inicio, fim) && errors.fim && <span>{errors.dataFim?.message}</span>}
                                </div>
                            </div>

                        </div>
                    )}

                    <div className="w-full items-center justify-center flex mt-5">
                        <input
                            className="md:w-3/12 p-3 bgAzul text-white rounded-lg transition-all duration-300 ease-in-out transform hover:bg-white hover:border-2 hover:border-blue-600 hover:text-blue-600 hover:scale-105"
                            type="submit"
                            value={eventoEditando?.titulo ? "SALVAR EDIÇÕES" : "SALVAR EVENTO"}
                        />
                    </div>

                </form>

            }

        </div>
    );
}
