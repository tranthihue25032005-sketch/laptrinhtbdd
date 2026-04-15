import { createContext, useState } from "react";

export const OrderContext = createContext<any>(null);

type Order = {
  id: string;
  date: string;
  items: any[];
  total: number;
  status: string;
};

export const OrderProvider = ({ children }: any) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (data: any) => {
  const newOrder = {
    id: Date.now().toString(),
    date: new Date().toLocaleDateString(),
    items: data.items,
    address: data.address,
    phone: data.phone,
    paymentMethod: data.paymentMethod,
    total: data.items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    ),
    status: "Đang xử lý",
  };

  setOrders((prev) => [newOrder, ...prev]);
};

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};