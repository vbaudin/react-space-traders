import ActionButton from "../ActionButton/ActionButton";
import s from "./Header.module.css";
import { UseApp } from "../../context/AppContext";
import { quitGame } from "../../api/token";

const Header = () => {
  const {
    player: { agent },
    updatePlayer,
    updateToken,
  } = UseApp();
  return (
    <div className={s.container}>
      <div></div>
      <div className={s.textContainer}>
        <span>Name : {agent.symbol}</span>
        <span>Headquarters Position : {agent.headquarters}</span>
        <span>{agent.credits} credits</span>
      </div>
      <ActionButton
        name="X"
        style={s.quitGameButton}
        action={() => quitGame(updateToken, updatePlayer)}
      />
    </div>
  );
};

export default Header;
