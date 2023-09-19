import s from "./ShipInfo.module.css";
import placeholder from "../../assets/placeholder.jpg";

import ShipAction from "../ShipAction/ShipAction";

const ShipInfo = ({ ship }) => {
  return (
    <div className={s.container}>
      <img alt="" className={s.image} src={placeholder} />
      <div>
        <div>{ship.symbol}</div>
        <div>Position : {ship.nav.waypointSymbol}</div>
        <div>
          Fuel : {ship.fuel.current} / {ship.fuel.capacity}
        </div>
        <div>Status : {ship.nav.status}</div>
      </div>
      <div className={s.shipAction}>
        <ShipAction ship={ship} />
      </div>
    </div>
  );
};

export default ShipInfo;
