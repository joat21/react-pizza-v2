export type Pizza = {
  id: string;
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
