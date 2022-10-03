import { Button, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const InvestSection = () => {
  const { push } = useRouter();
  return (
    <VStack alignItems="flex-start" width="100%" spacing={6}>
      <Heading>Auto-invest</Heading>
      <HStack
        width="full"
        bgGradient="linear-gradient(270deg, rgba(217, 71, 90, 0.25) 5.89%, rgba(20, 148, 9, 0.5) 20.23%)"
        borderRadius={12}
        justifyContent="space-between"
        alignItems="center"
        height="82px"
        paddingLeft={30}
        paddingRight={2}
      >
        <HStack>
          <Text color="#fff" fontSize={30} fontWeight="semibold">
            Create your Position NOW!
          </Text>
        </HStack>
        <Link>
          <Button
            bgGradient="linear-gradient(265.49deg, #E78C99 -27.48%, #E5E5E5 117.38%)"
            width={152}
            height={16}
            borderRadius={12}
            fontSize={18}
            onClick={() => push("/create")}
            color="#000"
          >
            Create a plan
          </Button>
        </Link>
      </HStack>
    </VStack>
  );
};
