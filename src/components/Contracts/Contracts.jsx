import ActionButton from "../ActionButton/ActionButton";

const Contracts = ({ contracts, token, setPlayerData }) => {
  const formatingDate = (inputDate) => {
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

  const refreshPlayerData = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    const updatedData = await fetch(
      "https://api.spacetraders.io/v2/my/agent",
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));

    console.log("updatedData", updatedData);
    setPlayerData(updatedData);
  };

  return (
    <>
      <h1>Contracts</h1>
      <div>Mission Type : {contracts.type}</div>
      <div>DeadlineToAccept : {formatingDate(contracts.deadlineToAccept)} </div>
      <div>Accepted : {contracts.accepted ? "Yes" : "No"}</div>
      <div>Fulfilled : {contracts.fulfilled ? "Yes" : "No"}</div>
      <div>Terms :</div>
      <div>Deadline : {formatingDate(contracts.terms.deadline)}</div>
      <div>Items:</div>
      {contracts.terms.deliver.map((item) => (
        <div key={item.tradeSymbol + item.destinationSymbol}>
          Name: {item.tradeSymbol}, Destination: {item.destinationSymbol},
          unitsRequired: {item.unitsRequired}, unitsFulfilled:{" "}
          {item.unitsFulfilled}
        </div>
      ))}
      <div>Payment</div>
      <div>On Accepted : {contracts.terms.payment.onAccepted} </div>
      <div>On Fulfilled : {contracts.terms.payment.onFulfilled} </div>
      <ActionButton
        name="Accept Mission"
        action={() => {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          };

          fetch(
            "https://api.spacetraders.io/v2/my/contracts/" +
              contracts.id +
              "/accept",
            options
          )
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch((err) => console.error(err));

          refreshPlayerData();
        }}
      />
    </>
  );
};

export default Contracts;
