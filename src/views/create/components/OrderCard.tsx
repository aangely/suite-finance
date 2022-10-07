import { Flex, Image, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import shallow from "zustand/shallow";

import { Card } from "@app/components/Card";
import { usePurchaseStore } from "@app/store/usePurchaseStore";
import { useSellStore } from "@app/store/useSellStore";
import { formatPrice } from "@app/utils/format";
import { useIsConnected } from "@app/wallet";

import type { FlexProps } from "@chakra-ui/react";

export const OrderCard = (props: Omit<FlexProps, "children">) => {
  const isConnected = useIsConnected();
  const { token, balance } = useSellStore((state) => ({ token: state.token, balance: state.balance }), shallow);
  const { time, total } = usePurchaseStore((state) => ({ time: state.time, total: state.total }), shallow);
  return (
    <Card {...props}>
      <Text fontWeight="600">Order Summary</Text>
      <Flex marginTop="9px" alignItems="center" justifyContent="space-between">
        <Text fontWeight="600" fontSize="15px">
          {"We'll swap"}
        </Text>
        <InputGroup width="50%">
          <Input
            background="linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)"
            borderRadius="full"
            border="none"
            value={total && balance ? formatPrice(balance / total) : balance}
            readOnly
          />
          <InputRightElement>
            <Image src={token.icon} alt={token.name} width="24px" height="24px" />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Flex marginTop="6px" alignItems="center" justifyContent="space-between">
        <Text fontWeight="600" fontSize="15px">{`every ${
          time === "daily" ? "day" : time === "monthly" ? "month" : "week"
        } for you for`}</Text>
        <InputGroup width="50%">
          <Input
            background="linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)"
            borderRadius="full"
            border="none"
            value={total}
            readOnly
          />
          <InputRightElement paddingRight="2em" textTransform="capitalize">
            {time === "daily" ? "days" : time === "weekly" ? "weeks" : "months"}
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Text marginTop="6px" fontSize="15px" fontWeight="400">{`Wallet balance: ${isConnected ? token.balance : 0} ${token.symbol}`}</Text>
    </Card>
  );
};
