import JsonPrettify from "react-json-prettify";
import {
  findBuyableShips,
  isShipOnWaypoint,
  orbitShip,
  dockShip,
  getShipInOrbit,
  navigateShip,
  getShip,
  purchaseShip,
} from "../../api/ship";
import ActionButton from "../ActionButton/ActionButton";
import { useState } from "react";

const easyCss = {
  backgroundColor: "Green",
  color: "white",
  borderRadius: "5px",
  padding: "5px 10px",
  fontSize: "20px",
  borderColor: "green",
};
const badCss = {
  backgroundColor: "Red",
  color: "white",
  borderRadius: "5px",
  padding: "5px 10px",
  fontSize: "20px",
  borderColor: "Red",
};

const FleetInfo = ({ fleet, setFleet, setAgent }) => {
  const parsedFleet = JSON.parse(fleet);
  const [buyableShips, setBuyableShips] = useState();

  const handleFindBuyableShips = async () => {
    const result = await findBuyableShips();
    setBuyableShips(result);
  };

  const shipToSend = getShipInOrbit();

  return (
    <>
      {/* <JsonPrettify json={buyableShips} /> */}

      <div>Ships</div>
      <div style={{ display: "flex", columnGap: "10px" }}>
        {parsedFleet.map((ship) => (
          <div key={ship.symbol}>
            <div>Ship symbol : {ship.symbol}</div>
            <div>
              Crew : {ship.crew.current} / {ship.crew.capacity}
            </div>
            <div>
              Fuel : {ship.fuel.current} / {ship.fuel.capacity}
            </div>
            <div>
              Cargo : {ship.cargo.units} / {ship.cargo.capacity}
            </div>
            <div>Position : {ship.nav.waypointSymbol}</div>
            <div>
              Status : {ship.nav.status}{" "}
              {ship.nav.status === "DOCKED" ? (
                <ActionButton
                  name="Orbit Ship"
                  style={easyCss}
                  action={() => {
                    orbitShip(ship, setFleet);
                  }}
                />
              ) : null}
              {ship.nav.status === "IN_ORBIT" ? (
                <ActionButton
                  name="Dock Ship"
                  style={easyCss}
                  action={() => {
                    dockShip(ship, setFleet);
                  }}
                />
              ) : null}
            </div>
            <ActionButton
              name="Refresh"
              style={easyCss}
              action={() => {
                getShip(ship, setFleet);
              }}
            />
          </div>
        ))}
      </div>
      <div>Buyable Ships</div>
      <div>
        <ActionButton
          name="Show Buyable Ships"
          action={handleFindBuyableShips}
          style={{
            backgroundColor: "Green",
            color: "white",
            borderRadius: "5px",
            padding: "5px 20px",
            fontSize: "20px",
            borderColor: "green",
          }}
        />
        <ActionButton
          name="X"
          action={() => {
            setBuyableShips();
          }}
          style={{
            backgroundColor: "grey",
            color: "white",
            borderRadius: "5px",
            padding: "5px 20px",
            fontSize: "20px",
            borderColor: "green",
          }}
        />
      </div>
      {buyableShips &&
        buyableShips.map((shipyard) => (
          <div key={shipyard.symbol}>
            <div>Shipyard symbol : {shipyard.symbol}</div>
            <div>Buyable Ships : </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                padding: "10px",
                columnGap: "10px",
                rowGap: "10px",
              }}
            >
              {shipyard.ships.map((ship) => (
                <div key={ship.type + ship.name}>
                  <div>Ship name : {ship.name}</div>
                  <div>Ship type : {ship.type}</div>
                  <div>Price : {ship.purchasePrice}</div>
                  {isShipOnWaypoint(shipyard.symbol) ? (
                    <ActionButton
                      name="Buy"
                      style={{
                        backgroundColor: "Green",
                        color: "white",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        fontSize: "20px",
                        borderColor: "green",
                      }}
                      action={() => {
                        purchaseShip(ship, shipyard.symbol, setFleet, setAgent);
                      }}
                    />
                  ) : (
                    <ActionButton
                      name="Send a ship"
                      style={shipToSend ? easyCss : badCss}
                      action={
                        shipToSend
                          ? () => {
                              navigateShip(
                                shipToSend,
                                shipyard.symbol,
                                setFleet
                              );
                            }
                          : () => {}
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
    </>
  );
};

export default FleetInfo;
