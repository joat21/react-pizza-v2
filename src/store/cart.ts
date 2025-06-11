import { create } from 'zustand';

type CartItem = {
  id: string;
  amount: number;
  price: number;
};

type CartStore = {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  addItem: (id: string, price: number) => void;
  deleteItem: (id: string) => void;
  changeCount: (id: string, difference: number) => void;
  setItems: (items: CartItem[]) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  totalCount: 0,
  totalPrice: 0,

  addItem(id, price) {
    const { items } = get();

    const existingItem = items.find((item) => item.id === id);

    let newItems;
    if (existingItem) {
      newItems = items.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
    } else {
      newItems = [...items, { id, price, amount: 1 }];
    }

    set(() => calculateTotals(newItems));
  },

  deleteItem(id) {
    const { items } = get();
    const newItems = items.filter((item) => item.id !== id);

    set(() => calculateTotals(newItems));
  },

  changeCount(id, difference) {
    const { items } = get();
    const newItems = items
      .map((item) =>
        item.id === id ? { ...item, amount: item.amount + difference } : item
      )
      .filter((item) => item.amount > 0);

    set(() => calculateTotals(newItems));
  },

  setItems(items) {
    set(() => calculateTotals(items));
  },

  clearCart() {
    set(() => ({
      items: [],
      totalCount: 0,
      totalPrice: 0,
    }));
  },
}));

const calculateTotals = (items: CartItem[]) => {
  const totalCount = items.reduce((sum, item) => sum + item.amount, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.amount * item.price,
    0
  );
  return {
    items,
    totalCount,
    totalPrice,
  };
};
