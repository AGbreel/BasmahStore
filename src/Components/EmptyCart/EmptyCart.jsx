import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function EmptyCart() {
    const messages = [
        "Your cart is empty 🛒",
        "Looks like you haven’t added anything yet!",
        "Start shopping and fill your cart with amazing products 💙",
        "Don’t miss out, great deals are waiting for you 😉",
        "Hit that 'Add to Cart' button now 🚀",
    ];

    return (
        <div className="h-screen flex flex-col justify-center items-center text-center space-y-6">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <ShoppingCartOutlinedIcon sx={{ fontSize: 100 }} className="text-gray-400" />
            </motion.div>

            <div className="space-y-2">
                {messages.map((msg, i) => (
                    <motion.h2
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="text-lg sm:text-xl text-gray-700 font-medium"
                    >
                        {msg}
                    </motion.h2>
                ))}
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                    to="/products"
                    className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
                >
                    Start Shopping
                </Link>
            </motion.div>
        </div>
    );
}
