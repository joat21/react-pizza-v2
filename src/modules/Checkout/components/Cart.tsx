import type { FC } from 'react';
import { Section } from './Section';
import type { CartItem } from 'types';
import { OrderItem } from '@components';

type CartProps = {
  items: CartItem[];
};

export const Cart: FC<CartProps> = ({ items }) => {
  return (
    <Section title="1. Корзина">
      <ul>
        {items.map((item) => (
          <li key={item.id} className="group">
            <OrderItem item={item} />
          </li>
        ))}
      </ul>
    </Section>
  );
};
