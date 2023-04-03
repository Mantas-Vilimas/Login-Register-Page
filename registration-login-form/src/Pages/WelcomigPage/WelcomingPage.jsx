import { Link } from "react-router-dom";
import { routes } from "../../constants/routes";
import styles from "./WelcomingPage.module.css";
import image from "./welcoming.png";

const WelcomingPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.typewriter}>
          <h1 className={styles.heading}> Welcome to my app</h1>
        </div>

        <p className={styles.message}>
          You need to login/register to gain access
        </p>
        <div className={styles.container}>
          <Link className="entry-link" to={routes.loginPage}>
            Login
          </Link>
          or
          <Link className="entry-link" to={routes.registerPage}>
            Register
          </Link>
        </div>
      </div>
      <div>
        <img className={styles.image} src={image} />
      </div>
    </div>
  );
};

export default WelcomingPage;
