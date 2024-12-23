"use client"
import { useRouter } from "next/navigation";
import React, { createContext, useState, ReactNode } from "react";

interface User {
  nome: string;
  email: string;
  endereco: {
    rua: string;
    estado: string;
    cidade: string;
  };
  interesses: string[]
  notificacoes: string[]
}

interface UserContextType {
  user: User | null;
  authenticated: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean

}


interface UserProviderProps {
  children: ReactNode;
}
export const UserContext = createContext<UserContextType>({
  user: null,
  authenticated: false,
  login: async () => { },
  logout: () => { },
  isLoading: false
});


export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const login = async (email: string, senha: string) => {
    setIsLoading(true)
    const loginPayload = {
      email,
      senha,
    };

    try {
      const response = await fetch("http://localhost:5000/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginPayload),
      });

      if (!response.ok) {
        throw new Error(`Erro ao fazer login: ${response.status}`);
      }

      const data = await response.json();
      console.log("Usuário logado com sucesso", data);
      localStorage.setItem('email', data.user.email)
      localStorage.setItem('nome', data.user.nome)
      localStorage.setItem('interesses', data.user.interesses)
      localStorage.setItem('rua', data.user.rua)
      localStorage.setItem('cidade', data.user.cidade)
      localStorage.setItem('estado', data.user.estado)
      setAuthenticated(true)
      setUser(data.user)
      router.push("/");


    } catch (error: any) {
      console.error("Ocorreu um erro:", error.toString());
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null);
    setAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, authenticated, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
