import { AxiosRequestConfig } from "axios";
import React, { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

interface IPropsAuthContext {
  headers: AxiosRequestConfig;
  setToken: (token: string) => void;
}

interface IPropsAuthContextProvider {
  children: React.ReactNode;
}

export const AuthContext = createContext<IPropsAuthContext>({} as IPropsAuthContext);

export const AuthContextProvider: React.FC<IPropsAuthContextProvider> = ({ children }) => {
  const [headers, setHeaders] = useState<AxiosRequestConfig>({});
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = Cookies.get("@tasks:token");
    if (savedToken) {
      setToken(savedToken);
    }
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
    <AuthContext.Provider value={{ headers, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
