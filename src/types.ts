import { LucideIcon } from "lucide-react";

export interface SidebarItems {
    links: Array<{
        label: string;
        href: string;
        icon?: LucideIcon
    }>
}
export type User = {
    email: string;
    senha: string;
    nome: string;
    interesses: string[]; 
    endereco: Endereco
}
export type Endereco = {
    rua: string;
    estado: string;
    cidade: string
}

export type Evento = {
    categoria: "ciência" | "arte" | "ambiente" | "tecnologia" | "fitness" | "gastronomia" | "geek";
    titulo: string;
    criador: string;
    data: string;
    local: string;
    usuariosAssociados: string[];
    proprietario: boolean,
    horaInicio: string,
    horaFim: string,
    dataFim?: string,
    id: string,
    cancelado: boolean,
    editando?: boolean,
    _id?: string
}

export type NotificationProps = {
    titulo: string,
    corpo: string,
}