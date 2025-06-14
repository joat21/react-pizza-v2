import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { tv } from 'tailwind-variants';

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  variant?: 'primary' | 'outline';
  to?: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
}

export const Button: FC<ButtonProps> = ({
  children,
  type = 'button',
  className,
  variant = 'primary',
  to,
  onClick,
  ...props
}) => {
  const button = tv({
    base: 'px-6 py-3 border border-accent rounded-[30px] transition-colors duration-150 ease-in-out active:bg-orange-700',
    variants: {
      variant: {
        primary: 'text-white bg-accent hover:bg-orange-600',
        outline: 'text-accent bg-transparent hover:text-white hover:bg-accent',
      },
    },
    extend: {
      className: true,
    },
  });

  if (to) {
    return (
      <Link
        className={button({ variant, className })}
        to={to}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={button({ variant, className })}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
