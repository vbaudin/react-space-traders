const PlayerInfo = ({ agent }) => {
  const { credits, headquarters, startingFaction, symbol } = agent;
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div> Symbol : {symbol}</div>
      <div> Faction : {startingFaction}</div>
      <div> Headquarters : {headquarters}</div>
      <div> Credits : {credits}</div>
    </div>
  );
};

export default PlayerInfo;
