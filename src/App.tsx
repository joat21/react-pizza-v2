import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import {
  CartPage,
  CheckoutPage,
  HomePage,
  NotFoundPage,
  PizzaPage,
  ProfilePage,
} from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="pizza/:id/:slug" element={<PizzaPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
