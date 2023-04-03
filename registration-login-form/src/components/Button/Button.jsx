import styles from "./Button.module.css";

const Button = ({ text, onClick, type, disabled, color }) => {
  return (
    <button
      className={`${styles.button} ${styles[color]}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
