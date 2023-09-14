import ActionButton from "../ActionButton/ActionButton";

const EndGame = ({ setToken }) => {
  return (
    <ActionButton
      name="Abandonner la partie"
      action={() => {
        localStorage.removeItem("agentToken");
        localStorage.removeItem("agentData");
        localStorage.removeItem("fleetData");
        localStorage.removeItem("contractsData");
        setToken(null);
      }}
      style={{
        backgroundColor: "Red",
        color: "white",
        borderRadius: "5px",
        padding: "10px 20px",
        fontSize: "20px",
        borderColor: "green",
      }}
    />
  );
};

export default EndGame;
