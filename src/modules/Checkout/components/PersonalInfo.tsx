import { useEffect, type FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { Section } from './Section';
import { ValidatedInput } from './ValidatedInput';

import { useUserQuery } from 'api/auth';

export const PersonalInfo: FC = () => {
  const { reset } = useFormContext();
  const { data: user, isLoading } = useUserQuery();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
      });
    }
  }, [user]);

  if (isLoading) return 'Loading...';

  return (
    <Section title="2. Личная информация">
      <div className="grid grid-cols-2 gap-x-6 gap-y-9">
        <ValidatedInput label="Имя" name="name" placeholder="Имя" />
        <ValidatedInput label="Фамилия" name="surname" placeholder="Фамилия" />
        <ValidatedInput label="E-mail" name="email" placeholder="E-mail" />
        <ValidatedInput label="Телефон" name="phone" placeholder="Телефон" />
      </div>
    </Section>
  );
};
