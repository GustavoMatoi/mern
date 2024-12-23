"use client"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { BellIcon, Home, Menu, User2Icon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBarMobile() {
    const pathName = usePathname();

    return (
        !(pathName === '/login' || pathName === '/cadastro') ? (
            <Popover>
                <div>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="bgAzul p-2 rounded-lg">
                            <Menu color="white" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="mt-16 p-4 bg-white shadow-lg rounded-lg w-[280px]">
                        <Tabs defaultValue="account" className="w-full">
                            <TabsList className="flex flex-col space-y-2">

                                <TabsTrigger value="account" className="w-full bgAzul rounded-lg">
                                    <Link href={'/'} className={`flex items-center p-3 rounded-lg ${pathName === "/" ? "bg-white text-blue-600" : 'text-white hover:bg-blue-700'}`}>
                                        <Home color={pathName === "/" ? "blue" : "white"} />
                                        <span className="ml-3">Home</span>
                                    </Link>
                                </TabsTrigger>

                                <TabsTrigger value="notifications" className="w-full bgAzul rounded-lg">
                                    <Link href={'/notifications'} className={`flex items-center p-3 rounded-lg ${pathName === "/notifications" ? "bg-white text-blue-600" : 'text-white hover:bg-blue-700'}`}>
                                        <BellIcon color={pathName === "/notifications" ? "blue" : "white"} />
                                        <span className="ml-3">Notificações</span>
                                    </Link>
                                </TabsTrigger>

                                <TabsTrigger value="user" className="w-full bgAzul rounded-lg">
                                    <Link href={'/profile'} className={`flex items-center p-3 rounded-lg ${pathName === "/profile" ? "bg-white text-blue-600" : 'text-white hover:bg-blue-700'}`}>
                                        <User2Icon color={pathName === "/profile" ? "blue" : "white"} />
                                        <span className="ml-3">Perfil</span>
                                    </Link>
                                </TabsTrigger>

                                <TabsTrigger value="logout" className="w-full bgAzul rounded-lg">
                                    <Link href={"/login"} className="flex items-center p-3 rounded-lg text-white hover:bg-blue-700">
                                        <span className="ml-3">Sair</span>
                                    </Link>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </PopoverContent>
                </div>
            </Popover>
        ) : null
    );
}
