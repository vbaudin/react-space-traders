import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [player, setPlayer] = useState(
    JSON.parse(localStorage.getItem("player"))
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("player", JSON.stringify(player));
    console.log(player);
  }, [player]);

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  const updatePlayer = (updatedPlayer) => {
    setPlayer(updatedPlayer);
  };

  return (
    <AppContext.Provider value={{ token, updateToken, player, updatePlayer }}>
      {children}
    </AppContext.Provider>
  );
};

export const UseApp = () => {
  const setApp = useContext(AppContext);

  if (setApp === undefined) {
    throw new Error("useApp must be used within an AppContext");
  }

  return setApp;
};
