import React, { useContext, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Slide,
    CircularProgress,
    MenuItem,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ProductsContext } from "../../context/ProductsContext";
import {
    Image as ImageIcon,
    Title as TitleIcon,
    Description as DescriptionIcon,
    Category as CategoryIcon,
    AttachMoney as PriceIcon,
    Inventory as StockIcon,
    ColorLens as ColorIcon,
    Straighten as SizeIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const availableColors = ["Red", "Blue", "Green", "Black", "White"];
const availableSizes = ["S", "M", "L", "XL", "XXL"];

export default function EditProductModal({ open, onClose, product, categories }) {
    const { updateProduct } = useContext(ProductsContext);
    const [uploadPreview, setUploadPreview] = useState(null);
    const [loadingBtn, setLoadingBtn] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            productName: product?.productName || "",
            description: product?.description || "",
            price: product?.price || "",
            stock: product?.stock || "",
            categoryId: product?.categoryId || "",
            colors: Array.isArray(product?.colors) ? product.colors : (product?.colors ? product.colors.split(",") : []),
            sizes: Array.isArray(product?.sizes) ? product.sizes : (product?.sizes ? product.sizes.split(",") : []),
            priceAfterDiscount: product?.priceAfterDiscount || "",
            ratingsAverage: product?.ratingsAverage || 0,
            imageFile: null,
        },
        validationSchema: Yup.object({
            productName: Yup.string().required("Product name is required"),
            description: Yup.string().required("Description is required"),
            price: Yup.number().min(0).required("Price is required"),
            stock: Yup.number().min(0).required("Stock is required"),
            categoryId: Yup.number().required("Category is required"),
            priceAfterDiscount: Yup.number().min(0).nullable(),
            ratingsAverage: Yup.number().min(0).max(5).nullable(),
        }),
        onSubmit: async (values) => {
            try {
                setLoadingBtn(true);

                let imageUrl = product?.imageUrl || "";
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

                const updatedProduct = {
                    productId: product.productId,
                    productName: values.productName || product.productName,
                    description: values.description || product.description,
                    price: parseFloat(values.price || product.price),
                    stock: parseInt(values.stock || product.stock),
                    categoryId: parseInt(values.categoryId || product.categoryId),
                    colors: values.colors.length > 0 ? values.colors : (Array.isArray(product.colors) ? product.colors : (product.colors ? product.colors.split(",") : [])),
                    sizes: values.sizes.length > 0 ? values.sizes : (Array.isArray(product.sizes) ? product.sizes : (product.sizes ? product.sizes.split(",") : [])),
                    priceAfterDiscount: values.priceAfterDiscount ? parseFloat(values.priceAfterDiscount) : product.priceAfterDiscount,
                    ratingsAverage: values.ratingsAverage ? parseFloat(values.ratingsAverage) : product.ratingsAverage,
                    imageUrl,
                };

                const res = await updateProduct(product.productId, updatedProduct);
                if (res?.success) {
                    toast.success("Product updated successfully 🎉");
                    onClose();
                } else {
                    toast.error(res?.error || "Failed to update product ❌");
                }
            } catch (error) {
                console.error(error);
                toast.error("Unexpected error ❌");
            } finally {
                setLoadingBtn(false);
            }
        },
    });

    const handleCheckboxChange = (field, value) => {
        const currentValues = formik.values[field];
        if (currentValues.includes(value)) {
            formik.setFieldValue(
                field,
                currentValues.filter((v) => v !== value)
            );
        } else {
            formik.setFieldValue(field, [...currentValues, value]);
        }
    };

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
            <DialogTitle className="text-3xl font-extrabold text-center py-4">✏️ Edit Product</DialogTitle>

            <form onSubmit={formik.handleSubmit} className="bg-white text-gray-800">
                <DialogContent className="space-y-6 p-6">
                    {/* Name */}
                    <div className="flex items-center gap-2">
                        <TitleIcon className="text-green-500" />
                        <TextField
                            label="Product Name"
                            name="productName"
                            fullWidth
                            variant="outlined"
                            value={formik.values.productName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.productName && Boolean(formik.errors.productName)}
                            helperText={formik.touched.productName && formik.errors.productName}
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
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </div>

                    {/* Price & Stock */}
                    <div className="flex gap-4">
                        <TextField
                            label="Price"
                            name="price"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                        />
                        <TextField
                            label="Stock"
                            name="stock"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={formik.values.stock}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.stock && Boolean(formik.errors.stock)}
                            helperText={formik.touched.stock && formik.errors.stock}
                        />
                    </div>

                    {/* Price After Discount & Ratings */}
                    <div className="flex gap-4">
                        <TextField
                            label="Price After Discount"
                            name="priceAfterDiscount"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={formik.values.priceAfterDiscount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.priceAfterDiscount && Boolean(formik.errors.priceAfterDiscount)}
                            helperText={formik.touched.priceAfterDiscount && formik.errors.priceAfterDiscount}
                        />
                        <TextField
                            label="Ratings Average"
                            name="ratingsAverage"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={formik.values.ratingsAverage}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.ratingsAverage && Boolean(formik.errors.ratingsAverage)}
                            helperText={formik.touched.ratingsAverage && formik.errors.ratingsAverage}
                        />
                    </div>

                    {/* Category */}
                    <div className="flex items-center gap-2">
                        <CategoryIcon className="text-purple-500" />
                        <TextField
                            select
                            label="Category"
                            name="categoryId"
                            fullWidth
                            variant="outlined"
                            value={formik.values.categoryId}
                            onChange={formik.handleChange}
                        >
                            {categories?.map((cat) => (
                                <MenuItem key={cat.categoryId} value={cat.categoryId}>
                                    {cat.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    {/* Colors */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <ColorIcon className="text-pink-500" />
                            <span className="font-medium">Select Colors</span>
                        </div>
                        <FormGroup row>
                            {availableColors.map((color) => (
                                <FormControlLabel
                                    key={color}
                                    control={
                                        <Checkbox
                                            checked={formik.values.colors.includes(color)}
                                            onChange={() => handleCheckboxChange("colors", color)}
                                        />
                                    }
                                    label={color}
                                />
                            ))}
                        </FormGroup>
                    </div>

                    {/* Sizes */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <SizeIcon className="text-blue-500" />
                            <span className="font-medium">Select Sizes</span>
                        </div>
                        <FormGroup row>
                            {availableSizes.map((size) => (
                                <FormControlLabel
                                    key={size}
                                    control={
                                        <Checkbox
                                            checked={formik.values.sizes.includes(size)}
                                            onChange={() => handleCheckboxChange("sizes", size)}
                                        />
                                    }
                                    label={size}
                                />
                            ))}
                        </FormGroup>
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
                                <img src={uploadPreview} alt="Preview" className="w-full h-48 object-cover rounded-lg shadow-md" />
                            </div>
                        ) : product?.imageUrl ? (
                            <div className="mt-4">
                                <img src={product.imageUrl} alt="Current" className="w-full h-48 object-cover rounded-lg shadow-md" />
                            </div>
                        ) : null}
                    </div>
                </DialogContent>

                <DialogActions className="flex justify-between px-6 pb-6">
                    <Button onClick={onClose} className="!text-gray-600 hover:!text-gray-800 transition-all">Cancel</Button>
                    <Button type="submit" disabled={loadingBtn} className="!bg-gradient-to-r from-green-500 to-emerald-600 !text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-all duration-300">
                        {loadingBtn ? <CircularProgress size={22} color="inherit" /> : "Save"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
