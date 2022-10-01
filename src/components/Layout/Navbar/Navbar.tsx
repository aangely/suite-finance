import { Button, Flex, HStack, Link } from "@chakra-ui/react";

export const Navbar = () => {
  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="#323C52"
      height={76}
      padding={30}
      color="#fff"
      fontFamily="SF Pro"
    >
      <HStack justifyContent="flex-start" alignItems="center" spacing={12}>
        <Link href="/" fontWeight="bold" fontFamily="SF Pro Rounded">
          SUITE
        </Link>
        <Link href="/create">Create</Link>
        <Link href="/position">Position</Link>
        <Link href="/docs">Docs</Link>
      </HStack>
      <Link>
        <Button backgroundColor="#D9475A" borderRadius={50}>
          Connect Wallet
        </Button>
      </Link>
    </HStack>
  );
};
