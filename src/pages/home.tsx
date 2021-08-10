import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { useEventsQuery, useMeQuery } from "../generated/graphql";
import { Card } from "../components/Card";
import { Box, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { CreateEvent } from "../components/CreateEvent";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  const [{ data, fetching }] = useEventsQuery();
  const [{ data: meData }] = useMeQuery();

  if (!fetching && !data) {
    return <div>No data...</div>;
  }

  if (!data) {
    return <Spinner />;
  }

  return (
    <Layout>
      {meData?.me && <CreateEvent />}
      <Box mt={4} />
      <VStack spacing={4} align="stretch">
        {data.events.map((e) => {
          return (
            <Card key={e.id}>
              <Heading>{e.title}</Heading>
              <Text>description: {e.description}</Text>
              <Text>location: {e.location}</Text>
              <Text>host: {e.host.username}</Text>
              <Text>
                time: {new Date(parseInt(e.datetime)).toLocaleString()}
              </Text>
            </Card>
          );
        })}
      </VStack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Home);
