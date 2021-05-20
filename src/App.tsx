import { ChakraProvider } from '@chakra-ui/react';
import { Home } from './pages/Home';
import { theme } from './theme';

function MyApp() {
  return (
    <ChakraProvider theme={theme}>
      <Home />
    </ChakraProvider>
  );
}
export default MyApp;
