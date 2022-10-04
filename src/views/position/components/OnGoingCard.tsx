import { Box, Flex, Wrap, WrapItem } from "@chakra-ui/react";

import { usePositionStore } from "@app/store/usePositionStore";
import { useIsConnected } from "@app/wallet";

import { GeneralPositionCard } from "./GeneralPositionCard";

import type { FlexProps } from "@chakra-ui/react";

export const OnGoingCard = (props: Omit<FlexProps, "children">) => {
  const isConnected = useIsConnected();
  const _started = usePositionStore((state) => state.startedPositions);
  const started = isConnected ? _started : [];
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
      <Wrap
        spacing="18px"
        marginTop="18px"
        sx={{
          [".chakra-wrap__list"]: {
            justifyContent: "space-between",
          },
        }}
      >
        {started.map((data) => (
          <WrapItem key={data.id} width="calc(92% / 2)">
            <GeneralPositionCard data={data} />
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  );
};
