"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cadastroViewModel } from "./cadastroViewModel";
import { TailSpin } from 'react-loader-spinner'


export default function Cadastro() {
    const { isDialogVisible, setErroCadastro, erroMensagem,  interesses, erroCadastro, onSubmit, handleSubmit, register, criarUsuario, errors, handleCheckboxChange, isLoading } = cadastroViewModel()


    return (
        <div className="w-full flex justify-center items-center  mt-5">
            <div className="md:w-6/12 w-screen h-full p-5 shadow-lg">
                {erroCadastro ?
                    <Dialog open={erroCadastro}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Ops....</DialogTitle>
                                <DialogDescription>
                                    {erroMensagem}
                                    <span className="w-fullitems-center flex justify-center">
                                        <Button onClick={() => setErroCadastro(false)} className="bg-red-300 mt-3">
                                            Entendido.
                                        </Button>
                                    </span>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    : null}


                <p className="font-bold fonteAzul text-2xl border-b-4 text-center border-blue-800">Preencha os campos abaixo</p>
                {isDialogVisible ?
                    <Dialog open={true}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Sucesso!</DialogTitle>
                                <DialogDescription>
                                    Sua conta foi criada, você já pode fazer login no nosso sistema!
                                    <span className="w-fullitems-center flex justify-center">
                                        <Button className="bgAzul mt-3">
                                            <Link href={"/login"}>Fazer login.</Link>
                                        </Button>
                                    </span>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    :
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                        <label className="font-bold fonteAzul text-lg">Nome:</label>
                        <Input
                            {...register("nome", { required: true })}
                            placeholder="Informe seu nome"
                            className="bg-white w-8/12 mt-3 "
                        />
                        {errors.nome && <div className="text-red-600">Nome é obrigatório</div>}

                        <label className="font-bold fonteAzul text-lg">Email:</label>
                        <Input
                            {...register("email", { required: true })}
                            placeholder="Informe seu email"
                            className="bg-white w-8/12 mt-3 "
                        />
                        {errors.email && <div className="text-red-600">Email é obrigatório</div>}

                        <label className="font-bold fonteAzul text-lg">Senha:</label>
                        <Input
                            {...register("senha", { required: true })}
                            placeholder="Senha"
                            type="password"
                            className="bg-white w-8/12 mt-3 "
                        />
                        {errors.senha && <div className="text-red-600">Senha é obrigatória</div>}

                        <label className="font-bold fonteAzul text-lg block">Endereço:</label>
                        <label className="font-bold fonteAzul text-xs block">Usaremos essas informações para filtrar eventos próximos à você</label>
                        <label className="font-bold fonteAzul text-lg">Rua:</label>
                        <Input
                            {...register("endereco.rua", { required: true })}
                            placeholder="Informe sua rua"
                            className="bg-white w-8/12 mt-3 mb-1"
                        />
                        {errors.endereco && <div className="text-red-600">Rua é obrigatório</div>}

                        <label className="font-bold fonteAzul text-lg">Cidade:</label>
                        <Input
                            {...register("endereco.cidade", { required: true })}
                            placeholder="Informe sua cidade"
                            className="bg-white w-8/12 mt-3 mb-1"
                        />
                        {errors.endereco && <div className="text-red-600">Cidade é obrigatório</div>}

                        <label className="font-bold fonteAzul text-lg">Estado:</label>
                        <Input
                            {...register("endereco.estado", { required: true })}
                            placeholder="Estado"
                            className="bg-white w-8/12 mt-3 mb-1"
                        />
                        {errors.endereco && <div className="text-red-600">Estado é obrigatório</div>}

                        <div>
                            <div >
                                <label className="font-bold fonteAzul text-lg ">Interesses:</label>
                            </div>

                            <div>
                                <Checkbox id="ciencia" onClick={() => handleCheckboxChange('ciencia')} />
                                <label htmlFor="ciencia" className="fonteAzul text-sm font-medium leading-none">
                                    Ciência
                                </label>

                            </div>
                            <div>
                                <Checkbox id="culinaria" onClick={() => interesses.push('culinaria')} />
                                <label
                                    htmlFor="culinaria"
                                    className="fonteAzul text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Culinária
                                </label>
                            </div>
                            <div>
                                <Checkbox id="arte" onClick={() => interesses.push('arte')} />
                                <label
                                    htmlFor="arte"
                                    className="fonteAzul text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Arte
                                </label>
                            </div>
                            <div>
                                <Checkbox id="ambiente" onClick={() => interesses.push('ambiente')} />
                                <label
                                    htmlFor="ambiente"
                                    className="fonteAzul text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Meio-ambiente
                                </label>
                            </div>
                            <div>
                                <Checkbox id="geek" onClick={() => interesses.push('geek')} />
                                <label
                                    htmlFor="geek"
                                    className="fonteAzul text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Geek
                                </label>
                            </div>
                            <div>
                                <Checkbox id="gym" onClick={() => interesses.push('fitness')} />
                                <label
                                    htmlFor="gym"
                                    className="fonteAzul text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Fitness
                                </label>
                            </div>
                            <div className="mb-4">
                                <Checkbox id="tech" onClick={() => interesses.push('tecnologia')} />
                                <label
                                    htmlFor="tech"
                                    className="fonteAzul text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Tecnologia
                                </label>
                            </div>
                        </div>

                        <p className="font-bold fonteAzul text-2xl border-b-4 text-center border-blue-800" />

                        <div className="justofy-between mt-5 flex flex-col items-center">
                            <Button disabled={isLoading} type="submit" className="bgAzul w-6/12">{isLoading ? <TailSpin
                                visible={true}
                                height="100"
                                width="100"
                                color="#4fa94d"
                                ariaLabel="tail-spin-loading"
                                radius="2"
                                wrapperStyle={{}}
                                onClick={()=>cadastrarUsuario()}
                                wrapperClass=""
                            /> : <p>CRIAR CONTA</p>}</Button>

                            <div className="flex mt-10 justify-around">
                                <p>Já possui conta?</p>
                                <Link href="/login">
                                    <p className="fonteAzul font-bold hover:border-b-2 hover:border-blue-600">Faça login agora</p>
                                </Link>
                            </div>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
}
