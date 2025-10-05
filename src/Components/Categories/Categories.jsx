import React, { useContext, useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { CategoriesContext } from "../../context/CategoriesContext";
import AddCategoryModal from "./AddCategoryModal";
import CategoryActionsModal from "./CategoryActionModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EditCategoryModal from "./EditCategoryModal";
import { UserContext } from "../../context/UserContext";

export default function Categories() {
  const { getAllCategory, allCategory, loading, deleteCategory, updateCategory } =
    useContext(CategoriesContext);

  let { userRole } = useContext(UserContext);

  const [openAdd, setOpenAdd] = useState(false);
  const [openActions, setOpenActions] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllCategory();
  }, []);

  // Handle long press for Admin only
  let pressTimer;
  const handleMouseDown = (category) => {
    if (userRole === "Admin") {
      pressTimer = setTimeout(() => {
        setSelectedCategory(category);
        setOpenActions(true);
      }, 800); // 800ms = long press
    }
  };
  const handleMouseUp = () => clearTimeout(pressTimer);

  return (
    <div className="px-4 sm:px-10 py-10 relative min-h-screen">
      {/* Add Button */}
      {userRole === "Admin" && (
        <button
          onClick={() => setOpenAdd(true)}
          className="absolute top-20 right-4 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          + Add Category
        </button>
      )}

      {/* Header */}
      <div className="flex flex-col justify-center items-center my-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
          Explore Our Categories
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl text-center">
          Choose from a wide range of categories tailored to your needs 🌟.
          Find your favorites and start exploring now!
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-8 w-[90%] mx-auto">
        {loading ? (
          <div className="py-10 flex justify-center">
            <Loading />
          </div>
        ) : (
          allCategory?.map((category) => (
            <div
              key={category.categoryId}
              onMouseDown={() => handleMouseDown(category)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 duration-500 cursor-pointer"
            >
              <Link to={`/categories/${category.categoryId}`}>
                <div className="relative">
                  <img
                    src={category.imageUrl}
                    className="w-full h-[250px] object-cover group-hover:scale-105 duration-500"
                    alt={category.description}
                  />
                </div>
                <div className="py-2 px-5">
                  <h2 className="font-semibold text-xl text-white mb-2">
                    {category.name}
                  </h2>
                  <p className="text-gray-300 text-sm">
                    {category.description}
                  </p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Add Category Modal */}
      <AddCategoryModal open={openAdd} onClose={() => setOpenAdd(false)} />

      {/* Actions Modal */}
      <CategoryActionsModal
        open={openActions}
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
          deleteCategory(selectedCategory?.categoryId);
          setOpenDelete(false);
        }}
      />

      {/* Edit Category Modal */}
      <EditCategoryModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        category={selectedCategory}
        onSave={(updated) => {
          updateCategory(selectedCategory?.categoryId, updated);
          setOpenEdit(false);
        }}
      />
    </div>
  );
}
