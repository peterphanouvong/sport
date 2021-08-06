import React from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import { Button, Heading, VStack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";

import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface Props {}

const Register: React.FC<Props> = ({}) => {
  const [{}, register] = useRegisterMutation();

  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Heading as="h1" fontSize="x-large" mb={4}>
        Register
      </Heading>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await register({ options: values });
          if (res.data?.register.errors) {
            setErrors(toErrorMap(res.data.register.errors));
          } else if (res.data.register.user) {
            router.push("/");
          }
        }}
      >
        {(props) => (
          <Form>
            <VStack spacing={4} align="stretch">
              <InputField
                name="username"
                label="Username"
                placeholder="username"
              />
              <InputField
                name="password"
                label="Password"
                type="password"
                placeholder="password"
              />
              <Button
                colorScheme="blue"
                isLoading={props.isSubmitting}
                type="submit"
                width=""
              >
                Register
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Register);
