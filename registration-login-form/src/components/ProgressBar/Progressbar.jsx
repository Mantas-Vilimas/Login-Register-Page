import styles from "./ProgressBar.module.css";

const ProgressBar = ({ step, lastStep, error }) => {
  console.log(error);
  return (
    <div className={styles.container}>
      <div
        className={`${styles.bar1} ${
          step === 1 ? styles.progress : styles.empty
        } `}
      >
        <span className={`${step === 1 ? styles.black : styles.white}`}>
          Credentials
        </span>
      </div>
      <div
        className={`${styles.bar2} ${styles.last}  ${
          lastStep && !error ? styles.empty : styles.progress
        }`}
      >
        <span className={`${!lastStep || error ? styles.black : styles.white}`}>
          Personal Data
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
