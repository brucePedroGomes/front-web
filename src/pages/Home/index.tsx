import {
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Stack,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
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
    async function getCategorias() {
      const response = await api.get('/categories');
      setCategories(response.data);
    }
    getCategorias();
  }, []);

  const handleCategorySelection = (id: number) => {
    setSelectedCategory(categories.find((c) => c.id === id));
  };

  const TriangleIcon = isOpen ? TriangleUpIcon : TriangleDownIcon;

  return (
    <>
      {categories.length > 0 && (
        <>
          <Stack m="16" alignItems="center">
            <Menu onClose={onClose} onOpen={onOpen}>
              <MenuButton
                border="2px"
                px={4}
                py={2}
                w={600}
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                _focus={{ boxShadow: 'outline' }}
              >
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
          </Stack>
          <Products categoryId={selectedCategory?.id} />
        </>
      )}
    </>
  );
};
