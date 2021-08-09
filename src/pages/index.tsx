import React, { useState } from "react";
import { Button, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";

import { Card } from "../components/Card";
import CreatePost from "../components/CreatePost";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Layout from "../components/Layout";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  const [{ data: meData }] = useMeQuery();

  if (!fetching && !data) {
    return <div>No data...</div>;
  }

  return (
    <Layout>
      <Grid alignItems="flex-start" templateColumns="5fr 2fr" gap={4}>
        <VStack spacing={4} align="stretch">
          {meData.me && <CreatePost pageProps={null} />}
          {!data && fetching ? (
            <div>loading...</div>
          ) : (
            data.posts.posts.map((post) => (
              <Card key={post.id}>
                <Heading as="h2" fontSize="lg" mb={4}>
                  {post.title}
                </Heading>
                <Text>{post.descriptionSnippet}</Text>
                {/* <Text>{post.</Text> */}
              </Card>
            ))
          )}
          {data && data.posts.hasMore ? (
            <Button
              onClick={() =>
                setVariables({
                  limit: variables.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                })
              }
            >
              Load more...
            </Button>
          ) : null}
        </VStack>
        <Card>hello</Card>
      </Grid>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
