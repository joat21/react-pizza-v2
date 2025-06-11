import type { FC } from 'react';
import clsx from 'clsx';
import { Button } from '@UI';

interface ChangeCountButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
}

export const ChangeAmountButton: FC<ChangeCountButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <Button
      className={clsx('p-0 w-8 h-8 border-2 text-xl font-black', className)}
      variant="outline"
      {...props}
    >
      {children}
    </Button>
  );
};
