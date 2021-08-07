import { Box, Grid } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import Card from "../components/Card";
import CreatePost from "../components/CreatePost";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = usePostsQuery();
  const [{ data: meData }] = useMeQuery();

  return (
    <Grid templateColumns="5fr 2fr" gap={4}>
      <Box>
        {meData && <CreatePost pageProps={null} />}
        {!data ? (
          <div>loading...</div>
        ) : (
          data.posts.map((post) => {
            return <div key={post.id}>{post.title}</div>;
          })
        )}
      </Box>
      <Card>hello</Card>
    </Grid>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
