import React from "react";
import Plot from "react-plotly.js";

const MyPlot = ({ data, code }) => {
  let dates = [];
  let mids = [];

  data.forEach((data) => {
    dates.push(data.effectiveDate);
    mids.push(data.mid);
  });
  return (
    <Plot
      data={[{ x: dates, y: mids, type: "scatter" }]}
      layout={{ width: 750, height: 400, title: code + " exchange rates" }}
    />
  );
};

export default MyPlot;
