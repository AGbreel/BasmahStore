import React, { useContext, useEffect } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../context/CartContext";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { motion } from "framer-motion";
import EmptyCart from "../EmptyCart/EmptyCart";

export default function Cart() {

  let { userId } = useContext(UserContext);

  let {
    getProductInCart,
    updateCartProductQuantity,
    removeSpecificCartItem,
    cart,
    countLoading,
    id,
    mainLoading,
  } = useContext(CartContext);
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductInCart(userId);
  }, []);

  return (
    <>
      {mainLoading ? (
        <div className="py-24 flex justify-center items-center min-h-screen">
          <Loading />
        </div>
      ) : (
        <div>
          {cart && cart?.items?.length > 0 ? (
            <section className="py-24 relative">
              <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
                  Shopping Cart
                </h2>

                {cart ? cart?.items?.map((product) =>
                  <div key={product?.productId} className="rounded-3xl border-2 bg-white border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 hover:scale-105 transition-transform duration-500">
                    <div className="col-span-12 lg:col-span-2 img box">
                      <img
                        src={product?.imageUrl}
                        alt={product?.description}
                        className="max-lg:w-full lg:w-[180px] rounded-lg"
                      />
                    </div>

                    <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                      <div className="flex items-center justify-between w-full mb-4">
                        <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900"> {product?.productName} </h5>

                        <button onClick={() =>
                          {
                            removeSpecificCartItem(userId, product?.productId)
                            .then(() => {getProductInCart(userId)})
                            .catch((err) => {console.log(err)})
                          }
                        }
                          className="rounded-full group flex items-center justify-center focus-within:outline-red-500">
                          <svg width={34} height={34} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle
                              className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                              cx={17} cy={17} r={17} fill="true" />
                            <path
                              className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                              d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                              stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>

                      <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                        {product?.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <button
                            disabled={product?.quantity === 1}
                            onClick={() =>
                              updateCartProductQuantity(
                                userId,
                                product?.productId,
                                product?.quantity - 1
                              )
                                .then(() => getProductInCart(userId))
                                .catch((err) => console.log(err))
                            }
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>

                          <div>
                            {countLoading && product?.productId === id ? (
                              <i className="fas fa-spinner fa-pulse"></i>
                            ) : (
                              <span>{product?.quantity}</span>
                            )}
                          </div>

                          <button
                            onClick={() =>
                              updateCartProductQuantity(
                                userId,
                                product?.productId,
                                product?.quantity + 1
                              )
                                .then(() => getProductInCart(userId))
                                .catch((err) => console.error(err))
                            }

                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>

                        <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">
                          ${product?.totalPrice}
                        </h6>
                      </div>
                    </div>
                  </div>
                ) : <h2 className="text-3xl text-black font-bold text-center py-20">Cart is empty</h2>}

                <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
                  <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">
                    Total Amount
                  </h5>
                  <div className="flex items-center justify-between gap-5 ">
                    {/* <button className="rounded-full py-2.5 px-3 bg-indigo-50 text-indigo-600 font-semibold text-xs text-center whitespace-nowrap transition-all duration-500 hover:bg-indigo-100">
                      Promo Code?
                    </button> */}
                    <h6 className="font-manrope font-bold text-3xl lead-10 text-indigo-600">
                      ${cart?.cartTotal}
                    </h6>
                  </div>
                </div>

                <div className="max-lg:max-w-lg max-lg:mx-auto">
                  <p className="font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6">
                    Shipping taxes, and discounts calculated at checkout
                  </p>
                  <button onClick={() => navigate("/checkout")} className="rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700 ">
                    Checkout
                  </button>
                </div>
              </div>
            </section>
          ) : (
            <EmptyCart />
          )}
        </div>
      )}
    </>
  );
}
