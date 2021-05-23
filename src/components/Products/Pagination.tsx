import {
  Stack,
  Text,
  Button,
  Box,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useCart } from '../../hooks/useCart';

import { Product } from './index';

export const Pagination = ({ products }: { products: Product[] }) => {
  const [page, setPage] = useState(1);
  const { addProduct } = useCart();

  const productsPerPage = useMemo(() => 5, []);

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
    <>
      <Box>
        {pageProducts.map((product) => (
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
              onClick={() => addProduct(product.id)}
            >
              Adicionar no carrinho
            </Button>
          </Stack>
        ))}
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
    </>
  );
};
