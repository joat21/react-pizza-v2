import type { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { Textarea } from '@UI';
import { ValidatedInput } from '@components';
import { Section } from './Section';

export const Address: FC = () => {
  const { register } = useFormContext();

  return (
    <Section title="3. Адрес доставки">
      <div className="flex flex-col gap-6">
        <ValidatedInput
          label="Адрес доставки"
          name="address"
          placeholder="Адрес доставки"
        />
        <label className="flex flex-col gap-2">
          <span className="font-bold">Комментарий к заказу</span>
          <Textarea
            {...register('comment')}
            placeholder="Укажите тут дополнительную информацию для курьера"
          />
        </label>
      </div>
    </Section>
  );
};
