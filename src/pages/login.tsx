import React from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";

import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

interface Props {}

const Login: React.FC<Props> = ({}) => {
  const [{}, login] = useLoginMutation();

  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Heading as="h1" fontSize="x-large" mb={4}>
        Log in
      </Heading>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await login({
            password: values.password,
            usernameOrEmail: values.usernameOrEmail,
          });
          if (res.data?.login.errors) {
            setErrors(toErrorMap(res.data.login.errors));
          } else if (res.data.login.user) {
            router.push("/");
          }
        }}
      >
        {(props) => (
          <Form>
            <VStack spacing={4} align="stretch">
              <InputField
                name="usernameOrEmail"
                label="Username/Email"
                placeholder="username or email"
              />
              <InputField
                name="password"
                label="Password"
                type="password"
                placeholder="password"
              />
              <VStack align="stretch">
                <Button
                  colorScheme="orange"
                  isLoading={props.isSubmitting}
                  type="submit"
                  width=""
                >
                  Log in
                </Button>
                <HStack
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Divider orientation="horizontal" />
                  <Text color="gray.400">or</Text>
                  <Divider orientation="horizontal" />
                </HStack>
                <NextLink href="/register">
                  <Button colorScheme="orange" variant="outline">
                    Register
                  </Button>
                </NextLink>
              </VStack>
            </VStack>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Login);
