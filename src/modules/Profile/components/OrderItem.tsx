import type { FC } from 'react';
import type { OrderItem as OrderItemType } from 'types';

type OrderItemProps = {
  item: OrderItemType;
};

export const OrderItem: FC<OrderItemProps> = ({ item }) => {
  return (
    <div className="flex justify-between items-center py-5 px-9 border-t border-gray-200">
      <div className="flex items-center gap-2.5">
        <img width={80} height={80} src={item.imageUrl} alt={item.title} />
        <div>
          <h2 className="text-[22px] font-bold leading-none">{item.title}</h2>
          <span className="text-[18px] text-gray-500">
            {item.doughType} тесто, {item.size} см
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end text-xl">
        <span className="text-gray-900 font-bold">{item.price} ₽</span>
        <span className="text-gray-500">{item.amount} шт.</span>
      </div>
    </div>
  );
};
