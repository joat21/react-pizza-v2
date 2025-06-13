export type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

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
  overviewImageUrl: string;
  categoryId: string;
  rating: number;
  minPrice: number;
  variants: PizzaVariant[];
  slug: string;
};

export type CartItem = {
  id: string;
  title: string;
  imageUrl: string;
  doughType: string;
  size: number;
  amount: number;
  price: number;
  pizzaVariantId: string;
};

export type CartMinimalItem = {
  id: string;
  amount: number;
  price: number;
};

export type Category = {
  id: string;
  name: string;
};

export enum SortBy {
  RATING_DESC = '-rating',
  PRICE_ASC = 'minPrice',
  PRICE_DESC = '-minPrice',
  ALPHABET = 'title',
}

export type SortType = {
  name: string;
  sortBy: SortBy;
};

export type PizzaFilters = {
  categoryId: string;
  sortBy: SortBy;
};

export type Order = {
  id: string;
  createdAt: string;
  totalPrice: number;
  comment: string;
  items: OrderItem[];
};

export type OrderItem = {
  id: string;
  title: string;
  imageUrl: string;
  doughType: string;
  size: number;
  amount: number;
  price: number;
};
