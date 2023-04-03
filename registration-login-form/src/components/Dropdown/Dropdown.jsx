import styles from "./Dropdown.module.css";

const Dropdown = ({ label, name, id, htmlFor, register, errors, disabled }) => {
  return (
    <div className={styles.dropdown}>
      {label && (
        <label className={styles.label} htmlFor={htmlFor}>
          {label}
        </label>
      )}

      <select
        disabled={disabled}
        className={styles.input}
        {...register(name)}
        id={id}
      >
        <option value="noData">Select your gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
      </select>

      {errors[name] ? <span>{errors[name].message}</span> : <></>}
    </div>
  );
};

export default Dropdown;
