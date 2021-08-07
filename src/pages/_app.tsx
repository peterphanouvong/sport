import { withUrqlClient } from "next-urql";
import { ChakraProvider, Container } from "@chakra-ui/react";

import { Navbar } from "../components/Navbar";
import { createUrqlClient } from "../utils/createUrqlClient";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Navbar />
      <Container maxW="container.xl">
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
}

export default withUrqlClient(createUrqlClient)(MyApp);
