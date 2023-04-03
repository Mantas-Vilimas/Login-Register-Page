import "./App.css";

import Layout from "./components/Layout/Layout";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import { Routes, Route } from "react-router-dom";
import { routes } from "./constants/routes";
import { useState } from "react";
import Cookies from "js-cookie";

import WelcomingPage from "./Pages/WelcomigPage/WelcomingPage";

const defaultToken = Cookies.get("_user_token");

function App() {
  const [token, setToken] = useState(defaultToken);

  const logOut = () => {
    Cookies.remove("_user_token");
  };

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path={routes.defaultPage} element={<WelcomingPage />} />
          <Route
            path={routes.homePage}
            element={<HomePage logOut={logOut} token={token} />}
          />
          <Route path={routes.registerPage} element={<RegistrationPage />} />
          <Route
            path={routes.loginPage}
            element={
              <LoginPage
                onLogin={(token) => {
                  Cookies.set("_user_token", token, { sameSite: true });
                  setToken(token);
                }}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
