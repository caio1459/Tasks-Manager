import { AxiosRequestConfig } from "axios"
import React, { createContext} from "react"
import Cookies from 'js-cookie';

interface IPropsAuthContext {
  headers: AxiosRequestConfig
}

interface IPropsAuthContextProvider {
  children: React.ReactNode
}

export const AuthContext = createContext<IPropsAuthContext>({} as IPropsAuthContext)

export const AuthContextProvider: React.FC<IPropsAuthContextProvider> = ({ children }) => {
  let token = "";

  if (typeof window !== 'undefined') {
    token = Cookies.get("@tasks:token") || ""
  }

  const headers: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (
    <AuthContext.Provider
      value={{
        headers
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}