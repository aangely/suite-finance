import { extendTheme } from "@chakra-ui/react";

import { styles } from "./styles";

export const theme = extendTheme({
  config: { initalColorMode: "dark", useSystemColorMode: false },
  styles,
});
