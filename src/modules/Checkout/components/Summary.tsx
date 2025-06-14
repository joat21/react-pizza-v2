import type { FC } from 'react';
import { Button } from '@UI';
import box from '@assets/img/box.svg';
import deliveryCar from '@assets/img/delivery-car.svg';

const deliveryPrice = 150;

type SummaryProps = {
  totalPrice: number;
};

export const Summary: FC<SummaryProps> = ({ totalPrice }) => {
  return (
    <div className="sticky top-5 rounded-[30px] shadow-lg">
      <div className="flex flex-col gap-1 py-6 px-10 border-b border-gray-200">
        <span className="text-2xl">Итого:</span>
        <span className="text-4xl font-extrabold">
          {totalPrice + deliveryPrice} ₽
        </span>
      </div>
      <ul className="flex flex-col gap-2.5 py-7 px-10 border-b border-gray-200">
        <li className="flex text-xl">
          <img className="mr-2.5" src={box} alt="" />
          <span>Стоимость товаров:</span>
          <span className="relative flex-1 -top-1.5 mx-1 border-b border-dashed border-gray-300" />
          <span className="font-bold">{totalPrice} ₽</span>
        </li>
        <li className="flex text-xl">
          <img className="mr-2.5" src={deliveryCar} alt="" />
          <span>Доставка:</span>
          <span className="relative flex-1 -top-1.5 mx-1 border-b border-dashed border-gray-300" />
          <span className="font-bold">{deliveryPrice} ₽</span>
        </li>
      </ul>
      <div className="py-7 px-10">
        <Button type="submit" className="w-full text-xl">
          Перейти к оплате
        </Button>
      </div>
    </div>
  );
};
