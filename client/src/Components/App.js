import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Container } from "@chakra-ui/react";

import Login from "./Login";
import Dashboard from "./Dashboard";
import Header from "./Header";
import AddImages from "./AddImages";
import EditImage from "./EditImage";

import { UserProvider } from "../context/userContext";
import { userLogin, adminLogin } from "../utils/Login";

import useToken from "./useToken";
import PropTypes from "prop-types";

import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/react";

async function loginUser(credentials) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function App() {
  const { token, setToken } = useToken();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isClicked, setIsClicked] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const token = await loginUser({
      email,
      password,
    });
    setToken(token);
    try {
      (await isClicked) === "user"
        ? userLogin({ email, password })
        : adminLogin({ email, password });

      setIsLoggedIn(true);
      setIsLoading(false);
    } catch (error) {
      setError("Invalid username or password");
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  console.log(token);
  /*
  if (!token) {
    return <Login setToken={setToken} />;
  }
*/
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />

        <BrowserRouter>
          <UserProvider
            value={{
              data: {
                email,
                setEmail,
                password,
                setPassword,
                isLoading,
                error,
                isLoggedIn,
                setIsLoggedIn,
                setIsClicked,
                isClicked,
              },
              handleSubmit: handleSubmit,
            }}
          >
            <Header />
            <Container maxW="1300px">
              <Switch>
                <Route path="/login" exact>
                  <Login />
                </Route>
                <Route path="/" exact>
                  <Dashboard />
                </Route>
                <Route path="/add" exact>
                  <AddImages />
                </Route>
                <Route path="/edit/:id" exact>
                  <EditImage />
                </Route>
              </Switch>
            </Container>
          </UserProvider>
        </BrowserRouter>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
