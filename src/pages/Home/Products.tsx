import { Stack, Text, Button, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

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

  useEffect(() => {
    async function getProducts() {
      const response = await api.get(`/products`);
      setProducts(response.data);
    }

    getProducts();
  }, []);

  const productList =
    categoryId != null
      ? products.filter((p) => p.idCategory === categoryId)
      : products;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt="24"
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
          <Button boxShadow="4px 4px" h="8">
            Adicionar no carrinho
          </Button>
        </Stack>
      ))}
    </Box>
  );
};
