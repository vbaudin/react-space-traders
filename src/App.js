import "./App.css";
import { useEffect, useState } from "react";
import ActionButton from "./components/ActionButton/ActionButton";
import Contracts from "./components/Contracts/Contracts";

const App = () => {
  const [playerData, setPlayerData] = useState();

  const generateRandomString = () => {
    return Math.floor(Math.random() * Date.now()).toString(36);
  };

  useEffect(() => {
    const newPlayer = async () => {
      const callsign = generateRandomString();

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol: callsign,
          faction: "COSMIC",
        }),
      };

      const data = await fetch(
        "https://api.spacetraders.io/v2/register",
        options
      )
        .then((response) => response.json())
        .then((response) => response)
        .catch((err) => console.error(err));

      return data;
    };
    const getPlayer = async () => {
      if (localStorage.getItem("playerData") === null) {
        console.log("On crée un nouveau player !");
        const newPlayerData = await newPlayer(); // Supposons que newPlayer() renvoie un objet avec la structure { data: {...} }
        localStorage.setItem("playerData", JSON.stringify(newPlayerData.data)); // Stockez l'objet complet dans localStorage.
        setPlayerData(newPlayerData.data); // Extrayez l'objet sous la clé 'data' de l'objet stocké.
      } else {
        console.log("On récupère le player depuis localStorage");
        const storedPlayerData = JSON.parse(localStorage.getItem("playerData")); // Récupérez l'objet complet depuis localStorage.
        setPlayerData(storedPlayerData); // Extrayez l'objet sous la clé 'data' de l'objet stocké.
      }
    };
    const fetchData = async () => {
      await getPlayer();
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(playerData);
  }, [playerData]);

  return playerData ? (
    <>
      <div>Space Traders !</div>
      <div>Credits : {playerData.agent.credits}</div>
      <div>Headquarters : {playerData.agent.headquarters} </div>
      <div>Faction : {playerData.faction.name} </div>
      <ActionButton
        action={() => {
          const options = {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + playerData.token,
            },
          };

          fetch(
            "https://api.spacetraders.io/v2/systems/" +
              playerData.ship.nav.systemSymbol +
              "/waypoints/" +
              playerData.ship.nav.waypointSymbol,
            options
          )
            .then((response) => response.json())
            .then((response) => console.log(response.data))
            .catch((err) => console.error(err));
        }}
        name="View Ship[0] Location"
      />
      <Contracts
        contracts={playerData.contract}
        token={playerData.token}
        setPlayerData={setPlayerData}
      />
    </>
  ) : (
    <>Loading...</>
  );
};

export default App;
