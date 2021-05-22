import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

type Props = {
  title: string;
  body: string;
};

export const AlertModal = ({ title, body }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart } = useCart();

  useEffect(() => {
    if (cart.length <= 0) {
      onOpen();
    }
  }, [cart]);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{body}</ModalBody>

          <ModalFooter>
            <Button
              as={Link}
              to="/"
              colorScheme="blue"
              mr={3}
              onClick={onClose}
            >
              Voltar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
