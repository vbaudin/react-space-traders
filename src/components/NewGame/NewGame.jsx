import ActionButton from "../ActionButton/ActionButton";
import { createNewToken } from "../../api/token";
import { useState } from "react";

const NewGame = ({ setToken, setAgent, setFleet, setContracts }) => {
  const [loading, setLoading] = useState(false);

  const handleCreateNewToken = async () => {
    setLoading(true);
    try {
      await createNewToken(setToken);
    } catch (error) {
      console.log("Erreur lors de la création du token :", error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <>Nouvel agent en cours de création</>
  ) : (
    <ActionButton
      name="Créer un nouvel agent"
      action={handleCreateNewToken}
      style={{
        backgroundColor: "Green",
        color: "white",
        borderRadius: "5px",
        padding: "10px 20px",
        fontSize: "20px",
        borderColor: "green",
      }}
    />
  );
};

export default NewGame;
