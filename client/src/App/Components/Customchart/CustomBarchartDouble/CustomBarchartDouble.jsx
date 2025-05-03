import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const CustomBarchartDouble = ({data , dataKey1, dataKey2 , dataKeyName , height}) => {
  return (
    <>
       <ResponsiveContainer width="100%" height={height}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
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
          <Bar dataKey={dataKey1} fill="#8884d8" background={{ fill: '#eee' }} />
          <Bar dataKey={dataKey2} fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default CustomBarchartDouble