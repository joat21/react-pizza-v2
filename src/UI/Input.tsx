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
        'py-3 pl-11 pr-9 border border-gray-300 rounded-[10px]'
      )}
      {...props}
    />
  );
};
