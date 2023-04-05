import styles from "./Paragraph.module.css";

const Paragraph = ({ label, userData }) => {
  return (
    <p className={styles.label}>
      {label}
      <span>{userData}</span>
    </p>
  );
};

export default Paragraph;
