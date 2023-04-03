import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input/Input";
import Heading from "../Heading/Heading";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";

const schema = yup.object({
  firstName: yup
    .string("Your name shoud be a string")
    .required("you must enter your full name"),
  lastName: yup
    .string("Your name shoud be a string")
    .required("you must enter your Last name")
    .min(3, "Last name should have a minimum length of 3"),
});

const PersonalDataForm = () => {
  const [formStep, setFormStep] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (data.password === data.repeatPassword && formStep === 0) {
      setFormStep(formStep + 1);
    } else {
      return;
    }

    console.log(data);
    // reset();
  };

  return (
    <div>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            errors={errors}
            label="First name"
            register={register}
            type="text"
            forHtml="firstName"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            requiredField={true}
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
            requiredField={true}
          />
          <Input
            errors={errors}
            label="Address (optional)"
            register={register}
            type="text"
            forHtml="address"
            id="address"
            name="address"
            placeholder="Enter address"
            requiredField={false}
          />
          <Dropdown
            label="Select your gender (optional)"
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
            requiredField={true}
          />
          <Input
            errors={errors}
            label="Accept newsletter (optional)"
            register={register}
            type="checkbox"
            forHtml="newsletter"
            id="newsletter"
            name="newsletter"
            placeholder=""
            requiredField={false}
          />
        </form>
        <Heading text="Second step" />
      </section>
    </div>
  );
};

export default PersonalDataForm;
