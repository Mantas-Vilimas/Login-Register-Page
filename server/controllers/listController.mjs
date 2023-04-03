import { users } from "../data/users.mjs";

export const listController = (req, res) => {
  if (!req.user) {
    res.status(403).json({ message: "User not logged in." });
    return;
  }

  if (!users[req.user._id]) {
    users[req.user._id] = [];
  }

  res.json({
    user: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    address: req.user.address,
    gender: req.user.gender,
    terms: req.user.terms,
    newsletter: req.user.newsletter,
  });
};
