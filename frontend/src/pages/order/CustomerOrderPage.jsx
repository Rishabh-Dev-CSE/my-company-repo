import React, { useState } from "react";
import useWebSocketOrders from "../hooks/useWebSocketOrders";

export default function CustomerOrderPage() {
  const [order, setOrder] = useState("");
  const roomId = "restaurant_12"; // dynamic hoga baad me

  const { messages, sendMessage } = useWebSocketOrders(roomId);

  const placeOrder = () => {
    sendMessage("new_order", {
      order_text: order,
      customer_name: "Guest User",
    });
    setOrder("");
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Place Your Order</h1>

      <textarea
        className="border p-2 w-full rounded"
        value={order}
        placeholder="Write your order here..."
        onChange={(e) => setOrder(e.target.value)}
      ></textarea>

      <button
        onClick={placeOrder}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Submit Order
      </button>

      <h2 className="text-xl font-semibold mt-6">Live Order Updates:</h2>
      <div className="space-y-2 bg-gray-100 p-3 rounded">
        {messages.map((msg, i) => (
          <p key={i} className="text-gray-800">
            <span className="font-semibold">{msg.status}</span>: {msg.order_text}
          </p>
        ))}
      </div>
    </div>
  );
}
