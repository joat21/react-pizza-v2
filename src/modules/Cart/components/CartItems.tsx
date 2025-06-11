import type { FC } from 'react';
import type { CartItem as CartItemType } from 'types';
import { CartItem } from './CartItem';

type CartItemsProps = {
  items: CartItemType[];
};

export const CartItems: FC<CartItemsProps> = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <CartItem item={item} />
        </li>
      ))}
    </ul>
  );
};
