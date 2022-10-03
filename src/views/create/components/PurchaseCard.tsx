import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Input,
  NumberInput,
  NumberInputField,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { BiCalendar } from "react-icons/bi";
import shallow from "zustand/shallow";

import { Card } from "@app/components/Card";
import { usePurchaseStore } from "@app/store/usePurchaseStore";

import type { FlexProps } from "@chakra-ui/react";

const times = ["daily", "weekly", "monthly"] as const;

const counts = [5, 15, 30] as const;

export const PurchaseCard = (props: Omit<FlexProps, "children">) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { time, setTime, total, setTotal, startTime, setStartTime } = usePurchaseStore(
    (state) => ({
      time: state.time,
      setTime: state.setTime,
      total: state.total,
      setTotal: state.setTotal,
      startTime: state.startTime,
      setStartTime: state.setStartTime,
    }),
    shallow,
  );
  return (
    <Card {...props}>
      <Flex fontWeight="600" justifyContent="space-between">
        <Text>Purchase Frquency</Text>
        <HStack>
          {times.map((item) => (
            <Button
              key={item}
              borderRadius="9px"
              textTransform="capitalize"
              onClick={() => setTime(item)}
              background="linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)"
              outlineOffset="0"
              outlineColor={item === time ? "white" : "transparent"}
              _hover={{
                background: "linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)",
              }}
              _active={{
                background: "linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)",
              }}
            >
              {item}
            </Button>
          ))}
        </HStack>
      </Flex>
      <Text fontWeight="600" marginY="6px">
        {`How many ${time === "daily" ? "days" : time === "weekly" ? "weeks" : "months"}?`}
      </Text>
      <HStack spacing="2">
        <NumberInput flexGrow="1" value={total} onChange={(s) => setTotal(+s)}>
          <NumberInputField
            background="linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)"
            width="100%"
            borderRadius="full"
            border="none"
            outline="none"
            color="white"
          />
        </NumberInput>
        <HStack spacing="1">
          {counts.map((item) => (
            <Button
              key={item}
              onClick={() => setTotal(item)}
              borderRadius="9px"
              background="linear-gradient(180deg, #96596A 0%, rgba(114, 64, 78, 0.8) 100%);"
              _hover={{
                background: "linear-gradient(180deg, #96596A 0%, rgba(114, 64, 78, 0.8) 100%);",
              }}
              _active={{
                background: "linear-gradient(180deg, #96596A 0%, rgba(114, 64, 78, 0.8) 100%);",
              }}
            >
              {item}
            </Button>
          ))}
        </HStack>
      </HStack>
      <Flex marginTop="9px" alignItems="center" justifyContent="space-between" marginBottom="20px">
        <Text>When would you like to start invest?</Text>
        <HStack spacing="3">
          <Icon as={BiCalendar} width="24px" height="24px" />
          <Box>
            <Popover isOpen={isOpen} placement="bottom" onClose={onClose} onOpen={onOpen}>
              <PopoverTrigger>
                <Input
                  borderRadius="full"
                  background="linear-gradient(180deg, #8E2424 16.67%, #4D3737 100%)"
                  border="none"
                  readOnly
                  cursor="pointer"
                  value={dayjs(startTime).format("DD / MM / YYYY")}
                />
              </PopoverTrigger>
              <PopoverContent width="max-content" height="max-content" bg="white">
                <Global styles={GlobalStyles} />
                {isOpen ? <PopoverArrow bg="white" /> : null}
                {isOpen ? (
                  <DatePicker
                    selected={dayjs(startTime).toDate()}
                    inline
                    isClearable
                    showPopperArrow={true}
                    disabledKeyboardNavigation
                    onChange={(time: Date) => {
                      setStartTime(time.toDateString());
                      onClose();
                    }}
                  />
                ) : null}
              </PopoverContent>
            </Popover>
          </Box>
        </HStack>
      </Flex>
    </Card>
  );
};

const GlobalStyles = css`
  .react-datepicker {
    border-color: rgba(0, 0, 0, 0) !important;
  }
  .react-datepicker__header {
    background-color: #fff !important;
  }
  .react-datepicker__navigation-icon--previous::before {
    top: 13px;
  }
  .react-datepicker__navigation-icon--next::before {
    top: 13px;
  }
`;
