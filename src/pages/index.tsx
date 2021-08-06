import { withUrqlClient } from "next-urql";
import React from "react";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <div>Hello</div>
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((post) => {
          return <div key={post.id}>{post.title}</div>;
        })
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
