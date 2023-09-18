import axios from "axios";

export const getAgentData = async (token) => {
  const options = {
    method: "GET",
    url: "https://api.spacetraders.io/v2/my/agent",
    headers: { Accept: "application/json", Authorization: "Bearer " + token },
  };

  try {
    const { data } = await axios.request(options);
    const { credits, headquarters, startingFaction, symbol } = data.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateAgentCredits = async (setAgent, creditsToAdd) => {
  const storedAgentData = JSON.parse(localStorage.getItem("agentData"));

  const { credits, ...otherAgentDatas } = storedAgentData;

  const newCredits = credits + creditsToAdd;

  const newAgentData = { ...otherAgentDatas, credits: newCredits };

  localStorage.setItem("agentData", JSON.stringify(newAgentData));

  setAgent(null);
};
