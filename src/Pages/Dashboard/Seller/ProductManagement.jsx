import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Title from "../../../Components/Common/Title";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash2, Edit } from "lucide-react";
import { MdAddCircle } from "react-icons/md";
const ProductManagement = () => {
  const { user } = useContext(AuthContext);
  const [productDetails, setProductDetails] = useState(null);
  const axiosPublic = useAxiosPublic();
  console.log(user?.email);
  const {
    data: products,
    isPending: isRoleLoading,
    refetch,
  } = useQuery({
    queryKey: [user.email, "products"],
    enabled: !!user.email,
    queryFn: async () => {
      if (user.email) {
        const res = await axiosPublic.get(`/sellerProducts/${user?.email}`);
        return res.data;
      }
    },
  });
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    // Replace with your imgbb API key
    const imgbbAPIKey = "e9b3cb55e11b48d4142caf366d77cea6";

    try {
      const response = await axiosPublic.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        formData
      );
      return response.data.data.url; // Return the uploaded image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const imageFile = { image: data.image[0] };

    axios
      .post(
        `https://api.imgbb.com/1/upload?key=e9b3cb55e11b48d4142caf366d77cea6`,
        imageFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        const image = res.data.data.display_url;
        const productData = { ...data, image, sellerEmail: user.email };
        console.log(productData);

        axiosPublic.post("/addProducts", productData).then((res) => {
          toast.success("product added ");
          refetch();
          document.getElementById("my_modal_add").close();
        });
      });
  };
  const handleDelete = (id) => {
    axiosPublic.delete(`/deleteProduct/${id}`).then((res) => {
      toast.success("successfully deleted");
      refetch();
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const form = e.target;
    const productName = form.productName.value;
    const description = form.description.value;
    const price = form.price.value;

    let image = productDetails.image;

    // Check if a new image has been uploaded
    if (form.image.files && form.image.files[0]) {
      const imageFile = form.image.files[0];
      console.log(imageFile);

      image = await handleImageUpload(imageFile);

      if (!image) {
        alert("Image upload failed. Please try again.");
        return;
      }
    }
    const data = {
      productName,
      description,
      price,
      image,
    };

    axiosPublic
      .put(`/product/${productDetails._id}`, data)
      .then((response) => {
        toast.success("Product updated successfully!");
        document.getElementById("my_modal_update").close();
        refetch();
        setProductDetails(null)
      })
      .catch((error) => {
        toast.error("Failed to update product.");
        console.error(error);
      });
  };

  return (
    <div className="px-2">
      <div className="mt-10 ">
        <Title title1={"BY YOUR PREFERENCE"} title2={"Your Products"} />
        <div className="flex justify-end">
          <button
            onClick={() => {
              document.getElementById("my_modal_add").showModal();
            }}
            className="flex flex-row items-center gap-1 justify-end text-2xl mt-20 mr-5"
          >
            <MdAddCircle className="text-green-500 text-3xl" />
            Add product
          </button>
        </div>
        <div className="mt-10 overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200">
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id} className="hover">
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="font-medium">{product.productName}</td>
                  <td className="max-w-xs truncate">{product.description}</td>
                  <td className="font-bold">${product.price}</td>
                  <td>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-sm btn-error"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setProductDetails(product);
                          setTimeout(() => {
                            document
                              .getElementById("my_modal_update")
                              .showModal(); // Open the modal after a short delay to ensure state is set
                          }, 100);
                        }}
                        className="btn btn-sm btn-primary"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* add product modal  */}
      <dialog id="my_modal_add" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {/* Product Name */}
            <div className="mb-4">
              <label className="block text-gray-700">Product Name</label>
              <input
                type="text"
                {...register("productName", {
                  required: "Product name is required",
                })}
                className="input input-bordered w-full"
                placeholder="Enter product name"
              />
              {errors.productName && (
                <span className="text-red-500">
                  {errors.productName.message}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className="textarea textarea-bordered w-full"
                placeholder="Enter product description"
              ></textarea>
              {errors.description && (
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                {...register("price", {
                  required: "Price is required",
                  min: 0,
                })}
                className="input input-bordered w-full"
                placeholder="Enter product price"
              />
              {errors.price && (
                <span className="text-red-500">{errors.price.message}</span>
              )}
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-gray-700">Product Image</label>
              <input
                type="file"
                {...register("image", {
                  required: "Product image is required",
                })}
                className="file-input file-input-bordered w-full"
              />
              {errors.image && (
                <span className="text-red-500">{errors.image.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* update product modal  */}

      <dialog id="my_modal_update" className="modal ">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <form onSubmit={(e) => handleUpdate(e)} className="w-full">
            {/* Product Name */}
            <div className="mb-4">
              <label className="block text-gray-700">Product Name</label>
              <input
                type="text"
                name="productName"
                defaultValue={productDetails?.productName}
                className="input input-bordered w-full"
                placeholder="Enter product name"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-700 ">Description</label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full"
                placeholder="Enter product description"
                defaultValue={productDetails?.description}
              ></textarea>
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                defaultValue={productDetails?.price}
                className="input input-bordered w-full"
                placeholder="Enter product price"
              />
            </div>

            {/* Image Upload */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <img
                  src={productDetails?.image}
                  className="rounded-lg"
                  alt=""
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Product Image</label>
                <input
                  type="file"
                  name="image"
                  className="file-input file-input-bordered w-full"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* edit product modal  */}
    </div>
  );
};

export default ProductManagement;
