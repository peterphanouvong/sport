import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  return <Layout>home</Layout>;
};

export default withUrqlClient(createUrqlClient)(Home);
