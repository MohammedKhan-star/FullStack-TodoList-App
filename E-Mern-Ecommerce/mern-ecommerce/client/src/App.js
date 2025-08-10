import { CartProvider } from './context/CartContext';
import { Routes  } from 'react-router-dom';
const App = () => (
  <CartProvider>
    <Routes>
      {/* Routes */}
    </Routes>
  </CartProvider>
);

export default App;
