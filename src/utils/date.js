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

export const calculateTimeRemaining = (currentTime, arrivalTime) => {
  const timeDifference = new Date(arrivalTime) - currentTime;

  return timeDifference;
};

export const calculateInSeconds = (currentTimer) => {
  const hoursRemaining = Math.floor(currentTimer / 3600000);
  const minutesRemaining = Math.floor((currentTimer % 3600000) / 60000);
  const secondsRemaining = Math.floor((currentTimer % 60000) / 1000);

  return `${hoursRemaining}h ${minutesRemaining}mn ${secondsRemaining}s`;
};
