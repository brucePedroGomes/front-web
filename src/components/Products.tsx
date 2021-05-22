import { Stack, Text, Button, Box } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useCart } from '../hooks/useCart';
import { api } from '../services/api';

type Product = {
  id: number;
  idCategory: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

type Props = {
  categoryId?: number;
};

export const Products = ({ categoryId }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  const { addProduct } = useCart();

  useEffect(() => {
    async function getProducts() {
      const response = await api.get(`/products`);
      setProducts(response.data);
    }

    getProducts();
  }, []);

  const handleAddProduct = (productId: number) => {
    addProduct(productId);
  };

  const productList = useMemo(
    () =>
      categoryId != null
        ? products.filter((p) => p.idCategory === categoryId)
        : products,
    [products, categoryId]
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt="16"
    >
      {productList.map((product) => (
        <Stack
          w={600}
          key={product.id}
          alignItems="center"
          border="2px"
          borderBottom="none"
          _last={{
            borderBottom: '2px',
          }}
          justifyContent="space-between"
          direction="row"
          p="3"
        >
          <Text>{product.name}</Text>
          <Button
            boxShadow="4px 4px"
            h="8"
            onClick={() => handleAddProduct(product.id)}
          >
            Adicionar no carrinho
          </Button>
        </Stack>
      ))}
    </Box>
  );
};
