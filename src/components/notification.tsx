import { useEffect, useState } from "react";
import { NotificationProps } from "@/types";
import { Button } from "./ui/button";

export default function Notification({ titulo, corpo}: NotificationProps) {
    const [bgCor, setBgCor] = useState('')

    return (
        <div className="quadradoUserProfile  w-full justify-around flex h-[100px]">
            <div className={`w-1/12 bgAzul rounded-full md:flex justify-center flex-col text-center items-center hidden `}>
                <p className="font-bold text-sm text-white">{titulo.toUpperCase()}</p>
            </div>
            <div
                className={` ps-5 w-9/12 flex flex-row justify-between items-center h-full`}
            >
                {corpo}
            </div>

        </div>
    )
}