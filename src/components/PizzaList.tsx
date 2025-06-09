import type { FC } from 'react';
import type { Pizza } from 'types';
import { PizzaCard } from './PizzaCard';

type PizzaListProps = {
  pizzas: Pizza[];
};

export const PizzaList: FC<PizzaListProps> = ({ pizzas }) => {
  return (
    <ul className="grid grid-rows-1 grid-cols-4 gap-x-12 gap-y-16">
      {pizzas.map((pizza) => (
        <li key={pizza.id}>
          <PizzaCard pizza={pizza} />
        </li>
      ))}
    </ul>
  );
};
