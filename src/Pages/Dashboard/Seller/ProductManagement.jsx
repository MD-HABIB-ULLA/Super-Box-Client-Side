import React, { useContext } from "react";
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
  console.log(products);
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
          document.getElementById("my_modal_2").close();
        });
      });
  };
  const handleDelete = (id) => {
    axiosPublic.delete(`/deleteProduct/${id}`).then((res) => {
      toast.success("successfully deleted");
      refetch();
    });
  };

  return (
    <div className="px-2">
      <div className="mt-10 ">
        <Title title1={"BY YOUR PREFERENCE"} title2={"Your Products"} />
        <div className="flex justify-end">
          <button
            onClick={() => {
              document.getElementById("my_modal_2").showModal();
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
                  <td className="font-medium">{product.name}</td>
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
                      <button className="btn btn-sm btn-primary" title="Edit">
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
      <dialog id="my_modal_2" className="modal">
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
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">Press ESC key or click outside to close</p>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
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
