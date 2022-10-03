import { Button } from "@chakra-ui/react";

import { useReceiveStore } from "@app/store/useReceiveStore";
import { useSellStore } from "@app/store/useSellStore";

export const ApplyButton = () => {
  const total = useReceiveStore((state) => state.total);
  const sell = useSellStore((state) => state.balance);
  const enabled = total === 100 && sell > 0;
  const color = enabled ? "#323C52" : "rgba(50, 60, 82, 1)";
  return (
    <Button
      borderRadius="full"
      width="100%"
      disabled={!enabled}
      backgroundColor={color}
      _hover={{ backgroundColor: color }}
      _active={{ backgroundColor: color }}
    >
      Create Position
    </Button>
  );
};
