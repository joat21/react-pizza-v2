import type { FC, TextareaHTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'primary' | 'filled';
}

export const Textarea: FC<TextareaProps> = ({
  className,
  variant = 'primary',
  ...props
}) => {
  const textarea = tv({
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
  return <textarea className={textarea({ variant, className })} {...props} />;
};
