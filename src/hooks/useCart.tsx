import {
  createContext,
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
  addProduct: (productId: number) => void;
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

  const addProduct = async (productId: number) => {
    const product = cart.find((p) => p.id === productId);

    if (!product) {
      const { data: product } = await api.get(
        `/products/${productId}`
      );

      const productRequested = {
        ...product,
        amount: 1,
      };

      setCart([...cart, productRequested]);
    } else {
      const newCart = cart.map((p) =>
        p.id === productId
          ? { ...product, amount: product.amount + 1 }
          : product
      );

      setCart(newCart);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addProduct }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextData => {
  const context = useContext(CartContext);
  return context;
};
