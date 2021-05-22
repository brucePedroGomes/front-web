import {
  Text,
  Heading,
  Flex,
  Icon,
  Stack,
  HStack,
  Button,
} from '@chakra-ui/react';
import { useCart } from '../../hooks/useCart';
import { GiShoppingBag } from 'react-icons/gi';
import { CartTable } from './Table';
import { formatPrice } from '../../utils/formatPrice';

export const Cart = () => {
  const { cart } = useCart();

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      return sumTotal + product.price * product.amount;
    }, 0)
  );

  return (
    <Stack spacing="16" alignItems="center">
      <Flex direction="column" align="center" m="8">
        <Heading>Finalizar pedido</Heading>

        <Flex
          alignItems="center"
          marginY="12"
          w="full"
          marginRight="auto"
        >
          <Icon as={GiShoppingBag} boxSize="24" />
          <Flex ml="6" direction="column">
            <Text fontWeight="bold">Armazen do front-web</Text>
            <Text>9:34 min restante</Text>
          </Flex>
        </Flex>

        <Stack spacing="20">
          <Text fontWeight="bold">Revise seus items</Text>
          <CartTable />

          <HStack justifyContent="space-between">
            <Button>Finalizar compra</Button>
            <HStack alignItems="center">
              <Text color="gray.400">Total</Text>
              <Text fontSize="32" fontWeight="bold">
                {total}
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Flex>
    </Stack>
  );
};
