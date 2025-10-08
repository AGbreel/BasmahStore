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

export default function AddProductModal({ open, onClose, categories }) {
    const { addProduct } = useContext(ProductsContext);
    const [uploadPreview, setUploadPreview] = useState(null);
    const [loadingBtn, setLoadingBtn] = useState(false);

    const formik = useFormik({
        initialValues: {
            productName: "",
            description: "",
            price: "",
            stock: "",
            categoryId: "",
            imageFile: null,
            colors: [],
            sizes: [],
            priceAfterDiscount: "",
            ratingsAverage: 0,
        },
        validationSchema: Yup.object({
            productName: Yup.string().required("Product name is required"),
            description: Yup.string().required("Description is required"),
            price: Yup.number().positive().required("Price is required"),
            stock: Yup.number().min(0).required("Stock is required"),
            categoryId: Yup.number().required("Category is required"),
            imageFile: Yup.mixed().required("Image is required"),
            priceAfterDiscount: Yup.number().min(0).nullable(),
            ratingsAverage: Yup.number().min(0).max(5).nullable(),
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
                const res = await addProduct({
                    productName: values.productName,
                    description: values.description,
                    price: parseFloat(values.price),
                    stock: parseInt(values.stock),
                    categoryId: parseInt(values.categoryId),
                    imageUrl: imageUrl,
                    colors: values.colors,
                    sizes: values.sizes,
                    priceAfterDiscount: values.priceAfterDiscount ? parseFloat(values.priceAfterDiscount) : null,
                    ratingsAverage: values.ratingsAverage ? parseFloat(values.ratingsAverage) : 0,
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

    // ✅ Handle checkbox changes
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
                    "rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white",
            }}
        >
            <DialogTitle className="text-3xl font-extrabold text-center py-4">
                ✨ Add New Product
            </DialogTitle>

            <form onSubmit={formik.handleSubmit} className="bg-white text-gray-800">
                <DialogContent className="space-y-6 p-6">
                    {/* Product Name */}
                    <div className="flex items-center gap-2">
                        <TitleIcon className="text-indigo-500" />
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
                        <DescriptionIcon className="text-indigo-500" />
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

                    {/* Price */}
                    <div className="flex items-center gap-2">
                        <PriceIcon className="text-green-500" />
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
                    </div>

                    {/* Stock */}
                    <div className="flex items-center gap-2">
                        <StockIcon className="text-orange-500" />
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

                    {/* ✅ Price After Discount */}
                    <div className="flex items-center gap-2">
                        <PriceIcon className="text-pink-500" />
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
                    </div>

                    {/* ✅ Ratings Average */}
                    <div className="flex items-center gap-2">
                        <StarIcon className="text-yellow-500" />
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
                            onBlur={formik.handleBlur}
                            error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
                            helperText={formik.touched.categoryId && formik.errors.categoryId}
                        >
                            {categories?.map((cat) => (
                                <MenuItem key={cat.categoryId} value={cat.categoryId}>
                                    {cat.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    {/* ✅ Colors */}
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

                    {/* ✅ Sizes */}
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
                            <ImageIcon className="text-indigo-500" />
                            <span className="font-medium">Upload Image</span>
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
                    <Button onClick={onClose} className="!text-gray-600 hover:!text-gray-800 transition-all">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={loadingBtn}
                        className="!bg-gradient-to-r from-indigo-500 to-purple-600 !text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
                    >
                        {loadingBtn ? <CircularProgress size={22} color="inherit" /> : "Add"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
