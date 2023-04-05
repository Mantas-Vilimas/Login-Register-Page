// --------HOOKS-----------
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { getUser } from "../../services/getUser";

// --------COMPONENTS-----------
import Button from "../../components/Button/Button";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import Heading from "../../components/Heading/Heading";
import Spinner from "../../components/Spinner/Spinner";
import FlexWrapper from "../../components/FlexWrapper/FlexWrapper";
import Paragraph from "../../components/FlexWrapper/Paragraph/Paragraph";

// --------STYLE-----------
import styles from "./HomePage.module.css";
import image from "../../assets/images/home.png";
import Confetti from "react-confetti";

const HomePage = ({ logOut, token }) => {
  const [userData, setUserData] = useState();
  const [error, setError] = useState();
  const [visibility, setVisibility] = useState();
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowsSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const showUserinfo = async () => {
    if (!token) {
      return <Navigate to="/login" />;
    } else {
      setLoading(true);
      try {
        const userFromServer = await getUser();
        setUserData(userFromServer);
        setVisibility(true);
        setError("");
        setShowConfetti(true);
      } catch (error) {
        setVisibility(false);
        setUserData("");
        setError("Can not get your info from server, Sorry. Try again later");
      }
      setLoading(false);
    }
  };

  const handleWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    showUserinfo();
  }, []);

  useEffect(() => {
    window.onresize = () => handleWindowSize();
    showConfetti &&
      setTimeout(() => {
        setShowConfetti(false);
      }, 4000);
  }, [showConfetti]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <FlexWrapper>
      {showConfetti && (
        <Confetti width={windowsSize.width} height={windowsSize.height} />
      )}

      <div>
        <img className={styles.image} src={image} alt="home" />
      </div>
      <FormWrapper>
        <div>
          <Heading text={"Your Account info:"} />

          {loading && <Spinner />}
          {visibility ? (
            <div className={styles.container}>
              <Paragraph label={"Your Email:"} userData={userData.email} />
              <Paragraph
                label={"Your First Name:"}
                userData={userData.firstName}
              />
              <Paragraph
                label={"Your Last Name:"}
                userData={userData.lastName}
              />
              <Paragraph
                label={"Your Address:"}
                userData={
                  userData.address
                    ? `${userData.address}`
                    : " You live in a secret place"
                }
              />
              <Paragraph
                label={"Your Gender:"}
                userData={
                  userData.gender !== "noData"
                    ? `${userData.gender}`
                    : "Your gender is a mystery"
                }
              />
              <Paragraph
                label={"Newsletter subscription:"}
                userData={
                  userData.newsletter
                    ? "You will receive newsletter"
                    : "No newsletter for you"
                }
              />
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
    </FlexWrapper>
  );
};

export default HomePage;
