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
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  CartesianGrid,
  Bar,
} from "recharts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import AssignmentIcon from "@mui/icons-material/Assignment";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Autocomplete, Grid2, Paper, Stack, TextField } from "@mui/material";
import { Grid } from "@mui/joy";
import CustomDatagrid from "src/App/Components/DataGrid/CustomDatagrid";
import { useState } from "react";
const BanLamViecTrPhong = () => {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
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
  const dataNV = [
    {
      ten: "Võ Đăng Phát",
      phongBan: "Phòng Kinh doanh 1",
      doanhThu: 2500,
      dealThanhCong: 10,
      hopDong: 150,
      khachHangMoi: 75,
    },
    {
      ten: "Cao Anh Quân",
      phongBan: "Phòng kinh doanh 2",
      doanhThu: 1800,
      dealThanhCong: 15,
      hopDong: 120,
      khachHangMoi: 60,
    },
    {
      ten: "Lê Cường",
      phongBan: "Phòng kinh doanh 3",
      doanhThu: 1200,
      dealThanhCong: 20,
      hopDong: 90,
      khachHangMoi: 45,
    },
  ];

  // KPI data
  const dataKpi = [
    {
      name: "Võ Đăng Phát",
      personalKPI: 92,
      teamKPI: 88,
    },
    {
      name: "Cao Anh Quân",
      personalKPI: 75,
      teamKPI: 82,
    },
    {
      name: "Lê Cường",
      personalKPI: 98,
      teamKPI: 95,
    },
  ];

  const taskData = [
    { name: "Hoàn thành đúng hạn", value: 18 },
    { name: "Trễ hạn", value: 4 },
    { name: "Đang thực hiện", value: 8 },
  ];

  const columns = [
    {
      field: "hoVaDem",
      headerName: "Họ và đệm",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "ten",
      headerName: "Tên nhân viên",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "chucVu",
      headerName: "Chức vụ",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "sokh",
      headerName: "Số lượng khách hàng đã chăm sóc",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "dealthanhcong",
      headerName: "Deal thành công",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "doanhso",
      headerName: "Doanh số mang về",
      width: 210,
      headerAlign: "center",
    },
    {
      field: "xephang",
      headerName: "Xếp hạng đánh giá",
      width: 210,
      headerAlign: "center",
    },
  ];

  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRow(selectedRows);
  };

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
                  <CallIcon
                    style={{ color: "#fff" }}
                    className="text-yellow-500 text-3xl"
                  />
                  <div style={{ color: "#fff" }}>
                    <h3 className="text-lg font-bold">
                      Tổng cuộc gọi đã thực hiện trong tháng
                    </h3>
                    <p className="text-2xl font-semibold">5</p>
                  </div>
                </CardContent>
              </Card>
            </Stack>
          </Grid2>

          <Grid2 size={12} sx={{ padding: 2 }}>
            <h2>DANH SÁCH NHÂN VIÊN TIÊU BIỂU</h2>
            <p>Quản lý danh sách nhân viên tiêu biểu của LPCRM</p>
            <CustomDatagrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[10, 25, 50]}
              initialPageSize={25}
              //   checkboxSelection={true}
              showTopToolbar={true}
              onRowSelectionChange={handleRowSelectionChange}
            />
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
                <h3 className="text-lg font-bold mb-2">Hiệu suất nhân viên</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={dataNV}
                    barCategoryGap="20%"
                    barGap={5}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ten" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="dealThanhCong"
                      fill="#8884d8"
                      name="Deal thành công"
                    />
                    <Bar
                      dataKey="doanhThu"
                      fill="#82ca9d"
                      name="Doanh thu ($)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={6} sx={{ padding: 2 }}>
            <Card>
              <CardContent>
                <h3 className="text-lg font-bold mb-2">Tiến độ công việc</h3>
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
                <h3 className="text-lg font-bold mb-2">KPI nhân viên</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={dataKpi}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis unit="%" domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="personalKPI"
                      fill="#8884d8"
                      name="KPI Cá nhân"
                    />
                    <Bar dataKey="teamKPI" fill="#82ca9d" name="KPI Nhóm" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Paper>
    </>
  );
};

export default BanLamViecTrPhong;
