"use client"

import ProfileInfo from "@/components/profileInfo"
import "../../app/globals.css"
import { useState } from "react"


export default function Profile() {

    return (
        <div className=" flex justify-around p-10">
            <div className=" w-full h-full justify-center flex">
                <ProfileInfo />

            </div>
        </div>
    )
}