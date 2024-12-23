"use client"

import "../app/globals.css"
import { EventoProvider, EventoContext } from "./context/EventoProvider"
import EventoPage from "./eventos/page"

export default function Profile() {

    return (
        <div className="md:ml-[260px] justify-around flex mt-5 md:p-10">
            <EventoProvider>
                <EventoPage/>
            </EventoProvider>
        </div>
    )
}