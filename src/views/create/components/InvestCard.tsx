import {
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import { RiErrorWarningLine } from "react-icons/ri";
import shallow from "zustand/shallow";

import { Card } from "@app/components/Card";
import { useSellStore } from "@app/store/useSellStore";

import type { FlexProps } from "@chakra-ui/react";

export const InvestCard = (props: Omit<FlexProps, "children">) => {
  const { token, balance, setBalance } = useSellStore(
    (state) => ({ token: state.token, balance: state.balance, setBalance: state.setBalance }),
    shallow,
  );
  return (
    <Card {...props}>
      <Text fontWeight="600">{`How much ${token.symbol} do you want to invest?`}</Text>
      <HStack marginTop="6px" spacing="6px">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Image src={token.icon} alt={token.name} width="24px" height="24px" />
          </InputLeftElement>
          <NumberInput precision={2} step={0.01} value={balance} onChange={(v) => setBalance(+v)} width="100%" max={token.balance} min={0}>
            <NumberInputField
              background="linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)"
              borderRadius="full"
              border="none"
              paddingLeft="3em"
              outline="none"
              placeholder="Search token"
              color="white"
              _placeholder={{
                color: "whiteAlpha.700",
              }}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </InputGroup>
        <Button
          borderRadius="9px"
          color="white"
          background="linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)"
          _hover={{
            background: "linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)",
          }}
          _active={{
            background: "linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)",
          }}
          onClick={() => setBalance(token.balance)}
        >
          MAX
        </Button>
        <Button
          borderRadius="9px"
          color="white"
          background="linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)"
          _hover={{
            background: "linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)",
          }}
          _active={{
            background: "linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)",
          }}
          onClick={() => setBalance(token.balance / 2)}
        >
          HALF
        </Button>
      </HStack>
      <Text marginTop="6px" fontSize="15px" fontWeight="400">{`Wallet balance: ${token.balance} ${token.symbol}`}</Text>
      {balance === 0 && (
        <Flex alignItems="center" marginTop="9px">
          <Icon as={RiErrorWarningLine} color="#FFF000" width="20px" height="20px" />
          <Text fontWeight="400" fontSize="15px" lineHeight="18px" marginLeft="10px">
            Insufficient wallet balance
          </Text>
        </Flex>
      )}
    </Card>
  );
};
