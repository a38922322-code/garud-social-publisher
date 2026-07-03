import React, { createContext, useContext, useState } from 'react'

const AuthCtx = createContext();

export function AuthProvider({ children }){
  const tokenLocal = localStorage.getItem('garud_token');
  const [token, setToken] = useState(tokenLocal);

  const login = (t) => { localStorage.setItem('garud_token', t); setToken(t); }
  const logout = () => { localStorage.removeItem('garud_token'); setToken(null); }

  return <AuthCtx.Provider value={{ token, login, logout }}>{children}</AuthCtx.Provider>
}

export const useAuth = () => useContext(AuthCtx);
