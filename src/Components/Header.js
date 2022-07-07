import { Flex, Button, HStack, chakra, Text, Box } from "@chakra-ui/react";

import React from "react";
import { Link } from "react-router-dom";

import { useContext } from "react";
import UserContext from "../context/userContext";

export default function Header() {
  let user = useContext(UserContext);
  let { isLoggedIn, setIsLoggedIn, setIsClicked } = user.data;

  return (
    <>
      <chakra.header id="header" bg="green.400">
        <Flex w="100%" px="6" py="5" align="center" justify="space-between">
          <Link to="/">
            <Text ml={2} fontSize="2xl" fontWeight="bold">
              Gallery
            </Text>
          </Link>
          {isLoggedIn ? (
            <Box textAlign="center">
              <Link to="/">
                <Button
                  variant="outline"
                  width="full"
                  mt={4}
                  onClick={() => setIsLoggedIn(false)}
                >
                  Sign out
                </Button>
              </Link>
            </Box>
          ) : (
            <>
              <HStack as="nav" spacing="5">
                <Link key="user" to="/userLogin">
                  <Button
                    variant="outline"
                    onClick={() => setIsClicked("user")}
                  >
                    User Login
                  </Button>
                </Link>
                <Link key="admin" to="/userLogin">
                  <Button
                    variant="outline"
                    onClick={() => setIsClicked("admin")}
                  >
                    Admin Login
                  </Button>
                </Link>
              </HStack>
            </>
          )}
        </Flex>
      </chakra.header>
    </>
  );
}
