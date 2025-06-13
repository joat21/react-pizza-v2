import { OrderItem } from './OrderItem';
import { useOrdersQuery } from 'api/orders';
import { formatDate } from 'helpers/formatDate';

export const OrdersList = () => {
  const { data: orders, isLoading } = useOrdersQuery();
  if (isLoading) return 'Loading...';

  if (!orders) return 'No data';

  return (
    <div>
      <h2 className="text-3xl font-semibold leading-8">Мои заказы</h2>
      <ul className="flex flex-col gap-9 py-10 px-8">
        {orders.map((order, index) => (
          <li
            key={order.id}
            className="max-w-3xl rounded-3xl bg-white shadow-lg"
          >
            <div className="flex items-center gap-5 py-7 px-9">
              <h3 className="text-2xl font-bold">
                Заказ #{orders.length - index}
              </h3>
              <span className="text-gray-500">
                {formatDate(order.createdAt)}
              </span>
            </div>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  <OrderItem item={item} />
                </li>
              ))}
            </ul>
            <div className="py-7 px-9 border-t border-gray-200 text-2xl">
              Итого:
              <span className="font-extrabold"> {order.totalPrice} ₽</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
