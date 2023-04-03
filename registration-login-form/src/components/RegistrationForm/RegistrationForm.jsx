import Heading from "../Heading/Heading";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string("Email should be made of letters")
    .email("please provide a valid email address")
    .required("Email adress is required"),
  password: yup
    .string("password should be a string")
    .min(5, "password should have a minimum length of 5")
    .max(12, "password should have a maximum length of 12")
    .required("password is required"),
  repeatPassword: yup
    .string("password should be a string")
    .oneOf([yup.ref("password")], "passwords must match")
    .required("confirm password is required"),
});

const RegistrationForm = ({ submitStep }) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div>
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
          requiredField={true}
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
          requiredField={true}
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
          requiredField={true}
        />
      </section>
    </div>
  );
};

export default RegistrationForm;
