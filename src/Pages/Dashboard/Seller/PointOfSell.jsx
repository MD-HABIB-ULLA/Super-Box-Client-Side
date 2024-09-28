import { useEffect } from "react";
import Title from "../../../Components/Common/Title";
import ApexCharts from "apexcharts";
const PointOfSell = () => {
  var options = {
    series: [
      {
        name: "TEAM A",
        type: "area",
        data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33],
      },
      {
        name: "TEAM B",
        type: "line",
        data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43],
      },
    ],
    chart: {
      height: 350,
      type: "line",
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "solid",
      opacity: [0.35, 1],
    },
    labels: [
      "Dec 01",
      "Dec 02",
      "Dec 03",
      "Dec 04",
      "Dec 05",
      "Dec 06",
      "Dec 07",
      "Dec 08",
      "Dec 09 ",
      "Dec 10",
      "Dec 11",
    ],
    markers: {
      size: 0,
    },
    yaxis: [
      {
        title: {
          text: "Series A",
        },
      },
      {
        opposite: true,
        title: {
          text: "Series B",
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
        },
      },
    },
  };
  var options2 = {
    series: [{
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
  }],
    chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      borderRadiusApplication: 'end',
      horizontal: true,
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
      'United States', 'China', 'Germany'
    ],
  }
  };
  useEffect(() => {
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    var chart = new ApexCharts(document.querySelector("#chart2"), options2);
        chart.render();
  }, []);
  return (
    <div>
      <div className="py-10 border-b border-dashed border-gray-600">
        <Title title1={"POS"} title2={"Point Of Sell"} />
      </div>
      <div
        className="p-5"
      >
        <div className="grid grid-cols-2 gap-2">
          <div
            className="w-full  border-black/15 rounded-lg  shadow-lg border  "
            id="chart2"
          ></div>
          <div
            className="w-full  border-black/15  rounded-lg shadow-lg border  "
            id="chart"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PointOfSell;
