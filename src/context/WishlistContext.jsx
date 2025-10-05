import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  let headers = { token: localStorage.getItem("userToken") };

  const [wishlist, setWishlist] = useState([]);
  const [wishlistIds, setWishlistIds] = useState(() => {
    const saved = localStorage.getItem("wishlistIds");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  //* Toggle wishlist item
  function toggleWishlist(productId) {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  }

  //* Add Product To Wishlist
  async function addProductToWishlist(userId, productId) {
    try {
      const body = { userId, productId };
      let { data } = await axios.post(
        `http://basmah-lyn.runasp.net/api/Wishlist`,
        body,
        { headers }
      );
      toggleWishlist(productId);
      toast.success("Added to wishlist successfully");

    } catch (err) {
      toast.error("Failed to add to wishlist");
    }
  }

  //* Get Wishlist Products
  async function getWishlistProducts(userId) {
    try {
      setLoading(true);
      let { data } = await axios.get(
        `http://basmah-lyn.runasp.net/api/Wishlist/${userId}`,
        { headers }
      );
      setWishlist(data.data);


      // ✅ حدّث الـ ids من السيرفر نفسه
      const idsFromServer = data.data.map((item) => item.productId);
      setWishlistIds(idsFromServer);

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  //* Remove Product From Wishlist
  async function removeProductFromWishlist(userId, productId) {
    try {
      await axios.delete(
        `http://basmah-lyn.runasp.net/api/Wishlist/${userId}/${productId}`,
        { headers }
      );
      toggleWishlist(productId);
      toast.success("Product removed from wishlist successfully");
      getWishlistProducts(userId); // sync مع السيرفر
    } catch (err) {
      toast.error("Failed to remove from wishlist");
    }
  }

  //* Clear Wishlist
  async function clearUserWishlist(userId) {
    try {
      let { data } = await axios.delete(
        `http://basmah-lyn.runasp.net/api/Wishlist/clear/${userId}`,
        { headers }
      );
      setWishlist([]);
      setWishlistIds([]);
      toast.success(data);
    } catch (err) {
      toast.error("Failed to clear wishlist");
    }
  }

  //* Save wishlistIds to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlistIds", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  //* ✅ Sync wishlist with server on mount
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      getWishlistProducts(userId);
    }
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        addProductToWishlist,
        getWishlistProducts,
        removeProductFromWishlist,
        clearUserWishlist,
        wishlist,
        wishlistIds,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
