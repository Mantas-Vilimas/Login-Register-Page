import { useState } from "react";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import Heading from "../Heading/Heading";
import Input from "../Input/Input";
import styles from "./RegistrationForm.module.css";
import { useForm } from "react-hook-form";

const RegistrationForm = () => {
  const [formStep, setFormStep] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const completeStep = () => {
    if (formStep < 1) setFormStep(formStep + 1);
  };

  const backStep = () => {
    if (formStep === 1) {
      setFormStep(formStep - 1);
    }
  };

  const buttonRender = () => {
    if (formStep === 1) {
      return (
        <div>
          <Button type="button" text="Back" onClick={backStep} />
          <Button type="submit" text="Complete registration" />
        </div>
      );
    } else {
      return <Button type="submit" text="Next" />;
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {formStep === 0 && (
        <section>
          <Heading text="First step" />
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
          <Input
            errors={errors}
            label="Repeat password"
            register={register}
            type="password"
            forHtml="repeat-password"
            id="repeat-password"
            name="repeat-password"
            placeholder="Repeat your password"
          />
        </section>
      )}

      {formStep === 1 && (
        <section>
          <Heading text="Second step" />

          <Input
            errors={errors}
            label="First name"
            register={register}
            type="text"
            forHtml="firstName"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
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
          />
          <Dropdown
            label="Select your gender"
            id="gender"
            name="gender"
            htmlFor="gender"
          />
          <Input
            errors={errors}
            label="Accept terms"
            register={register}
            type="checkbox"
            forHtml="terms"
            id="terms"
            name="terms"
            placeholder=""
          />
          <Input
            errors={errors}
            label="Accept newsletter"
            register={register}
            type="checkbox"
            forHtml="newsletter"
            id="newsletter"
            name="newsletter"
            placeholder=""
          />
        </section>
      )}

      {formStep === 2 && (
        <section>
          <Heading text="Congratulations you created an account" />
        </section>
      )}
      {buttonRender()}
    </form>
  );
};

export default RegistrationForm;
