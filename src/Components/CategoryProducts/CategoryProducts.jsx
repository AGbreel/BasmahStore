import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { ProductsContext } from "../../context/ProductsContext";

export default function CategoryProducts() {
    const { categoryId } = useParams();
    const { getProductsByCategory, productsByCategory, mainLoading } = useContext(ProductsContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        getProductsByCategory(categoryId);
    }, [categoryId]);

    if (mainLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loading />
            </div>
        );
    }

    return (
        <div className="py-12 w-[90%] mx-auto min-h-screen">
            {productsByCategory && productsByCategory.length > 0 ? (
                <>
                    {/* رسالة فوق */}
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-gray-800">
                            ✨ We found <span className="text-green-600">{productsByCategory?.length}</span> products for you
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Explore the latest items and pick what suits you best 💚
                        </p>
                    </div>

                    {/* الكروت */}
                    <div className="flex flex-wrap justify-center gap-8">
                        {productsByCategory.map((product) => (
                            <div
                                key={product.productId}
                                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white rounded-3xl border border-green-100 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:border-green-300"
                            >
                                <div className="overflow-hidden rounded-t-3xl">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.description}
                                        className="w-full h-[230px] object-cover rounded-t-3xl transform hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-5 text-center">
                                    <h2 className="font-semibold text-lg text-gray-800 truncate">{product.productName}</h2>
                                    <p className="text-sm mt-2 text-gray-600 line-clamp-2">{product.description}</p>
                                    <p className="mt-3 font-bold text-green-600 text-lg">${product.price}</p>
                                    <Link
                                        to={`/productdetails/${product.productId}`}
                                        className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                    <h2 className="text-2xl font-bold text-gray-700">No products Found</h2>
                    <p className="text-gray-500 mt-2">
                        Looks like this category is empty for now.
                        Check back later or explore other categories ✨
                    </p>
                </div>
            )}
        </div>
    );
}
