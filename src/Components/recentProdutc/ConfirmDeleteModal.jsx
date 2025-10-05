import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";

export default function ConfirmDeleteModal({ open, onClose, onConfirm }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                className: "shadow-2xl p-6 w-[90%] sm:w-[400px]",
                sx: { borderRadius: "15px", overflow: "hidden" },
            }}
        >
            <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}>
                Confirm Delete
            </DialogTitle>

            <DialogContent>
                <Typography
                    variant="body1"
                    sx={{ textAlign: "center", fontSize: "1.2rem", color: "gray" }}
                // className="text-gray-600 text-center"
                >
                    Are you sure you want to delete this product? This action
                    cannot be undone.
                </Typography>
            </DialogContent>

            <DialogActions sx={{ justifyContent: "space-around" }}>
                <Button
                    onClick={onConfirm}
                    sx={{ px: 3, color: "white", fontWeight: "semibold", borderRadius: "15px" }}
                    className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-md hover:scale-105 transition"
                >
                    Yes, Delete
                </Button>
                <Button
                    onClick={onClose}
                    sx={{ px: 3, color: "white", fontWeight: "semibold", borderRadius: "15px" }}
                    className="bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold shadow-md hover:scale-105 transition"
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
