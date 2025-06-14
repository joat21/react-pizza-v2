import type { FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Summary } from './Summary';
import { Cart } from './Cart';
import { PersonalInfo } from './PersonalInfo';
import { Address } from './Address';

import { useCartQuery } from 'api/cart';
import { useCreateOrderMutation } from 'api/orders';
import { useNavigate } from 'react-router-dom';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Не короче 2 символов'),
  surname: z.string().min(2, 'Не короче 2 символов'),
  email: z.string().email('Неверный email'),
  phone: z.string().min(10, 'Не короче 10 символов'),
  address: z.string().min(5, 'Обязательно'),
  comment: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const Checkout: FC = () => {
  const navigate = useNavigate();
  const methods = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  const createOrderMutation = useCreateOrderMutation();
  const { data: cart, isLoading } = useCartQuery();

  if (!cart || isLoading) return 'Loading...';

  const onSubmit = (data: CheckoutFormData) => {
    console.log(data);
    createOrderMutation.mutate(data, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="container flex flex-col justify-center gap-5"
      >
        <h1 className="text-3xl font-semibold leading-8">Оформление заказа</h1>
        <div className="flex justify-between gap-11">
          <div className="flex flex-col gap-9 w-full">
            <Cart items={cart.items} />
            <PersonalInfo />
            <Address />
          </div>
          <div className="relative max-w-[450px] w-full">
            <Summary totalPrice={cart.totalPrice} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
