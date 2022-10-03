import {
  useDisclosure,
  Text,
  Button,
  HStack,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Input,
  Flex,
  Icon,
  VStack,
  Box,
  Wrap,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import shallow from "zustand/shallow";

import { Card } from "@app/components/Card";
import { useDebouncedValue } from "@app/hooks/useDebouncedValue";
import { useReceiveStore } from "@app/store/useReceiveStore";
import { tokenListSearch, useSellStore } from "@app/store/useSellStore";

import type { FlexProps } from "@chakra-ui/react";

export const ReceiveCard = (props: Omit<FlexProps, "children">) => {
  const { tokens, addToken, removeToken } = useReceiveStore(
    (state) => ({ tokens: state.tokens, addToken: state.addToken, removeToken: state.removeToken }),
    shallow,
  );
  const [value, setValue] = useState("");
  const { isOpen, onClose: _onClose, onOpen } = useDisclosure();
  const debouncedValue = useDebouncedValue(value);
  const _result = useMemo(() => tokenListSearch.search(debouncedValue), [debouncedValue]);
  const onClose = () => {
    setValue("");
    _onClose();
  };
  const result = _result.filter(({ item }) => item.name !== useSellStore.getState().token.name);
  return (
    <Card {...props}>
      <Text fontWeight="600">You receive</Text>
      <Button
        marginTop="6px"
        borderRadius="full"
        onClick={onOpen}
        background="linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)"
        justifyContent="flex-start"
        _hover={{
          background: "linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)",
        }}
        _active={{
          background: "linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)",
        }}
      >
        <HStack spacing="2" overflowX="auto">
          {tokens.map((token) => (
            <Box
              key={token.name}
              flexShrink="0"
              position="relative"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeToken(token);
              }}
            >
              <Image
                src={token.icon}
                alt={token.name}
                width="26px"
                height="26px"
                _hover={{
                  filter: "blur(1px)",
                }}
              />
            </Box>
          ))}
        </HStack>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent borderRadius="18px" padding="30px" backgroundColor="white">
          <ModalBody>
            <Card>
              <Text fontWeight="600">Add tokens to your position</Text>
              <Input
                background="linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)"
                borderRadius="full"
                border="none"
                placeholder="Search token"
                color="white"
                marginTop="6px"
                _placeholder={{
                  color: "whiteAlpha.700",
                }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </Card>
            <Card marginTop="30px">
              <Text fontWeight="600" fontSize="15px" lineHeight="18px" marginBottom="18px">
                Token List
              </Text>
              {!!debouncedValue.length && !Boolean(result.length) && (
                <Flex alignItems="center">
                  <Icon as={RiErrorWarningLine} color="#FFF000" width="20px" height="20px" />
                  <Text fontWeight="300" fontSize="15px" lineHeight="18px" marginLeft="10px">
                    No search result
                  </Text>
                </Flex>
              )}
              <VStack spacing="8px" alignItems="flex-start">
                {result.map(({ item }) => {
                  const hasAdded = tokens.some((token) => token.name === item.name);
                  return (
                    <Flex key={item.name} justifyContent="space-between" width="100%">
                      <HStack spacing="6px">
                        <Image src={item.icon} alt={item.name} width="30px" height="30px" />
                        <Text textTransform="capitalize">{item.name}</Text>
                        <Text>({item.symbol})</Text>
                      </HStack>
                      <Button
                        backgroundColor="#323C52"
                        fontSize="15px"
                        fontWeight="700"
                        lineHeight="32px"
                        paddingY="0"
                        borderRadius="6px"
                        height="auto"
                        _hover={{
                          backgroundColor: "#323C52",
                        }}
                        _active={{
                          backgroundColor: "#323C52",
                        }}
                        onClick={() => (hasAdded ? removeToken({ ...item, percent: 0 }) : addToken({ ...item, percent: 0 }))}
                      >
                        {hasAdded ? "Delete" : "Add"}
                      </Button>
                    </Flex>
                  );
                })}
              </VStack>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
};
