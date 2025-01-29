import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PersonIcon from "@mui/icons-material/Person";
import PaidIcon from "@mui/icons-material/Paid";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Autocomplete, Grid2, Paper, Stack, TextField } from "@mui/material";
import { Grid } from "@mui/joy";
const BanLamViec = () => {
  const revenueData = [
    { month: "Tháng 1", revenue: 12000 },
    { month: "Tháng 2", revenue: 18000 },
    { month: "Tháng 3", revenue: 15000 },
    { month: "Tháng 4", revenue: 22000 },
    { month: "Tháng 5", revenue: 25000 },
  ];

  const salesData = [
    { name: "Product A", value: 400 },
    { name: "Product B", value: 300 },
    { name: "Product C", value: 200 },
  ];
  const years = [
    {
      id: "2020",
      name: "2020",
    },
    {
      id: "2021",
      name: "2021",
    },
    {
      id: "2022",
      name: "2022",
    },
    {
      id: "2023",
      name: "2023",
    },
    {
      id: "2025",
      name: "2025",
    },
    {
      id: "2026",
      name: "2026",
    },
    {
      id: "2027",
      name: "2027",
    },
  ];
  const data = [
    {
      phongBan: "Phòng Kinh doanh 1",
      doanhThu: 2500,
      hopDong: 150,
      khachHangMoi: 75,
    },
    {
      phongBan: "Phòng kinh doanh 2",
      doanhThu: 1800,
      hopDong: 120,
      khachHangMoi: 60,
    },
    {
      phongBan: "Phòng kinh doanh 3",
      doanhThu: 1200,
      hopDong: 90,
      khachHangMoi: 45,
    },
  ];
  const dataDuDoan = [
    { month: "Tháng 1", revenue: 100000000, customers: 500 },
    { month: "Tháng 2", revenue: 120000000, customers: 600 },
    { month: "Tháng 3", revenue: 110000000, customers: 550 },
    { month: "Tháng 4", revenue: 130000000, customers: 650 },
    { month: "Tháng 5", revenue: 140000000, customers: 700 },
  ];

  return (
    <>
      <Paper>
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Autocomplete
                disablePortal
                options={years}
                style={{ margin: 15 }}
                sx={{ width: 100 }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Năm" />}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker label="Từ ngày" defaultValue={dayjs().date(1)} />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Dến ngày"
                    defaultValue={dayjs().endOf("month")}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Button variant="contained">Lọc</Button>
            </Stack>
          </Grid2>
          <Grid2 size={12} sx={{ padding: 2 }}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between" // Căn đều khoảng cách giữa các Card
            >
              <Card sx={{ flex: 1, minWidth: 200, textAlign: "center" }}>
                <CardContent>
                  <ShowChartIcon className="text-blue-500 text-3xl" />
                  <div>
                    <h3 className="text-lg font-bold">Doanh thu</h3>
                    <p className="text-2xl font-semibold">$25,000</p>
                  </div>
                </CardContent>
              </Card>
              <Card sx={{ flex: 1, minWidth: 200, textAlign: "center" }}>
                <CardContent>
                  <PersonIcon className="text-green-500 text-3xl" />
                  <div>
                    <h3 className="text-lg font-bold">Khách hàng mới</h3>
                    <p className="text-2xl font-semibold">350</p>
                  </div>
                </CardContent>
              </Card>
              <Card sx={{ flex: 1, minWidth: 200, textAlign: "center" }}>
                <CardContent>
                  <PaidIcon className="text-yellow-500 text-3xl" />
                  <div>
                    <h3 className="text-lg font-bold">Hợp đồng mới</h3>
                    <p className="text-2xl font-semibold">15</p>
                  </div>
                </CardContent>
              </Card>
            </Stack>
          </Grid2>
          <Grid2 size={6} sx={{ padding: 1 }}>
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">Doanh thu theo tháng</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid2>
          {/* Sales Chart */}
          <Grid2 size={6} sx={{ padding: 1 }}>
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">
                  Doanh số theo sản phẩm
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={salesData} dataKey="value" outerRadius={80}>
                      {salesData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={["#0088FE", "#00C49F", "#FFBB28"][index % 3]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={12} sx={{ padding: 3 }}>
            <Card>
              <CardContent>
                <h3 className="text-lg font-bold mb-2">
                  Doanh số theo từng phòng ban
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart width={600} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="phongBan" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="doanhThu" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={12} sx={{ padding: 3 }}>
            <Card>
              <CardContent>
                <h3 className="text-lg font-bold mb-2">Dự đoán doanh thu</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={dataDuDoan}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="customers"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Paper>
    </>
  );
};

export default BanLamViec;
