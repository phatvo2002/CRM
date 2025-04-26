import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StackedBarChart = ({data , dataKeyName , dataKey1 , dataKey2 , dataKey3 , height}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={dataKeyName} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={dataKey1} stackId="a" fill="#b23c17" />
      <Bar dataKey={dataKey2} stackId="a" fill="#ff5722" />
      <Bar dataKey={dataKey3} stackId="a" fill="#ff784e" />
    </BarChart>
  </ResponsiveContainer>
  )
}

export default StackedBarChart