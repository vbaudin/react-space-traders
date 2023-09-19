import { getWaypointsInSystem } from "../../api/map";
import { getPlanetImgByType } from "../../utils/assets";
import { UseApp } from "../../context/AppContext";
import s from "./Minimap.module.css";

const Minimap = ({ player }) => {
  const { updatePlayer } = UseApp();

  if (player.actualMap === null) {
    getWaypointsInSystem(player.fleet[0].nav.systemSymbol).then((map) => {
      const newPlayer = { ...player, actualMap: map };
      updatePlayer(newPlayer);
    });
  }

  return player.actualMap ? (
    <div className={s.container}>
      {player.actualMap.map((waypoint) => (
        <div className={s.waypoint} key={waypoint.symbol}>
          <img
            alt=""
            className={s.image}
            src={getPlanetImgByType(waypoint.type)}
          />
          <div>{waypoint.type}</div>
          <div>{waypoint.symbol}</div>
        </div>
      ))}
    </div>
  ) : (
    <div>Map Loading...</div>
  );
};
export default Minimap;
