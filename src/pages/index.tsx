import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";

import { Card } from "../components/Card";
import CreatePost from "../components/CreatePost";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import NextLink from "next/link";

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
                <Box mb={2}>
                  <Heading as="h2" fontSize="lg">
                    <NextLink href={`/post/[id]`} as={`/post/${post.id}`}>
                      <Link>{post.title}</Link>
                    </NextLink>
                  </Heading>
                  <Text fontSize="sm" color="gray">
                    posted by {post.creator.username}
                  </Text>
                </Box>
                <Text>{post.descriptionSnippet}...</Text>
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
