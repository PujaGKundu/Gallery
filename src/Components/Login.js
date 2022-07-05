import React, { useState } from "react";
import { userLogin } from "../utils/UserLogin";
import ErrorMessage from "./ErrorMessage";

import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  Text,
  InputGroup,
} from "@chakra-ui/react";

import PropTypes from "prop-types";

async function loginUser(credentials) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const token = await loginUser({
      email,
      password,
    });
    setToken(token);
    try {
      await userLogin({ email, password });
      setIsLoggedIn(true);
      setIsLoading(false);
    } catch (error) {
      setError("Invalid username or password");
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <Flex width="full" align="center" justifyContent="center">
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          my={40}
        >
          {isLoggedIn ? (
            <Box textAlign="center">
              <Text>{email} logged in!</Text>
              <Button
                variantColor="orange"
                variant="outline"
                width="full"
                mt={4}
                onClick={() => setIsLoggedIn(false)}
              >
                Sign out
              </Button>
            </Box>
          ) : (
            <>
              <Box textAlign="center">
                <Heading>Login</Heading>
              </Box>
              <Box my={4} textAlign="left">
                <form onSubmit={handleSubmit}>
                  {error && <ErrorMessage message={error} />}
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      placeholder="test@test.com"
                      size="lg"
                      onChange={(event) => setEmail(event.currentTarget.value)}
                    />
                  </FormControl>
                  <FormControl isRequired mt={6}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        placeholder="*******"
                        size="lg"
                        onChange={(event) =>
                          setPassword(event.currentTarget.value)
                        }
                      />
                    </InputGroup>
                  </FormControl>
                  <Button
                    variantcolor="teal"
                    variant="outline"
                    type="submit"
                    width="full"
                    mt={4}
                  >
                    {isLoading ? (
                      <CircularProgress
                        isIndeterminate
                        size="24px"
                        color="teal"
                      />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </Box>
            </>
          )}
        </Box>
      </Flex>
    </>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
