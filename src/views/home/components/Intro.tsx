import { Container, Heading, Text } from "@chakra-ui/react";

export const Intro = () => {
  return (
    <Container maxWidth="full" paddingX="100" color="#323c52" marginTop="60px">
      <Heading fontSize="66" bgGradient="linear(105.03deg, #D9475A 16.13%, #F8AED9 47.68%)" bgClip="text" marginBottom={5}>
        Suite
      </Heading>
      <Text marginBottom={5}>
        Enable users to make recurring purchase options with single or multiple tokens and make improved investments by adopting the
        Dollar-cost Averaging strategy.
      </Text>
      <Text marginBottom={5}>
        Lower barrier of entry to DeFi investments for everyday users Improve overall DeFi experience on Cronos by synergising with other
        existing protocols and providing users with recurring purchase options in decentralized manner
      </Text>
    </Container>
  );
};
