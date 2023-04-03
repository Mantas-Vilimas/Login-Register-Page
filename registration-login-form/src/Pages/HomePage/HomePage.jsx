import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import Heading from "../../components/Heading/Heading";
import styles from "./HomePage.module.css";
import { getList } from "../../services/getUser";
import Spinner from "../../components/Spinner/Spinner";
import image from "./home.png";

const HomePage = ({ logOut, token }) => {
  const [userData, setUserData] = useState();
  const [error, setError] = useState();
  const [visibility, setVisibility] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const showUserinfo = async () => {
    setLoading(true);
    try {
      const userFromServer = await getList();
      setUserData(userFromServer);
      setVisibility(true);
      setError("");
    } catch (error) {
      setVisibility(false);
      setUserData("");
      setError("Can not get your info from server Sorry");
    }
    setLoading(false);
  };

  useEffect(() => {
    showUserinfo();
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <img className={styles.image} src={image} alt="home" />
      </div>
      <FormWrapper>
        <div>
          <Heading text={"Your Account info:"} />

          {loading && <Spinner />}
          {visibility ? (
            <div>
              <div>
                <p className={styles.label}>
                  Your Email: <span>{userData.email}</span>
                </p>
              </div>
              <div>
                <p className={styles.label}>
                  Your First Name: <span>{userData.firstName}</span>
                </p>
              </div>

              <div>
                <p className={styles.label}>
                  Your Last Name: <span>{userData.lastName}</span>{" "}
                </p>
              </div>
              <div>
                <p className={styles.label}>
                  Your address:{""}
                  <span>
                    {userData.address
                      ? `${userData.address}`
                      : " You live in a secret place"}
                  </span>
                </p>
              </div>
              <div>
                <p className={styles.label}>
                  Your gender:{""}
                  <span>
                    {userData.gender !== "noData"
                      ? `${userData.gender}`
                      : "Your gender is a mystery"}
                  </span>
                </p>
              </div>
              <div>
                <p className={styles.label}>
                  Newsletter subscription:{""}
                  <span>
                    {userData.newsletter
                      ? "You will receive newsletter"
                      : "No newsletter for you"}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <p className={styles.error}>{error}</p>
          )}

          {error ? (
            <Button text="Go back" onClick={navigateToLogin} />
          ) : (
            <Button text="Log Out" onClick={handleLogOut} color={"secondary"} />
          )}
        </div>
      </FormWrapper>
    </div>
  );
};

export default HomePage;
