const ActionButton = ({ name, action, style }) => {
  return (
    <div
      onClick={action}
      className={style}
      style={{
        cursor: "pointer",
        padding: "10px 40px",
        textAlign: "center",
        textDecoration: "none",
        border: "none",
        transition: "background-color 0.3s ease, color 0.3s ease",
        width: "fit-content",
      }}
    >
      {name}
    </div>
  );
};

export default ActionButton;
