import { Container } from "@chakra-ui/react";
import Head from "next/head";

import { Navbar } from "./Navbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Suite Finance</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Container maxWidth="full" paddingX="20" marginBottom="90px">
        {children}
      </Container>
    </>
  );
};
