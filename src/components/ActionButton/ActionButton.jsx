const ActionButton = ({ action, name }) => {
  return <button onClick={action}>{name}</button>;
};

export default ActionButton;
