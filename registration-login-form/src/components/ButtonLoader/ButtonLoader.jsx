import styles from "./ButtonLoader.module.css";

const ButtonLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default ButtonLoader;
