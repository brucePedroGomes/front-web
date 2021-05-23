import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Pagination } from './Pagination';

export type Product = {
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
    async function loadProducts() {
      const id =
        categoryId != null ? `?idCategory=${categoryId}` : '';
      const { data } = await api.get<Product[]>(`/products/${id}`);
      setProducts(data);
    }

    loadProducts();
  }, [categoryId]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt="16"
    >
      <Pagination products={products} />
    </Box>
  );
};
