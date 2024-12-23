"use client"

import { Bell, LogOut, LogOutIcon, MoreHorizontal, Settings, User } from "lucide-react";
import { SidebarButton } from "./sidebarButton";
import { SidebarItems } from "@/types";
import Link from "next/link";
import { Separator } from "@radix-ui/react-separator";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname, useRouter } from "next/navigation";

interface SidebarDesktopProps {
    sidebarItems: SidebarItems
}

export function SidebarDesktop(props: SidebarDesktopProps) {
    const pathName = usePathname()
    const router = useRouter()
    return (
        <aside className="w-[270px] max-w-xs h-screen shadow-sm sideBar fixed left-0 top-0 z-40 bgAzul">
            <div className="h-full ps-5 py-5 mt-5">
                <span className="mx-3 font-bold text-3xl">
                    <span className="text-white">TokenLab</span><span className="text-sky-500">Events</span>
                </span>

                <div className="mt-10">
                    <div className="flex flex-col gap-1 w-full">
                        {props.sidebarItems.links.map((link, index) => (
                            <Link key={index} href={link.href}>
                                <SidebarButton
                                    corFonte={pathName === link.href ? "fonteAzul" : "corFonte"}
                                    corBotao={pathName === link.href ? "bgBranco" : "bgAzul"}
                                    icon={link.icon}
                                >
                                    {link.label}
                                </SidebarButton>
                            </Link>
                        ))}
                    </div>

                    <div className="absolute left-0 bottom-3 px-3 w-full">
                        <Button
                            className={`w-full sideBarLinksText  border-none hover:bg-sky-500 `}
                            variant={'secondary'}
                        >
                            <span className={`w-5/6 text-lg `}>SAIR</span>
                        </Button>
                    </div>
                </div>
            </div>
        </aside>
    )
}