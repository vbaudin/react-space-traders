const apiUrl = "https://api.spacetraders.io/v2/";
const token = localStorage.getItem("agentToken");

export const getAuthorizedHeader = (httpMethod, url) => ({
  method: httpMethod,
  url: `${apiUrl + url}`,
  headers: { Accept: "application/json", Authorization: "Bearer " + token },
});
