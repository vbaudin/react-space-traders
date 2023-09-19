import { UseApp } from "../../context/AppContext";
import { listShips } from "../../api/fleet";
import s from "./Fleet.module.css";

import ShipInfo from "../../components/ShipInfo/ShipInfo";
import Minimap from "../../components/Minimap/Minimap";

const Fleet = () => {
  const { player, updatePlayer } = UseApp();

  if (player.fleet === null) {
    listShips(player, updatePlayer);
  }

  return player.fleet === null ? (
    <>Fetching the fleet</>
  ) : (
    <>
      <button
        onClick={() => {
          listShips(player, updatePlayer);
        }}
      >
        Reload Fleet
      </button>
      <div className={s.container}>
        <div className={s.fleet}>
          {player.fleet.map((ship) => (
            <ShipInfo key={ship.symbol} ship={ship} />
          ))}
        </div>
        <div className={s.minimap}>
          <Minimap player={player} />
        </div>
      </div>
    </>
  );
};

export default Fleet;
