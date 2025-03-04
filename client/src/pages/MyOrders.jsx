import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)
  console.log(orders)

  return (
    <div className="p-4">
      <div className="bg-white shadow-md p-3 font-semibold text-lg">
        <h1>My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <NoData />
      ) : (
        <div className="mt-4 space-y-4">
          {orders.map((order, index) => (
            <div
              key={order._id + index + "order"}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              {/* Order Info */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Order No:</span> {order?.orderId}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Order Date:</span>{" "}
                    {new Date(order?.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Payment Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded ${
                        order?.payment_status === "CASH ON DELIVERY"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order?.payment_status}
                    </span>
                  </p>
                </div>
                {/* Invoice Button */}
                {order?.invoice_receipt && (
                  <a
                    href={order.invoice_receipt}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                  >
                    View Invoice
                  </a>
                )}
              </div>

              {/* Product List */}
              <div className="mt-3">
                <div className="flex overflow-x-auto gap-3">
                  {order?.product_details?.image?.map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={img}
                      alt={`Product ${imgIndex + 1}`}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                  ))}
                </div>
                <p className="font-medium mt-2">{order?.product_details?.name}</p>
                <p className="text-gray-600">
                  <span className="font-medium">Total Price:</span> ₹{order?.totalAmt?.toFixed(2)}
                </p>
              </div>

              {/* Delivery Address */}
              <div className="mt-3">
                <p className="text-gray-600 font-medium">Delivery Address:</p>
                <p className="text-gray-600 text-sm">
                  {order?.delivery_address?.address_line}, {order?.delivery_address?.city},{" "}
                  {order?.delivery_address?.state} - {order?.delivery_address?.pincode}
                </p>
              </div>

              {/* Order Status */}
              {/* <div className="mt-3">
                <p className="text-gray-600 font-medium">Delivery Status:</p>
                <p
                  className={`text-sm font-medium px-2 py-1 rounded ${
                    order?.payment_status === "CASH ON DELIVERY"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order?.payment_status === "CASH ON DELIVERY"
                    ? "Awaiting Payment on Delivery"
                    : "Paid - Order Confirmed"}
                </p>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyOrders
