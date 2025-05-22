import { Route, Routes } from 'react-router-dom';
import { CartPage, HomePage, NotFoundPage, PizzaPage } from './pages';

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Main />}> */}
      <Route path="" element={<HomePage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="pizza/:id" element={<PizzaPage />} />
      <Route path="*" element={<NotFoundPage />} />
      {/* </Route> */}
    </Routes>
  );
}

export default App;
