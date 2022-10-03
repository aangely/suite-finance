import { extendTheme } from "@chakra-ui/react";

import { styles } from "./styles";

export const theme = extendTheme({
  config: { initialColorMode: "light", useSystemColorMode: false },
  styles,
});
