import type { FC, PropsWithChildren } from 'react';

interface SectionProps extends PropsWithChildren {
  title: string;
}

export const Section: FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="rounded-[30px] shadow-lg">
      <h2 className="p-7 border-b border-gray-200 text-2xl font-bold">
        {title}
      </h2>
      <div className="p-7">{children}</div>
    </section>
  );
};
