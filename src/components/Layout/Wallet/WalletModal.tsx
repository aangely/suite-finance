import { Box, Image, Modal, ModalContent, ModalOverlay, SimpleGrid, Text, useToast, VStack } from "@chakra-ui/react";

import { Card } from "@app/components/Card";
import { allWallets, currentWallet, walletIconMap } from "@app/wallet";

const { switchCurrentWallet } = currentWallet;

export const WalletModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const toast = useToast();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent borderRadius="18px" padding="30px" backgroundColor="white">
        <Card>
          <SimpleGrid templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)" columnGap="2" rowGap="2">
            {allWallets.map((wallet) => (
              <VStack
                key={wallet.name}
                padding="2"
                borderRadius="6px"
                _hover={{ backgroundColor: "rgba(200, 200, 200, .5)" }}
                textAlign="center"
                onClick={async () => {
                  try {
                    switchCurrentWallet(wallet.name);
                    await wallet.connect();
                    // toast({
                    //   title: "Success.",
                    //   position: "top-right",
                    //   status: "success",
                    //   duration: 9000,
                    //   isClosable: true,
                    // });
                  } catch (e) {
                    toast({
                      title: "Fail.",
                      description: `${(e as Error).message}`,
                      position: "top-right",
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                    });
                  } finally {
                    onClose();
                  }
                }}
              >
                <Image src={walletIconMap[wallet.name]} alt={wallet.name} width="40px" height="40px" />
                <Text textTransform="capitalize" fontSize="16px" fontWeight="500">
                  {wallet.name}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Card>
      </ModalContent>
    </Modal>
  );
};
