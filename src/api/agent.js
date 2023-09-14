import axios from "axios";

export const getAgentData = async (token, setAgent) => {
  const options = {
    method: "GET",
    url: "https://api.spacetraders.io/v2/my/agent",
    headers: { Accept: "application/json", Authorization: "Bearer " + token },
  };

  try {
    const { data } = await axios.request(options);
    const { credits, headquarters, startingFaction, symbol } = data.data;
    setAgent({
      credits,
      headquarters,
      startingFaction,
      symbol,
    });
  } catch (error) {
    console.error(error);
  }
};
