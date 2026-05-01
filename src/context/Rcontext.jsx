import { createContext, useState, useEffect } from "react";

export const Rcont = createContext();

export default function Rcontext({ children }) {
  const [token, setToken] = useState("");

  const value = { token, setToken };

  return <Rcont.Provider value={value}>{children}</Rcont.Provider>;
}
