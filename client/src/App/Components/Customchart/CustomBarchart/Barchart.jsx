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

 const Barchart = ({ data , colorfill , height , dataKey , fill }) => {
  return (
    <ResponsiveContainer width="100%" height={height || 300}>
      <BarChart
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
        <XAxis  dataKey="name"/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={dataKey}
          fill={fill}
          activeBar={<Rectangle fill={colorfill} stroke="blue" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart
