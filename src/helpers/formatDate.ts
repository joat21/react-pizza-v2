export const formatDate = (rawDate: string) => {
  const date = new Date(rawDate);

  const formatted = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  return formatted.replace(' г.', '').replace(' в ', ', в ');
};
