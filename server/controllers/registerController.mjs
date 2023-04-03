import { v4 as createId } from "uuid";
import { hashPassword } from "../utils/hashing.mjs";
import { users } from "../data/users.mjs";

export const registerController = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    address,
    gender,
    terms,
    newsletter,
  } = req.body;
  const isEmailValid = typeof email === "string";
  const isPasswordValid = typeof password === "string";
  const isFirstNameValid = typeof firstName == "string";
  const isLastNameValid = typeof lastName === "string";
  const isAddressValid = typeof address === "string";
  const isGenderValid = typeof gender === "string";
  const isTermsValid = typeof terms === "boolean";
  const isNewsletterValid = typeof newsletter === "boolean";

  if (
    !isEmailValid ||
    !isPasswordValid ||
    !isFirstNameValid ||
    !isLastNameValid ||
    !isAddressValid ||
    !isGenderValid ||
    !isTermsValid ||
    !isNewsletterValid
  ) {
    res.status(400).json({ message: "bad register data" });
  }

  const hasUser = users.some((user) => user.email === email);

  if (hasUser) {
    res.status(400).json({ message: "user already exists" });
    return;
  }

  const user = {
    _id: createId(),
    email: email,
    password: await hashPassword(password),
    firstName: firstName,
    lastName: lastName,
    address: address,
    gender: gender,
    terms: terms,
    newsletter: newsletter,
  };

  users.push(user);

  console.log(users);

  res.json({ message: "ok" });
};
