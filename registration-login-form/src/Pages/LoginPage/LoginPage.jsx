// --------HOOKS-----------
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/loginUser";
import { useEffect, useState } from "react";

// --------COMPONENTS-----------
import Button from "../../components/Button/Button";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import Input from "../../components/Input/Input";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import Container from "../../components/Container/Container";
import Heading from "../../components/Heading/Heading";
import FlexWrapper from "../../components/FlexWrapper/FlexWrapper";

// --------STYLE-----------
import styles from "./LoginPage.module.css";
import image from "../../assets/images/login.png";

const schema = yup.object({
  email: yup
    .string("Email should be made of letters")
    .email("please provide a valid email address")
    .required("Email adress is required"),
  password: yup
    .string("password should be a string")
    .required("password is required"),
});

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loginError, setLoginError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loginError) {
      return;
    }
    const clearError = () => {
      setLoginError("");
    };

    setTimeout(clearError, 10 * 1000);
  }, [loginError]);

  return (
    <FlexWrapper>
      <div>
        <img className={styles.image} src={image} alt="loginimage" />
      </div>
      <FormWrapper>
        <Heading text="Please log in to page" />
        <div>
          {loginError && <p className={styles.error}>{loginError}</p>}
          <form
            onSubmit={handleSubmit(async (data) => {
              setLoading(true);
              try {
                const res = await loginUser(data);
                onLogin(res.token);
                setLoginError("");
                navigate("/home", { replace: true });
              } catch (err) {
                setLoginError(
                  "User does not exist or you entered bad credentials"
                );
                console.log(err);
              }
              setLoading(false);
            })}
          >
            <Container>
              <Input
                errors={errors}
                label="Email"
                register={register}
                type="email"
                forHtml="email"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
              <Input
                errors={errors}
                label="Password"
                register={register}
                type="password"
                forHtml="password"
                id="password"
                name="password"
                placeholder="Enter your password"
              />
            </Container>

            {loading ? (
              <ButtonLoader />
            ) : (
              <Button
                text={"Login"}
                disabled={loading ? true : false}
                type="submit"
              />
            )}

            <div>or</div>
            <FlexWrapper>
              <Link className="navigation-link" to={"/register"}>
                {"Register"}
              </Link>
            </FlexWrapper>
          </form>
        </div>
      </FormWrapper>
    </FlexWrapper>
  );
};

export default LoginPage;
