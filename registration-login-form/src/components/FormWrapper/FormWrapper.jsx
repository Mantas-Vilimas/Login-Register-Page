import styles from "./FormWrapper.module.css";

const FormWrapper = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default FormWrapper;
