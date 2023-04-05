// --------HOOKS-----------
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/registerUser";
import { useEffect, useState } from "react";

// --------COMPONENTS-----------
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Dropdown from "../../components/Dropdown/Dropdown";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import Container from "../../components/Container/Container";
import CheckboxInput from "../../components/CheckboxInput/CheckboxInput";
import Heading from "../../components/Heading/Heading";
import ProgressBar from "../../components/ProgressBar/Progressbar";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import FlexWrapper from "../../components/FlexWrapper/FlexWrapper";

// --------Styles-----------
import styles from "./RegistrationPage.module.css";
import image from "../../assets/images/register.png";

const schema1 = yup.object({
  email: yup
    .string("Email should be made of letters")
    .email("Provide a valid email address")
    .required("Email address is required"),
  password: yup
    .string()
    .required("You must enter a password")
    .min(8, "Password should be at least 8 characters")
    .matches(RegExp("(.*[a-z].*)"), "Password must have lowercase")
    .matches(RegExp("(.*[A-Z].*)"), "Password must have uppercase")
    .matches(RegExp("(.*\\d.*)"), "Password must have number")
    .matches(
      RegExp('[!@#$%^&*(),.?":{}|<>]'),
      "Password must contain a special character (!@#$%^&*(),.?)"
    ),
  repeatPassword: yup
    .string("Password should be a string")
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const schema2 = yup.object({
  firstName: yup
    .string("Name should be a string")
    .required("You must enter your First name"),
  lastName: yup
    .string("Last name should be a string")
    .required("You must enter your Last name"),
  terms: yup.boolean().oneOf([true], "You must accept the terms"),
});

const schemaStep = (step) => {
  if (step === 1) {
    return {
      resolver: yupResolver(schema1),
    };
  }

  if (step === 2) {
    return {
      resolver: yupResolver(schema2),
    };
  }
};

const RegistrationPage = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [lasStep, setLastStep] = useState(false);
  const [barError, setBarError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(schemaStep(step));
  const navigate = useNavigate();
  const goBack = () => {
    setBarError(false);
    setLastStep(false);
    setStep(1);
  };

  useEffect(() => {
    if (!errorMessage) {
      return;
    }
    const clearError = () => {
      setErrorMessage("");
    };

    setTimeout(clearError, 10 * 1000);
  }, [errorMessage]);

  return (
    <FlexWrapper>
      <div>
        <img className={styles.image} src={image} alt="register" />
      </div>
      <FormWrapper>
        <div>
          <Heading text={"Account registration"} />
          <ProgressBar step={step} lastStep={lasStep} error={barError} />
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <form
            onSubmit={handleSubmit(async (formData) => {
              if (step === 1 && formData.email && formData.password) {
                setStep(2);

                setLoading(false);
              }

              if (
                step === 2 &&
                formData.firstName &&
                formData.lastName &&
                formData.terms
              ) {
                setLoading(true);
                setLastStep(true);

                try {
                  await registerUser({
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    address: formData.address,
                    gender: formData.gender,
                    terms: formData.terms,
                    newsletter: formData.newsletter,
                  });
                  setErrorMessage("");

                  navigate("/login", { replace: true });
                  setStep(2);
                  reset();
                } catch (err) {
                  setBarError(true);
                  setErrorMessage("User exists");
                }
              }
              setLoading(false);
            })}
          >
            <Container>
              {step === 1 && (
                <section className={styles.section}>
                  <Input
                    errors={errors}
                    label="Email"
                    register={register}
                    type="email"
                    forHtml="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    disabled={loading ? true : false}
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
                    disabled={loading ? true : false}
                  />
                  <Input
                    errors={errors}
                    label="Repeat password"
                    register={register}
                    type="password"
                    forHtml="repeatPassword"
                    id="repeatPassword"
                    name="repeatPassword"
                    placeholder="Repeat your password"
                    disabled={loading ? true : false}
                  />
                  <Button text="Next" type="submit" />
                </section>
              )}

              {step === 2 && (
                <section className={styles.section}>
                  <Input
                    errors={errors}
                    label="First name"
                    register={register}
                    type="text"
                    forHtml="firstName"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    disabled={loading ? true : false}
                  />
                  <Input
                    errors={errors}
                    label="Last name"
                    register={register}
                    type="text"
                    forHtml="lastName"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    disabled={loading ? true : false}
                  />
                  <Input
                    errors={errors}
                    label="Address"
                    register={register}
                    type="text"
                    forHtml="address"
                    id="address"
                    name="address"
                    placeholder="Enter address"
                    disabled={loading ? true : false}
                  />
                  <Dropdown
                    label="Select your gender"
                    id="gender"
                    name="gender"
                    htmlFor="gender"
                    errors={errors}
                    register={register}
                    disabled={loading ? true : false}
                  />
                  <CheckboxInput
                    errors={errors}
                    label="Accept terms"
                    register={register}
                    type="checkbox"
                    forHtml="terms"
                    id="terms"
                    name="terms"
                    placeholder=""
                    disabled={loading ? true : false}
                  />
                  <CheckboxInput
                    errors={errors}
                    label="Newsletter"
                    register={register}
                    type="checkbox"
                    forHtml="newsletter"
                    id="newsletter"
                    name="newsletter"
                    placeholder=""
                    disabled={loading ? true : false}
                  />
                  <div className={styles.buttons}>
                    <Button
                      text="Back"
                      type="button"
                      onClick={goBack}
                      color={"secondary"}
                    />
                    {loading ? (
                      <ButtonLoader />
                    ) : (
                      <Button
                        text={loading ? "Registering ..." : "Register"}
                        type="submit"
                        disabled={loading ? true : false}
                      />
                    )}
                  </div>
                </section>
              )}
              <div> or </div>
              <div className={styles.linkContainer}>
                <Link className="navigation-link" to={"/login"}>
                  {"Login"}
                </Link>
              </div>
            </Container>
          </form>
        </div>
      </FormWrapper>
    </FlexWrapper>
  );
};

export default RegistrationPage;
