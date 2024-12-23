import { Endereco, User } from "@/types";
import { useReducer, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    email: string;
    senha: string;
    nome: string;
    interesses: string[];
    endereco: Endereco
};

const initialState = {
    interesses: [] as string[],
    isLoading: false,
    isDialogVisible: false,
    erroCadastro: false,
    erroMensagem: false
}

type Action =
    | {type: 'SET_INTERESSES'; payload: string[]}
    | {type: 'SET_IS_LOADING'; payload: boolean}
    | {type: 'SET_IS_DIALOG_VISIBLE'; payload: boolean}
    | {type: 'SET_ERRO_CADASTRO'; payload: boolean}
    | {type: 'SET_ERRO_MENSAGEM'; payload: string}


const reducer = (state: typeof initialState, action: Action) => {
    switch(action.type) {
        case 'SET_INTERESSES' : 
            return {...state, interesses: action.payload}
        case 'SET_IS_LOADING':
            return {...state, isLoading: action.payload}
        case 'SET_IS_DIALOG_VISIBLE':
            return {...state, isDialogVisible: action.payload}
        case 'SET_ERRO_CADASTRO': 
            return {...state, erroCadstro: action.payload}
        case 'SET_ERRO_MENSAGEM':
            return {...state, erroMensagem: action.payload }
    }
}
export const cadastroViewModel = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setInteresses = (interesses: string[]) => {
        dispatch({type: 'SET_INTERESSES', payload: interesses})
    }

    const setIsLoading = (isLoading: boolean) => {
        dispatch({type: 'SET_IS_LOADING', payload: isLoading})
    }

    const setIsDialogVisible = (isLoadingVisible: boolean) => {
        dispatch({type: 'SET_IS_DIALOG_VISIBLE', payload: isLoadingVisible})
    }

    const setErroCadastro = (erroCadastro: boolean) => {
        dispatch({type: 'SET_ERRO_CADASTRO', payload: erroCadastro})
    }

    const setErroMensagem = (erroMensagem: string) => {
        dispatch({type: 'SET_ERRO_MENSAGEM', payload: erroMensagem})
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit = async (data: User) => {
        const dadosComInteresses: User = {
            ...data,
            interesses: state.interesses,
        };
        console.log('dadosComInteresses', dadosComInteresses)
        criarUsuario(dadosComInteresses);
    };

    const handleCheckboxChange = (interesse: string) => {
        const novosInteresses = state.interesses.includes(interesse)
            ? state.interesses.filter((item) => item !== interesse)
            : [...state.interesses, interesse];

        setInteresses(novosInteresses);
    };

    const criarUsuario = async (userData: User) => {
        setIsLoading(true);

        const userPayload = {
            nome: userData.nome,
            email: userData.email,
            senha: userData.senha,
            rua: userData.endereco.rua,
            cidade: userData.endereco.cidade,
            estado: userData.endereco.estado,
            interesses: userData.interesses
        };

        try {
            const response = await fetch(`http://localhost:5000/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userPayload),
            });


            console.log(JSON.stringify(userPayload))
            console.log("response.status", response.status);

            if (response.status === 409) {
                setErroCadastro(true);
                setErroMensagem("Este e-mail já está cadastrado. Tente outro.");
                throw new Error('Erro na requisição: ' + response.statusText);
            }

            if (!response.ok) {
                setErroCadastro(true);
                setErroMensagem(`Ocorreu um erro ao tentar criar o usuário, tente novamente mais tarde.`);
                throw new Error('Erro na requisição: ' + response.statusText);
            }

            const data = await response.json();
            console.log("Usuário criado!", data);
            setIsLoading(false);
            setIsDialogVisible(true);
        } catch (error) {
            console.log("Erro ao criar usuário: ", error);
            setIsLoading(false);
            setErroCadastro(true);
        }
    }


    return {
        ...state,
        setInteresses,
        criarUsuario,
        onSubmit,
        register,
        handleSubmit,
        watch,
        errors,
        handleCheckboxChange,
        setErroCadastro,
    };
};