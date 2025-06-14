import { Input } from '@UI';
import clsx from 'clsx';
import type { FC, InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface ValidatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export const ValidatedInput: FC<ValidatedInputProps> = ({
  label,
  name,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMsg = errors[name]?.message?.toString();

  return (
    <label className="flex flex-col gap-2">
      <span className="font-bold">{label}</span>
      <Input
        className={clsx({ 'border-2 border-red-500': !!errorMsg })}
        {...register(name)}
        {...props}
      />
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
    </label>
  );
};
