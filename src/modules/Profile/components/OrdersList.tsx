import { OrderItem } from '@components';
import { useOrdersQuery } from 'api/orders';
import { formatDate } from 'helpers/formatDate';

export const OrdersList = () => {
  const { data: orders, isLoading } = useOrdersQuery();
  if (isLoading) return 'Loading...';

  if (!orders) return 'No data';

  return (
    <div>
      <h2 className="text-3xl font-semibold leading-8">Мои заказы</h2>
      {orders.length ? (
        <ul className="flex flex-col gap-9 py-10 px-8">
          {orders.map((order, index) => (
            <li
              key={order.id}
              className="max-w-3xl rounded-3xl bg-white shadow-lg"
            >
              <div className="flex items-center gap-5 py-7 px-9 border-b border-gray-200">
                <h3 className="text-2xl font-bold">
                  Заказ #{orders.length - index}
                </h3>
                <span className="text-gray-500">
                  {formatDate(order.createdAt)}
                </span>
              </div>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id} className="group">
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
      ) : (
        <span>Вы еще не сделали не одного заказа</span>
      )}
    </div>
  );
};
