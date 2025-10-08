import { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export let CategoriesContext = createContext();

export default function CategoriesContextProvider({ children }) {
  let [loading, setLoading] = useState(false);
  let [allCategory, setAllCategory] = useState([]);

  async function getAllCategory() {
    try {
      setLoading(true);
      let { data } = await axios.get(
        "https://basmah-lyn.runasp.net/api/Categories"
      );
      setAllCategory(data.data);

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  async function addCategory(category) {
    try {
      setLoading(true);

      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      let { data } = await axios.post(
        "https://basmah-lyn.runasp.net/api/Categories",
        category,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      getAllCategory();
      toast.success("Category added successfully");
      return { success: true, data };

    } catch (err) {
      toast.error("Failed to add category");
      console.error(err);
      return {
        success: false,
        error: err.response?.data || "Something went wrong",
      };
    } finally {
      setLoading(false);
    }
  }

  async function deleteCategory(categoryId) {
    try {
      setLoading(true);
      let { data } = await axios.delete(
        `https://basmah-lyn.runasp.net/api/Categories/${categoryId}`
      );
      getAllCategory();

      toast.success("Category deleted successfully");
    } catch (err) {
      toast.error("Failed to delete category");
    } finally {
      setLoading(false);
    }
  }

  async function updateCategory(categoryId, formData) {
    try {
      setLoading(true);

      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      let { data } = await axios.put(
        `https://basmah-lyn.runasp.net/api/Categories/${categoryId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      getAllCategory();

      toast.success("Category updated successfully");

    } catch (err) {
      toast.error("Failed to update category");

    } finally {
      setLoading(false);
    }
  }



  return (
    <CategoriesContext.Provider value={{ getAllCategory, allCategory, loading, addCategory, deleteCategory, updateCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
}
