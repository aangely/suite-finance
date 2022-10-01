import "@app/styles/globals.css";
import { ChakraProvider, theme } from "@chakra-ui/react";

import { Layout } from "@app/components/Layout";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
