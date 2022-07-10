import React from "react";
import ErrorMessage from "./ErrorMessage";
import Dashboard from "./Dashboard";

import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  InputGroup,
  Text,
} from "@chakra-ui/react";

import { useContext } from "react";
import UserContext from "../context/userContext";

export default function Login(props) {
  let user = useContext(UserContext);
  let { setEmail, setPassword, isLoading, error, isLoggedIn, isClicked } =
    user.data;
  let { handleSubmit } = user;

  return (
    <>
      {isLoggedIn ? (
        <>
          <Dashboard />
        </>
      ) : (
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
                        type="password"
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
              {isClicked === "user" ? (
                <Text mt={2} fontSize="sm" lineHeight="short" align="center">
                  email: text@text.com password: password
                </Text>
              ) : (
                <Text mt={2} fontSize="lg" lineHeight="short" align="center">
                  email: admin@text.com password: password
                </Text>
              )}
            </Box>
          </Flex>
        </>
      )}
    </>
  );
}
