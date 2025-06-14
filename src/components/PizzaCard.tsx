import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';

import { PizzaVariantSelector } from '@components';
import { Button } from '@UI';

import { useAddToCartMutation, useCartQuery } from 'api/cart';
import type { Pizza, PizzaVariant } from 'types';

type PizzaCardProps = {
  pizza: Pizza;
};

export const PizzaCard: FC<PizzaCardProps> = ({ pizza }) => {
  const [currentVariant, setCurrentVariant] = useState<PizzaVariant | null>(
    pizza.variants[0]
  );

  const { data: cart, isLoading } = useCartQuery();
  const { mutate: addItemMutate, isPending } = useAddToCartMutation();

  const cartItem = cart?.items.find(
    (item) => item.pizzaVariantId === currentVariant?.id
  );
  const itemCount = cartItem ? cartItem.amount : 0;

  const handleClickAdd = () => {
    addItemMutate({
      ...pizza,
      pizzaVariantId: currentVariant?.id!,
      price: currentVariant?.price!,
      doughType: currentVariant?.doughType!,
      size: currentVariant?.size!,
      amount: 1,
    });
  };

  return (
    <article className="flex justify-center items-center flex-col max-w-[280px] w-[100%] text-center">
      <Link to={`/pizza/${pizza.id}/${pizza.slug}`}>
        <img width={260} src={pizza.imageUrl} alt={pizza.title} />
      </Link>
      <div className="flex flex-col items-center gap-5 w-[100%]">
        <h2 className="text-xl font-black">{pizza.title}</h2>
        <PizzaVariantSelector
          variants={pizza.variants}
          currentVariant={currentVariant}
          setCurrentVariant={setCurrentVariant}
        />
        <div className="flex justify-between items-center w-[100%] px-3">
          <span className="text-[22px] font-bold">
            {currentVariant?.price} ₽
          </span>
          {isLoading ? (
            <span>Скелетончик</span>
          ) : (
            <Button
              className="flex items-center gap-1"
              variant="outline"
              onClick={() => handleClickAdd()}
              disabled={isPending}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="currentColor"
                />
              </svg>
              <span>Добавить</span>
              {itemCount > 0 && (
                <span className="w-[22px] h-[22px] flex items-center justify-center rounded-full text-[13px] font-semibold text-white bg-accent leading-none">
                  {itemCount}
                </span>
              )}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};
