import s from "./Sidebar.module.css";

const SideBar = ({ selectedPage, setSelectedPage }) => {
  return (
    <div className={s.container}>
      <span className={s.menuName}>Menu</span>
      <div>
        <span
          onClick={() => {
            setSelectedPage("home");
          }}
          style={{ cursor: "pointer" }}
        >
          General informations
        </span>
        <span
          onClick={() => {
            setSelectedPage("fleet");
          }}
          style={{ cursor: "pointer" }}
        >
          Fleet
        </span>
        <span
          onClick={() => {
            setSelectedPage("contracts");
          }}
          style={{ cursor: "pointer" }}
        >
          Contracts
        </span>
        <span
          onClick={() => {
            setSelectedPage("map");
          }}
          style={{ cursor: "pointer" }}
        >
          Map
        </span>
      </div>
    </div>
  );
};

export default SideBar;
