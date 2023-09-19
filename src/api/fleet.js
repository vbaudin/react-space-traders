import axios from "axios";
const token = localStorage.getItem("token");
const auth = "Bearer " + token;

export const listShips = async (player, updatePlayer) => {
  const options = {
    method: "GET",
    url: "https://api.spacetraders.io/v2/my/ships",
    headers: { Accept: "application/json", Authorization: auth },
  };

  try {
    const {
      data: { data },
    } = await axios.request(options);
    const newPlayer = { ...player, fleet: data };
    updatePlayer(newPlayer);
  } catch (error) {
    console.error(error);
  }
};

export const orbitShip = async ({ ship }) => {
  console.log(ship.symbol);
  const options = {
    method: "POST",
    url: "https://api.spacetraders.io/v2/my/ships/" + ship.symbol + "/orbit",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: auth,
    },
  };

  try {
    const {
      data: { data },
    } = await axios.request(options);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const dockShip = async ({ ship }) => {
  const options = {
    method: "POST",
    url: "https://api.spacetraders.io/v2/my/ships/" + ship.symbol + "/dock",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: auth,
    },
  };

  try {
    const {
      data: { data },
    } = await axios.request(options);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const navigateShip = async ({ ship, destination }) => {
  console.log(destination);
  const options = {
    method: "POST",
    url: "https://api.spacetraders.io/v2/my/ships/" + ship.symbol + "/navigate",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: auth,
    },
    data: { waypointSymbol: destination },
  };

  try {
    const {
      data: { data },
    } = await axios.request(options);
    return data;
  } catch (error) {
    console.error(error);
  }
};
