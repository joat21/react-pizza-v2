import type { FC } from 'react';
import { Button } from '@UI';
import cartEmpty from '@assets/img/empty-cart.svg';

export const EmptyPlaceholder: FC = () => {
  return (
    <div className="container flex flex-col items-center max-w-[820px] mx-auto text-center">
      <h1 className="mb-2.5 text-4xl font-semibold">Корзина пустая</h1>
      <p className="mb-14 text-xl text-gray-500">
        Загляните на главную, чтобы выбрать пиццу!
      </p>
      <img className="max-w-80 mb-14" src={cartEmpty} alt="Корзина пустая" />
      <Button to="/">На главную</Button>
    </div>
  );
};
