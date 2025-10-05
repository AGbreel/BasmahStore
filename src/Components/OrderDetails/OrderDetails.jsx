import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { OrderContext } from "../../context/OrdersContext";

export default function OrderDetails() {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const { mainLoading, orderDetails, getOrderDetails, updateOrderStatus } =
        useContext(OrderContext);

    useEffect(() => {
        getOrderDetails(orderId);
    }, [orderId]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "delivered":
                return "bg-green-100 text-green-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            case "shipped":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };


    if (mainLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <p className="text-xl font-medium text-gray-600 animate-pulse">
                    Loading Order Details...
                </p>
            </div>
        );
    }

    if (!orderDetails || !orderDetails.orderId) {
        return (
            <div className="text-center my-52 text-xl text-gray-600">
                Order not found ❌
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* زرار رجوع */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-block mb-6 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-all"
                >
                    ⬅ Back to Orders
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition-all"
                >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="font-bold text-2xl text-gray-800">
                                Order #{orderDetails.orderId}
                            </h2>
                            <span
                                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                    orderDetails.status
                                )}`}
                            >
                                {orderDetails.status}
                            </span>
                            <p className="text-sm text-gray-500 mt-2">
                                Customer:{" "}
                                <span className="font-medium">
                                    {orderDetails.userName || "N/A"}
                                </span>
                            </p>

                            {/* ✅ أزرار تغيير الحالة */}
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => updateOrderStatus(orderDetails.orderId, "Delivered")}
                                    className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                                >
                                    ✅ Mark Delivered
                                </button>

                                <button
                                    onClick={() => updateOrderStatus(orderDetails.orderId, "Cancelled")}
                                    className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                >
                                    ❌ Cancel
                                </button>

                                <button
                                    onClick={() => updateOrderStatus(orderDetails.orderId, "Shipped")}
                                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    📦 Shipped
                                </button>
                            </div>

                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-indigo-600">
                                ${orderDetails.totalAmount.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                                {new Date(orderDetails.orderDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="border-t border-gray-200 pt-4">
                        <h3 className="font-semibold mb-3 text-gray-700">🛍 Items</h3>
                        <ul className="space-y-2">
                            {orderDetails.items?.map((item) => (
                                <li
                                    key={item.orderItemId}
                                    className="flex justify-between text-sm text-gray-700 bg-gray-50 px-4 py-2 rounded-lg"
                                >
                                    <span>
                                        {item.productName} x {item.quantity}
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Shipping */}
                    <div className="border-t border-gray-200 pt-4 mt-6">
                        <h3 className="font-semibold mb-3 text-gray-700">
                            🚚 Shipping Details
                        </h3>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p>
                                <span className="font-medium">Recipient:</span>{" "}
                                {orderDetails.shipping?.recipientName}
                            </p>
                            <p>
                                <span className="font-medium">Phone:</span>{" "}
                                {orderDetails.shipping?.phone}
                            </p>
                            <p>
                                <span className="font-medium">Address:</span>{" "}
                                {orderDetails.shipping?.addressLine1},{" "}
                                {orderDetails.shipping?.addressLine2}
                            </p>
                            <p>
                                {orderDetails.shipping?.city}, {orderDetails.shipping?.state}{" "}
                                {orderDetails.shipping?.postalCode},{" "}
                                {orderDetails.shipping?.country}
                            </p>
                            {orderDetails.shipping?.notes && (
                                <p>
                                    <span className="font-medium">Notes:</span>{" "}
                                    {orderDetails.shipping.notes}
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
