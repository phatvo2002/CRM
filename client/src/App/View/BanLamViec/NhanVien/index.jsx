import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PersonIcon from "@mui/icons-material/Person";
import PaidIcon from "@mui/icons-material/Paid";
import AssignmentIcon from "@mui/icons-material/Assignment";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Autocomplete, Grid2, Paper, Stack, TextField } from "@mui/material";
import { Grid } from "@mui/joy";
const BanLamViecNhanVien = () => {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];
  const revenueData = [
    { month: "Jan 2025", closedValue: 1200000, wonDeals: 5 },
    { month: "Feb 2025", closedValue: 1500000, wonDeals: 7 },
    { month: "Mar 2025", closedValue: 500000, wonDeals: 5 },
    { month: "Apr 2025", closedValue: 100000, wonDeals: 6 },
    { month: "May 2025", closedValue: 1450000, wonDeals: 6 },
    { month: "Jun 2025", closedValue: 0, wonDeals: 4 },
    { month: "Jul 2025", closedValue: 200000, wonDeals: 5 },
    { month: "Aug 2025", closedValue: 300000, wonDeals: 7 },
    { month: "Sep 2025", closedValue: 250000, wonDeals: 5 },
    { month: "Oct 2025", closedValue: 50000, wonDeals: 1 },
    { month: "Nov 2025", closedValue: 180000, wonDeals: 4 },
    { month: "Dec 2025", closedValue: 120000, wonDeals: 4 },
  ];

  const salesData = [
    { name: "Product A", value: 2400 },
    { name: "Product B", value: 1398 },
    { name: "Product C", value: 9800 },
    { name: "Product D", value: 3908 },
    { name: "Product E", value: 4800 },
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
  // const dataDuDoan = [
  //   { month: "Tháng 1", revenue: 100000000, customers: 500 },
  //   { month: "Tháng 2", revenue: 120000000, customers: 600 },
  //   { month: "Tháng 3", revenue: 110000000, customers: 550 },
  //   { month: "Tháng 4", revenue: 130000000, customers: 650 },
  //   { month: "Tháng 5", revenue: 140000000, customers: 700 },
  // ];

  // KPI data
  const dataKPI = [
    { subject: "Doanh số", A: 120, fullMark: 150 },
    { subject: "Khách hàng mới", A: 98, fullMark: 150 },
    { subject: "Cuộc gọi", A: 86, fullMark: 150 },
    { subject: "Email gửi", A: 99, fullMark: 150 },
    { subject: "Cuộc hẹn", A: 85, fullMark: 150 },
    { subject: "Tư vấn hoàn tất", A: 65, fullMark: 150 },
  ];

  const taskData = [
    { name: "Hoàn thành đúng hạn", value: 18 },
    { name: "Trễ hạn", value: 4 },
    { name: "Đang thực hiện", value: 8 },
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
              <Card
                sx={{
                  backgroundColor: "#5a76f2",
                  flex: 1,
                  minWidth: 200,
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <ShowChartIcon
                    style={{ color: "#fff" }}
                    className="text-3xl"
                  />
                  <div style={{ color: "#fff" }}>
                    <h3 className="text-lg font-bold">
                      Doanh số theo tháng/quý
                    </h3>
                    <p className="text-2xl font-semibold">25000$</p>
                  </div>
                </CardContent>
              </Card>
              <Card
                sx={{
                  backgroundColor: "#37c8a1",
                  flex: 1,
                  minWidth: 200,
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <PersonIcon
                    style={{ color: "#fff" }}
                    className="text-green-500 text-3xl"
                  />
                  <div style={{ color: "#fff" }}>
                    <h3 className="text-lg font-bold">
                      Số lượng khách hàng mới
                    </h3>
                    <p className="text-2xl font-semibold">350</p>
                  </div>
                </CardContent>
              </Card>
              <Card
                sx={{
                  backgroundColor: "#f28c5a",
                  flex: 1,
                  minWidth: 200,
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <AssignmentIcon
                    style={{ color: "#fff" }}
                    className="text-yellow-500 text-3xl"
                  />
                  <div style={{ color: "#fff" }}>
                    <h3 className="text-lg font-bold">
                      Số lượng công việc đang xử lý
                    </h3>
                    <p className="text-2xl font-semibold">5</p>
                  </div>
                </CardContent>
              </Card>
            </Stack>
          </Grid2>
          <Grid2 size={6} sx={{ padding: 2 }}>
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">Doanh thu theo tháng</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="closedValue"
                      stroke="#0077b6"
                      activeDot={{ r: 8 }}
                      name="Doanh số"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="wonDeals"
                      stroke="#d62828"
                      activeDot={{ r: 8 }}
                      name="Deal thành công"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid2>
          {/* Sales Chart */}
          <Grid2 size={6} sx={{ padding: 2 }}>
            <Card>
              <CardContent>
                <h3 className="text-lg font-bold mb-2">
                  Doanh số theo sản phẩm
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={salesData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      label
                    >
                      {salesData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={6} sx={{ padding: 2 }}>
            <Card>
              <CardContent>
                <h3 className="text-lg font-bold mb-2">Công việc trong tuần</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={taskData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={140}
                      label
                    >
                      {taskData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={["#00C49F", "#FF8042", "#0088FE"][index % 3]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={6} sx={{ padding: 2 }}>
            <Card>
              <CardContent>
                <h3 className="text-lg font-bold mb-2">KPI Cá Nhân</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={dataKPI}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Tooltip />
                    <Radar
                      name="Nhân viên A"
                      dataKey="A"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Paper>
    </>
  );
};

export default BanLamViecNhanVien;
