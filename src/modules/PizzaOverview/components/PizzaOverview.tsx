import { useState, type FC } from 'react';
import { useParams } from 'react-router-dom';

import { PizzaList, PizzaVariantSelector } from '@components';
import { Button } from '@UI';

import { usePizzaByIdQuery, useRecommendedPizzaQuery } from 'api/pizza';
import { useAddToCartMutation } from 'api/cart';

import type { PizzaVariant } from 'types';

export const PizzaOverview: FC = () => {
  const { id } = useParams();
  const { data: pizza, isLoading: isPizzaLoading } = usePizzaByIdQuery(id!);

  const { mutate: addItemMutate, isPending } = useAddToCartMutation();

  const categoryId = pizza?.categoryId;

  const { data: recommendedPizza, isLoading: isReccommendedPizzaLoading } =
    useRecommendedPizzaQuery(categoryId);

  const [currentVariant, setCurrentVariant] = useState<PizzaVariant | null>(
    null
  );

  if (
    !pizza ||
    isPizzaLoading ||
    !recommendedPizza ||
    isReccommendedPizzaLoading
  )
    return 'Loading...';

  const handleAddToCart = () => {
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
    <div className="container flex flex-col justify-center gap-20">
      <div className="flex items-center gap-8">
        <img width={560} src={pizza.overviewImageUrl} alt={pizza.title} />
        <div className="flex flex-col gap-3 max-w-[500px]">
          <h1 className="text-4xl font-black">{pizza.title}</h1>
          <p className="text-gray-500">
            {currentVariant?.doughType} тесто, {currentVariant?.size} см
          </p>
          <p className="text-[18px]">{pizza.description}</p>
          <PizzaVariantSelector
            variants={pizza.variants}
            currentVariant={currentVariant}
            setCurrentVariant={setCurrentVariant}
          />
          <Button
            className="max-w-3xs text-[18px] font-semibold"
            onClick={handleAddToCart}
            disabled={isPending}
          >
            В корзину за {currentVariant?.price}₽
          </Button>
        </div>
      </div>
      <div>
        <h2 className="mb-5 text-3xl font-bold">Рекомендации</h2>
        <PizzaList
          pizzas={recommendedPizza.filter((item) => item.id !== pizza.id)}
        />
      </div>
    </div>
  );
};
