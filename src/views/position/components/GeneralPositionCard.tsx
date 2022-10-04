import { Button, Image, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";

import { Card } from "@app/components/Card";
import { usePositionStore } from "@app/store/usePositionStore";

import type { Position} from "@app/store/usePositionStore";
import type { FlexProps } from "@chakra-ui/react";

export const GeneralPositionCard = ({ data, ...resProps }: Omit<FlexProps, "children"> & { data: Position }) => {
  const { status } = data;
  return (
    <Card {...resProps} width="100%" paddingX="30px">
      <VStack spacing="8px">
        <Text fontSize="18px" fontWeight="600">{`Position ${data.id + 1}`}</Text>
        <Wrap>
          {data.tokens.map((it) => (
            <WrapItem key={it.name}>
              <Image src={it.icon} alt={it.name} width="28px" height="28px" />
            </WrapItem>
          ))}
        </Wrap>
        <Text fontSize="15px" fontWeight="600">
          Frequency: {data.time}
        </Text>
        <Text fontSize="15px" fontWeight="600" color={status === "finished" ? "green" : status === "pending" ? "black" : "white"}>
          {status === "finished" ? "Finished" : status === "started" ? "On Going" : "Not Started"}
        </Text>
        <Button
          borderRadius="full"
          backgroundColor="#323C52"
          fontSize="15px"
          height="32px"
          width="100%"
          fontWeight="700"
          onClick={() => usePositionStore.getState().setPosition(data)}
          _hover={{ backgroundColor: "#323C52" }}
          _active={{ backgroundColor: "#323C52" }}
        >
          Go to position
        </Button>
      </VStack>
    </Card>
  );
};
