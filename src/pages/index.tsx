import { Box, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import Card from "../components/Card";
import CreatePost from "../components/CreatePost";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });
  const [{ data: meData }] = useMeQuery();

  return (
    <Grid templateColumns="5fr 2fr" gap={4}>
      <VStack spacing={4} align="stretch">
        {meData && <CreatePost pageProps={null} />}
        {!data ? (
          <div>loading...</div>
        ) : (
          data.posts.map((post) => (
            <Card key={post.id}>
              <Heading as="h2" fontSize="lg" mb={4}>
                {post.title}
              </Heading>
              <Text>{post.description}</Text>
            </Card>
          ))
        )}
      </VStack>
      <Card>hello</Card>
    </Grid>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
