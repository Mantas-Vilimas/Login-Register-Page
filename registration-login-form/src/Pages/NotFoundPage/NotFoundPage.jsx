import { Link } from "react-router-dom";

import styles from "./NotFoundPage.module.css";
import image from "../../assets/images/notfound.gif";

const NotFoundPage = () => {
  return (
    <div>
      <div>
        <img src={image} alt="" className={styles.image}></img>
      </div>
      <h3 className={styles.heading}>You're in the wrong place, boo!</h3>
      <p className={styles.text}>
        Trust the developer when he tells you no... We wish he could, but he
        can't make whatever page you're looking for appear.
      </p>
      <Link className="entry-link" to={"/"}>
        {"Go to the start"}
      </Link>
    </div>
  );
};

export default NotFoundPage;
