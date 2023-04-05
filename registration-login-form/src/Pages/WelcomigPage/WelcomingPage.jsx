import { Link } from "react-router-dom";
import { routes } from "../../constants/routes";
import styles from "./WelcomingPage.module.css";
import image from "./welcoming.png";
import FlexWrapper from "../../components/FlexWrapper/FlexWrapper";

const WelcomingPage = () => {
  return (
    <div className={styles.wrapper}>
      <FlexWrapper>
        <FlexWrapper>
          <h1 className={styles.typewriter}> Welcome to my app</h1>
        </FlexWrapper>

        <p className={styles.message}>
          You need to login/register to see the magic!
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
      </FlexWrapper>

      <div>
        <img className={styles.image} src={image} alt="people" />
      </div>
    </div>
  );
};

export default WelcomingPage;
