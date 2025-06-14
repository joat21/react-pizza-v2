import { useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@UI';
import { ValidatedInput } from '@components';

import { useLogoutMutation, useUserQuery } from 'api/auth';
import { useUpdateUserMutation } from 'api/auth/mutations';

const personalInfoSchema = z.object({
  name: z.string().min(2, 'Не короче 2 символов').or(z.literal('')),
  surname: z.string().min(2, 'Не короче 2 символов').or(z.literal('')),
  email: z.string().email('Неверный email').or(z.literal('')),
  phone: z.string().min(10, 'Не короче 10 символов').or(z.literal('')),
});

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;

export const PersonalInfo: FC = () => {
  const navigate = useNavigate();

  const { data: user, isLoading } = useUserQuery();
  const updateUserMutation = useUpdateUserMutation();
  const logoutMutation = useLogoutMutation();

  const methods = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      phone: '',
    },
  });

  const handleSubmit = (data: PersonalInfoData) => {
    updateUserMutation.mutate(data);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
    navigate('/');
  };

  useEffect(() => {
    if (user) {
      methods.reset(user);
    }
  }, [user]);

  if (isLoading) return 'Loading...';

  return (
    <div>
      <h1 className="mb-8 text-3xl font-semibold leading-8">Личные данные</h1>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="grid grid-cols-2 gap-5 max-w-2xl"
        >
          <ValidatedInput label="Имя" name="name" placeholder="Имя" />
          <ValidatedInput
            label="Фамилия"
            name="surname"
            placeholder="Фамилия"
          />
          <ValidatedInput label="E-mail" name="email" placeholder="E-mail" />
          <ValidatedInput label="Телефон" name="phone" placeholder="Телефон" />
          <div className="flex gap-2.5 col-span-2 justify-end">
            <Button type="submit" className="py-2.5 text-xl">
              Сохранить
            </Button>
            <Button
              className="py-2.5 text-xl"
              variant="outline"
              onClick={handleLogout}
            >
              Выйти
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
