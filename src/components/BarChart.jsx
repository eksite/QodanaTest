import React from "react";
import BarChartData from "./BarChartData.jsx";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  LabelSeries,
} from "react-vis";
import moment from "moment";

const BarChart = () => {
  const data = BarChartData().map((item) => {
    return { x: moment.unix(item.x).format("DD/MM"), y: item.y };
  });
  const maxCompletedTasks = Math.max(...data.map((item) => item.y));
  const chartWidth = 400;
  const chartHeight = 225;
  const chartDomain = [0, maxCompletedTasks > 4 ? maxCompletedTasks + 1 : 5];

  return (
    <XYPlot
      xType="ordinal"
      width={chartWidth}
      height={chartHeight}
      yDomain={chartDomain}
    >
      <XAxis />
      <YAxis />
      <VerticalBarSeries data={data} />
      <LabelSeries
        data={data.map((item) => {
          return { ...item, label: item.y.toString() };
        })}
        labelAnchorX="middle"
        labelAnchorY="text-after-edge"
      />
    </XYPlot>
  );
};

export default BarChart;
