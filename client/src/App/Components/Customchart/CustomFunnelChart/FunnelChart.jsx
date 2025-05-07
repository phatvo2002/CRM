import React from 'react';
import {
  FunnelChart,
  Funnel,
  Cell,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
import { Box, Typography, useTheme } from '@mui/material';

// Modern color palette
const COLORS = ['#1976d2', '#4caf50', '#ff9800', '#f44336', '#7b1fa2', '#0288d1'];

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  const theme = useTheme();
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
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
      </Box>
    );
  }
  return null;
};

const FunnelChartCustom = ({
  data,
  dataKey,
  nameKey,
  fill = COLORS[0],
  height = 400,
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
        <FunnelChart margin={{ top: 20, right: 50, bottom: 20, left: 20 }}>
          <Tooltip content={<CustomTooltip />} />
          <Funnel
            dataKey={dataKey}
            data={data}
            isAnimationActive
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.mauSac || COLORS[index % COLORS.length] || fill}
              />
            ))}
            <LabelList
              position="right"
              fill={theme.palette.text.primary}
              stroke="none"
              dataKey={nameKey}
              style={{ fontSize: 14, fontWeight: 'medium' }}
              formatter={(value) => `${value}`}
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default FunnelChartCustom;