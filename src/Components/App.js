import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import useToken from "./useToken";

import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/react";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />

        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </BrowserRouter>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
