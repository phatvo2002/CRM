import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Box, Typography, Stack, useTheme } from '@mui/material';

// Modern color palette
const COLORS = ['#1976d2', '#4caf50', '#ff9800', '#f44336', '#7b1fa2', '#212121'];

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  const theme = useTheme();
  if (active && payload && payload.length) {
    const { name, value, percent } = payload[0];
    return (
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          padding: 1.5,
          boxShadow: theme.shadows[3],
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          Giá trị: {value}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          Tỷ lệ: {(percent * 100).toFixed(1)}%
        </Typography>
      </Box>
    );
  }
  return null;
};

const Piechart = ({ data, height = 300, dataKey, fill }) => {
  const theme = useTheme();
  const total = data.reduce((acc, item) => acc + item[dataKey], 0);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: 2,
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
      }}
    >
      {/* Pie Chart */}
      <Box sx={{ width: '60%' }}>
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              dataKey={dataKey}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill={fill || COLORS[0]}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              labelLine={{ stroke: theme.palette.text.secondary, strokeWidth: 1 }}
              animationDuration={800}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  style={{ outline: 'none' }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Custom Legend */}
      <Box sx={{ width: '40%', pl: 3 }}>
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.text.primary }}
        >
          Chi tiết
        </Typography>
        <Stack spacing={1.5}>
          {data.map((entry, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                padding: 0.5,
                borderRadius: theme.shape.borderRadius,
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  backgroundColor: COLORS[index % COLORS.length],
                  borderRadius: '50%',
                  border: `1px solid ${theme.palette.divider}`,
                }}
              />
              <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                {entry.name}: {entry[dataKey]} ({((entry[dataKey] / total) * 100).toFixed(1)}%)
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Piechart;