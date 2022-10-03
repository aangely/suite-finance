import { Flex, Icon, IconButton, SimpleGrid, VStack } from "@chakra-ui/react";
import { TbArrowsLeftRight } from "react-icons/tb";

import { ApplyButton } from "./components/ApplyButton";
import { ChartCard } from "./components/ChartCard";
import { DistributeCard } from "./components/DistributeCard";
import { InvestCard } from "./components/InvestCard";
import { OrderCard } from "./components/OrderCard";
import { PurchaseCard } from "./components/PurchaseCard";
import { ReceiveCard } from "./components/ReceiveCard";
import { SellCard } from "./components/SellCard";

export const Page = () => {
  return (
    <>
      <SimpleGrid templateColumns={{ base: "1", lg: "repeat(2, 1fr)" }} columnGap="50px" marginTop="120px">
        <VStack border="1px" backgroundColor="rgba(255, 255, 255, 0.6)" borderRadius="18px" padding="30px" spacing="30px">
          <Flex flexDirection={{ base: "column", lg: "row" }} width="100%" justifyContent="space-between" alignItems="center">
            <SellCard width={{ base: "100%", lg: "calc(calc(100% / 2) - 35px)" }} />
            <IconButton
              aria-label=".."
              icon={<Icon as={TbArrowsLeftRight} color="white" width="24px" height="24px" />}
              borderRadius="full"
              variant="link"
              flexGrow="0"
              width="40px"
              height="40px"
              backgroundColor="#D9475A"
            />
            <ReceiveCard width={{ base: "100%", lg: "calc(calc(100% / 2) - 35px)" }} />
          </Flex>
          <InvestCard width="100%" />
          <DistributeCard width="100%" />
          <PurchaseCard width="100%" />
          <OrderCard width="100%" />
          <ApplyButton />
        </VStack>
        <VStack border="1px" backgroundColor="rgba(255, 255, 255, 0.6)" borderRadius="18px" padding="30px">
          {/* <div>1</div> */}
          {/* <div>2</div> */}
          <ChartCard />
        </VStack>
      </SimpleGrid>
    </>
  );
};
