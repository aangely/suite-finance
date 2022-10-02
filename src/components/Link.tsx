import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

import type { LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import type { LinkProps as NextLinkProps } from "next/link";

export type LinkProps = Omit<ChakraLinkProps, "href"> & {
  href: ChakraLinkProps["href"] | NextLinkProps["href"];
};

export const Link = (props: LinkProps) => {
  const { href, ...restProps } = props;
  if (typeof href === "object") {
    return (
      <NextLink passHref href={href}>
        <ChakraLink {...restProps} />
      </NextLink>
    );
  }
  let isExternal = false;
  if (href && href.startsWith("http")) {
    isExternal = true;
  }
  if (isExternal) {
    return <ChakraLink target="_blank" rel="noreferrer noopener" href={href} {...restProps} />;
  } else if (href) {
    return (
      <NextLink passHref href={href}>
        <ChakraLink {...restProps} />
      </NextLink>
    );
  } else {
    return <ChakraLink target="_blank" rel="noreferrer noopener" href={href} {...restProps} />;
  }
};
