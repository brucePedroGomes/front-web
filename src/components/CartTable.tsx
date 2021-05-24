import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Text,
  HStack,
  Tr,
  Icon,
} from '@chakra-ui/react';
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr';

import { ButtonIcon } from './ButtonIcon';
import { VscTrash } from 'react-icons/vsc';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

type Product = {
  id: number;
  amount: number;
};

export const CartTable = () => {
  const { cart, updateProductAmount, removeProduct } = useCart();

  const cartFormatted = cart.map((product) => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount),
  }));

  const handleProductIncrement = (product: Product) => {
    updateProductAmount(product.id, product.amount + 1);
  };

  const handleProductDecrement = (product: Product) => {
    updateProductAmount(product.id, product.amount - 1);
  };

  return (
    <Table w={900}>
      <Thead>
        <Tr>
          <Th>Qtd</Th>
          <Th>Item</Th>
          <Th>Preço</Th>
          <Th>Subtotal</Th>
          <Th w="6" />
        </Tr>
      </Thead>
      <Tbody>
        {cartFormatted.map((product) => (
          <Tr key={product.id}>
            <Td>
              <HStack alignItems="center">
                <ButtonIcon
                  icon={GrFormSubtract}
                  onClick={() => handleProductDecrement(product)}
                />

                <Text> {product.amount} </Text>

                <ButtonIcon
                  icon={GrFormAdd}
                  onClick={() => handleProductIncrement(product)}
                />
              </HStack>
            </Td>
            <Td>{product.name}</Td>
            <Td>{product.priceFormatted}</Td>
            <Td>{product.subTotal}</Td>
            <Td>
              <Icon
                as={VscTrash}
                boxSize="5"
                _hover={{
                  cursor: 'pointer',
                  transitionDuration: '400ms',
                  color: 'red.500',
                }}
                onClick={() => removeProduct(product.id)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
