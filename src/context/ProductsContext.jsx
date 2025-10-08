import { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export let ProductsContext = createContext();

export default function ProductsContextProvider({ children }) {
  let [loading, setLoading] = useState(false);
  let [products, setProducts] = useState([]);
  let [productsByCategory, setProductsByCategory] = useState([]);
  const [productDetails, setProductDetails] = useState(null);

  async function getRecentProducts() {
    setLoading(true);
    try {
      let { data } = await axios.get("https://basmah-lyn.runasp.net/api/Products");
      setProducts(data.data);

    } catch (err) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }

  async function getProductsByCategory(categoryId) {
    setProductsByCategory([]);
    try {
      let { data } = await axios.get(
        `https://basmah-lyn.runasp.net/api/Products/ByCategory/${categoryId}`
      );
      setProductsByCategory(data.data);

    } catch (err) {
      toast.error("Failed to fetch products by category");
    }
  }

  async function getProductsDetails(id) {
    try {
      let { data } = await axios.get(
        `https://basmah-lyn.runasp.net/api/Products/${id}`
      );
      setProductDetails(data.data);

    } catch (err) {
      toast.error("Failed to fetch product details");
    }
  }

  async function addProduct(product) {
    try {
      setLoading(true);

      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      let { data } = await axios.post(
        `https://basmah-lyn.runasp.net/api/Products`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      getRecentProducts();
      toast.success("Product added successfully");
      return { success: true, data };

    } catch (err) {
      toast.error("Failed to add product");
      return {
        success: false,
        error: err || "Something went wrong",
      };

    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(productId) {
    try {
      setLoading(true);
      let { data } = await axios.delete(
        `https://basmah-lyn.runasp.net/api/Products/${productId}`
      );
      getRecentProducts();

      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error("Failed to delete product");
    } finally {
      setLoading(false);
    }
  }

  async function updateProduct(productId, formData) {
    try {
      setLoading(true);

      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      let { data } = await axios.put(
        `https://basmah-lyn.runasp.net/api/Products/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      getRecentProducts();

      toast.success("Product updated successfully");
    } catch (err) {
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  }

  async function addProductImage(productImage) {
    try {
      setLoading(true);

      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      let { data } = await axios.post(
        `https://basmah-lyn.runasp.net/api/Products/${productImage.productId}/images`,
        productImage.imageUrl,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      getRecentProducts();
      getProductsDetails(productImage.productId);
      toast.success("Image uploaded successfully");
      return { success: true, data };

    } catch (err) {
      toast.error("Failed to upload image");
      return {
        success: false,
        error: err.response?.data || "Something went wrong",
      };
    } finally {
      setLoading(false);
    }
  }



  return (
    <ProductsContext.Provider value={{ getRecentProducts, products, productsByCategory, loading, getProductsByCategory, getProductsDetails, productDetails, addProduct, deleteProduct, updateProduct, addProductImage }}>
      {children}
    </ProductsContext.Provider>
  );
}
