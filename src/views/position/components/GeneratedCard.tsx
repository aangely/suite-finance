import { Box, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import shallow from "zustand/shallow";

import { usePositionStore } from "@app/store/usePositionStore";
import { useIsConnected } from "@app/wallet";

import { GeneralPositionCard } from "./GeneralPositionCard";

import type { FlexProps } from "@chakra-ui/react";

export const GeneratedCard = (props: Omit<FlexProps, "children">) => {
  const isConnected = useIsConnected();
  const { finishedPositions, pendingPositions } = usePositionStore(
    (state) => ({ finishedPositions: state.finishedPositions, pendingPositions: state.pendingPositions }),
    shallow,
  );
  const _all = [...finishedPositions, ...pendingPositions];
  const all = isConnected ? _all : [];
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
        Generated
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
        {all.map((data) => (
          <WrapItem key={data.id} width="calc(92% / 2)">
            <GeneralPositionCard data={data} />
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  );
};
