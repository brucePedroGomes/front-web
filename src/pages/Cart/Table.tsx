import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Text,
  HStack,
  Tr,
} from '@chakra-ui/react';
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
import { ButtonIcon } from './ButtonIcon';

export const CartTable = () => {
  const { cart } = useCart();

  const cartFormatted = cart.map((product) => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount),
  }));

  return (
    <Table w="3xl">
      <Thead>
        <Tr>
          <Th>Qtd</Th>
          <Th>Item</Th>
          <Th>Preço</Th>
          <Th w="6">Subtotal</Th>
        </Tr>
      </Thead>
      <Tbody>
        {cartFormatted.map((product) => (
          <Tr key={product.id}>
            <Td>
              <HStack alignItems="center">
                <ButtonIcon
                  icon={GrFormSubtract}
                  onClick={() => console.log('button1')}
                />

                <Text> {product.amount} </Text>

                <ButtonIcon
                  icon={GrFormAdd}
                  onClick={() => console.log('button2')}
                />
              </HStack>
            </Td>
            <Td>{product.name}</Td>
            <Td>{product.priceFormatted}</Td>
            <Td>{product.subTotal}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
