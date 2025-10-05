import { useContext, useEffect } from "react";
import { OrderContext } from "../../context/OrdersContext";
import { CartContext } from "../../context/CartContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const { checkoutSession, mainLoading } = useContext(OrderContext);
  const { cart } = useContext(CartContext);

  const formik = useFormik({
    initialValues: {
      recipientName: "",
      details: "",
      phone: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      notes: "",
    },
    onSubmit: async (values) => {
      const order = await checkoutSession(values, cart?.items);
      
      if (order?.orderId) {
        navigate(`/order-confirmation/${order.orderId}`);
      }
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fields = [
    { id: "recipientName", label: "Recipient Name", type: "text" },
    { id: "details", label: "Details (Main Address)", type: "text" },
    { id: "addressLine2", label: "Address Line 2 (Optional)", type: "text" },
    { id: "city", label: "City", type: "text" },
    { id: "state", label: "State / Province", type: "text" },
    { id: "postalCode", label: "Postal Code", type: "text" },
    { id: "country", label: "Country", type: "text" },
    { id: "phone", label: "Phone", type: "tel" },
    { id: "notes", label: "Notes (Optional)", type: "text" },
  ];

  return (
    <div className="py-10 w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 space-y-6"
      >
        {fields.map((field) => (
          <div key={field.id} className="flex flex-col">
            <label
              htmlFor={field.id}
              className="mb-2 text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              name={field.id}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values[field.id]}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={mainLoading || cart?.length === 0} // ✅ تمنع الدفع لو الكارت فاضي
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
        >
          {mainLoading ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
}
