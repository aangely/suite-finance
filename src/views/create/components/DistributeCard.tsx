import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { HiOutlineMinus } from "react-icons/hi";
import { IoIosAdd } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";
import shallow from "zustand/shallow";

import { Card } from "@app/components/Card";
import { useDebouncedValue } from "@app/hooks/useDebouncedValue";
import { useReceiveStore } from "@app/store/useReceiveStore";
import { tokenListSearch, useSellStore } from "@app/store/useSellStore";

import type { FlexProps } from "@chakra-ui/react";

export const DistributeCard = (props: Omit<FlexProps, "children">) => {
  const [value, setValue] = useState("");
  const token = useSellStore((state) => state.token);
  const { isOpen, onOpen, onClose: _onClose } = useDisclosure();
  const { tokens, setPercent, removeToken, addToken, total } = useReceiveStore(
    (state) => ({
      tokens: state.tokens,
      setPercent: state.setPercent,
      removeToken: state.removeToken,
      addToken: state.addToken,
      total: state.total,
    }),
    shallow,
  );
  const debouncedValue = useDebouncedValue(value);
  const _result = useMemo(() => tokenListSearch.search(debouncedValue), [debouncedValue]);
  const onClose = () => {
    setValue("");
    _onClose();
  };
  const result = _result.filter(({ item }) => item.name !== useSellStore.getState().token.name);
  return (
    <Card {...props}>
      <Text fontWeight="600">{`How would you like to distribute your ${token.symbol}:`}</Text>
      <VStack spacing="6px" marginTop="9px">
        {tokens.map((token) => (
          <Flex key={token.name} width="100%" justifyContent="space-between">
            <Flex
              borderRadius="full"
              background="linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)"
              padding="2"
              width="calc(calc(100% / 2) - 40px)"
            >
              <Image src={token.icon} alt={token.name} width="24px" height="24px" />
              <Text marginLeft="0.5em">{token.symbol}</Text>
            </Flex>
            <InputGroup width="calc(calc(100% / 2) - 40px)">
              <NumberInput value={token.percent} onChange={(s) => setPercent(token, +s)} width="100%" max={100}>
                <NumberInputField
                  background="linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)"
                  borderRadius="full"
                  border="none"
                  outline="none"
                  color="white"
                />
              </NumberInput>
              <InputRightElement>%</InputRightElement>
            </InputGroup>
            <IconButton
              aria-label="delete"
              borderRadius="full"
              onClick={() => removeToken(token)}
              icon={<Icon as={HiOutlineMinus} color="black" />}
              variant="solid"
            />
          </Flex>
        ))}
      </VStack>
      <IconButton
        aria-label="add"
        icon={<Icon as={IoIosAdd} />}
        width="100%"
        onClick={onOpen}
        marginTop="10px"
        borderRadius="9px"
        background="linear-gradient(180deg, #96596A 0%, rgba(114, 64, 78, 0.8) 100%);"
        _hover={{
          background: "linear-gradient(180deg, #96596A 0%, rgba(114, 64, 78, 0.8) 100%);",
        }}
        _active={{
          background: "linear-gradient(180deg, #96596A 0%, rgba(114, 64, 78, 0.8) 100%);",
        }}
      />
      <Flex justifyContent="space-around" marginTop="9px">
        <Text fontWeight="700">Total</Text>
        <Text color="#FFF000">{total}%</Text>
      </Flex>
      {tokens.length > 0 && total !== 100 && (
        <Flex alignItems="center" marginTop="9px">
          <Icon as={RiErrorWarningLine} color="#FFF000" width="20px" height="20px" />
          <Text fontWeight="400" fontSize="15px" lineHeight="18px" marginLeft="10px">
            Balance must equal to 100%
          </Text>
        </Flex>
      )}
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
