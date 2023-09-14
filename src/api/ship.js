import axios from "axios";

export const getFleet = async (token) => {
  const options = {
    method: "GET",
    url: "https://api.spacetraders.io/v2/my/ships",
    headers: { Accept: "application/json", Authorization: "Bearer " + token },
  };

  try {
    const { data } = await axios.request(options);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
