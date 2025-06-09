import { useState, type FC } from 'react';
import { useParams } from 'react-router-dom';

import { PizzaList, PizzaVariantSelector } from '@components';
import { Button } from '@UI';

import { useGetPizzaByIdQuery } from '../api/useGetPizzaByIdQuery';
import { useGetRecommendedPizza } from '../api/useGetRecommendedPizza';

import type { PizzaVariant } from 'types';

export const PizzaOverview: FC = () => {
  const { id } = useParams();
  const { data: pizza, isLoading: isPizzaLoading } = useGetPizzaByIdQuery(id!);

  const categoryId = pizza?.categoryId;

  const { data: recommendedPizza, isLoading: isReccommendedPizzaLoading } =
    useGetRecommendedPizza(categoryId);

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

  return (
    <div className="container flex flex-col justify-center gap-20">
      <div className="flex justify-center items-center">
        <img src={pizza.imageUrl} alt={pizza.title} />
        <div className="flex flex-col gap-3 max-w-[500px]">
          <h1 className="text-4xl font-black">{pizza.title}</h1>
          <p className="text-gray-500">
            {currentVariant?.size} см, {currentVariant?.doughType} тесто
          </p>
          <p className="text-[18px]">{pizza.description}</p>
          <PizzaVariantSelector
            variants={pizza.variants}
            setCurrentVariant={setCurrentVariant}
          />
          <Button className="max-w-3xs">
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
