import { ChakraProvider } from '@chakra-ui/react';
import { Header } from './components/Header';
import { theme } from './theme';
function MyApp() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
    </ChakraProvider>
  );
}
export default MyApp;
