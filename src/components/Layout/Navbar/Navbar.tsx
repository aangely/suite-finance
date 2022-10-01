import { Button, Flex, Link } from "@chakra-ui/react";

export const Navbar = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="#323C52"
      height={76}
      padding={30}
      color="#fff"
    >
      <Flex justifyContent="flex-start" alignItems="center">
        <Link href="/" fontWeight="bold">
          Suite
        </Link>
        <Link href="/create">Create</Link>
        <Link href="/position">Position</Link>
        <Link href="/docs">Docs</Link>
      </Flex>
      <Flex>
        <Button backgroundColor="#D9475A" borderRadius={50}>
          Connect Wallet
        </Button>
      </Flex>
    </Flex>
  );
};
