const ActionButton = ({ name, action, style }) => {
  return (
    <button onClick={action} style={style}>
      {name}
    </button>
  );
};

export default ActionButton;
