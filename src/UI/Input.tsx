import type { FC, InputHTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'primary' | 'filled';
}

export const Input: FC<InputProps> = ({
  className,
  variant = 'primary',
  ...props
}) => {
  const input = tv({
    base: 'px-6 py-3 w-full rounded-[30px] placeholder:text-gray-400 transition-colors duration-150 ease-in-out2',
    variants: {
      variant: {
        primary: 'border border-gray-200',
        filled: 'bg-gray-200',
      },
    },
    extend: {
      className: true,
    },
  });

  return <input className={input({ variant, className })} {...props} />;
};
