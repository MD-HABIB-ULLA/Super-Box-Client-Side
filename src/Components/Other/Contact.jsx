import { FcHome } from "react-icons/fc";
import { PiPhoneCallDuotone } from "react-icons/pi";
import { BiMailSend } from "react-icons/bi";
import Title from "../Common/Title";
const Contact = () => {
  return (
    <div>
      {/* information  */}
      <div>
        <Title title1="any queries?" title2={"contact with us"}></Title>
        <p className="text-center max-w-[35%] mx-auto text-xs text-gray-600 font-light">
          We always want to hear from you! Let us know how we can best help you
          and we'll do our very best.
        </p>

        <div className="container mx-auto flex flex-row px-10 py-10 divide-x-4 ">
          <div className=" flex-1 card-body items-center text-center">
            <FcHome className=" text-5xl" />
            <h2 className="card-title">Location</h2>
            <p className=" text-sm text-gray-500 w-52 font-semibold">
              Anfra Inc, 06 Highley St, Victoria, Germany
            </p>
          </div>

          <div className=" flex-1">
            <div className=" flex-1 card-body items-center text-center">
              <PiPhoneCallDuotone className=" text-5xl" />
              <h2 className="card-title">Call Us</h2>
              <p className=" text-sm text-gray-500 font-semibold">
                Mobile: (+61) - 1990 - 6886{" "}
              </p>
              <p className=" text-sm text-gray-500 font-semibold">
                Hotline: 1800 - 1102
              </p>
            </div>
          </div>
          <div className=" flex-1">
            <div className=" flex-1 card-body items-center text-center">
              <BiMailSend className=" text-5xl" />
              <h2 className="card-title">Mail Us</h2>
              <p className=" text-sm text-gray-500 font-semibold">
                Info : ask@domain.com{" "}
              </p>
              <p className=" text-sm text-gray-500 font-semibold">
                Support : wearehere@domain.com
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* form */}
      <div className=" max-w-5xl mx-auto px-10 py-10">
        <form  method="dialog">
          {/* if there is a button in form, it will close the modal */}
          {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button> */}
          <div className="flex flex-row mb-6 gap-5">
            <div className=" flex-1">
              {/* <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label> */}
              <input
                type="text"
                name="from_name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div className=" flex-1">
              {/* <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label> */}
              <input
                type="email"
                name="from_email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
              />
            </div>
          </div>
          <div className="mb-6">
            {/* <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label> */}
            <textarea
              id="message"
              name="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50  border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
            ></textarea>
          </div>
          <button
            type="submit"
            value="Send"
            className="text-white bg-gray-700 hover:bg-gray-800 w-full focus:ring-4 focus:ring-gray-300 font-medium  text-sm px-5 py-2.5 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 block"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
