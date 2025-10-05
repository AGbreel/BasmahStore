import React, { useContext, useEffect } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import RecentProduct from "../recentProdutc/recentProduct";
import Loading from "../Loading/Loading";
import { UserContext } from "../../context/UserContext";
import { FavoriteBorder } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Favorites() {
  let { userId } = useContext(UserContext);
  let { getWishlistProducts, wishlist, Loading: loadingWishlist } = useContext(WishlistContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    getWishlistProducts(userId);
  }, []);

  return (
    <div className="px-4 sm:px-10 py-20">
      {/* Header message */}
      <motion.div
        className="text-center mb-14 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 drop-shadow-lg">
          Your Wishlist 💚
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Keep all your favorite products in one place.
          Come back anytime and shop smarter ✨
        </p>
      </motion.div>

      {loadingWishlist ? (
        <div className="py-24 flex justify-center">
          <Loading />
        </div>
      ) : wishlist && wishlist.length ? (
        <div className="products flex flex-wrap justify-center gap-8">
          {wishlist.map((product) => (
            <RecentProduct key={product.productId} product={product} />
          ))}
        </div>
      ) : (
        <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
          <FavoriteBorder sx={{ fontSize: 80 }} className="text-gray-400" />
          <h2 className="text-2xl sm:text-3xl text-gray-700 font-bold text-center">
            Your Wishlist is empty
          </h2>
          <p className="text-gray-500 text-center max-w-md">
            Start adding products you love to your wishlist ❤️
            Browse our collection and never lose track of your favorites!
          </p>
          <Link to="/products">
            <Button
              variant="contained"
              color="success"
              className="rounded-xl px-6 py-2"
            >
              Browse Products
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
