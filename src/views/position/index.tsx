import { Flex, HStack, SimpleGrid } from "@chakra-ui/react";

import { GeneratedCard } from "./components/GeneratedCard";
import { IntroSection } from "./components/IntroSection";
import { OnGoingCard } from "./components/OnGoingCard";

export const Page = () => {
  return (
    <Flex flexDirection="column" marginTop="60px">
      <IntroSection />
      <SimpleGrid marginTop="22px" templateColumns={{ base: "1", lg: "repeat(2, 1fr)" }} columnGap="50px">
        <OnGoingCard />
        <GeneratedCard />
      </SimpleGrid>
    </Flex>
  );
};
