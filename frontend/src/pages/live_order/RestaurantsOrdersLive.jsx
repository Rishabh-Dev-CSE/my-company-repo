import React from "react";
import useWebSocketOrders from "../hooks/useWebSocketOrders";

export default function RestaurantOrdersLive() {
  const roomId = "restaurant_12"; // same room_id as customer
  const { messages, sendMessage } = useWebSocketOrders(roomId);

  const acceptOrder = (orderId) => {
    sendMessage("accept_order", { order_id: orderId });
  };

  const cancelOrder = (orderId) => {
    sendMessage("cancel_order", { order_id: orderId });
  };

  const completeOrder = (orderId) => {
    sendMessage("complete_order", { order_id: orderId });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Live Orders</h1>

      {messages.map((msg, i) => (
        <div
          key={i}
          className="bg-white shadow p-4 rounded mb-3 border border-gray-200"
        >
          <h3 className="font-bold text-lg">{msg.order_text}</h3>
          <p className="text-sm text-gray-600">Status: {msg.status}</p>

          <div className="mt-3 flex gap-3">
            <button
              onClick={() => acceptOrder(msg.order_id)}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Accept
            </button>

            <button
              onClick={() => cancelOrder(msg.order_id)}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Cancel
            </button>

            <button
              onClick={() => completeOrder(msg.order_id)}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Complete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
