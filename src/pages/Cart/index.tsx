import {
  Text,
  Heading,
  Flex,
  Icon,
  Stack,
  HStack,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useCart } from '../../hooks/useCart';
import { GiShoppingBag } from 'react-icons/gi';
import { CartTable } from '../../components/CartTable';
import { formatPrice } from '../../utils/formatPrice';
import { AlertModal } from '../../components/AlertModal';
import { useHistory } from 'react-router';
import { CheckoutModal } from '../../components/CheckoutModal';
import { Countdown } from '../../components/Countdown';
import { useMemo } from 'react';

export const Cart = () => {
  const { cart, removeAllProducts } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const history = useHistory();

  const total = useMemo(() => {
    return formatPrice(
      cart.reduce((sumTotal, product) => {
        return sumTotal + product.price * product.amount;
      }, 0)
    );
  }, [cart]);

  const handleCheckout = () => {
    onClose();
    history.push('/');
    removeAllProducts();
  };

  return (
    <Stack alignItems="center" m="6" w="100hv" h="80vh">
      <Flex direction="column" align="center">
        <Heading>Finalizar pedido</Heading>

        <AlertModal
          title="Seu carrinho está vazio."
          body="Voltar para lista de produtos"
        />

        <CheckoutModal
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={onClose}
          body="Pedido realizado com sucesso!"
        >
          <Button colorScheme="green" onClick={handleCheckout}>
            Fechar
          </Button>
        </CheckoutModal>

        <Flex
          alignItems="center"
          marginY="8"
          w="full"
          marginRight="auto"
        >
          <Icon as={GiShoppingBag} boxSize="24" />
          <Flex ml="6" direction="column">
            <Text fontWeight="bold">Armazen do front-web</Text>
            {cart.length > 0 && <Countdown />}
          </Flex>
        </Flex>

        <Stack>
          <Text fontWeight="bold" ml="4">
            Revise seus items
          </Text>
          <CartTable />
          <HStack pt="10" justifyContent="space-between">
            <Button onClick={onOpen}>Finalizar compra</Button>
            <HStack alignItems="center">
              <Text color="gray.400">Total:</Text>
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
