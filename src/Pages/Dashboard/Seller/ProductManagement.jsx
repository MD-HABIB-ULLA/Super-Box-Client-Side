import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Title from "../../../Components/Common/Title";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Provider/AuthProvider";

const ProductManagement = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const {
    data: products,
    isPending: isRoleLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "products"],
    enabled: !!user?.email,
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosPublic.get(`/products/${user?.email}`);
        return res.data;
      }
    },
  });
  console.log(products);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="px-2">
      <div className="max-w-md mx-auto mt-10 p-5 bg-gray-100 rounded-lg border-b border-dashed ">
        <h2 className="text-2xl font-bold mb-5">Product Management</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
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
              <span className="text-red-500">{errors.productName.message}</span>
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
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              {...register("price", { required: "Price is required", min: 0 })}
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
              {...register("image", { required: "Product image is required" })}
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
      <div className="mt-10 border-t-2 border-dashed ">
        <Title title1={"BY YOUR PREFERENCE"} title2={"Your Products"} />
        <div className="mt-10">
          <div className="grid grid-cols-3 gap-3">
            {products?.map((product) => (
              <div key={product._id} className="card bg-base-100 shadow-xl">
                <figure>
                  <img src={product.image} alt={product.name} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="card-actions justify-end">
                    <span className="text-lg font-bold">${product.price}</span>
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
