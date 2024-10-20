// MyApexChart.js
import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const MyApexChart = () => {
  // Define the chart options
  const [chartOptions] = useState({
    chart: {
      id: 'basic-area', // updated chart ID
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    title: {
      text: 'Monthly Sales Data',
      align: 'center',
      style: {
        fontSize: '18px',
      },
    },
  });

  // Define the chart data
  const [chartData] = useState([
    {
      name: 'Sales',
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 110],
    },
  ]);

  return (
    <div>
      <Chart
        options={chartOptions}
        series={chartData}
        type="area" // Updated to area chart
        width="600"
      />
    </div>
  );
};

export default MyApexChart;
