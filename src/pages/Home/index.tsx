import {
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Stack,
  Flex,
  Text,
  useDisclosure,
  Box,
  Button,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { AiOutlineClose } from 'react-icons/ai';
import { api } from '../../services/api';
import { Products } from '../../components/Products';

type Category = {
  id: number;
  name: string;
};

export const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<Category | undefined>();

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    const loadCategorias = async () => {
      const response = await api.get('/categories');
      setCategories(response.data);
    };

    loadCategorias();
  }, []);

  const handleCategorySelection = (id: number) => {
    setSelectedCategory(categories.find((c) => c.id === id));
  };

  const TriangleIcon = isOpen ? TriangleUpIcon : TriangleDownIcon;

  return (
    <Box>
      {categories.length > 0 && (
        <>
          <Stack alignItems="center" justifyContent="center" mt="16">
            <Menu onClose={onClose} onOpen={onOpen}>
              <Flex>
                <MenuButton as={Button} px={4} py={2} w={600}>
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text>
                      {selectedCategory
                        ? selectedCategory.name
                        : 'Selecione a categoria'}
                    </Text>

                    <TriangleIcon />
                  </Flex>
                </MenuButton>
                {selectedCategory && (
                  <Tooltip
                    label="Remover filtro"
                    bg="gray.200"
                    borderRadius="4"
                    color="gray.900"
                    fontSize="md"
                  >
                    <IconButton
                      ml="2"
                      bg="none"
                      aria-label="ok"
                      icon={<AiOutlineClose />}
                      onClick={() => setSelectedCategory(undefined)}
                    />
                  </Tooltip>
                )}
              </Flex>
              <MenuList w={600}>
                {categories.map((category) => (
                  <MenuItem
                    key={category.id}
                    value={category.id}
                    onClick={() => {
                      handleCategorySelection(category.id);
                    }}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Products categoryId={selectedCategory?.id} />
          </Stack>
        </>
      )}
    </Box>
  );
};
