import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { UserContext } from "../../context/UserContext";
import { ProductsContext } from "../../context/ProductsContext";
import ProductActionsModal from "./ProductActionModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EditProductModal from "./EditProductModal";
import { CategoriesContext } from "../../context/CategoriesContext";

export default function RecentProduct({ product }) {

  const { getAllCategory, allCategory } = useContext(CategoriesContext);

  let navigate = useNavigate();
  let { userId, userRole, userData } = useContext(UserContext);
  let { addProductToCart, getProductInCart } = useContext(CartContext);
  let {
    addProductToWishlist,
    removeProductFromWishlist,
    wishlistIds,
  } = useContext(WishlistContext);

  let { deleteProduct, updateProduct } = useContext(ProductsContext);
  const [openActions, setOpenActions] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Handle long press for Admin only
  let pressTimer;
  const handleMouseDown = (product) => {
    if (userRole === "Admin") {
      pressTimer = setTimeout(() => {
        setSelectedProduct(product);
        setOpenActions(true);
      }, 800); // 800ms = long press
    }
  };
  const handleMouseUp = () => clearTimeout(pressTimer);

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div
      onMouseDown={() => handleMouseDown(product)}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="group relative w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-6 cursor-pointer
      rounded-2xl bg-white shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
    >
      {/* Wishlist Icon */}
      {wishlistIds?.includes(product.productId) ? (
        <i
          onClick={() =>
            removeProductFromWishlist(userId, product.productId)
          }
          className="fa-solid fa-heart text-2xl absolute top-2 right-2 text-red-600 transition-transform duration-500 group-hover:scale-125"
        ></i>
      ) : (
        <i
          onClick={() => addProductToWishlist(userId, product.productId)}
          className="fa-regular fa-heart text-2xl absolute top-2 right-2 text-gray-500 transition-transform duration-500 group-hover:scale-125 hover:text-red-600"
        ></i>
      )}

      <Link to={`/productdetails/${product.productId}`}>
        <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
          {/* صورة المنتج */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.description}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* شارة الخصم */}
            {product.priceAfterDiscount && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow">
                SALE
              </span>
            )}
          </div>

          {/* تفاصيل المنتج */}
          <div className="p-4 flex flex-col gap-2">
            <h6 className="font-semibold text-lg text-gray-800 line-clamp-1">
              {product.productName}
            </h6>
            <p className="text-sm text-gray-500 line-clamp-2">{product.categoryName}</p>
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

            {/* السعر */}
            <div className="mt-3">
              {product.priceAfterDiscount ? (
                <div className="flex items-center gap-2">
                  <span className="line-through text-gray-400 text-sm">
                    {product.price} EGP
                  </span>
                  <span className="text-indigo-600 font-bold text-lg">
                    {product.priceAfterDiscount} EGP
                  </span>
                </div>
              ) : (
                <span className="text-gray-900 font-bold text-lg">
                  {product.price} EGP
                </span>
              )}
            </div>

            {/* التقييم */}
            <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <i
                  key={i}
                  className={`fas fa-star ${i < Math.round(product.ratingsAverage)
                    ? "text-yellow-400"
                    : "text-gray-300"
                    }`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">
                {product.ratingsAverage?.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </Link>


      {/* Add to Cart Button */}
      <button
        onClick={() => {
          !userData ? navigate("/login") :
            addProductToCart(userId, product.productId)
              .then(() => getProductInCart(userId))
              .catch((err) => console.log(err));
        }}
        className="absolute bottom-6 right-6 p-3 sm:p-4 rounded-full bg-green-500 text-white shadow-md 
        transition-all duration-500 hover:bg-green-600 hover:shadow-lg hover:scale-110"
      >
        <svg
          className="stroke-white"
          xmlns="http://www.w3.org/2000/svg"
          width={22}
          height={22}
          viewBox="0 0 26 26"
          fill="none"
        >
          <path
            d="M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Actions Modal */}
      <ProductActionsModal open={openActions}
        onClose={() => setOpenActions(false)}
        onDelete={() => {
          setOpenActions(false);
          setOpenDelete(true);
        }}
        onEdit={() => {
          setOpenActions(false);
          setOpenEdit(true);
        }}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => {
          deleteProduct(selectedProduct?.productId);
          setOpenDelete(false);
        }}
      />

      {/* Edit product Modal */}
      <EditProductModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        product={selectedProduct}
        categories={allCategory}
        onSave={(updated) => {
          updateProduct(selectedProduct?.productId, updated);
          setOpenEdit(false);
        }}
      />
    </div>
  );
}
