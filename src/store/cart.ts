import { create } from 'zustand';

type CartItem = {
  id: string;
  count: number;
  price: number;
};

type CartStore = {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  addItem: (item: { id: string; price: number }) => void;
  deleteItem: (id: string) => void;
  incrementItemCount: (id: string) => void;
  decrementItemCount: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  totalCount: 0,
  totalPrice: 0,

  addItem({ id, price }) {
    const { items } = get();

    const existingItem = items.find((item) => item.id === id);

    let newItems;
    if (existingItem) {
      newItems = items.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      );
    } else {
      newItems = [...items, { id, price, count: 1 }];
    }

    set(() => calculateTotals(newItems));
  },

  deleteItem(id) {
    const { items } = get();
    const newItems = items.filter((item) => item.id !== id);

    set(() => calculateTotals(newItems));
  },

  incrementItemCount(id) {
    const { items } = get();
    const newItems = items.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    );

    set(() => calculateTotals(newItems));
  },

  decrementItemCount(id) {
    const { items } = get();
    let newItems = items
      .map((item) =>
        item.id === id ? { ...item, count: item.count - 1 } : item
      )
      .filter((item) => item.count > 0);

    set(() => calculateTotals(newItems));
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
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.count * item.price,
    0
  );
  return {
    items,
    totalCount,
    totalPrice,
  };
};
