import styles from "./FlexWrapper.module.css";

const FlexWrapper = ({ children }) => {
  return <div className={styles.flex}>{children}</div>;
};

export default FlexWrapper;
