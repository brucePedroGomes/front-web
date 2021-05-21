import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { Home } from './pages/Home';
import { Cart } from './pages/Cart';

const Routes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cart" component={Cart} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
