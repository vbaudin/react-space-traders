import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [agent, setAgent] = useState(null);
  const [fleet, setFleet] = useState(null);
  const [contracts, setContracts] = useState(null);

  return <AppContext.Provider>{children}</AppContext.Provider>;
};

export const UseApp = () => {
  const setApp = useContext(AppContext);

  if (setApp === undefined) {
    throw new Error("useApp must be used within an AppContext");
  }

  return setApp;
};
