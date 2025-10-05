import { useParams, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { OrderContext } from "../../context/OrdersContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFingerprint } from "react-icons/fa";

export default function OrderConfirmation() {
    const { orderId } = useParams();
    const { orderDetails, getOrderDetails, mainLoading } =
        useContext(OrderContext);

    useEffect(() => {
        getOrderDetails(orderId);
    }, [orderId]);

    if (mainLoading || !orderDetails) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-medium">جاري تحميل تفاصيل الطلب...</p>
            </div>
        );
    }

    // 📄 تحميل الفاتورة كـ PDF
    const downloadReceipt = () => {
        const doc = new jsPDF();

        // ✅ Header (BASMA + بصمة)
        doc.setFontSize(20);
        doc.setTextColor(91, 33, 182); // purple
        doc.text("🖐 BASMA", 14, 20);

        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text("Order Receipt", 14, 30);
        doc.text(`Order ID: #${orderDetails.orderId}`, 14, 38);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 46);

        // ✅ Customer Info
        if (orderDetails.shipping) {
            doc.setFontSize(11);
            doc.setTextColor(40);
            doc.text("Shipping Details:", 14, 58);
            doc.text(`${orderDetails.shipping.recipientName}`, 14, 66);
            doc.text(`${orderDetails.shipping.addressLine1}, ${orderDetails.shipping.city}`, 14, 72);
            doc.text(`${orderDetails.shipping.country}`, 14, 78);
        }

        // ✅ Table (Products)
        autoTable(doc, {
            startY: 90,
            head: [["#", "Product", "Qty", "Price", "Total"]],
            body: orderDetails.items?.map((item, index) => [
                index + 1,
                item.productName,
                item.quantity,
                `EGP ${item.price}`,
                `EGP ${(item.price * item.quantity).toFixed(2)}`
            ]),
            theme: "striped",
            headStyles: {
                fillColor: [91, 33, 182], // purple
                textColor: 255,
                halign: "center",
            },
            bodyStyles: { halign: "center" },
        });

        // ✅ Totals
        const finalY = doc.lastAutoTable.finalY + 10;
        doc.setFontSize(13);
        doc.setTextColor(0);
        doc.text(`Total Amount: EGP ${orderDetails.totalAmount?.toFixed(2)}`, 14, finalY);

        // ✅ Footer
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("Thank you for shopping with BASMA 💜", 14, finalY + 10);

        doc.save(`order-${orderDetails.orderId}.pdf`);
    };


    return (
        <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl my-20 overflow-hidden border border-gray-200">
            {/* 🖐️ موقع BASMA */}
            <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 py-4">
                <FaFingerprint className="text-white text-2xl" />
                <h1 className="text-2xl font-bold text-white tracking-wide">BASMA STORE</h1>
            </div>

            {/* ✅ Header */}
            <div className="text-center p-6 border-b">
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-green-100 mb-3">
                    <span className="text-3xl text-green-600">✔</span>
                </div>
                <h1 className="text-xl font-bold text-gray-800">تم تأكيد طلبك</h1>
                <p className="text-gray-500 text-sm mt-2">
                    سوف يتم التواصل معكم هاتفياً لتأكيد طلبكم خلال 24 ساعة.
                </p>
                <p className="text-sm text-red-500 mt-1 font-medium">
                    يرجى الرد على الأرقام الغير مسجلة لضمان تأكيد طلبكم
                </p>
                <p className="mt-3 text-gray-700 text-sm">
                    رقم الطلب:{" "}
                    <span className="font-semibold">#{orderDetails.orderId}</span>
                </p>
            </div>

            {/* ✅ Order Summary */}
            <div className="p-6">
                <h2 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                    🛍 ملخص الطلب
                </h2>
                <div className="space-y-4">
                    {orderDetails.items?.map((item) => (
                        <div
                            key={item.orderItemId}
                            className="flex items-center border rounded-lg p-4 gap-4 hover:shadow-md transition"
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.productName}
                                className="w-20 h-20 rounded-lg object-cover border"
                            />
                            <div className="flex-1">
                                <p className="font-medium text-gray-800">{item.productName}</p>
                                <p className="text-sm text-gray-500">الكمية: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-purple-600">
                                EGP {(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* ✅ Totals */}
                <div className="border-t mt-6 pt-4 text-gray-700 text-sm">
                    <p className="flex justify-between font-bold text-lg text-gray-900">
                        <span>الإجمالي</span>
                        <span>EGP {orderDetails.totalAmount?.toFixed(2)}</span>
                    </p>
                </div>
            </div>

            {/* ✅ Actions */}
            <div className="text-center p-6 border-t flex flex-col gap-3">
                <button
                    onClick={downloadReceipt}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
                >
                    📄 تحميل الفاتورة
                </button>
                <Link
                    to="/"
                    className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg shadow hover:bg-gray-200 transition"
                >
                    ⬅ العودة للرئيسية
                </Link>
            </div>
        </div>
    );
}
