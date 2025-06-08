export type PizzaVariant = {
  id: string;
  price: number;
  doughType: string;
  size: number;
};

export type Pizza = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  rating: number;
  minPrice: number;
  variants: PizzaVariant[];
};

export type Category = {
  id: string;
  name: string;
};

export enum SortBy {
  RATING_DESC = '-rating',
  PRICE_ASC = 'price',
  PRICE_DESC = '-price',
  ALPHABET = 'title',
}

export type SortType = {
  name: string;
  sortBy: SortBy;
};
