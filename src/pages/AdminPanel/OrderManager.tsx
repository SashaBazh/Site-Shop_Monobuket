import React, { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../api/adminAPI";
import useStyles from "./OrderManager.styles";
import { Order, OrderStatus } from "../../types/Admin.types";

const OrderManager: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  const statusTranslations: Record<OrderStatus, string> = {
    pending: "В ожидании",
    processing: "В обработке",
    delivery: "Доставка",
    completed: "Завершён",
    cancelled: "Отменён",
  };

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Ошибка загрузки заказов:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const handleStatusChange = async (
    orderId: number,
    newStatus: OrderStatus
  ) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Ошибка обновления статуса:", error);
    }
  };

  if (loading) return <p>Загрузка заказов...</p>;

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Управление заказами</h2>

      {/* Таблица для больших экранов */}
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.th}>Имя заказчика</th>
            <th className={classes.th}>Email</th>
            <th className={classes.th}>Цена</th>
            <th className={classes.th}>Название букета</th>
            <th className={classes.th}>Дата</th>
            <th className={classes.th}>Способ получения</th>
            <th className={classes.th}>Статус</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className={classes.td}>{order.sender_name}</td>
              <td className={classes.td}>{order.email || "—"}</td>
              <td className={classes.td}>{order.total_price} ₽</td>
              <td className={classes.td}>
                {order.items.map((item) => item.product.name).join(", ")}
              </td>
              <td className={classes.td}>
                {new Date(order.created_at).toLocaleString()}
              </td>
              <td className={classes.td}>
                {order.delivery_address ? order.delivery_address : "Самовывоз"}
              </td>
              <td className={classes.td}>
                <select
                  className={classes.select}
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value as OrderStatus)
                  }
                >
                  {Object.values(OrderStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Карточки для маленьких экранов */}
      {orders.map((order) => (
        <div key={order.id} className={classes.card}>
          <div className={classes.cardItem}>
            <span className={classes.cardLabel}>Имя заказчика:</span>
            <span className={classes.cardValue}>{order.sender_name}</span>
          </div>
          <div className={classes.cardItem}>
            <span className={classes.cardLabel}>Email:</span>
            <span className={classes.cardValue}>{order.email || "—"}</span>
          </div>
          <div className={classes.cardItem}>
            <span className={classes.cardLabel}>Цена:</span>
            <span className={classes.cardValue}>{order.total_price} ₽</span>
          </div>
          <div className={classes.cardItem}>
            <span className={classes.cardLabel}>Название букета:</span>
            <span className={classes.cardValue}>
              {order.items.map((item) => item.product.name).join(", ")}
            </span>
          </div>
          <div className={classes.cardItem}>
            <span className={classes.cardLabel}>Дата:</span>
            <span className={classes.cardValue}>
              {new Date(order.created_at).toLocaleString()}
            </span>
          </div>
          <div className={classes.cardItem}>
            <span className={classes.cardLabel}>Способ получения:</span>
            <span className={classes.cardValue}>
              {order.delivery_address ? order.delivery_address : "Самовывоз"}
            </span>
          </div>
          <div className={classes.cardItem}>
            <span className={classes.cardLabel}>Статус:</span>
            <select
              className={classes.select}
              value={order.status}
              onChange={(e) =>
                handleStatusChange(order.id, e.target.value as OrderStatus)
              }
            >
              {Object.values(OrderStatus).map((status) => (
                <option key={status} value={status}>
                  {statusTranslations[status]}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderManager;
