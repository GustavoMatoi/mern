import { UserContext } from "@/app/context/UserProvider";
import { Evento, User } from "@/types";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export const EventoViewModel = () => {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const [status, setStatus] = useState({
        success: false,
        successConvite: false,
        successInscricao: false,
        successDesinscricao: false,
    });

    const [bgImage, setBgImage] = useState('');
    const [bgCor, setBgCor] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDialogCancelOpen, setIsTogleDialogCancelOpen] = useState(false);
    const [email, setEmail] = useState('')


    function isDateTimePast(
        dateString: string,
        startTime: string,
        endTime: string,
        dataFim?: string
    ): boolean {

        const [year, month, day] = dateString.split('-').map(Number);
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);

        const startDateTime = new Date(year, month - 1, day, startHour, startMinute);
        let endDateTime;

        if (dataFim) {
            const [dayFim, monthFim, yearFim] = dataFim.split('-').map(Number);
            endDateTime = new Date(yearFim, monthFim - 1, dayFim, endHour, endMinute);
        } else {
            endDateTime = new Date(year, month - 1, day, endHour, endMinute);
        }

        const now = new Date();

        if (now > endDateTime) {
            return true;
        }

        if (now >= startDateTime && now <= endDateTime) {
            return false;
        }

        return false;
    }

    const toggleDialog = () => setIsDialogOpen((prev) => !prev);
    const toggleDialogCancel = () => setIsTogleDialogCancelOpen((prev) => !prev);


    const handleAPIError = (response: Response) => {
        if (!response.ok) {
            throw new Error("Erro na resposta da API");
        }
        return response.json();
    };

    const updateEvento = async (id: string, updatedEvento: Evento) => {
        const response = await fetch(`http://localhost:5000/api/eventos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedEvento),
        });
        return handleAPIError(response);
    };

    const inscreverEvento = async (id: string, convidado?: User) => {
        if (!user) {
            console.error("Usuário não autenticado.");
            return;
        }
        try {
            const eventos = await fetch("http://localhost:5000/api/eventos").then(handleAPIError);
            const evento = eventos.data.find((e: Evento) => e._id === id);
            if (!evento) throw new Error("Evento não encontrado.");

            const email = convidado ? convidado.email : user.email;
            const isInscrito = evento.usuariosAssociados.includes(email);

            const updatedEvento = {
                ...evento,
                usuariosAssociados: isInscrito
                    ? evento.usuariosAssociados.filter((e: string) => e !== email)
                    : [...evento.usuariosAssociados, email],
            };

            await updateEvento(id, updatedEvento);
            setStatus((prev) => ({
                ...prev,
                successInscricao: !isInscrito,
                successDesinscricao: isInscrito,
            }));
            console.log(isInscrito ? "Usuário removido" : "Usuário inscrito");
        } catch (error) {
            console.error("Erro ao inscrever/desinscrever evento:", error);
        }
    };

    const cancelarEvento = async (id: string) => {
        if (!user) {
            console.error("Usuário não autenticado.");
            return;
        }
        try {
            const eventos = await fetch("http://localhost:5000/api/eventos").then(handleAPIError);
            const evento = eventos.data.find((e: Evento) => e._id === id);
            if (!evento) throw new Error("Evento não encontrado.");

            const updatedEvento = { ...evento, cancelado: !evento.cancelado };
            await updateEvento(id, updatedEvento);

            setStatus((prev) => ({ ...prev, success: true }));
            console.log("Evento cancelado/reativado com sucesso.");
        } catch (error) {
            console.error("Erro ao cancelar evento:", error);
        }
    };

    type Notificacacao = {
        corpo: string,
        titulo: string
    }


    const convidarUsuario = async (email: string, notification: Notificacacao, eventoId: string) => {
        if (!user) {
            console.error("Usuário não autenticado.");
            return;
        }
        try {
            const usuarios = await fetch("http://localhost:5000/api/users").then(handleAPIError);
            const usuario = usuarios.data.find((u: User) => u.email === email);
            if (!usuario) throw new Error("Usuário não encontrado.");

            const updatedUser = { ...usuario, notificacoes: [...usuario.notificacoes, notification] };
            const response = await fetch(`http://localhost:5000/api/users`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, updatedUser }),
            });

            handleAPIError(response);
            setStatus((prev) => ({ ...prev, successConvite: true }));
            console.log("Convite enviado.");
            await inscreverEvento(eventoId, updatedUser);
        } catch (error) {
            console.error("Erro ao convidar usuário:", error);
        }
    };

    return {
        inscreverEvento, cancelarEvento, convidarUsuario, status, setStatus,
        router, isDateTimePast, toggleDialog, toggleDialogCancel, bgImage, setBgImage,
        bgCor, setBgCor, isDialogOpen, setIsDialogOpen, isDialogCancelOpen, setIsTogleDialogCancelOpen,
        email, setEmail
    };
};
