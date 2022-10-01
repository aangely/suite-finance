import { Container, Heading, Text, VStack } from "@chakra-ui/react";

export const IntroSection = () => {
  return (
    <VStack alignItems="flex-start" spacing={5}>
      <Heading fontSize="66" fontFamily="Encode Sans" bgGradient="linear(to-br, #D9475A 16.13%, #F8AED9 47.68%)" bgClip="text">
        Suite
      </Heading>
      <Text>
        Enable users to make recurring purchase options with single or multiple tokens and make improved investments by adopting the
        Dollar-cost Averaging strategy.
      </Text>
      <Text>
        Lower barrier of entry to DeFi investments for everyday users Improve overall DeFi experience on Cronos by synergising with other
        existing protocols and providing users with recurring purchase options in decentralized manner
      </Text>
    </VStack>
  );
};
