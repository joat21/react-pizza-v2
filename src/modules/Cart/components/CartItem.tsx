import type { FC } from 'react';

import { Button } from '@UI';
import { ChangeAmountButton } from './ChangeAmountButton';

import { useDeleteCartItemMutation, useUpdateCartItemMutation } from 'api/cart';
import type { CartItem as CartItemType } from 'types';

type CartItemProps = {
  item: CartItemType;
};

export const CartItem: FC<CartItemProps> = ({ item }) => {
  const { mutate: updateItemMutate } = useUpdateCartItemMutation();
  const { mutate: deleteItemMutate } = useDeleteCartItemMutation();

  const handleChangeCount = (difference: number) => {
    updateItemMutate({ id: item.id, amount: item.amount + difference });
  };

  const handleDeleteItem = () => {
    deleteItemMutate(item.id);
  };

  return (
    <div className="flex justify-between items-center py-7 border-t border-gray-300">
      <div className="flex items-center gap-2.5 w-[50%]">
        <img width={80} height={80} src={item.imageUrl} alt={item.title} />
        <div>
          <h2 className="text-[22px] font-bold leading-none">{item.title}</h2>
          <span className="text-[18px] text-gray-500">
            {item.doughType} тесто, {item.size} см
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between w-[15%]">
        <ChangeAmountButton onClick={() => handleChangeCount(-1)}>
          -
        </ChangeAmountButton>
        <span className="text-2xl font-bold">{item.amount}</span>
        <ChangeAmountButton onClick={() => handleChangeCount(1)}>
          +
        </ChangeAmountButton>
      </div>
      <span className="w-[25%] text-2xl font-bold text-center">
        {item.price} ₽
      </span>
      <Button
        className="p-0 w-8 h-8 border-2 text-gray-400 font-black text-center rotate-45"
        variant="outline"
        onClick={handleDeleteItem}
      >
        +
      </Button>
    </div>
  );
};
