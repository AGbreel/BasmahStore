import React, { useContext, useEffect, useState } from 'react'
import style from './Products.module.css'
import axios from 'axios'
import Loading from '../Loading/Loading';
import { ProductsContext } from '../../context/ProductsContext';
import RecentProduct from '../recentProdutc/recentProduct';
import { Search } from "@mui/icons-material";
import { UserContext } from '../../context/UserContext';
import { CategoriesContext } from '../../context/CategoriesContext';
import AddProductModal from './AddProductModal';

export default function Products() {
  let { userRole } = useContext(UserContext);
  let { allCategory } = useContext(CategoriesContext);

  let { products, getRecentProducts, loading } = useContext(ProductsContext);
  const [searchVal, setSearchVal] = useState('');
  const [openAdd, setOpenAdd] = useState(false);


  const handleSearch = (e) => {
    setSearchVal(e.target.value);
  };

  const filteredProducts =
    products?.filter((product) =>
      product.productName?.toLowerCase().includes(searchVal.toLowerCase())
    ) || [];

  useEffect(() => {
    getRecentProducts();
    window.scrollTo(0, 0);
  }, [])


  return (
    <>
      <div className="px-4 py-10 relative min-h-screen">
        {/* Add Button */}
        {userRole === "Admin" && (
          <button
            onClick={() => setOpenAdd(true)}
            className="absolute top-20 right-4 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            + Add Product
          </button>
        )}

        {/* Header message */}
        <div className="flex flex-col justify-center items-center my-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
            Explore Our Products
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl text-center">
            Discover our amazing collection tailored to your needs 🌟.
            Find your favorites and start shopping now!
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full max-w-lg mx-auto mb-10">
          <input
            type="text"
            value={searchVal}
            onChange={handleSearch}
            placeholder="Search for products..."
            className="w-full px-5 py-3 pl-12 rounded-lg border border-green-500 outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
        </div>

        {!loading ? (
          products?.length > 0 ? (
            <div className="products py-10 flex flex-wrap justify-center gap-y-10 gap-x-5">
              {products.map((product, i) => {
                if (product.productName?.toLowerCase().includes(searchVal.toLowerCase())) {
                  return <RecentProduct key={i} product={product} />;
                }
                return null; // لازم ترجع null لو الشرط مش متحقق
              })}
            </div>
          ) : (
            <div className="py-7 flex justify-center"> No Products Found </div>
          )
        ) : (
          <div className="py-7 flex justify-center">
            <Loading />
          </div>
        )}

        {/* Add Category Modal */}
        <AddProductModal open={openAdd} onClose={() => setOpenAdd(false)} categories={allCategory} />

      </div>
    </>
  )
}
