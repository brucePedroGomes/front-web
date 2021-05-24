import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from '@chakra-ui/react';

import { FaCartPlus } from 'react-icons/fa';
import { useMemo } from 'react';
import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../hooks/useCart';
import { Product } from '.';

export const ProductTable = ({
  products,
}: {
  products: Product[];
}) => {
  const { addProduct } = useCart();

  const cartFormatted = useMemo(
    () =>
      products.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      })),
    [products]
  );

  const handleAddProduct = (productId: number) => {
    addProduct(productId);
  };

  return (
    <Table variant="simple" w={720}>
      <Thead>
        <Tr>
          <Th>Item</Th>
          <Th>Preço</Th>
          <Th w="12"></Th>
        </Tr>
      </Thead>
      <Tbody>
        {cartFormatted.map((product) => (
          <Tr key={product.id}>
            <Td>{product.name}</Td>
            <Td>{product.priceFormatted}</Td>
            <Td>
              <Button
                onClick={() => handleAddProduct(product.id)}
                leftIcon={<FaCartPlus />}
              >
                Adicionar no carrinho
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
