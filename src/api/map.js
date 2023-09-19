import axios from "axios";
const token = localStorage.getItem("token");
const auth = "Bearer " + token;

export const getWaypointsInSystem = async (systemSymbol) => {
  const options = {
    method: "GET",
    url:
      "https://api.spacetraders.io/v2/systems/" + systemSymbol + "/waypoints",
    headers: { Accept: "application/json", Authorization: auth },
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
