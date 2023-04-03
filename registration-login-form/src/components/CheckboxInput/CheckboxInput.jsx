import { Link } from "react-router-dom";
import styles from "./CheckboxInput.module.css";
const CheckboxInput = ({
  label,
  type,
  forHtml,
  id,
  name,
  placeholder,
  register,
  errors,
  disabled,
}) => {
  return (
    <div className={`${styles.inputContainer}`}>
      {label && (
        <label className={styles.label} htmlFor={forHtml}>
          <Link className={styles.link} to={`${name}`}>
            {label}
          </Link>
        </label>
      )}
      <input
        disabled={disabled}
        className={`${styles.input} ${
          errors[name] ? styles.error : styles.good
        }`}
        {...register(name)}
        type={type}
        id={id}
        placeholder={placeholder}
      />

      {errors[name] ? (
        <span className={styles.message}>{errors[name].message}</span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CheckboxInput;
