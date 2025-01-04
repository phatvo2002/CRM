import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart, Bar } from "recharts";

const CustomerChart = () => {
  const dataLine = [
    { name: "1", value: 90 },
    { name: "2", value: 74 },
    { name: "3", value: 63 },
    { name: "4", value: 72 },
    { name: "5", value: 68 },
    { name: "6", value: 47 },
    { name: "7", value: 84 },
    { name: "8", value: 66 },
    { name: "9", value: 88 },
    { name: "10", value: 81 },
  ];

  const dataBar = [
    { name: "1", value: 32 },
    { name: "2", value: 38 },
    { name: "3", value: 42 },
    { name: "4", value: 51 },
    { name: "5", value: 53 },
    { name: "6", value: 48 },
    { name: "7", value: 62 },
    { name: "8", value: 60 },
  ];

  const dataHorizontalBar = [
    { name: "KH bán buôn", value: 90 },
    { name: "KH bán sỉ", value: 80 },
    { name: "KH đại lý", value: 80 },
    { name: "KH CTV", value: 70 },
    { name: "KH vãng lai", value: 40 },
  ];

  return (
    <Grid container spacing={2} my={5}>
      {/* Card 1 */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Tăng trưởng khách hàng tạo mới</Typography>
            <Typography variant="h3" sx={{ color: "#000", margin: "8px 0" }}>
              772{" "}
              <span style={{ color: "green", fontSize: "18px" }}>▲ 20%</span>
            </Typography>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={dataLine}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
            <Typography
              variant="body2"
              sx={{ textAlign: "right", color: "blue", cursor: "pointer" }}
            >
              Chi tiết
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Card 2 */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Tăng trưởng KH mua hàng</Typography>
            <Typography variant="h3" sx={{ color: "#000", margin: "8px 0" }}>
              522{" "}
              <span style={{ color: "green", fontSize: "18px" }}>▲ 20%</span>
            </Typography>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={dataBar}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
            <Typography
              variant="body2"
              sx={{ textAlign: "right", color: "blue", cursor: "pointer" }}
            >
              Chi tiết
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Card 3 */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Doanh số KH theo loại KH</Typography>
            <Typography variant="h3" sx={{ color: "#000", margin: "8px 0" }}>
              360 tỷ{" "}
              <span style={{ color: "green", fontSize: "18px" }}>▲ 20%</span>
            </Typography>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart layout="vertical" data={dataHorizontalBar}>
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            <Typography
              variant="body2"
              sx={{ textAlign: "right", color: "blue", cursor: "pointer" }}
            >
              Chi tiết
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CustomerChart;
