import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { CartPage, HomePage, NotFoundPage, PizzaPage } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="pizza/:id" element={<PizzaPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
