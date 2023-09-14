export const formatingDate = (inputDate) => {
  const date = new Date(inputDate);

  const formattedDate = date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris",
  });

  return formattedDate;
};
