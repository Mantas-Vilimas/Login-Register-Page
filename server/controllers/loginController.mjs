import { users } from "../data/users.mjs";
import { comparePassword } from "../utils/hashing.mjs";
import { generateToken } from "../utils/generateToken.mjs";

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const isEmailValid = typeof email === "string";
  const isPasswordValid = typeof password === "string";
  if (!isEmailValid || !isPasswordValid) {
    res.status(403).json({
      message: "Invalid login data",
    });
    return;
  }

  const user = users.find((user) => user.email === email);
  if (!user) {
    res.status(403).json({
      message: "Invalid login data, cant find user",
    });
    return;
  }

  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) {
    res.status(403).json({
      message: "incorrect password",
    });
    return;
  }

  res.json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
};
