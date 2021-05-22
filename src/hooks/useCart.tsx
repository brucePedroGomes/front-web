import { useToast } from '@chakra-ui/toast';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from 'react';

import { api } from '../services/api';

type Product = {
  id: number;
  idCategory: number;
  name: string;
  description: string;
  price: number;
  image: string;
  amount: number;
};

type CartContextData = {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: (productId: number, amount: number) => void;
  removeAllProducts: () => void;
};

const CartContext = createContext<CartContextData>(
  {} as CartContextData
);

export const CartProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cart, setCart] = useState<Product[]>([]);
  const toast = useToast();

  const addProduct = async (productId: number) => {
    try {
      const productExists = cart.find(
        (product) => product.id === productId
      );

      if (!productExists) {
        const { data: product } = await api.get(
          `/products/${productId}`
        );

        const productRequested = {
          ...product,
          amount: 1,
        };

        setCart([...cart, productRequested]);
      } else {
        const newCart = cart.map((product) =>
          product.id === productId
            ? { ...product, amount: product.amount + 1 }
            : product
        );

        setCart(newCart);
      }

      toast({
        title: 'Produto adicionado ao carrinho!',
        status: 'success',
        position: 'bottom-left',
      });
    } catch {
      toast({
        title: 'Erro na adição do produto!',
        status: 'error',
        position: 'bottom-left',
      });
    }
  };

  const removeProduct = (productId: number) => {
    const product = cart.find((product) => product.id === productId);

    if (!product) {
      toast({
        title: 'Erro na remoção do produto',
        status: 'error',
        position: 'bottom-left',
      });
    }

    setCart(cart.filter((product) => product.id !== productId));
  };

  const updateProductAmount = (productId: number, amount: number) => {
    if (amount <= 0) {
      removeProduct(productId);
      return;
    }

    const product = cart.find((product) => product.id === productId);

    if (!product) {
      toast({
        title: 'Erro na remoção do produto',
        status: 'error',
        position: 'bottom-left',
      });
    }

    setCart(
      cart.map((product) =>
        product.id === productId ? { ...product, amount } : product
      )
    );
  };

  const removeAllProducts = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        updateProductAmount,
        removeAllProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextData => {
  const context = useContext(CartContext);
  return context;
};
