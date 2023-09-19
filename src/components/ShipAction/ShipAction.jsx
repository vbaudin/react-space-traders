import { useState, useEffect } from "react";
import { orbitShip, dockShip, navigateShip } from "../../api/fleet";
import { UseApp } from "../../context/AppContext";
import { listShips } from "../../api/fleet";
import { calculateInSeconds, calculateTimeRemaining } from "../../utils/date";

const ShipAction = ({ ship }) => {
  const { player, updatePlayer } = UseApp();
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, [ship]);

  const actionMap = {
    orbitShip: orbitShip,
    dockShip: dockShip,
    navigateShip: navigateShip,
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSelectDestination = (event) => {
    setSelectedDestination(event.target.value);
  };

  const handleExecuteClick = () => {
    const action = actionMap[selectedValue];
    action({ ship, destination: selectedDestination }).then(() => {
      listShips(player, updatePlayer);
    });
  };

  return ship.nav.status === "IN_TRANSIT" ? (
    <div>
      The ship will be at destination in{" "}
      {calculateTimeRemaining(currentTime, ship.nav.route.arrival) > 0
        ? calculateInSeconds(
            calculateTimeRemaining(currentTime, ship.nav.route.arrival)
          )
        : // Appeler une fonction ici
          (() => {
            // Placez le code de la fonction que vous souhaitez exécuter ici
            listShips(player, updatePlayer);
            return null; // Vous pouvez renvoyer null ou tout autre élément vide
          })()}
    </div>
  ) : (
    <div className="dropdown-select">
      <select value={selectedValue} onChange={handleSelectChange}>
        <option value="">Select an action</option>
        {ship.nav.status === "DOCKED" && (
          <option value="orbitShip">Orbit Ship</option>
        )}
        {ship.nav.status === "IN_ORBIT" && (
          <option value="dockShip">dockShip</option>
        )}
        {ship.nav.status === "IN_ORBIT" && (
          <option value="navigateShip">navigateShip</option>
        )}
      </select>
      {selectedValue === "navigateShip" && (
        <select value={selectedDestination} onChange={handleSelectDestination}>
          <option value="">Select a destination</option>
          {player.actualMap.map((planet) => (
            <option key={"destination " + planet.symbol} value={planet.symbol}>
              {planet.symbol}
            </option>
          ))}
        </select>
      )}

      <button onClick={handleExecuteClick}>Execute</button>
    </div>
  );
};

export default ShipAction;
