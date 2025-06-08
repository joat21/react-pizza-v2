import clsx from 'clsx';
import type { FC, InputHTMLAttributes } from 'react';

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <input
      className={clsx(
        className,
        'py-3 pl-11 pr-9 w-[100%] placeholder:text-gray-600 bg-gray-200 rounded-[10px]'
      )}
      {...props}
    />
  );
};
