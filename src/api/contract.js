import axios from "axios";
import { updateAgentCredits } from "./agent";

export const updateAcceptedContract = (setContracts, setAgent, contract) => {
  contract.accepted = true;

  const storedContracts = JSON.parse(localStorage.getItem("contractsData"));

  const contractIndex = storedContracts.findIndex((e) => e.id === contract.id);

  if (contractIndex !== -1) {
    // Remplacez l'objet à l'indice correspondant par le nouvel objet mis à jour
    storedContracts[contractIndex] = contract;

    // Mettez à jour le tableau dans le local storage avec la nouvelle valeur
    localStorage.setItem("contractsData", JSON.stringify(storedContracts));

    setContracts(null);

    updateAgentCredits(setAgent, contract.terms.payment.onAccepted);
  }
};

export const acceptContract = async (token, contractId) => {
  const options = {
    method: "POST",
    url:
      "https://api.spacetraders.io/v2/my/contracts/" + contractId + "/accept",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  };

  try {
    await axios.request(options);
    console.log("C'est bon ca passe");
    return true;
  } catch (error) {
    console.log("ca passe pas");
    console.error(error);
    return false;
  }
};
