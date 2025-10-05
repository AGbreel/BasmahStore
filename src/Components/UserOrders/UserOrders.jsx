import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Divider,
    Chip,
} from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { OrderContext } from "../../context/OrdersContext";

export default function UserOrders() {
    const { userId } = useContext(UserContext);
    const { getOrdersCustomer, ordersCustomer, loading } = useContext(OrderContext);

    useEffect(() => {
        if (userId) getOrdersCustomer();
    }, [userId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress />
            </div>
        );
    }

    if (!ordersCustomer.length) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col justify-center items-center h-screen text-center"
            >
                <Typography variant="h5" className="text-gray-700 font-bold">
                    You haven’t placed any orders yet 🛍️
                </Typography>
                <p className="text-gray-500 mt-2">
                    Start shopping now and grab your first product 🎉
                </p>
            </motion.div>
        );
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "pending":
                return "warning";
            case "delivered":
                return "success";
            case "cancelled":
                return "error";
            case "shipped":
                return "info";
            default:
                return "default";
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-20 min-h-screen">
            <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-extrabold text-center text-purple-700 mb-12"
            >
                🧾 My Orders
            </motion.h1>

            <div className="grid md:grid-cols-2 gap-8">
                {ordersCustomer.map((order, index) => (
                    <motion.div
                        key={order.orderId}
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" }}
                    >
                        <Card className="shadow-xl rounded-2xl border border-gray-200">
                            <CardContent>
                                <div className="flex justify-between items-center">
                                    <Typography
                                        variant="h6"
                                        className="font-bold text-purple-800"
                                    >
                                        Order #{order.orderId}
                                    </Typography>
                                    <Chip
                                        label={order.status}
                                        color={getStatusColor(order.status)}
                                        size="small"
                                    />
                                </div>

                                <Divider className="my-4" />

                                {/* Order details */}
                                <div className="space-y-2 text-sm">
                                    <p>
                                        <span className="font-semibold">Date:</span>{" "}
                                        {new Date(order.orderDate).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Total:</span>{" "}
                                        <span className="text-purple-700 font-bold">
                                            EGP {order.totalAmount.toFixed(2)}
                                        </span>
                                    </p>
                                </div>

                                <Divider className="my-4" />
                                <Typography
                                    variant="subtitle2"
                                    className="font-semibold mb-3 text-gray-700"
                                >
                                    Items:
                                </Typography>

                                <motion.div layout className="space-y-3">
                                    {order.items?.map((item) => (
                                        <motion.div
                                            key={item.orderItemId}
                                            whileHover={{ scale: 1.02 }}
                                            className="flex items-center gap-3 border p-3 rounded-lg shadow-sm bg-gray-50"
                                        >
                                            <img
                                                src={item.imageUrl}
                                                alt={item.productName}
                                                className="w-16 h-16 object-cover rounded-md border"
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-800">
                                                    {item.productName}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-sm font-bold text-purple-700">
                                                EGP {(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
