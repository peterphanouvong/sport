import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { useEventsQuery } from "../generated/graphql";
import { Card } from "../components/Card";
import { Heading, Spinner, Text } from "@chakra-ui/react";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  const [{ data, fetching }] = useEventsQuery();

  if (!fetching && !data) {
    return <div>No data...</div>;
  }

  if (!data) {
    return <Spinner />;
  }

  return (
    <Layout>
      {data.events.map((e) => {
        return (
          <Card key={e.id}>
            <Heading>{e.title}</Heading>
            <Text>{e.description}</Text>
            <Text>{e.location}</Text>
            <Text>{e.host.username}</Text>
          </Card>
        );
      })}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Home);
