import { Avatar } from "./ui/avatar";
import { Divide, MapPin, Pencil } from "lucide-react";
import UserInterests from "./userInterests";

import { usePathname } from "next/navigation";

import { useContext } from "react";
import { UserContext } from "@/app/context/UserProvider";



export default function ProfileInfo() {
    const pathName = usePathname()
    const {user, authenticated} = useContext(UserContext)

    console.log(user)
    return (
        <div className="h-full rounded-3xl bg-white w-full md:w-9/12 md:ms-[300px]">
            <div className="w-full h-3/12  justify-around items-center flex-col flex">
                <div className="mt-5">
                    <Avatar className="h-24 w-24 bgAzul" >

                    </Avatar>
                </div>
                <p className="text-lg font-bold corFonteNormal">{user?.nome || ""}</p>

                <div className="flex mt-5 ">
                    <MapPin />
                    <p className="corFonteNormal text-md">{user?.endereco.cidade || ""}</p>
                </div>


            </div>
            {pathName === '/profile' ?
                <div className=" h-2/12">
                    <p className="text-lg ps-5 p-1 corFonteNormal">Nome: {user?.nome || ""}</p>
                    <p className="text-lg ps-5 p-1 corFonteNormal">Email: {user?.email || ""}</p>
                    <p className="text-lg ps-5 p-1 corFonteNormal">Endereço -------------------</p>
                    <p className="text-lg ps-5 p-1 corFonteNormal">Rua: {user?.endereco.rua || ""}</p>
                    <p className="text-lg ps-5 p-1 corFonteNormal">Cidade: {user?.endereco.cidade || ""}</p>
                    <p className="text-lg ps-5 p-1 corFonteNormal">Estado: {user?.endereco.estado || ""}</p>
                    <div className="flex justify-center mt-3">
            </div>
                </div>

                : null}
            <div  >
                <UserInterests interests={user?.interesses} />
                <div className="mt-5 flex justify-center flex-row">
                </div>

            </div>

        </div>
    )
}