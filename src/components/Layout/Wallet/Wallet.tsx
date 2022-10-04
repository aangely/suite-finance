import { Box, Button, Image, Modal, ModalContent, ModalOverlay, Text, useDisclosure, VStack } from "@chakra-ui/react";

import { Card } from "@app/components/Card";
import { currentWallet, walletIconMap } from "@app/wallet";

import { WalletModal } from "./WalletModal";

export const Wallet = () => {
  const { useName, useIsConnected, useIsConnecting, useChainId, useAccount, disconnect } = currentWallet;
  const walletName = useName();
  // const isConnecting = useIsConnecting();
  const isConnected = useIsConnected();

  // const chainId = useChainId();
  const account = useAccount();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: _isOpen, onOpen: _onOpen, onClose: _onClose } = useDisclosure();

  if (!isConnected) {
    return (
      <>
        <Button
          backgroundColor="#D9475A"
          key="foo"
          borderRadius={50}
          onClick={onOpen}
          _hover={{
            backgroundColor: "#D9475A",
          }}
          _active={{
            backgroundColor: "#D9475A",
          }}
        >
          Connect Wallet
        </Button>
        <WalletModal isOpen={isOpen} onClose={onClose} />
      </>
    );
  }

  return (
    <>
      <Button
        backgroundColor="#009E86"
        borderRadius={50}
        onClick={_onOpen}
        _hover={{
          backgroundColor: "#009E86",
        }}
        _active={{
          backgroundColor: "#009E86",
        }}
      >
        <Text width="200px" noOfLines={1}>
          {`${walletName}: ${account}`}
        </Text>
      </Button>
      <Modal isOpen={_isOpen} onClose={_onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="18px" padding="30px" backgroundColor="white">
          <Card>
            <VStack spacing="4">
              <Image src={walletIconMap[walletName]} alt={walletName} width="40px" height="40px" />
              <Text textTransform="capitalize" fontSize="16px" fontWeight="500">
                {walletName}
              </Text>
              <Button
                textTransform="capitalize"
                fontSize="15px"
                backgroundColor="#323C52"
                fontWeight="500"
                _hover={{
                  backgroundColor: "#323C52",
                }}
                _active={{
                  backgroundColor: "#323C52",
                }}
                onClick={async () => {
                  try {
                    await disconnect();
                  } catch (e) {
                    void 0;
                  } finally {
                    _onClose();
                  }
                }}
              >
                disconnect
              </Button>
            </VStack>
          </Card>
        </ModalContent>
      </Modal>
    </>
  );
};
