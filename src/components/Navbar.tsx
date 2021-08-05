import React, { useEffect } from "react";
import NextLink from "next/link";
import { Box, Button, HStack, Link } from "@chakra-ui/react";

import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface Props {}

const Navbar: React.FC<Props> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();

  let body = null;

  //data loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <HStack></HStack>
        <HStack spacing={8}>
          <NextLink href="/login">
            <Link>Login</Link>
          </NextLink>
          <NextLink href="/register">
            <Link>Register</Link>
          </NextLink>
        </HStack>
      </>
    );

    // user logged in
  } else {
    body = (
      <>
        <HStack spacing={8}>
          <NextLink href="/">
            <Link>{data.me.username}</Link>
          </NextLink>
        </HStack>
        <HStack spacing={8}>
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
        </HStack>
      </>
    );
  }

  return (
    <Box
      paddingX={16}
      paddingY={8}
      display="flex"
      justifyContent="space-between"
    >
      {body}
    </Box>
  );
};

export { Navbar };
