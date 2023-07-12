import "./button.css";

export const Button = ({ type, children, onClick, disabled }) => {
  const buttonStyleMapping = {
    submit: "primary",
    clear: "secondary",
  };
  return (
    <button
      className={`${buttonStyleMapping[type]}`}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      {children}
    </button>
  );
};
