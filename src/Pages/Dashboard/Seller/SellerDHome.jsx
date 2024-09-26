import { useContext, useEffect } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import ApexCharts from "apexcharts";
const SellerDHome = () => {
  // chart
  var options = {
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    colors: ['#593C90', '#ED7725']
  };

  useEffect(() => {
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }, []);
  const { data } = useContext(WebDataDisContext);

  const url = `${window.location.origin}/w/${data?.webInfo.shopName}`;
  console.log(url);
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <div className="p-4">
      {/* banner section */}
      <div
        className=" px-10 py-20 w-full bg-cover bg-no-repeat rounded-3xl "
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/L9MZVQK/63c1e3cbf449c603aa920ffc-63b942267ee4c772e9e1c7b2-banner-main-2x-p-500.png)",
        }}
      >
        <div className=" w-full">
          <label className="label w-full  text-center">
            <span className="label-text  text-center w-full text-5xl mb-2 capitalize font-bold text-white">
              Here is your website URL
            </span>
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter URL here"
          />
        </div>
        <div>
          <div className="flex  w-full gap-4">
            <div className="w-full">
              <a
                href={url}
                target="_blank"
                className="btn bg-transparent border text-white text-xl font-bold hover:bg-transparent hover:text-2xl duration-500 t mt-4 w-full"
              >
                Preview
              </a>
            </div>
            <div className="w-full">
              <button
                onClick={copyToClipboard}
                className="btn bg-transparent border text-white text-xl font-bold hover:bg-transparent hover:text-2xl duration-500 t mt-4 w-full"
              >
                Copy URL
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-10 px-2 gap-3">
        {/* customer */}
        <div className="shadow-2xl rounded-xl px-3 py-5 space-y-2 border-[1px] border-black/15">
          <div>
            <p className="text-black font-bold"> All Customers</p>
          </div>
          <div className="flex w-full items-center justify-start ">
            <div className="flex -space-x-2">
              <a
                href="#"
                className="relative inline-flex h-14 w-14 items-center justify-center rounded-full text-white"
              >
                <img
                  src="https://i.pravatar.cc/40?img=31"
                  alt="user name"
                  title="user name"
                  width="60"
                  height="60"
                  className="max-w-full rounded-full border-2 border-white"
                />
              </a>
              <a
                href="#"
                className="relative inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-yellow-500 text-white"
              >
                JL
              </a>
              <a
                href="#"
                className="relative inline-flex h-14 w-14 items-center justify-center rounded-full text-white"
              >
                <img
                  src="https://i.pravatar.cc/40?img=33"
                  alt="user name"
                  title="user name"
                  width="60"
                  height="60"
                  className="max-w-full rounded-full border-2 border-white"
                />
              </a>
              <a
                href="#"
                className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500 text-lg text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-labelledby="title-01 desc-01"
                  role="graphics-symbol"
                >
                  <title id="title-01">User Icon</title>
                  <desc id="desc-01">
                    User icon associated with a particular user account
                  </desc>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="relative inline-flex h-14 w-14 items-center justify-center rounded-full text-white"
              >
                <img
                  src="https://i.pravatar.cc/40?img=34"
                  alt="user name"
                  title="user name"
                  width="60"
                  height="60"
                  className="max-w-full rounded-full border-2 border-white"
                />
              </a>
              <a
                href="#"
                className="relative inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-sm text-slate-500"
              >
                +4
              </a>
            </div>
          </div>
        </div>
        {/* notifications */}
        <div className="shadow-2xl rounded-xl px-3 py-5 space-y-2 border-[1px] border-black/15">
          <div>
            <p className="text-black font-bold"> All notifications</p>
          </div>
          <div className="flex w-full items-center justify-start ">
            <div className="flex gap-2">
              <a
                href="#"
                className="relative inline-flex items-center justify-center h-14 w-14 text-lg text-white rounded-full bg-yellow-500"
              >
                <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 px-1.5 text-sm text-white">
                  2<span className="sr-only"> new emails </span>
                </span>
                <img
                  src="https://i.pravatar.cc/40?img=33"
                  alt="user name"
                  title="user name"
                  width="60"
                  height="60"
                  className="max-w-full rounded-full border-2 border-white"
                />
              </a>
              <a
                href="#"
                className="relative inline-flex items-center justify-center h-14 w-14 text-lg text-white rounded-full bg-yellow-500"
              >
                <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 px-1.5 text-sm text-white">
                  4<span className="sr-only"> new emails </span>
                </span>
                <img
                  src="https://i.pravatar.cc/40?img=31"
                  alt="user name"
                  title="user name"
                  width="60"
                  height="60"
                  className="max-w-full rounded-full border-2 border-white"
                />
              </a>
              <a
                href="#"
                className="relative inline-flex items-center justify-center h-14 w-14 text-lg text-white rounded-full bg-yellow-500"
              >
                <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 px-1.5 text-sm text-white">
                  5<span className="sr-only"> new emails </span>
                </span>
                JL
              </a>

              <a
                href="#"
                className="relative inline-flex items-center justify-center h-14 w-14 text-lg text-white rounded-full bg-yellow-500"
              >
                <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 px-1.5 text-sm text-white">
                  4<span className="sr-only"> new emails </span>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-labelledby="title-01 desc-01"
                  role="graphics-symbol"
                >
                  <title id="title-01">User Icon</title>
                  <desc id="desc-01">
                    User icon associated with a particular user account
                  </desc>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="relative inline-flex items-center justify-center h-14 w-14 text-lg text-white rounded-full bg-yellow-500"
              >
                <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 px-1.5 text-sm text-white">
                  1<span className="sr-only"> new emails </span>
                </span>
                <img
                  src="https://i.pravatar.cc/40?img=34"
                  alt="user name"
                  title="user name"
                  width="60"
                  height="60"
                  className="max-w-full rounded-full border-2 border-white"
                />
              </a>
              <a
                href="#"
                className="relative inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-sm text-slate-500"
              >
                +4
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center font-bold">
        <p className="text-4xl py-10 mt-10 capitalize text-center">
          {" "}
          overall growth
        </p>
      </div>

      <div className=" px-10 border  py-3 rounded-lg shadow-xl border-black/15 overflow-hidden">
        <div className="w-full   " id="chart"></div>
      </div>
    </div>
  );
};

export default SellerDHome;
