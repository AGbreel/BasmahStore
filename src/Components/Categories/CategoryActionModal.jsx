import React from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";

export default function CategoryActionsModal({ open, onClose, onDelete, onEdit }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] sm:w-[400px] text-center"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-10">Category Actions</h2>

                <div className="flex justify-around mb-8">
                    <Button
                        onClick={onEdit}
                        sx={{ px: 3, color: "white", fontWeight: "semibold", borderRadius: "15px" }}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 shadow-md hover:scale-105 transition"
                    >
                        ✏️ Edit
                    </Button>
                    <Button
                        onClick={onDelete}
                        sx={{ px: 3, color: "white", fontWeight: "semibold", borderRadius: "15px" }}
                        className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-md hover:scale-105 transition"
                    >
                        🗑️ Delete
                    </Button>
                </div>

                <Button
                    onClick={onClose}
                    sx={{ px: 3, color: "gray", fontWeight: "semibold", borderRadius: "15px", backgroundColor: "white", border: "1px solid gray" }}
                >
                    Cancel
                </Button>
            </motion.div>
        </div>
    );
}
