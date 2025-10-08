import React, { useState, useContext } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Slide,
    CircularProgress,
} from "@mui/material";
import { Image as ImageIcon } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ProductsContext } from "../../context/ProductsContext";
import toast from "react-hot-toast";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function AddProductImageModal({ open, onClose, productId, refresh }) {
    const { addProductImage } = useContext(ProductsContext);
    const [uploadPreview, setUploadPreview] = useState(null);
    const [loadingBtn, setLoadingBtn] = useState(false);

    const formik = useFormik({
        initialValues: {
            imageFile: null,
        },
        validationSchema: Yup.object({
            imageFile: Yup.mixed().required("Image is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoadingBtn(true);

                // ✅ 1) ارفع الصورة
                let imageUrl = "";
                if (values.imageFile) {
                    const formData = new FormData();
                    formData.append("File", values.imageFile);

                    const uploadRes = await axios.post(
                        "https://basmah-lyn.runasp.net/api/Images/upload",
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );

                    imageUrl = uploadRes.data.imageUrl;
                }

                // ✅ 2) ابعت الداتا للكونتكست
                const res = await addProductImage({
                    productId: productId,
                    imageUrl: imageUrl,
                });

                if (res.success) {
                    toast.success("Product added successfully 🎉");
                    resetForm();
                    setUploadPreview(null);
                    onClose();
                } else {
                    toast.error(res.error || "Failed to add product ❌");
                }
            } catch (error) {
                toast.error("Unexpected error ❌");
                console.error(error);
            } finally {
                setLoadingBtn(false);
            }
        },
    });

    return (
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                className:
                    "rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-500 text-white",
            }}
        >
            <DialogTitle className="text-2xl font-bold text-center py-3">
                📸 Upload Product Image
            </DialogTitle>

            <form onSubmit={formik.handleSubmit} className="bg-white text-gray-800">
                <DialogContent className="space-y-6 p-6">
                    {/* Image Upload */}
                    <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <ImageIcon className="text-emerald-500" />
                            <span className="font-medium">Choose Image</span>
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        formik.setFieldValue("imageFile", file);
                                        setUploadPreview(URL.createObjectURL(file));
                                    }
                                }}
                            />
                        </label>
                        {formik.touched.imageFile && formik.errors.imageFile && (
                            <p className="text-red-500 text-sm mt-1">
                                {formik.errors.imageFile}
                            </p>
                        )}
                        {uploadPreview && (
                            <div className="mt-4">
                                <img
                                    src={uploadPreview}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-lg shadow-md"
                                />
                            </div>
                        )}
                    </div>
                </DialogContent>

                <DialogActions className="flex justify-between px-6 pb-6">
                    <Button
                        onClick={onClose}
                        className="!text-gray-600 hover:!text-gray-800 transition-all"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={loadingBtn}
                        className="!bg-gradient-to-r from-emerald-500 to-teal-600 !text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
                    >
                        {loadingBtn ? <CircularProgress size={22} color="inherit" /> : "Upload"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
