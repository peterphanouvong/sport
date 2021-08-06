import React from "react";
import { NextPage } from "next";
import { Form, Formik } from "formik";
import { Button, Heading, VStack } from "@chakra-ui/react";

import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  return (
    <Wrapper variant="small">
      <Heading as="h1" fontSize="x-large" mb={4}>
        Log in
      </Heading>
      <Formik
        initialValues={{ newPassword: "", confirmPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          if (values.newPassword !== values.confirmPassword) {
            setErrors({
              confirmPassword: "passwords do not match",
              newPassword: "passwords do not match",
            });
            return;
          }
          console.log(values);
        }}
      >
        {(props) => (
          <Form>
            <VStack spacing={4} align="stretch">
              <InputField
                name="newPassword"
                label="New password"
                placeholder="new password"
                type="password"
              />
              <InputField
                name="confirmPassword"
                label="Confirm new password"
                placeholder="new password"
                type="password"
              />
              <Button
                colorScheme="blue"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Change password
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
