import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  let headers = { token: localStorage.getItem("userToken") };
  const [cart, setCart] = useState(null);
  let [numOfCartItems, setNumOfCartItems] = useState(0);
  const [countLoading, setcountLoading] = useState(false);
  const [mainLoading, setmainLoading] = useState(false);
  const [id, setId] = useState(null);
  let userId = localStorage.getItem("userId");

  //*   ! ADD TO CART
  async function addProductToCart(userId, productId, quantity = 1) {
    try {
      setmainLoading(true);

      const body = {
        userId: userId,
        productId: productId,
        quantity: quantity,
      };

      let { data } = await axios.post(`http://basmah-lyn.runasp.net/api/Cart`,
        body,
        { headers }
      );

      // setCart(data);
      toast.success("Added to cart successfully");
      setmainLoading(false);
      
    } catch (err) {
      setmainLoading(false);
      toast.error("Failed to add to cart");
    }
  }

  // *  ! GET PRODUCT IN CART
  async function getProductInCart(userId) {
    try {
      setmainLoading(true);
      let { data } = await axios.get(
        `http://basmah-lyn.runasp.net/api/Cart/${userId}`,
        { headers }
      );
      setCart(data.data);
      setNumOfCartItems(data.data.items?.length);

      setmainLoading(false);
    } catch (err) {
      setmainLoading(false);
    }
  }

  //*   ! Update Cart Product Quantity
  async function updateCartProductQuantity(userId, productId, count) {
    if (count > 0) {
      try {
        setcountLoading(true);
        setId(productId);
        let { data } = await axios.put(
          `http://basmah-lyn.runasp.net/api/Cart/${userId}/${productId}`, count,
          {
            headers: {
              "Content-Type": "application/json",
              "Accept": "*/*"
            }
          }
        );
        setcountLoading(false);
        toast.success("Quantity updated successfully");

      } catch (err) {
        setcountLoading(false);
        toast.error(err.response?.data?.message || "Error updating quantity");
      }
    }
  }

  //*   ! Remove Specific Cart Item
  async function removeSpecificCartItem(userId, productId) {
    try {
      setmainLoading(true);
      let { data } = await axios.delete(
        `http://basmah-lyn.runasp.net/api/Cart/${userId}/${productId}`,
        { headers }
      );
      setmainLoading(false);
      toast.success("Item removed from cart successfully");

    } catch (err) {
      setmainLoading(false);
      toast.error(err.response.data.message || "Error removing item");
    }
  }

  //*   ! Clear User Cart
  async function clearUserCart(userId) {
    try {
      setmainLoading(true);
      let { data } = await axios.delete(
        `http://basmah-lyn.runasp.net/api/Cart/clear/${userId}`,
        { headers }
      );
      setCart(null);

      toast.success(data);
      setmainLoading(false);
    } catch (err) {
      setmainLoading(false);
    }
  }


  useEffect(() => {
    getProductInCart(userId);

  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getProductInCart,
        updateCartProductQuantity,
        removeSpecificCartItem,
        clearUserCart,
        setCart,
        cart,
        numOfCartItems,
        countLoading,
        id,
        mainLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
