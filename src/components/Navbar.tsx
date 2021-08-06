import React from "react";
import NextLink from "next/link";
import { Box, Button, HStack, Link, useColorMode } from "@chakra-ui/react";

import Logo from "./Logo";
import { isServer } from "../utils/isServer";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import SettingsDrawer from "./SettingsDrawer";

interface Props {}

const Navbar: React.FC<Props> = ({}) => {
  const { colorMode } = useColorMode();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  let body = null;

  //data loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <HStack spacing={8}>
        <NextLink href="/login">
          <Link>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
        <SettingsDrawer />
      </HStack>
    );

    // user logged in
  } else {
    body = (
      <HStack spacing={8}>
        <NextLink href="/">
          <Link>{data.me.username}</Link>
        </NextLink>
        <Button
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
          variant="link"
          fontWeight="normal"
        >
          Logout
        </Button>
        <SettingsDrawer />
      </HStack>
    );
  }

  return (
    <Box
      paddingX={16}
      paddingY={8}
      display="flex"
      justifyContent="space-between"
    >
      <NextLink href="/">
        <a>
          <Logo color={colorMode === "dark" ? "white" : "black"} />
        </a>
      </NextLink>
      {body}
    </Box>
  );
};

export { Navbar };
