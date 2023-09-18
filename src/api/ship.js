import axios from "axios";

import { getAuthorizedHeader } from "./http.js";

export const getFleet = async (token) => {
  const options = getAuthorizedHeader("GET", "my/ships");

  try {
    const { data } = await axios.request(options);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const findShipyards = async (systemSymbol) => {
  const endUrl = "systems/" + systemSymbol + "/waypoints";
  const options = getAuthorizedHeader("GET", endUrl);

  try {
    const {
      data: { data },
    } = await axios.request(options);

    const shipyardElements = data.filter((element) =>
      element.traits.some((trait) => trait.symbol === "SHIPYARD")
    );

    // console.log("Find a shipyard", shipyardElements);
    return shipyardElements;
  } catch (error) {
    console.error(error);
  }
};

const findShipsIntoShipyard = async (systemSymbol, shipyardSymbol) => {
  const token = localStorage.getItem("agentToken");
  const options = {
    method: "GET",
    url:
      "https://api.spacetraders.io/v2/systems/" +
      systemSymbol +
      "/waypoints/" +
      shipyardSymbol +
      "/shipyard",
    headers: { Accept: "application/json", Authorization: "Bearer " + token },
  };

  try {
    const {
      data: { data },
    } = await axios(options);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const findBuyableShips = async () => {
  const token = localStorage.getItem("agentToken");
  const agentData = JSON.parse(localStorage.getItem("agentData"));

  const { headquarters } = agentData;
  const systemSymbol = headquarters.split("-").slice(0, 2).join("-");

  const shipyardElements = await findShipyards(systemSymbol);

  const shipyardPromises = shipyardElements.map(async (element) => {
    const result = await findShipsIntoShipyard(systemSymbol, element.symbol);
    return result;
  });

  const shipsByShipyard = await Promise.all(shipyardPromises);

  return shipsByShipyard;
};

export const getShipInOrbit = () => {
  const fleetData = JSON.parse(localStorage.getItem("fleetData"));
  const orbitFleet = fleetData.map((ship) =>
    ship.nav.status === "IN_ORBIT" ? ship : null
  );
  const filteredOrbitFleet = orbitFleet.filter((ship) => ship !== null);

  const result =
    filteredOrbitFleet.length !== 0 ? filteredOrbitFleet[0] : false;
  return result;
};

export const isShipOnWaypoint = (waypoint) => {
  const fleet = JSON.parse(localStorage.getItem("fleetData"));

  const result = fleet.map((ship) =>
    ship.nav.waypointSymbol === waypoint ? ship.symbol : null
  );

  const filteredResult = result.filter((e) => e !== null);

  if (filteredResult.length === 0) {
    return false;
  } else {
    return filteredResult;
  }
};

export const orbitShip = async (ship, setFleet) => {
  const token = localStorage.getItem("agentToken");
  const fleetData = JSON.parse(localStorage.getItem("fleetData"));
  const shipSymbolToModify = ship.symbol;
  const shipToModify = fleetData.find(
    (ship) => ship.symbol === shipSymbolToModify
  );

  const options = {
    method: "POST",
    url: "https://api.spacetraders.io/v2/my/ships/" + ship.symbol + "/orbit",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  };

  try {
    const {
      data: { data },
    } = await axios.request(options);
    shipToModify.nav = data.nav;
    localStorage.setItem("fleetData", JSON.stringify(fleetData));
    setFleet();
  } catch (error) {
    console.error(error);
  }
};

export const dockShip = async (ship, setFleet) => {
  const token = localStorage.getItem("agentToken");
  const fleetData = JSON.parse(localStorage.getItem("fleetData"));
  const shipSymbolToModify = ship.symbol;
  const shipToModify = fleetData.find(
    (ship) => ship.symbol === shipSymbolToModify
  );

  const options = {
    method: "POST",
    url: "https://api.spacetraders.io/v2/my/ships/" + ship.symbol + "/dock",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  };

  try {
    const {
      data: { data },
    } = await axios.request(options);
    shipToModify.nav = data.nav;
    localStorage.setItem("fleetData", JSON.stringify(fleetData));
    setFleet();
  } catch (error) {
    console.error(error);
  }
};

export const navigateShip = async (ship, waypoint, setFleet) => {
  const token = localStorage.getItem("agentToken");
  const fleetData = JSON.parse(localStorage.getItem("fleetData"));
  const shipSymbolToModify = ship.symbol;
  const shipToModify = fleetData.find(
    (ship) => ship.symbol === shipSymbolToModify
  );

  const options = {
    method: "POST",
    url: "https://api.spacetraders.io/v2/my/ships/" + ship.symbol + "/navigate",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    data: { waypointSymbol: waypoint },
  };

  try {
    const {
      data: { data },
    } = await axios.request(options);
    shipToModify.nav = data.nav;
    shipToModify.fuel = data.fuel;
    localStorage.setItem("fleetData", JSON.stringify(fleetData));
    setFleet();
  } catch (error) {
    console.error(error);
  }
};

export const getShip = async (ship, setFleet) => {
  const token = localStorage.getItem("agentToken");
  const fleetData = JSON.parse(localStorage.getItem("fleetData"));
  const shipSymbolToModify = ship.symbol;
  const shipIndexToModify = fleetData.findIndex(
    (ship) => ship.symbol === shipSymbolToModify
  );

  const options = {
    method: "GET",
    url: "https://api.spacetraders.io/v2/my/ships/" + shipSymbolToModify,
    headers: { Accept: "application/json", Authorization: "Bearer " + token },
  };

  try {
    const {
      data: { data },
    } = await axios.request(options);
    fleetData[shipIndexToModify] = data;
    localStorage.setItem("fleetData", JSON.stringify(fleetData));
    setFleet();
  } catch (error) {
    console.error(error);
  }
};

export const purchaseShip = async (ship, waypoint, setFleet, setAgent) => {
  const token = localStorage.getItem("agentToken");
  const fleetData = JSON.parse(localStorage.getItem("fleetData"));

  const options = {
    method: "POST",
    url: "https://api.spacetraders.io/v2/my/ships",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    data: { shipType: ship.type, waypointSymbol: waypoint },
  };

  try {
    const {
      data: { data },
    } = await axios.request(options);
    const newFleet = [...fleetData, data.ship];
    localStorage.setItem("fleetData", JSON.stringify(newFleet));
    localStorage.setItem("agentData", JSON.stringify(data.agent));
    setFleet();
    setAgent();
  } catch (error) {
    console.error(error);
  }
};
