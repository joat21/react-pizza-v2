import { useState, type FC } from 'react';
import clsx from 'clsx';

import { Categories, PizzaList, Sort } from '@components';

import { useCategoriesQuery } from 'api/categories';
import { usePizzaQuery } from 'api/pizza';

import { SortBy } from 'types';

import styles from './Home.module.css';

export const Home: FC = () => {
  const [filters, setFilters] = useState({
    categoryId: '',
    sortBy: SortBy.RATING_DESC,
  });

  const { data: categories, isLoading: isCategoriesLoading } =
    useCategoriesQuery();
  const { data: pizzas, isLoading: isPizzasLoading } = usePizzaQuery(filters);

  if (!pizzas || isPizzasLoading || !categories || isCategoriesLoading)
    return 'Loading...';

  return (
    <div className={clsx('container', styles.container)}>
      <div className={styles.top}>
        <Categories
          categories={categories}
          filters={filters}
          setFilters={setFilters}
        />
        <Sort filters={filters} setFilters={setFilters} />
      </div>
      <h2 className={styles.title}>
        {`${
          categories.find((category) => category.id === filters.categoryId)
            ?.name || 'Вся'
        } пицца`}
      </h2>
      <PizzaList pizzas={pizzas} />
    </div>
  );
};
