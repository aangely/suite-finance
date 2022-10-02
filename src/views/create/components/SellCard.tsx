import {
  Button,
  HStack,
  Text,
  Image,
  Icon,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

import { Card } from "@app/components/Card";
import { useSellStore } from "@app/store/useSellStore";

import type { FlexProps } from "@chakra-ui/react";

export const SellCard = (props: Omit<FlexProps, "children">) => {
  const token = useSellStore((state) => state.token);
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Card {...props}>
      <Text fontWeight="600">You sell</Text>
      <Button
        marginTop="6px"
        borderRadius="full"
        onClick={onOpen}
        background="linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)"
        justifyContent="flex-start"
      >
        <HStack spacing="2">
          <Image src={token.icon} alt={token.symbol} width="26px" height="26px" />
          <Text>{token.symbol}</Text>
          <Icon as={FiChevronDown} w="22px" h="22px" />
        </HStack>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="18px" padding="30px" backgroundColor="white">
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
};
