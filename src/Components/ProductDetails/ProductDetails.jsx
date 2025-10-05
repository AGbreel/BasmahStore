import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { ProductsContext } from "../../context/ProductsContext";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import RecentProduct from "../recentProdutc/recentProduct";
import Loading from "../Loading/Loading";
import AddProductImageModal from "./AddProductImageModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProductDetails() {
  let navigate = useNavigate();
  const { id } = useParams();
  const { products, getProductsDetails, productDetails } = useContext(ProductsContext);
  const { addProductToCart, getProductInCart } = useContext(CartContext);
  const { userId, userRole, userData } = useContext(UserContext);

  const [openModalImage, setOpenModalImage] = useState(false);
  const [openModalAddImage, setOpenModalAddImage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductsDetails(id);
  }, [id]);

  if (!productDetails) return <div className="min-h-screen flex justify-center items-center"> <Loading /> </div>;

  const allImages = [productDetails.imageUrl, ...(productDetails.images || [])];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const openImageModal = (index) => {
    setCurrentImageIndex(index);
    setOpenModalImage(true);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="container px-10 pt-16 relative min-h-screen">
      <h1 className="text-3xl mb-6">Product Details</h1>

      {userRole === "Admin" && (
        <button
          onClick={() => setOpenModalAddImage(true)}
          className="absolute top-20 right-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 px-4 mt-3 font-medium transition shadow-md"
        >
          ➕ Add New Image
        </button>
      )}

      <div className="flex flex-wrap items-center p-10">
        {/* Slider الصور */}
        <div className="w-full md:w-1/3 lg:w-1/4 relative rounded-md shadow-lg bg-slate-500 overflow-hidden">
          {/* ✅ Badge الخصم */}
          {productDetails.priceAfterDiscount && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-md z-10">
              SALE
            </span>
          )}

          {allImages.length > 1 ? (
            <Slider {...sliderSettings}>
              {allImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative group cursor-pointer overflow-hidden rounded-lg"
                >
                  <img
                    src={img}
                    alt={`Product ${idx + 1}`}
                    className="w-full h-80 object-contain transform transition duration-300 group-hover:scale-105"
                    onClick={() => openImageModal(idx)}
                  />
                  <p className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                    Click to Enlarge
                  </p>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="relative group cursor-pointer">
              <img
                src={allImages[0]}
                alt="Product"
                className="w-full h-80 object-contain rounded-lg shadow-md transform transition duration-300 group-hover:scale-105"
                onClick={() => openImageModal(0)}
              />
              <p className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                Click to Enlarge
              </p>
            </div>
          )}
        </div>

        {/* تفاصيل المنتج */}
        <div className="w-full md:w-2/3 px-10 py-5">
          <h2 className="text-2xl font-semibold mb-3">{productDetails.productName}</h2>
          <p className="text-gray-600 mb-4">{productDetails.description}</p>
          <h3 className="text-lg font-medium text-emerald-600 mb-2">
            Category: {productDetails.categoryName}
          </h3>

          {/* ✅ السعر + الخصم */}
          <div className="flex justify-between items-center my-4">
            <div className="flex flex-col">
              {productDetails.priceAfterDiscount ? (
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-emerald-600">
                    {productDetails.priceAfterDiscount} EGP
                  </span>
                  <span className="text-sm line-through text-gray-500">
                    {productDetails.price} EGP
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold text-gray-800">
                  {productDetails.price} EGP
                </span>
              )}
            </div>

            {/* ✅ التقييم نجوم */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`fas fa-star ${star <= (productDetails.ratingsAverage || 0)
                    ? "text-yellow-400"
                    : "text-gray-300"
                    }`}
                />
              ))}
              <span className="ml-1 text-sm text-gray-600">
                {productDetails.ratingsAverage || 0}/5
              </span>
            </div>
          </div>

          {/* الألوان */}
          {productDetails.colors?.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Available Colors:</h4>
              <div className="flex gap-2">
                {productDetails.colors.map((color, i) => (
                  <span
                    key={i}
                    className="w-8 h-8 rounded-full border shadow cursor-pointer hover:scale-110 transition"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* المقاسات */}
          {productDetails.sizes?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Available Sizes:</h4>
              <div className="flex gap-3 flex-wrap">
                {productDetails.sizes.map((size, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 border rounded-md shadow-sm cursor-pointer hover:bg-emerald-500 hover:text-white transition"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* زر إضافة للكارت */}
          <button
            onClick={() =>
              !userData ? navigate("/login") : addProductToCart(userId, productDetails.productId).then(() => getProductInCart(userId))
            }
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-2 mt-5 font-medium transition"
          >
            Add To Cart
          </button>
        </div>
      </div>


      {/* Similar Products */}
      <h1 className="text-3xl mt-16 mb-6">Similar Products</h1>
      <div className="products p-10 flex flex-wrap justify-center gap-10">
        {products
          ?.filter(
            (p) =>
              p.categoryName === productDetails.categoryName &&
              p.productId !== productDetails.productId
          ).length > 0 ? (
          products
            .filter(
              (p) =>
                p.categoryName === productDetails.categoryName &&
                p.productId !== productDetails.productId
            )
            .map((product) => (
              <RecentProduct key={product.productId} product={product} />
            ))
        ) : (
          <p className="text-gray-500 text-lg italic">
            No similar products found. Try exploring other categories!
          </p>
        )}
      </div>


      {/* Modal تكبير الصورة مع Next / Prev */}
      {openModalImage && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4">
          <button
            onClick={prevImage}
            className="absolute left-4 text-white text-3xl p-2 hover:bg-black/50 rounded-full transition"
          >
            <FaChevronLeft />
          </button>
          <img
            src={allImages[currentImageIndex]}
            alt={`Product ${currentImageIndex + 1}`}
            className="max-w-full max-h-full rounded-lg shadow-2xl"
          />
          <button
            onClick={nextImage}
            className="absolute right-4 text-white text-3xl p-2 hover:bg-black/50 rounded-full transition"
          >
            <FaChevronRight />
          </button>
          <button
            onClick={() => setOpenModalImage(false)}
            className="absolute top-4 right-4 text-white text-2xl p-2 hover:bg-black/50 rounded-full transition"
          >
            ✕
          </button>
        </div>
      )}

      {/* Add Image Modal */}
      <AddProductImageModal
        open={openModalAddImage}
        onClose={() => setOpenModalAddImage(false)}
        productId={productDetails.productId}
        refresh={() => getProductsDetails(id)}
      />
    </div>
  );
}
