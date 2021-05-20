import {
  Flex,
  Icon,
  IconButton,
  Text,
  Stack,
  Center,
} from '@chakra-ui/react';
import { IoCartSharp } from 'react-icons/io5';
import { FaStoreAlt } from 'react-icons/fa';

export const Header = () => {
  return (
    <Flex
      justifyContent="flex-end"
      px="28"
      bg="gray.500"
      as="header"
      h="28"
      align="center"
      position="relative"
    >
      <Icon
        position="absolute"
        left="50%"
        transform="auto"
        translateX="-50%"
        color="blackAlpha.800"
        boxSize="14"
        as={FaStoreAlt}
      />

      <Stack
        spacing={4}
        direction="row"
        alignItems="center"
        position="relative"
      >
        <IconButton
          aria-label=""
          boxSize="14"
          fontSize="x-large"
          bg="none"
          color="blackAlpha.800"
          icon={<Icon as={IoCartSharp} />}
        />
        <Center
          border="2px"
          bg="white"
          borderColor="blackAlpha.800"
          color="blackAlpha.900"
          borderRadius="100%"
          boxSize="6"
          top="0"
          right="1"
          position="absolute"
        >
          0
        </Center>
      </Stack>
    </Flex>
  );
};
