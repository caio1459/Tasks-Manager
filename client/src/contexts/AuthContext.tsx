import { AxiosRequestConfig } from "axios"
import React, { createContext, useEffect, useState } from "react"
import Cookies from 'js-cookie';

interface IPropsAuthContext {
  headers: AxiosRequestConfig
}

interface IPropsAuthContextProvider {
  children: React.ReactNode
}

export const AuthContext = createContext<IPropsAuthContext>({} as IPropsAuthContext)

export const AuthContextProvider: React.FC<IPropsAuthContextProvider> = ({ children }) => {
  const [headers, setHeaders] = useState<AxiosRequestConfig>({})
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("@tasks:token");
    if (token) {
      setToken(token);
    };
  }, []);

  useEffect(() => {
    if (token) {
      setHeaders({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }, [token]);

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