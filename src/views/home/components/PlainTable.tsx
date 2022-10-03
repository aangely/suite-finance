import { Box, Button, Flex, HStack, Image, Table, Tag, Tbody, Td, Text, Th, Thead, Tr, Stack, Skeleton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { tokenList } from "@app/store/useSellStore";
import { formatPrice } from "@app/utils/format";

const time = ["1 Year", "6 Months", "1 Week", "1 Day"];

const mockData = tokenList.map((item) => {
  const _change = parseInt(Math.random() * 100 + "");
  const change = Math.random() > 0.5 ? _change : -_change;
  const price = formatPrice(Number((change < 0 ? "-" : "") + Math.random() * 300));
  return { ...item, change, price };
});

export const PlainTable = () => {
  const { push } = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) {
    return (
      <Stack marginTop="20px">
        <Skeleton height="70px" />
        <Skeleton height="70px" />
        <Skeleton height="70px" />
        <Skeleton height="70px" />
        <Skeleton height="70px" />
        <Skeleton height="70px" />
        <Skeleton height="70px" />
        <Skeleton height="70px" />
        <Skeleton height="70px" />
        <Skeleton height="70px" />
        <Skeleton height="70px" />
        <Skeleton height="70px" />
      </Stack>
    );
  }
  return (
    <Table
      variant="unstyled"
      marginTop="10px"
      sx={{
        borderCollapse: "separate",
        borderSpacing: "0 8px",
      }}
    >
      <Thead textTransform="capitalize">
        <Tr>
          <Th fontSize="21px" fontWeight="600">
            Product
          </Th>
          <Th fontSize="21px" fontWeight="600">
            Historical ROI
          </Th>
          <Th />
          <Th fontSize="21px" fontWeight="600">
            Spot Price
          </Th>
          <Th />
        </Tr>
      </Thead>

      <Tbody>
        {mockData.map((token) => {
          return (
            <Tr
              key={token.name}
              paddingY="9px"
              position="relative"
              paddingX="18px"
              _after={{ content: '""', width: "100%", height: "3px" }}
            >
              <Td borderLeftRadius="9px" backgroundColor="rgba(255, 255, 255, 0.5)">
                <Flex alignItems="center">
                  <Image src={token.icon} alt={token.name} width="30px" height="30px" />
                  <Text marginLeft="1em" fontWeight="700">
                    {token.symbol}
                  </Text>
                </Flex>
              </Td>
              <Td backgroundColor="rgba(255, 255, 255, 0.5)">
                <Text color={token.change > 0 ? "green" : "red"} fontSize="15px" fontWeight="700">{`${token.change}%`}</Text>
              </Td>
              <Td backgroundColor="rgba(255, 255, 255, 0.5)">
                <HStack spacing="6px">
                  {time.map((t) => (
                    <Tag key={t} color="white" backgroundColor="rgba(50, 60, 82, 0.5)">
                      {t}
                    </Tag>
                  ))}
                </HStack>
              </Td>
              <Td backgroundColor="rgba(255, 255, 255, 0.5)">
                <Text color={token.change > 0 ? "green" : "red"} fontSize="15px" fontWeight="700">
                  {token.price}
                </Text>
              </Td>
              <Td backgroundColor="rgba(255, 255, 255, 0.5)">
                <Box textAlign="right">
                  <Button
                    bgGradient="linear-gradient(265.49deg, #E78C99 -27.48%, #E5E5E5 117.38%)"
                    width={152}
                    height={16}
                    borderRadius={12}
                    fontSize={18}
                    onClick={() => push("/create")}
                    color="#000"
                  >
                    Create a plan
                  </Button>
                </Box>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
