import React, { useEffect, useState } from "react";
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

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (data) setEvents(data.events);
  }, [data]);

  const addEvent = (e) => {
    setEvents([e, ...events]);
  };

  const removeEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  if (!fetching && !events) {
    return <div>No data...</div>;
  }

  if (!events) {
    return <Spinner />;
  }

  return (
    <Layout>
      {meData?.me && <CreateEvent addEvent={addEvent} />}
      <Box mt={4} />
      <VStack spacing={4} align="stretch">
        {events.map((e) => {
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
