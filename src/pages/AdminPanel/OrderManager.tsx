import React, { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../api/adminAPI";
import { OrderManagerStyles } from "./OrderManager.styles";
import { Order, OrderStatus } from "../../types/Admin.types";

const OrderManager: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleStatusChange = async (orderId: number, newStatus: OrderStatus) => {
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
    <div style={OrderManagerStyles.container}>
      <h2 style={OrderManagerStyles.title}>Управление заказами</h2>
      <table style={OrderManagerStyles.table}>
        <thead>
          <tr>
            <th style={OrderManagerStyles.th}>Имя заказчика</th>
            <th style={OrderManagerStyles.th}>Email</th>
            <th style={OrderManagerStyles.th}>Цена</th>
            <th style={OrderManagerStyles.th}>Название букета</th>
            <th style={OrderManagerStyles.th}>Дата</th>
            <th style={OrderManagerStyles.th}>Способ получения</th>
            <th style={OrderManagerStyles.th}>Статус</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td style={OrderManagerStyles.td}>{order.sender_name}</td>
              <td style={OrderManagerStyles.td}>{order.email || "—"}</td>
              <td style={OrderManagerStyles.td}>{order.total_price} ₽</td>
              <td style={OrderManagerStyles.td}>
                {order.items.map((item) => item.product.name).join(", ")}
              </td>
              <td style={OrderManagerStyles.td}>
                {new Date(order.created_at).toLocaleString()}
              </td>
              <td style={OrderManagerStyles.td}>
                {order.delivery_address ? order.delivery_address : "Самовывоз"}
              </td>
              <td style={OrderManagerStyles.td}>
                <select
                  style={OrderManagerStyles.select}
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
    </div>
  );
};

export default OrderManager;
