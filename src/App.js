import "./App.css";
import { useEffect, useState } from "react";

import NewGame from "./components/NewGame/NewGame";
import EndGame from "./components/EndGame/EndGame";
// import { getAgentData } from "./api/agent";
import PlayerInfo from "./components/PlayerInfo/PlayerInfo";
// import { getFleet } from "./api/ship";
import ContractsInfos from "./components/ContractsInfo/ContractsInfo";
import FleetInfo from "./components/FleetInfo/FleetInfo";

const App = () => {
  const [token, setToken] = useState(null);
  const [agent, setAgent] = useState(null);
  const [fleet, setFleet] = useState(null);
  const [contracts, setContracts] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("agentToken"));
    setAgent(localStorage.getItem("agentData"));
    setFleet(localStorage.getItem("fleetData"));
    setContracts(localStorage.getItem("contractsData"));
  }, [token, agent, fleet, contracts]);

  return token === null ? (
    <>
      <NewGame setToken={(setToken, setAgent, setFleet, setContracts)} />
    </>
  ) : (
    <>
      <EndGame setToken={setToken} />
      {agent && <PlayerInfo agent={JSON.parse(agent)} />}
      {fleet && (
        <FleetInfo fleet={fleet} setFleet={setFleet} setAgent={setAgent} />
      )}
      {contracts && (
        <ContractsInfos
          token={token}
          contracts={JSON.parse(contracts)}
          setContracts={setContracts}
          setAgent={setAgent}
        />
      )}
    </>
  );
};

export default App;
