import { Box, Flex, Wrap, WrapItem } from "@chakra-ui/react";

import { tokenList } from "@app/store/useSellStore";

import { GeneralPositionCard } from "./GeneralPositionCard";

import type { Position } from "@app/store/usePositionStore";
import type { FlexProps } from "@chakra-ui/react";

const mockData: Position[] = [
  {
    id: 0,
    token: tokenList[0],
    tokens: tokenList.slice(2, 5),
    time: "monthly",
    startTime: new Date().toDateString(),
  },
  {
    id: 1,
    token: tokenList[0],
    tokens: tokenList.slice(2, 5),
    time: "monthly",
    startTime: new Date().toDateString(),
  },
  {
    id: 2,
    token: tokenList[0],
    tokens: tokenList.slice(2, 5),
    time: "monthly",
    startTime: new Date().toDateString(),
  },
];

export const OnGoingCard = (props: Omit<FlexProps, "children">) => {
  return (
    <Flex {...props} flexDirection="column" backgroundColor="rgba(255, 255, 255, 0.6)" borderRadius="18px" padding="30px">
      <Box
        fontSize="18px"
        paddingY="23px"
        color="#323C52"
        fontWeight="700"
        borderRadius="12px"
        backgroundColor="rgba(141, 81, 104, 0.27)"
        width="100%"
        textAlign="center"
      >
        On Going positions
      </Box>
      <Wrap spacing="18px" marginTop="18px" justifyContent="space-between">
        {mockData.map((data) => (
          <WrapItem key={data.id} width="calc(92% / 2)">
            <GeneralPositionCard data={data} />
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  );
};
