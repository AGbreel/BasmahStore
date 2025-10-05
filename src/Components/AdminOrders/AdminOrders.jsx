import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { OrderContext } from "../../context/OrdersContext";

export default function OrdersList() {
    const { mainLoading, orders, fetchOrders } = useContext(OrderContext);

    useEffect(() => {
        fetchOrders();
    }, []);

    if (mainLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-medium text-indigo-600 animate-pulse">
                    Fetching your orders...
                </p>
            </div>
        );
    }
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

    return (
        <div className="px-8 py-20 max-w-5xl mx-auto min-h-screen">
            <h1 className="text-2xl font-bold mb-10 text-center text-gray-800">
                Orders Overview
            </h1>

            {orders.length === 0 ? (
                <p className="text-center text-gray-500">No orders found.</p>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order) => (
                        <Link
                            to={`/orders/${order.orderId}`}
                            key={order.orderId}
                            className="block bg-gradient-to-br from-indigo-50 to-blue-100 shadow-md rounded-xl p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="font-semibold text-lg text-gray-800">
                                        #{order.orderId}
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        👤 {order.userName || "Unknown"}
                                    </p>
                                    <p className={`text-sm mt-1 w-fit px-1 rounded-md ${getStatusColor(order.status)}`} >
                                        {order.status}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-indigo-700">
                                        ${order.totalAmount.toFixed(2)}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(order.orderDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
