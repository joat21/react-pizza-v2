import clsx from 'clsx';
import { useState, type FC } from 'react';

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

export const Categories: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ul className="flex gap-2.5">
      {categories.map((category, index) => (
        <li
          key={index}
          className={clsx(
            'px-[30px] py-3 rounded-[30px] font-bold bg-gray-50 cursor-pointer',
            'hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200',
            'transition-colors duration-150 ease-in-out',
            {
              'bg-gray-700 text-white hover:bg-gray-900 focus:bg-gray-900 active:bg-gray-900':
                activeIndex === index,
            }
          )}
          onClick={() => setActiveIndex(index)}
        >
          {category}
        </li>
      ))}
    </ul>
  );
};
