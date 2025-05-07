import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';
import { Box, Typography, useTheme } from '@mui/material';

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  const theme = useTheme();
  if (active && payload && payload.length) {
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
          {label}
        </Typography>
        {payload.map((entry, index) => (
          <Typography key={index} variant="body2" sx={{ color: entry.stroke }}>
            {`${entry.name}: ${entry.value}`}
          </Typography>
        ))}
      </Box>
    );
  }
  return null;
};

const LineCh = ({
  data,
  dataKey1,
  dataKey2,
  height = 300,
  strokeColor = '#8884d8',
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        height,
        padding: 2,
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} opacity={0.5} />
          <XAxis
            dataKey={dataKey1}
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            axisLine={{ stroke: theme.palette.divider }}
          >
            <Label
              value="Danh mục"
              offset={-10}
              position="insideBottom"
              style={{ fill: theme.palette.text.primary, fontWeight: 'bold' }}
            />
          </XAxis>
          <YAxis
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            axisLine={{ stroke: theme.palette.divider }}
          >
            <Label
              value="Giá trị"
              angle={-90}
              position="insideLeft"
              style={{ fill: theme.palette.text.primary, fontWeight: 'bold', textAnchor: 'middle' }}
            />
          </YAxis>
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: theme.palette.action.hover, strokeWidth: 1 }} />
          <Legend
            formatter={(value) => (
              <span style={{ color: theme.palette.text.primary, fontSize: 14 }}>{value}</span>
            )}
            wrapperStyle={{ paddingTop: 10 }}
          />
          <Line
            type="monotone"
            dataKey={dataKey2}
            stroke={strokeColor}
            strokeWidth={2}
            activeDot={{ r: 8, fill: strokeColor, stroke: theme.palette.primary.dark, strokeWidth: 2 }}
            animationDuration={1000}
            dot={{ r: 4, fill: strokeColor }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LineCh;