import { Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { useLinkHighlighted } from '@app/hooks/useLinkHighlighted';

import { Link, LinkProps } from './Link';

import type { TextProps } from '@chakra-ui/react';

type NavLinkProps = {
  linkProps: Omit<LinkProps, 'children'>;
  textProps?: Omit<TextProps, 'children'>;
  children: ReactNode;
};

const DEFAULT_PROPS: TextProps = {
  fontWeight: 'semibold',
};

export const NavLink = ({ linkProps, textProps, children }: NavLinkProps) => {
  const { href } = linkProps;

  const isHighlighted = useLinkHighlighted({ href: typeof href === 'string' ? href : '' });

  const props = { ...DEFAULT_PROPS, ...textProps };

  return (
    <Link {...linkProps}>
      <Text
        {...props}
        sx={{
          color: isHighlighted ? '#d9475a' : props.color,
        }}
      >
        {children}
      </Text>
    </Link>
  );
};
