import "@app/styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import { ChakraProvider } from "@chakra-ui/react";
import NextNProgress from "nextjs-progressbar";

import { Layout } from "@app/components/Layout";
import { theme } from "@app/theme";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NextNProgress />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
