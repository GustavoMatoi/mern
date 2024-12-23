"use client";

import { Evento, EventProps } from "@/types";
import { useState, useEffect, useContext } from "react";
import { Button } from "./ui/button";
import { CirclePlus, Copy, Delete, DeleteIcon, Edit, ExternalLink, Keyboard, Subscript } from "lucide-react";
import { EventoViewModel } from "./EventoViewModel";
import { UserContext } from "@/app/context/UserProvider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input";
import { EventoContext } from "@/app/context/EventoProvider";
export default function Evento({ inscrito, id, categoria, cancelado, titulo, criador, data, local, usuariosAssociados, proprietario, horaInicio, horaFim, dataFim }: Evento) {
  const { user } = useContext(UserContext)

  const { eventoEditando, setOpcaoSelecionada, setEventoEditando } = useContext(EventoContext)

  const { setStatus, email, setEmail, setIsTogleDialogCancelOpen, setIsDialogOpen, isDialogCancelOpen, isDialogOpen, setBgImage, setBgCor, bgImage, bgCor, inscreverEvento, cancelarEvento, router, toggleDialog, toggleDialogCancel, isDateTimePast, convidarUsuario,status } = EventoViewModel()
  useEffect(() => {
    switch (categoria) {
      case 'ciência':
        setBgImage('https://i.imgur.com/84LQlUT.png');
        setBgCor('bg-cyan-600');
        break;
      case 'arte':
        setBgImage('/images/arte.jpg');
        setBgCor('bg-pink-400');
        break;
      case 'ambiente':
        setBgImage('/images/ambiente.jpg');
        setBgCor('bg-green-600');
        break;
      case 'tecnologia':
        setBgImage('/images/tech.jpg');
        setBgCor('bg-purple-600');
        break;
      case 'gastronomia':
        setBgImage('/images/gastronomia.jpg');
        setBgCor('bg-red-600');
        break;
      case 'geek':
        setBgImage('/images/geek.jpg');
        setBgCor('bg-yellow-600');
        break;
      case 'fitness':
        setBgImage('/images/gym.jpg');
        setBgCor('bg-orange-600');
        break;
      default:
        setBgImage('');
        break;
    }
  }, [categoria]);


  return (
    <div className="flex items-center flex-col">
      <div
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="w-[210px] mt-5 border-red-100 h-[300px] rounded-sm flex flex-col justify-between"
      >
        <div className="flex">
          <div className={`p-1 rounded-lg ml-1 mt-5 ${bgCor}`}>
            <p className="font-bold corFonte">
              {categoria}{" "}
              {dataFim
                ? isDateTimePast(dataFim, horaInicio, horaFim)
                  ? "- finalizado"
                  : "- acontecendo!!!"
                : isDateTimePast(data, horaInicio, horaFim)
                  ? "- finalizado"
                  : null}{" "}
              {cancelado ? " - cancelado" : ""}
            </p>
          </div>
        </div>

        <div className="w-full flex align-middle justify-center">
          <div className="w-6/6 mb-1 p-2 p-21 bg-white rounded-lg">
            <p className="font-bold corFonteNormal">{titulo}</p>
            <p className="corFonteNormal text-sm">Criador: {criador}</p>
            <div>
              <p>{local}</p>
            </div>
            <div className="flex">
              <p className="bg-gray-300 p-1 rounded-sm text-gray-600 text-sm">{data} {dataFim && ` até ${dataFim}`} | {horaInicio} até {horaFim}</p>
            </div>

          </div>

        </div>
        {proprietario ?
          <div className="flex justify-around mb-3 flex-wrap">
            <Button
              variant="secondary"
              className="bg-blue-600"
              onClick={() => {
                setOpcaoSelecionada(1);
                setEventoEditando({
                  id,
                  categoria,
                  cancelado,
                  titulo,
                  criador,
                  data,
                  local,
                  usuariosAssociados,
                  proprietario,
                  horaInicio,
                  horaFim,
                  dataFim,
                  editando: true
                });
              }}
              disabled={dataFim ? isDateTimePast(dataFim, horaInicio, horaFim) : isDateTimePast(data, horaInicio, horaFim)}
            >
              <Edit />
              Editar
            </Button>
            <Button variant="secondary" onClick={toggleDialogCancel} className="bg-red-600" disabled={isDateTimePast(data, horaInicio, horaFim)}>
              {!cancelado ? <Delete /> : <Keyboard />}
              {!cancelado ? "Cancelar" : "Ativar"}
            </Button>
            <Button variant="secondary" disabled={isDateTimePast(data, horaInicio, horaFim)} onClick={toggleDialog} className="bg-green-600 mt-1">
              <ExternalLink />
              Convidar usuários
            </Button>
          </div> :
          <div className=" flex justify-center flex-row">
            {status.successConvite ?
              <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Convite enviado com sucesso</DialogTitle>
                    <DialogDescription>
                      Informaremos o usuário convidado!
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              :
              <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Ops.....</DialogTitle>
                    <DialogDescription>
                      Ocorreu um erro ao convidar usuários, tente novamente mais tarde.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            }
          </div>
        }
      </div>
      {!proprietario && (
        <Button
          variant="secondary"
          onClick={() => inscreverEvento(id)}
          className={`${inscrito ? "bg-red-600" : "bg-green-600"} w-4/6 mt-3 text-white`}
          disabled={isDateTimePast(data, horaInicio, horaFim)}
        >
          {inscrito ? (
            <>
              <CirclePlus />
              Desinscrever-se
            </>
          ) : (
            <>
              <DeleteIcon />
              Inscrever-se
            </>
          )}
        </Button>
      )}
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Convidar usuários</DialogTitle>
              <DialogDescription>
                Insira o email do usuário que deseja convidar para seu evento evento
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <label htmlFor="link" className="sr-only">
                  Link
                </label>
                <Input
                  id="link"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button onClick={() => {
                  convidarUsuario(email,
                    {
                      titulo: "Convite de evento",
                      corpo: `Que bom! O usuário ${user?.email} te enviou para o evento ${titulo}!`,

                    }, id); console.log("id", id)
                }}
                  disabled={isDateTimePast(data, horaInicio, horaFim)} type="button" variant="secondary">
                  Convidar
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {status.successDesinscricao && (
        <Dialog open={status.successDesinscricao}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Inscrição cancelada com sucesso</DialogTitle>
              <DialogDescription>
                O evento será removido da sua lista de eventos.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button onClick={() => setStatus((prev) => ({ ...prev, successDesinscricao: false }))}
                  type="button" variant="secondary">
                  Entendido
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {status.successInscricao && (
        <Dialog open={status.successInscricao} >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Inscrição confirmada com sucesso</DialogTitle>
              <DialogDescription>
                O evento será adicionado na sua lista de eventos.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
              <Button onClick={() => setStatus((prev) => ({ ...prev, successDesinscricao: false }))}
                  type="button" variant="secondary">
                  Entendido
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {isDialogCancelOpen && (
        <Dialog open={isDialogCancelOpen} onOpenChange={toggleDialogCancel}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{!cancelado ? "DESEJA MESMO CANCELAR O EVENTO?" : "DESEJA MESMO ATIVAR O EVENTO?"}</DialogTitle>
              <DialogDescription>
                {!cancelado ? "Uma vez que o evento for cancelado, os usuários que estão associados serão avisados. Essa ação poderá ser desfeita." : "Uma vez que o evento for ativado, os usuários que estão associados serão avisados."}
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <label htmlFor="link" className="sr-only">
                  Link
                </label>
                <Button className="bg-red-600" type="button" variant="secondary" onClick={() => { cancelarEvento(id); toggleDialogCancel() }}>
                  {!cancelado ? "CANCELAR" : "ATIVAR"}
                </Button>
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
