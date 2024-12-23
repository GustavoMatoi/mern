"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { CSSProperties, useContext, useEffect } from "react";
import { UserContext } from "@/app/context/UserProvider";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";


type Inputs = {
  email: string;
  senha: string;
};

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();


  const { login, authenticated, isLoading } = useContext(UserContext);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    loginUser(data);
  };

  const loginUser = (data: Inputs) => {
    login(data.email, data.senha)
  }

  return (
    <div className="w-full flex justify-center items-center md:mt-[100px]">
      <div className="md:w-6/12 w-11/12  h-4/6 p-5 shadow-lg">
        <p className="font-bold fonteAzul text-lg md:text-2xl border-b-4 text-center border-blue-800">
          Preencha as informações de login
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <label className="font-bold fonteAzul text-lg">Email:</label>
          <Input
            {...register("email", { required: "email é obrigatório" })}
            placeholder="Informe seu email"
            className="bg-white w-8/12 mt-3 mb-5"
          />
          {errors.email && <div>{errors.email.message}</div>}

          <label className="font-bold fonteAzul text-lg">Senha:</label>
          <Input
            {...register("senha", { required: "Senha é obrigatória" })}
            placeholder="Senha"
            type="password"
            className="bg-white w-8/12 mt-3 mb-5"
          />
          {errors.senha && <div>{errors.senha.message}</div>}

          <div className="justify-between mt-5 flex flex-col items-center">
            <Button type="submit" className="bgAzul w-6/12">
              <LogIn /> ENTRAR
            </Button>

            {isLoading && <ClipLoader
              color={'blue'}
              loading={isLoading}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />}

            <div className="flex mt-10 justify-around w-full">
              <p>Não possui conta?</p>
              <Link href="/cadastro">
                <p className="fonteAzul font-bold hover:border-b-2 hover:border-blue-600">
                  Cadastre-se agora gratuitamente!
                </p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
