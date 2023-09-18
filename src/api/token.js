import axios from "axios";

const generateRandomString = () => {
  return Math.floor(Math.random() * Date.now()).toString(36);
};

export const createNewToken = async (
  setToken,
  setAgent,
  setFleet,
  setContracts
) => {
  const salt = generateRandomString();

  const options = {
    method: "POST",
    url: "https://api.spacetraders.io/v2/register",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    data: { faction: "COSMIC", symbol: salt },
  };

  // console.log("salt : ", salt, "options : ", options);

  try {
    const {
      data: { data },
    } = await axios.request(options);
    // console.log(data);
    const { token, agent, contract, ship } = data;
    const contracts = [contract];
    const fleet = [ship];

    localStorage.setItem("agentToken", token);
    localStorage.setItem("agentData", JSON.stringify(agent));
    localStorage.setItem("contractsData", JSON.stringify(contracts));
    localStorage.setItem("fleetData", JSON.stringify(fleet));
    setToken(token);
  } catch (error) {
    console.error(error);
  }
};
