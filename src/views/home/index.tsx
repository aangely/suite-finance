import { Container, VStack } from "@chakra-ui/react";

import { IntroSection } from "./components/IntroSection";
import { InvestSection } from "./components/InvestSection";
import { PlainTable } from "./components/PlainTable";

export const Page = () => {
  return (
    <Container maxWidth="full" color="#323c52" marginTop="60px">
      <VStack alignItems="flex-start" spacing={12}>
        <IntroSection />
        <InvestSection />
      </VStack>
      <PlainTable />
    </Container>
  );
};
