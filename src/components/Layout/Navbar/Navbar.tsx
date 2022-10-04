import { HStack } from "@chakra-ui/react";

import { NavLink } from "@app/components/NavLink";

import { Wallet } from "../Wallet";

export const Navbar = () => {
  return (
    <HStack justifyContent="space-between" alignItems="center" backgroundColor="#323C52" height={76} padding={30} color="#fff">
      <HStack justifyContent="flex-start" alignItems="center" spacing={12}>
        <NavLink linkProps={{ href: "/" }} textProps={{ fontWeight: "bold" }}>
          SUITE
        </NavLink>
        <NavLink linkProps={{ href: "/create" }}>Create</NavLink>
        <NavLink linkProps={{ href: "/position" }}>Position</NavLink>
        <NavLink linkProps={{ href: "/docs" }}>Docs</NavLink>
      </HStack>
      <Wallet />
      {/* <Button backgroundColor="#D9475A" borderRadius={50} onClick={onOpen}>
        Connect Wallet
      </Button>
      <WalletCard isOpen={isOpen} onClose={onClose} /> */}
    </HStack>
  );
};
