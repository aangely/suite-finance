import { HStack, SimpleGrid, VStack } from "@chakra-ui/react";

import { SellCard } from "./components/SellCard";

export const Page = () => {
  return (
    <>
      <SimpleGrid columns={2} columnGap="50px" marginTop="120px">
        <VStack border="1px" backgroundColor="white" borderRadius="18px" padding="30px">
          <SimpleGrid columns={2} columnGap="70px" width="100%">
            <SellCard />
            <SellCard />
          </SimpleGrid>
          <div>1</div>
          <div>2</div>
        </VStack>
        <VStack border="1px" backgroundColor="white" borderRadius="18px">
          <div>1</div>
          <div>2</div>
        </VStack>
      </SimpleGrid>
    </>
  );
};
