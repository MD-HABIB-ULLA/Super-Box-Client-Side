import React, { useContext, useState, useEffect } from "react"
import { WebDataDisContext } from "../../../Context/WebDataDisContext"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../hooks/useAxiosPublic"
import { useNavigate } from "react-router-dom"

export default function Cart() {
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { webCartItem, deleteWebCartItem, name, customerData } = useContext(WebDataDisContext)

  const [quantities, setQuantities] = useState({})

  const shippingCostPerItem = 4.99

  useEffect(() => {
    const initialQuantities = {}
    webCartItem.forEach((item) => {
      initialQuantities[item._id] = 1
    })
    setQuantities(initialQuantities)
  }, [webCartItem])

  const handleQuantityChange = (id, action) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities }
      if (action === "increment") {
        newQuantities[id]++
      } else if (action === "decrement" && newQuantities[id] > 1) {
        newQuantities[id]--
      }
      return newQuantities
    })
  }

  const calculateSubtotal = () => {
    return webCartItem.reduce((total, item) => {
      return total + item.price * quantities[item._id]
    }, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const totalShippingCost = webCartItem.length * shippingCostPerItem
    return subtotal + totalShippingCost
  }

  const handlePayment = (total) => {
    if (customerData.phone !== "") {
      webCartItem.length !== 0 && navigate(`/w/${name}/shipping?type=cart`)
    } else {
      document.getElementById("customerInfo").showModal()
    }
  }

  const onSubmit = async (data) => {
    try {
      const response = await axiosPublic.put(`/customer/${customerData.email}`, data)
      console.log(response.data.message)
    } catch (error) {
      console.error("Error submitting customer info:", error)
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">Your Shopping Cart</h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>
            <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
              {webCartItem.length !== 0 ? (
                webCartItem.map((item) => (
                  <li key={item._id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48" />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <a href="#" className="font-medium text-gray-700 hover:text-gray-800">
                                {item.name}
                              </a>
                            </h3>
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <label htmlFor={`quantity-${item._id}`} className="sr-only">
                            Quantity, {item.name}
                          </label>
                          <div className="flex items-center border-gray-300 rounded-md">
                            <button
                              type="button"
                              className="p-2 text-gray-600 hover:text-gray-500"
                              onClick={() => handleQuantityChange(item._id, "decrement")}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <input
                              id={`quantity-${item._id}`}
                              name={`quantity-${item._id}`}
                              value={quantities[item._id]}
                              onChange={() => {}}
                              className="w-12 text-center border-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            <button
                              type="button"
                              className="p-2 text-gray-600 hover:text-gray-500"
                              onClick={() => handleQuantityChange(item._id, "increment")}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="absolute top-0 right-0">
                            <button
                              type="button"
                              className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                              onClick={() => deleteWebCartItem(item._id)}
                            >
                              <span className="sr-only">Remove</span>
                              <X className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className="text-center py-12">
                  <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                  <p className="mt-1 text-sm text-gray-500">Start adding some items to your cart.</p>
                </div>
              )}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">${calculateSubtotal().toFixed(2)}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">${(webCartItem.length * shippingCostPerItem).toFixed(2)}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">${calculateTotal().toFixed(2)}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="button"
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                onClick={() => handlePayment(calculateTotal().toFixed(2))}
              >
                Checkout
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}