import { Link } from "react-router-dom";

import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div>
      <div>
        <img
          src="https://uploads-ssl.webflow.com/6195d42211697f1d00f00c31/61d13076bda4b015f3d7a13e_giphy%20(1).gif"
          alt=""
          className={styles.image}
        ></img>
      </div>
      <h3 className={styles.heading}>You're in the wrong place, boo!</h3>
      <p className={styles.text}>
        Trust the developer when he tells you no... We wish he could, but he
        can't make whatever page you're looking for appear.
      </p>
      <Link className="entry-link" to={"/"}>
        {"Take me back home"}
      </Link>
    </div>
  );
};

export default NotFoundPage;
