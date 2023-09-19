import { useState } from "react";
import s from "./Game.module.css";

import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import Fleet from "../Fleet/Fleet";

const Game = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  return (
    <div className={s.container}>
      <Header />
      <div className={s.main}>
        <SideBar
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
        <div className={s.current}>
          {selectedPage === "home" && <div>Home</div>}
          {selectedPage === "fleet" && <Fleet />}
          {selectedPage === "contracts" && <div>Contracts</div>}
          {selectedPage === "map" && <div>Map</div>}
        </div>
      </div>
    </div>
  );
};

export default Game;
