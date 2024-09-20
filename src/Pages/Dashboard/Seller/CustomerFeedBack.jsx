import Title from "../../../Components/Common/Title";


const CustomerFeedBack = () => {
    return (
        <div className="grid grid-cols-2 gap-2">
                 <div className="pt-10 mt-10 bg-green-50">
            <Title title1={''} title2={'Review'}></Title>

            <div className="overflow-x-auto table-sm mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Product</th>
                            <th>Customer Review</th>

                        </tr>
                    </thead>
                    <tbody className="space-y-4">
                        {/* row 1 */}
                        <tr>

                            <td>
                                <div className="flex flex-col items-start">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div className="">
                                        <p>Zemlak, Daniel and Leannon<br />
                                            <span className="badge badge-ghost bg-gray-300">Details</span></p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex flex-row justify-between items-center">
                                    <h1 className="font-bold mb-2">Hart Hagerty</h1>
                                    <div className="rating rating-sm">
                                        <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                        <input
                                            type="radio"
                                            name="rating-6"
                                            className="mask mask-star-2 bg-orange-400"
                                            defaultChecked />
                                        <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                    </div>
                                </div>
                                <div className="text-sm opacity-60 font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio a, et rerum ipsam doloribus pariatur magni provident necessitatibus animi nulla reiciendis dolor voluptas. Animi, iusto. Inventore tempore quidem omnis dolore.</div>

                            </td>

                        </tr>
                        {/* row 2 */}
                        <tr>

                            <td>
                                <div className="flex flex-col items-start">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src="https://img.daisyui.com/tailwind-css-component-profile-3@56w.png"
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <p>Zemlak, Daniel and Leannon<br />
                                            <span className="badge badge-ghost bg-gray-300 ">Details</span></p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex flex-row justify-between items-center">
                                    <h1 className="font-bold mb-2">Hart Hagerty</h1>
                                    <div className="rating rating-sm">
                                        <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                        <input
                                            type="radio"
                                            name="rating-6"
                                            className="mask mask-star-2 bg-orange-400"
                                            defaultChecked />
                                        <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                    </div>
                                </div>
                                <div className="text-sm opacity-60 font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio a, et rerum ipsam doloribus pariatur magni provident necessitatibus animi nulla reiciendis dolor voluptas. Animi, iusto. Inventore tempore quidem omnis dolore.</div>

                            </td>

                        </tr>
                        {/* row 3 */}
                        <tr>

                            <td>
                                <div className="flex flex-col items-start">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src="https://img.daisyui.com/tailwind-css-component-profile-4@56w.png"
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <p>Zemlak, Daniel and Leannon<br />
                                            <span className="badge badge-ghost bg-gray-300 ">Details</span></p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex flex-row justify-between items-center">
                                    <h1 className="font-bold mb-2">Hart Hagerty</h1>
                                    <div className="rating rating-sm">
                                        <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                        <input
                                            type="radio"
                                            name="rating-6"
                                            className="mask mask-star-2 bg-orange-400"
                                            defaultChecked />
                                        <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                    </div>
                                </div>
                                <div className="text-sm opacity-60 font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio a, et rerum ipsam doloribus pariatur magni provident necessitatibus animi nulla reiciendis dolor voluptas. Animi, iusto. Inventore tempore quidem omnis dolore.</div>

                            </td>

                        </tr>
                        {/* row 4 */}
                        <tr>

                            <td>
                                <div className="flex flex-col items-start">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src="https://img.daisyui.com/tailwind-css-component-profile-5@56w.png"
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <p>Zemlak, Daniel and Leannon<br />
                                            <span className="badge badge-ghost bg-gray-300 ">Details</span></p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex flex-row justify-between items-center">
                                    <h1 className="font-bold mb-2">Hart Hagerty</h1>
                                    <div className="rating rating-sm">
                                        <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                        <input
                                            type="radio"
                                            name="rating-6"
                                            className="mask mask-star-2 bg-orange-400"
                                            defaultChecked />
                                        <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                    </div>
                                </div>
                                <div className="text-sm opacity-60 font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio a, et rerum ipsam doloribus pariatur magni provident necessitatibus animi nulla reiciendis dolor voluptas. Animi, iusto. Inventore tempore quidem omnis dolore.</div>

                            </td>

                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
        <div className="pt-10 mt-10 bg-red-50">
            <Title title1={''} title2={'Complain'}></Title>

            <div className="overflow-x-auto table-sm mt-10 ">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Product</th>
                            <th>Customer Complain</th>

                        </tr>
                    </thead>
                    <tbody className="space-y-4">
                        {/* row 1 */}
                        <tr>

                            <td>
                                <div className="flex flex-col items-start">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div className="">
                                        <p>Zemlak, Daniel and Leannon<br />
                                            <span className="badge badge-ghost bg-gray-300">Details</span></p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex flex-row justify-between items-center">
                                    <h1 className="font-bold mb-2">Hart Hagerty</h1>
                                    <p className="font-bold text-gray-500">Status: Ongoing</p>
                                </div>
                                <div className="text-sm opacity-60 font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio a, et rerum ipsam doloribus pariatur magni provident necessitatibus animi nulla reiciendis dolor voluptas. Animi, iusto. Inventore tempore quidem omnis dolore.</div>

                            </td>

                        </tr>
                        {/* row 2 */}
                        <tr>

                            <td>
                                <div className="flex flex-col items-start">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src="https://img.daisyui.com/tailwind-css-component-profile-3@56w.png"
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <p>Zemlak, Daniel and Leannon<br />
                                            <span className="badge badge-ghost  bg-gray-300">Details</span></p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex flex-row justify-between items-center">
                                    <h1 className="font-bold mb-2">Hart Hagerty</h1>
                                    <p className="font-bold text-gray-500">Status: Solved</p>
                                </div>
                                <div className="text-sm opacity-60 font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio a, et rerum ipsam doloribus pariatur magni provident necessitatibus animi nulla reiciendis dolor voluptas. Animi, iusto. Inventore tempore quidem omnis dolore.</div>

                            </td>

                        </tr>
                        {/* row 3 */}
                        <tr>

                            <td>
                                <div className="flex flex-col items-start">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src="https://img.daisyui.com/tailwind-css-component-profile-4@56w.png"
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <p>Zemlak, Daniel and Leannon<br />
                                            <span className="badge badge-ghost bg-gray-300 ">Details</span></p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex flex-row justify-between items-center">
                                    <h1 className="font-bold mb-2">Hart Hagerty</h1>
                                    <p className="font-bold text-gray-500">Status: Solved</p>
                                </div>
                                <div className="text-sm opacity-60 font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio a, et rerum ipsam doloribus pariatur magni provident necessitatibus animi nulla reiciendis dolor voluptas. Animi, iusto. Inventore tempore quidem omnis dolore.</div>

                            </td>

                        </tr>
                        {/* row 4 */}
                        <tr>

                            <td>
                                <div className="flex flex-col items-start">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src="https://img.daisyui.com/tailwind-css-component-profile-5@56w.png"
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <p>Zemlak, Daniel and Leannon<br />
                                            <span className="badge badge-ghost bg-gray-300 ">Details</span></p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex flex-row justify-between items-center">
                                    <h1 className="font-bold mb-2">Hart Hagerty</h1>
                                    <p className="font-bold text-gray-500">Status: Solved</p>
                                </div>
                                <div className="text-sm opacity-60 font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio a, et rerum ipsam doloribus pariatur magni provident necessitatibus animi nulla reiciendis dolor voluptas. Animi, iusto. Inventore tempore quidem omnis dolore.</div>

                            </td>

                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
        </div>
    );
};

export default CustomerFeedBack;