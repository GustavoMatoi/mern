import Image from "next/image";

export default function Apresentacao() {

    return (
        <div className="md:w-[550px] md:h-screen w-screen shadow-md">
            <div className="md:p-5 md:h-3/6 p-5  flex flex-col justify-around bgAzul shadow-md">
                <p className="text-lg font-bold text-white">
                    Descubra novas conexões e oportunidades no TokenlabEvents!
                </p>
                <hr></hr>
                <p className="md:block hidden text-md  text-white">
                    Seja para socializar, expandir sua rede de
                    contatos ou aprender algo novo, aqui é o lugar certo para você.
                    Explore eventos incríveis que reúnem pessoas com interesses parecidos
                    e especialistas prontos para compartilhar conhecimentos.

                </p>
                <p className="text-md   text-white">
                    Venha descobrir novas amizades, projetos inspiradores e até habilidades
                    que podem transformar sua jornada! Estamos aqui para conectar você ao que importa. 😉
                </p>
            </div>
            <div className="hidden p-5 h-3/6 md:flex flex-col items-center bg-white justify-center">
                <p className="text-lg font-bold text-center fonteAzul">
                    Gastronomia, tecnologia, ciência e muito mais. Explore possibilidades infinitas e conecte-se com o futuro!
                </p>

                <Image src="/eventos.png" alt="Descrição da imagem" width={400} height={400} />
            </div>

        </div>
    )
}