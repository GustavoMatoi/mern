'use client'

import { Bell, Home, User } from "lucide-react"
import { SidebarDesktop } from "./sidebarDesktop"
import { SidebarItems } from "@/types"
import { UserContext } from "@/app/context/UserProvider"
import { useContext } from "react"

const sidebarItems: SidebarItems =             {
    links: [
      {label: 'Home', href: '/', icon: Home},
      {label: 'Perfil', href: '/profile', icon: User},
      {label: 'Notificações', href: '/notifications', icon: Bell},
    ]
  }

export function Sidebar (){
  const { authenticated } = useContext(UserContext);

    return authenticated ?         <SidebarDesktop sidebarItems={sidebarItems}/> : null
}