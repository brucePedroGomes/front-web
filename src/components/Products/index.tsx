import {
  Text,
  Box,
  HStack,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

import { ProductTable } from './Table';
import { api } from '../../services/api';

export type Product = {
  id: number;
  idCategory: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export const Products = ({ categoryId }: { categoryId?: number }) => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const id =
        categoryId != null ? `?idCategory=${categoryId}` : '';
      const { data } = await api.get<Product[]>(`/products/${id}`);
      setProducts(data);
    }

    setPage(1);

    loadProducts();
  }, [categoryId]);

  const productsPerPage = useMemo(() => 4, []);

  const totalPages = useMemo(
    () => Math.ceil(products.length / productsPerPage),
    [products, productsPerPage]
  );

  const pageProducts = useMemo(() => {
    const start = productsPerPage * (page - 1);
    const end = start + productsPerPage;

    return products.slice(start, end);
  }, [productsPerPage, page, products]);

  const handleNextPage = () => {
    if (page >= totalPages) {
      return;
    }
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page <= 1) {
      return;
    }
    setPage(page - 1);
  };

  return (
    <Flex direction="column">
      <Box mt="10">
        <ProductTable products={pageProducts} />
      </Box>
      <HStack mt="10">
        <IconButton
          disabled={page <= 1}
          aria-label="back"
          icon={<ArrowBackIcon />}
          onClick={handlePreviousPage}
        />

        <Text>{page.toString().padStart(2, '0')}</Text>

        <IconButton
          disabled={page >= totalPages}
          aria-label="forward"
          onClick={handleNextPage}
          icon={<ArrowForwardIcon />}
        />
      </HStack>
    </Flex>
  );
};
