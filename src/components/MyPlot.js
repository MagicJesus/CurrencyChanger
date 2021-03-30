import React from "react";
import { Bar } from "react-chartjs-2";

const MyPlot = ({ data, code }) => {
  let dates = [];
  let mids = [];

  data.forEach((data) => {
    dates.push(data.effectiveDate);
    mids.push(data.mid);
  });

  const plotData = {
    labels: dates,
    datasets: [
      {
        label: code,
        data: mids,
        fill: true,
        backgroundColor: "rgb(75, 218, 31)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        showLine: true,
        pointRadius: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
    },
  };
  return <Bar data={plotData} width={750} height={400} options={options} />;
};

export default MyPlot;
