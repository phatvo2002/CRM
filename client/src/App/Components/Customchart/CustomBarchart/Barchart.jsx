import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const Barchart = ({ data , colorfill , width , height }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={width}
        height={height}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={data?.name} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={data?.name}
          fill="#8884d8"
          activeBar={<Rectangle fill={colorfill} stroke="blue" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
