import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide } from "@mui/material";
import { motion } from "framer-motion";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ProductActionsModal({ open, onClose, onDelete, onEdit }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
            PaperProps={{
                component: motion.div,
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                sx: { borderRadius: "20px", overflow: "hidden" },
            }}
            fullWidth
            maxWidth="xs"
        >
            <DialogTitle sx={{mb: 2, textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}>
                Product Actions
            </DialogTitle>

            <DialogContent sx={{ display: "flex", justifyContent: "space-around" }}>
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
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
                <Button
                    onClick={onClose}
                    sx={{ px: 3, color: "gray", fontWeight: "semibold", borderRadius: "15px", backgroundColor: "white", border: "1px solid gray" }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
