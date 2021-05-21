import { ChakraProvider } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Header } from './components/Header';
import { CartProvider } from './hooks/useCart';
import { theme } from './theme';

import { Home } from './pages/Home';
import { Cart } from './pages/Cart';

function MyApp() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <CartProvider>
            <Header />
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/checkout">
              <Cart />
            </Route>
          </CartProvider>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}
export default MyApp;
