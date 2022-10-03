import { Heading, Text, VStack } from "@chakra-ui/react";

export const IntroSection = () => {
  return (
    <VStack alignItems="flex-start" color="#323C52" spacing="5">
      <Heading fontSize="66" fontFamily="Encode Sans" fontWeight="500">
        Your positions
      </Heading>
      <Text fontSize="24px" lineHeight="38px">
        Here you will see the details of your open positions and be able to see further details about them. You will only be able to
        interact with them if you are on the correct network.
      </Text>
    </VStack>
  );
};
