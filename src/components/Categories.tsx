import clsx from 'clsx';
import { useState, type FC } from 'react';
import type { Category } from 'types';

type CategoriesProps = {
  categories: Category[];
};

export const Categories: FC<CategoriesProps> = ({ categories }) => {
  const [activeCategoryId, setActiveCategoryId] = useState('');
  const newCategories = [{ id: '', name: 'Все' }, ...categories];

  return (
    <ul className="flex gap-2.5">
      {newCategories.map((category) => (
        <li
          key={category.id}
          className={clsx(
            'px-[30px] py-3 rounded-[30px] font-bold bg-gray-50 cursor-pointer',
            'hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200',
            'transition-colors duration-150 ease-in-out',
            {
              'bg-gray-700 text-white hover:bg-gray-900 focus:bg-gray-900 active:bg-gray-900':
                activeCategoryId === category.id,
            }
          )}
          onClick={() => setActiveCategoryId(category.id)}
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
};
