import "@app/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

import { Layout } from "@app/components/Layout";
import { theme } from "@app/theme";

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
