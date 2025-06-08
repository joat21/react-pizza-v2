import clsx from 'clsx';
import { useEffect, useState, type FC } from 'react';
import type { PizzaVariant } from 'types';

type PizzaVariantSelectorProps = {
  variants: PizzaVariant[];
  setCurrentVariant: React.Dispatch<React.SetStateAction<PizzaVariant>>;
};

export const PizzaVariantSelector: FC<PizzaVariantSelectorProps> = ({
  variants,
  setCurrentVariant,
}) => {
  const types = [
    ...new Set(variants.map((variant) => variant.doughType)),
  ].sort();
  const sizes = [...new Set(variants.map((variant) => variant.size))].sort();

  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);

  useEffect(() => {
    const currentVariaint =
      variants.find(
        (variant) =>
          variant.doughType === activeType && variant.size === activeSize
      ) || variants[0];

    setCurrentVariant(currentVariaint);
  }, [activeType, activeSize]);

  return (
    <div className="flex flex-col gap-1.5 p-1.5 w-[100%] rounded-[10px] bg-gray-100">
      <ul className="flex w-[100%]">
        {types.map((type) => (
          <li
            key={type}
            onClick={() => setActiveType(type)}
            className={clsx(
              'flex-1 p-2 text-[16px] font-semibold cursor-pointer',
              {
                'bg-white rounded-[5px]': activeType === type,
              }
            )}
          >
            {type}
          </li>
        ))}
      </ul>
      <ul className="flex w-[100%]">
        {sizes.map((size) => (
          <li
            key={size}
            onClick={() => setActiveSize(size)}
            className={clsx(
              'flex-1 p-2 text-[16px] font-semibold cursor-pointer',
              {
                'bg-white rounded-[5px]': activeSize === size,
              }
            )}
          >
            {size}
          </li>
        ))}
      </ul>
    </div>
  );
};
