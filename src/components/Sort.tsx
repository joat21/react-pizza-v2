import { useState, type FC } from 'react';
import clsx from 'clsx';
import { SortBy, type SortType } from 'types';

const sorts: SortType[] = [
  { name: 'популярные', sortBy: SortBy.RATING_DESC },
  { name: 'цена ↑', sortBy: SortBy.PRICE_ASC },
  { name: 'цена ↓', sortBy: SortBy.PRICE_DESC },
  { name: 'по алфавиту', sortBy: SortBy.ALPHABET },
];

export const Sort: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative cursor-pointer">
      <div
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m21 16-4 4-4-4"></path>
          <path d="M17 20V4"></path>
          <path d="m3 8 4-4 4 4"></path>
          <path d="M7 4v16"></path>
        </svg>
        <span className="font-bold">Сортировка:</span>
        <span className="text-orange-500 border-b border-dashed">
          {sorts[activeIndex].name}
        </span>
      </div>
      {isOpen && (
        <ul className="absolute right-0 py-2.5 max-w-[160px] w-[100%] rounded-[10px] bg-white overflow-hidden shadow-light">
          {sorts.map((sort, index) => (
            <li
              key={index}
              className={clsx('py-3 px-5 cursor-pointer hover:bg-yellow-50', {
                'text-orange-500 font-bold bg-yel': activeIndex === index,
              })}
              onClick={() => setActiveIndex(index)}
            >
              {sort.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
