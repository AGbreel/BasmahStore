
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Products from "./Components/Products/Products.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import Notfound from "./Components/Notfound/Notfound.jsx";
import UserContextProvider from "./context/UserContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import ProductsContextProvider from "./context/ProductsContext.jsx";
import CartContextProvider from "./context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import Checkout from "./Components/Checkout/Checkout.jsx";
import Favorites from "./Components/Favorites/Favorites.jsx";
import WishlistContextProvider from "./context/WishlistContext.jsx";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword.jsx";
import VerifyResetCode from "./Components/VerifyResetCode/VerifyResetCode.jsx";
import ResetPassword from "./Components/ResetPassword/ResetPassword.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CategoryProducts from "./Components/CategoryProducts/CategoryProducts.jsx";
import CategoriesContextProvider from "./context/CategoriesContext.jsx";
import OrderContextProvider from "./context/OrdersContext.jsx";
import AdminOrders from "./Components/AdminOrders/AdminOrders.jsx";
import AllUsers from "./Components/AllUsers/AllUsers.jsx";
import OrderDetails from "./Components/OrderDetails/OrderDetails.jsx";
import OrderConfirmation from "./Components/OrderConfirmation/OrderConfirmation.jsx";
import UserOrders from "./Components/UserOrders/UserOrders.jsx";


let routers = createHashRouter([
  {
    path: "", element: <Layout />, children: [
      { index: true, element: (
          // <ProtectedRoute>
            <Home />
          // </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          // <ProtectedRoute>
            <Products />
          // </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          // <ProtectedRoute>
            <ProductDetails />
          // </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          // <ProtectedRoute>
            <Categories />
          // </ProtectedRoute>
        ),
      },
      {
        path: "categories/:categoryId",
        element: (
          // <ProtectedRoute>
            <CategoryProducts />
          // </ProtectedRoute>
        ),
      },
      {
        path: "favorites",
        element: (
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "User-orders",
        element: (
          <ProtectedRoute>
            <UserOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "order-confirmation/:orderId",
        element: (
          <ProtectedRoute>
            <OrderConfirmation />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders/:orderId",
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <ProtectedRoute>
            <AdminOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <ProtectedRoute>
            <AllUsers />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "forgetPassword", element: <ForgetPassword /> },
      { path: "verifyResetCode", element: <VerifyResetCode /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

let queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <CartContextProvider>
          <OrderContextProvider>
            <WishlistContextProvider>
              <ProductsContextProvider>
                <CategoriesContextProvider>
                  <RouterProvider router={routers}></RouterProvider>
                  <Toaster />
                  <ReactQueryDevtools />
                </CategoriesContextProvider>
              </ProductsContextProvider>
            </WishlistContextProvider>
          </OrderContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
