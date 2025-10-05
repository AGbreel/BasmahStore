import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "./UserContext";

export const OrderContext = createContext();

export default function OrderContextProvider({ children }) {
    const headers = { token: localStorage.getItem("userToken") };
    const [Order, setOrder] = useState([]);
    const [mainLoading, setmainLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [ordersCustomer, setOrdersCustomer] = useState([]);
    const [loading, setLoading] = useState(false);

    const { userId } = useContext(UserContext);

    // Checkout session
    async function checkoutSession(values, cartItems) {
        if (!cartItems || cartItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        try {
            setmainLoading(true);

            // تجهيز items من الكارت
            const items = cartItems.map((product) => ({
                productId: product.productId,
                quantity: product.quantity,
                price: product.price,
            }));

            const body = {
                customerId: userId, // من الكونتكست
                items,
                shippingAddress: values.details,
                recipientName: values.recipientName,
                phone: values.phone,
                addressLine2: values.addressLine2 || "",
                city: values.city,
                state: values.state || "",
                postalCode: values.postalCode || "",
                country: values.country || "",
                notes: values.notes || "",
            };

            const { data } = await axios.post(
                "http://basmah-lyn.runasp.net/api/Orders",
                body,
                { headers }
            );

            toast.success("Order created successfully!");
            setmainLoading(false);

            return data;
        } catch (err) {
            setmainLoading(false);
            toast.error(err.response?.data || "Error while creating order");
        }
    }

    const fetchOrders = async () => {
        try {
            setmainLoading(true);
            const { data } = await axios.get("http://basmah-lyn.runasp.net/api/Orders",
                { headers }
            );
            setOrders(data.data);
            setmainLoading(false);


        } catch (err) {
            setmainLoading(false);
            toast.error("Failed to load orders");
        }
    };

    async function getOrderDetails(orderId) {
        try {
            setmainLoading(true);
            const { data } = await axios.get(
                `http://basmah-lyn.runasp.net/api/Orders/${orderId}`,
                { headers }
            );
            setOrderDetails(data.data);
            setmainLoading(false);

        } catch (err) {
            setmainLoading(false);
            toast.error("Failed to load order details");
        }
    }

    async function getOrdersCustomer() {
        try {
            setLoading(true);
            let { data } = await axios.get(
                `http://basmah-lyn.runasp.net/api/Orders/customer/${userId}`
            );
            setOrdersCustomer(data.data);
        } catch (err) {
            console.error("Error fetching orders:", err);
        } finally {
            setLoading(false);
        }
    }

    async function updateOrderStatus(orderId, status) {
        try {
            setmainLoading(true);
            const { data } = await axios.put(
                `http://basmah-lyn.runasp.net/api/Orders/status`,
                {
                    orderId,
                    status
                },
                { headers }
            );
            getOrderDetails(orderId);
            setmainLoading(false);
            toast.success("Order status updated successfully");

        } catch (err) {
            setmainLoading(false);
            toast.error("Failed to update order status");
        }
    }

    return (
        <OrderContext.Provider
            value={{
                checkoutSession,
                setOrder,
                Order,
                mainLoading,
                orders,
                fetchOrders,
                getOrderDetails,
                orderDetails,
                getOrdersCustomer,
                ordersCustomer,
                loading,
                updateOrderStatus,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}
