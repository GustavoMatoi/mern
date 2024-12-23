import Link from "next/link";

export default function NavBar() {

    return (
        <div className="w-full bg-white p-5 rounded-lg flex justify-around ">
            <button className="linkEventos "><span className="font-bold fontCorNormal">Meus eventos</span></button>
            <button className="linkEventos"><span className="font-bold fontCorNormal">Eventos próximos</span></button>
            <button className="linkEventos"><span className="font-bold fontCorNormal">Eventos do meu interesse</span></button>
        </div>
    )
}