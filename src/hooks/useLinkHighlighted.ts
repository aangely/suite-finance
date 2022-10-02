import { useBoolean } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useLinkHighlighted = ({
  href,
  matchMode = 'full',
}: {
  href: string;
  matchMode?: 'full' | 'shallow';
}) => {
  const [isHighlighted, { on, off }] = useBoolean(false);
  const { asPath, isReady } = useRouter();

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      const linkPathname = new URL(href as string, location.href).pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname;

      if (
        matchMode === 'full'
          ? Object.is(linkPathname, activePathname)
          : activePathname.startsWith(linkPathname)
      ) {
        on();
      } else {
        off();
      }
    }
  }, [asPath, href, isReady, off, on, matchMode]);

  return isHighlighted;
};
