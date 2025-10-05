import React, { useContext, useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Slide,
    CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CategoriesContext } from "../../context/CategoriesContext";
import {
    Image as ImageIcon,
    Title as TitleIcon,
    Description as DescriptionIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function EditCategoryModal({ open, onClose, category }) {
    const { updateCategory } = useContext(CategoriesContext);
    const [uploadPreview, setUploadPreview] = useState(null);
    const [loadingBtn, setLoadingBtn] = useState(false);

    const formik = useFormik({
        enableReinitialize: true, // ✅ مهم عشان يملى البيانات القديمة لما تفتح المودال
        initialValues: {
            name: category?.name || "",
            description: category?.description || "",
            imageFile: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            description: Yup.string().required("Description is required"),
        }),
        onSubmit: async (values) => {
            try {
                setLoadingBtn(true);

                // 1) ارفع الصورة لو اتغيرت
                let imageUrl = category?.imageUrl || "";
                if (values.imageFile) {
                    const formData = new FormData();
                    formData.append("File", values.imageFile);

                    const uploadRes = await axios.post(
                        "http://basmah-lyn.runasp.net/api/Images/upload",
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

                // 2) ابعت التحديث
                await updateCategory(category.categoryId, {
                    name: values.name,
                    description: values.description,
                    imageUrl: imageUrl,
                });

                toast.success("Category updated successfully 🎉");
                onClose();
            } catch (error) {
                toast.error("Failed to update category ❌");
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
                    "rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white",
            }}
        >
            {/* Title */}
            <DialogTitle className="text-3xl font-extrabold text-center py-4">
                ✏️ Edit Category
            </DialogTitle>

            <form
                onSubmit={formik.handleSubmit}
                className="bg-white text-gray-800"
            >
                <DialogContent className="space-y-6 p-6">
                    {/* Name */}
                    <div className="flex items-center gap-2">
                        <TitleIcon className="text-green-500" />
                        <TextField
                            label="Category Name"
                            name="name"
                            fullWidth
                            variant="outlined"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </div>

                    {/* Description */}
                    <div className="flex items-center gap-2">
                        <DescriptionIcon className="text-green-500" />
                        <TextField
                            label="Description"
                            name="description"
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.description &&
                                Boolean(formik.errors.description)
                            }
                            helperText={
                                formik.touched.description && formik.errors.description
                            }
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <ImageIcon className="text-green-500" />
                            <span className="font-medium">Upload New Image</span>
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
                        {uploadPreview ? (
                            <div className="mt-4">
                                <img
                                    src={uploadPreview}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-lg shadow-md"
                                />
                            </div>
                        ) : category?.imageUrl ? (
                            <div className="mt-4">
                                <img
                                    src={category.imageUrl}
                                    alt="Current"
                                    className="w-full h-48 object-cover rounded-lg shadow-md"
                                />
                            </div>
                        ) : null}
                    </div>
                </DialogContent>

                {/* Actions */}
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
                        className="!bg-gradient-to-r from-green-500 to-emerald-600 !text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
                    >
                        {loadingBtn ? (
                            <CircularProgress size={22} color="inherit" />
                        ) : (
                            "Save"
                        )}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
