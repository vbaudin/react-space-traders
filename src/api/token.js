import axios from "axios";

const generateRandomString = () => {
  return Math.floor(Math.random() * Date.now()).toString(36);
};

export const newGame = async (updateToken, updatePlayer) => {
  const salt = generateRandomString();

  const options = {
    method: "POST",
    url: "https://api.spacetraders.io/v2/register",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    data: { faction: "COSMIC", symbol: salt },
  };

  try {
    const {
      data: { data },
    } = await axios.request(options);
    updateToken(data.token);
    updatePlayer({
      agent: data.agent,
      faction: data.faction,
      contracts: null,
      fleet: null,
      actualMap: null,
    });
  } catch (error) {
    console.error(error);
  }
};

export const quitGame = async (updateToken, updatePlayer) => {
  updateToken(null);
  updatePlayer(null);
};
