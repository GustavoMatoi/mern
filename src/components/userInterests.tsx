"use client"
import React from "react"
import { Calendar } from "./ui/calendar"

type userInterestsProps = {
    interests?: string[]
}

export default function UserInterests({ interests }: userInterestsProps) {
    return (
        <div className="mt-10 pl-5 pb-3 quadradoUserProfile">
            <p className="mt-1 font-bold">Interesses:</p>
            <div className="flex flex-wrap gap-2">
                {interests && interests.map((item, index) => (
                    <div className="p-1" key={index}>
                        <span className="bgBranco p-1">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
