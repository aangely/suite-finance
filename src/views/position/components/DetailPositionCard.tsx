import { Box, Button, Flex, HStack, Icon, Image, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

import { Card } from "@app/components/Card";
import { useChartData } from "@app/hooks/useChartData";
import { usePositionStore } from "@app/store/usePositionStore";
import { formatPrice } from "@app/utils/format";
import { useIsConnected } from "@app/wallet";

import type { Position } from "@app/store/usePositionStore";
import type { FlexProps } from "@chakra-ui/react";

dayjs.extend(relativeTime);

const DCard = ({ data, ...resProps }: Omit<FlexProps, "children"> & { data: Position }) => {
  const startTime = dayjs(data.startTime);
  const endTime = dayjs(data.endTime);
  const currentTime = dayjs();
  const all = endTime.toDate().getTime() - startTime.toDate().getTime();
  const c = currentTime.toDate().getTime() - startTime.toDate().getTime();
  const sourceToken = data.token;
  const targetTokens = data.tokens;
  const percent = Number((c / all) * 100).toFixed(0);
  const remaining = data.status === "finished" ? data.total : data.status === "pending" ? 0 : (data.total * +percent) / 100;
  const [selectedToken, setSelectedToken] = useState(targetTokens[0]);
  const coinData = useChartData(
    sourceToken.slug,
    targetTokens.map((t) => t.slug),
  );
  const swappedTargets = coinData?.map(({ slug, data, rawPrices }) => {
    const targetToken = targetTokens.find((s) => s.slug === slug)!;
    const swappedSource = (remaining * targetToken.percent) / 100;
    const prices = data.prices.at(-1)!;
    const targetIcon = swappedSource / prices[1];
    return {
      slug,
      averagePrice: rawPrices.at(-1)?.[1],
      sourceIcon: swappedSource,
      targetIcon,
    };
  });
  const selectTarget = swappedTargets?.find((s) => s.slug === selectedToken.slug);
  return (
    <Card {...resProps}>
      <Text fontSize="18px" fontWeight="600">{`Position ${data.id + 1}`}</Text>
      <HStack spacing="6" marginTop="8px">
        <Box
          background="linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)"
          fontSize="15px"
          fontWeight="600"
          paddingX="2"
          paddingY="1"
          borderRadius="9px"
        >
          {data.status === "started" ? percent + "%" : data.status === "finished" ? "100%" : "0%"}
        </Box>
        <HStack spacing="3" marginLeft="6">
          <Image src={sourceToken.icon} alt={sourceToken.name} width="26px" height="26px" />
          <Text color="white" fontWeight="600">
            {sourceToken.symbol}
          </Text>
        </HStack>
        <Icon as={BsArrowRight} />
        <HStack spacing="4">
          {targetTokens.map((token) => (
            <Image
              key={token.name}
              src={token.icon}
              alt={token.name}
              cursor="pointer"
              width="26px"
              height="26px"
              onClick={() => setSelectedToken(token)}
              _hover={{
                filter: "blur(1px)",
              }}
            />
          ))}
        </HStack>
        <Box fontWeight="600" flexGrow="1" textAlign="right" paddingRight="3em">
          {endTime.fromNow()}
        </Box>
      </HStack>
      <Box
        background="linear-gradient(90deg, #00FFD8 29.16%, #FF0021 45.41%)"
        height="8px"
        border="0.5px solid #613232"
        borderRadius="2px"
        marginY="18px"
      />
      <HStack marginTop="9px" spacing="8">
        <Text fontSize="15px" fontWeight="600" width="16%">
          Swapped:
        </Text>
        <Box
          background="linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)"
          fontSize="15px"
          fontWeight="600"
          paddingX="2"
          paddingY="1"
          borderRadius="9px"
          flexGrow="1"
          textAlign="center"
        >
          {formatPrice(selectTarget && selectTarget.targetIcon)} {selectedToken.symbol}
        </Box>
      </HStack>
      <HStack marginTop="9px" spacing="8">
        <Text fontSize="15px" fontWeight="600" width="16%">
          Rate:
        </Text>
        <Box
          background="linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)"
          fontSize="15px"
          fontWeight="600"
          paddingX="2"
          paddingY="1"
          borderRadius="9px"
          flexGrow="1"
          textAlign="center"
        >
          {formatPrice(data.rate)} {data.token.symbol}
        </Box>
        <Text fontSize="15px" fontWeight="600">
          {`Every ${data.time === "daily" ? "Day" : data.time === "weekly" ? "Week" : "Month"}`}
        </Text>
      </HStack>
      <HStack marginTop="9px" spacing="8">
        <Text fontSize="15px" fontWeight="600" width="16%">
          Remaining:
        </Text>
        <Box
          background="linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)"
          fontSize="15px"
          fontWeight="600"
          paddingX="2"
          paddingY="1"
          borderRadius="9px"
          flexGrow="1"
          textAlign="center"
        >
          {formatPrice(selectTarget && selectTarget.sourceIcon)} {selectedToken.symbol}
        </Box>
      </HStack>
      <HStack marginTop="9px" spacing="8">
        <Text fontSize="15px" fontWeight="600" width="16%">
          To withdraw:
        </Text>
        <Box
          background="linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)"
          fontSize="15px"
          fontWeight="600"
          paddingX="2"
          paddingY="1"
          borderRadius="9px"
          flexGrow="1"
          textAlign="center"
        >
          {formatPrice(selectTarget && selectTarget.targetIcon)} {selectedToken.symbol}
        </Box>
      </HStack>
      <HStack marginTop="9px" spacing="8">
        <Text fontSize="15px" fontWeight="600" width="16%">
          Average buying price:
        </Text>
        <Box
          background="linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)"
          fontSize="15px"
          fontWeight="600"
          paddingX="2"
          paddingY="1"
          borderRadius="9px"
          flexGrow="1"
          textAlign="center"
        >
          {`1 ${selectedToken.symbol}`} = {formatPrice(selectTarget && selectTarget.averagePrice)} {"USD"}
        </Box>
      </HStack>
      <HStack marginTop="24px" spacing="8">
        <Button
          borderRadius="full"
          backgroundColor="#323C52"
          fontSize="18px"
          width="100%"
          fontWeight="700"
          _hover={{ backgroundColor: "#323C52" }}
          _active={{ backgroundColor: "#323C52" }}
        >
          Withdraw
        </Button>
        <Button
          borderRadius="full"
          backgroundColor="#009E86"
          fontSize="18px"
          width="100%"
          fontWeight="700"
          _hover={{ backgroundColor: "#009E86" }}
          _active={{ backgroundColor: "#009E86" }}
        >
          Earn Yield
        </Button>
      </HStack>
    </Card>
  );
};

export const DetailPositionCard = (props: Omit<FlexProps, "children">) => {
  const isConnected = useIsConnected();
  const _position = usePositionStore((state) => state.position);
  const position = isConnected ? _position : null;
  return (
    <Flex {...props} backgroundColor="rgba(255, 255, 255, 0.6)" borderRadius="18px" padding="30px">
      <Text color="#323C52" fontWeight="600" fontSize="20px">
        {!position && "Please select a position to see the detail"}
      </Text>
      {position && <DCard data={position} width="50%" />}
    </Flex>
  );
};
