import { Button, useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import shallow from "zustand/shallow";

import { usePositionStore } from "@app/store/usePositionStore";
import { usePurchaseStore } from "@app/store/usePurchaseStore";
import { useReceiveStore } from "@app/store/useReceiveStore";
import { useSellStore } from "@app/store/useSellStore";

export const ApplyButton = () => {
  const toast = useToast();
  const total = useReceiveStore((state) => state.total);
  const sell = useSellStore((state) => state.balance);
  const time = usePurchaseStore((state) => state.total);
  const { positions, addPosition } = usePositionStore(
    (state) => ({ positions: state.pendingPositions, addPosition: state.addPosition }),
    shallow,
  );
  const enabled = total === 100 && sell > 0 && time > 0;
  const color = enabled ? "#323C52" : "rgba(50, 60, 82, 1)";
  const token = useSellStore.getState().token;
  const tokens = useReceiveStore.getState().tokens;
  const _time = usePurchaseStore.getState().time;
  const startTime = usePurchaseStore.getState().startTime;
  const lastId = positions.at(-1);

  return (
    <Button
      borderRadius="full"
      width="100%"
      disabled={!enabled}
      backgroundColor={color}
      onClick={() => {
        addPosition({
          id: lastId ? lastId.id + 1 : 0,
          token,
          total: sell,
          tokens,
          time: _time,
          startTime,
          endTime: dayjs(startTime)
            .add(time, _time === "daily" ? "day" : _time === "weekly" ? "week" : "year")
            .toDate()
            .toDateString(),
          totalTime: time,
          status: "pending",
          rate: sell / time,
        });
        toast({
          title: "Success.",
          description: "We've created your position for you.",
          position: "top-right",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        useSellStore.getState().clear();
        useReceiveStore.getState().clear();
        usePurchaseStore.getState().clear();
      }}
      _hover={{ backgroundColor: color }}
      _active={{ backgroundColor: color }}
    >
      Create Position
    </Button>
  );
};
