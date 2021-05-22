import { ReactNode } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Icon,
  ModalProps,
} from '@chakra-ui/react';

import { AiFillCheckCircle } from 'react-icons/ai';

type Props = {
  title: string;
  body: string;
  children: ReactNode;
} & ModalProps;

export const CheckoutModal = ({
  title,
  body,
  children,
  ...rest
}: Props) => {
  return (
    <>
      <Modal {...rest} isCentered>
        <ModalOverlay />
        <ModalContent
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ModalHeader w="40" display="flex" justifyContent="center">
            <Icon
              color="green.600"
              boxSize="32"
              as={AiFillCheckCircle}
            />
          </ModalHeader>
          <ModalBody>{body}</ModalBody>

          <ModalFooter w="40" display="flex" justifyContent="center">
            {children}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
