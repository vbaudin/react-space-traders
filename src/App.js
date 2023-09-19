import s from "./App.module.css";
import { UseApp } from "./context/AppContext";
import NewGame from "./page/NewGame/NewGame";
import Game from "./page/Game/Game";

const App = () => {
  const { token } = UseApp();

  return <div className={s.container}>{token ? <Game /> : <NewGame />}</div>;
};

export default App;
