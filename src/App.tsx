import { ChakraProvider } from '@chakra-ui/react';
import { Header } from './components/Header';
import { CartProvider } from './hooks/useCart';

import Routes from './routes';
import { theme } from './theme';

function MyApp() {
  return (
    <ChakraProvider theme={theme}>
      <CartProvider>
        <Header />
        <Routes />
      </CartProvider>
    </ChakraProvider>
  );
}
export default MyApp;
