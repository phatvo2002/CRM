import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Box, Typography, Stack } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Piechart = ({ data, height = 300, dataKey = 'value', fill }) => {
  const total = data.reduce((acc, item) => acc + item[dataKey], 0);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <ResponsiveContainer width="60%" height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill={fill || COLORS[0]}
            label={({ name, percent }) =>
              `${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Custom Legend */}
      <Box sx={{ width: '40%' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Chi tiết</Typography>
        <Stack spacing={1}>
          {data.map((entry, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  backgroundColor: COLORS[index % COLORS.length],
                  borderRadius: '50%',
                }}
              />
              <Typography>
                {entry.name}: {entry[dataKey].toLocaleString()} ({((entry[dataKey] / total) * 100).toFixed(1)}%)
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Piechart;
