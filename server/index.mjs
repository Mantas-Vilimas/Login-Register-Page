import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { listController } from "./controllers/listController.mjs";
import { registerController } from "./controllers/registerController.mjs";
import { loginController } from "./controllers/loginController.mjs";
import { decodeToken } from "./utils/generateToken.mjs";
import { users } from "./data/users.mjs";

dotenv.config();

const app = express();
const port = process.env.PORT;

const bodyParser = express.json();
const corsMiddleware = cors();
app.use((req, _, next) => {
  if (req.headers.token) {
    const authId = decodeToken(req.headers.token)?.id;
    const user = users.find(({ _id }) => _id === authId);
    if (user) req.user = user;
  }
  next();
});

app.use(bodyParser);
app.use(corsMiddleware);

app.get("/home", listController);
app.post("/register", registerController);
app.post("/login", loginController);

app.listen(port, () => {
  console.log(` App listening on port ${port}`);
});
