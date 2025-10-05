import React from "react";
import { motion } from "framer-motion";

export default function ConfirmDeleteModal({ open, onClose, onConfirm }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] sm:w-[400px] text-center"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Delete</h2>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this category? This action cannot be undone.
                </p>

                <div className="flex justify-around">
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-md hover:scale-105 transition"
                    >
                        Yes, Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-semibold shadow-md hover:scale-105 transition"
                    >
                        Cancel
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
