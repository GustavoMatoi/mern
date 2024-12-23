"use client"
import React from "react"
import { Calendar } from "./ui/calendar"


export default function NextEvents() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
        <div className="pt-1 pl-5">
            <p className="mt-3 font-bold">Próximos eventos:</p>
            <div className="pr-5 justify-center flex-row flex">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                />
            </div>
        </div>
    )
}