import { Flex } from "@chakra-ui/react";

import type { FlexProps } from "@chakra-ui/react";

export const Card = (props: FlexProps) => {
  return (
    <Flex
      borderRadius="18px"
      padding="18px"
      direction="column"
      background="linear-gradient(180deg, rgba(255, 124, 140, 0.9) 0%, rgba(197, 97, 111, 0.89) 100%)"
      {...props}
    />
  );
};
