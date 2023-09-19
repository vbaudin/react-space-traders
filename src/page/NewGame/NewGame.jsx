import s from "./NewGame.module.css";
import ActionButton from "../../components/ActionButton/ActionButton";

import { UseApp } from "../../context/AppContext";
import { newGame } from "../../api/token";

const NewGame = () => {
  const { updateToken, updatePlayer } = UseApp();
  return (
    <div className={s.container}>
      <ActionButton
        name="New Game"
        style={s.newGameButton}
        action={() => newGame(updateToken, updatePlayer)}
      />
    </div>
  );
};

export default NewGame;
