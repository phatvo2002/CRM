import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { Grid, Paper, Typography } from "@mui/material";

export const RevenueChart = () => {
  const monthlyRevenueData = [
    { month: 1, revenue: 500 },
    { month: 2, revenue: 550 },
    { month: 3, revenue: 600 },
    { month: 4, revenue: 650 },
    { month: 5, revenue: 700 },
    { month: 6, revenue: 750 },
    { month: 7, revenue: 800 },
    { month: 8, revenue: 850 },
    { month: 9, revenue: 900 },
    { month: 10, revenue: 950 },
    { month: 11, revenue: 1000 },
    { month: 12, revenue: 1100 },
  ];

  const revenueGrowthData = [
    { month: 1, growth: 5 },
    { month: 2, growth: 10 },
    { month: 3, growth: 8 },
    { month: 4, growth: 12 },
    { month: 5, growth: 7 },
    { month: 6, growth: 9 },
    { month: 7, growth: 15 },
    { month: 8, growth: 10 },
    { month: 9, growth: 13 },
    { month: 10, growth: 8 },
    { month: 11, growth: 12 },
    { month: 12, growth: 20 },
  ];

  const revenueForecastData = [
    { month: "Jan", forecast: 600 },
    { month: "Feb", forecast: 650 },
    { month: "Mar", forecast: 700 },
    { month: "Apr", forecast: 750 },
    { month: "May", forecast: 800 },
    { month: "Jun", forecast: 850 },
    { month: "Jul", forecast: 900 },
    { month: "Aug", forecast: 950 },
    { month: "Sep", forecast: 1000 },
    { month: "Oct", forecast: 1050 },
    { month: "Nov", forecast: 1100 },
    { month: "Dec", forecast: 1150 },
  ];

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {/* Hàng 1: 2 biểu đồ */}
      <Grid item xs={6}>
        {/* Biểu đồ 1: Doanh thu hàng tháng */}
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography
            variant="h6"
            sx={{ marginBottom: 2, textAlign: "center" }}
          >
            Doanh thu hàng tháng
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item xs={6}>
        {/* Biểu đồ 2: Tăng trưởng doanh thu */}
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography
            variant="h6"
            sx={{ marginBottom: 2, textAlign: "center" }}
          >
            Tăng trưởng doanh thu
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenueGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="growth"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Hàng 2: Biểu đồ 3 */}
      <Grid item xs={12}>
        <Paper
          elevation={3}
          sx={{ padding: 2, maxWidth: "600px", margin: "0 auto" }}
        >
          <Typography
            variant="h6"
            sx={{ marginBottom: 2, textAlign: "center" }}
          >
            Dự báo doanh thu
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenueForecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#FF8042"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};
