import PaidIcon from "@mui/icons-material/Paid";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import {
  Autocomplete,
  Avatar,
  Box,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import LineCh from "src/App/Components/Customchart/CustomLine/LineCh";
import Barchart from "src/App/Components/Customchart/CustomBarchart/Barchart";
import CustomBarchartDouble from "src/App/Components/Customchart/CustomBarchartDouble/CustomBarchartDouble";
import StackedBarChart from "src/App/Components/Customchart/CustomStackedBarChart/StackedBarChart";
import Piechart from "src/App/Components/Customchart/CustomPieChart/Piechart";
import NoImage from "src/App/Assets/image/no-image.png"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  useGetBaoCaoDoanhThuQuery,
  useGetBaoCaoDoanhThuTheoNamQuery,
  useGetBaoCaoDoanhThuTheoPhongBanQuery,
  useGetBaoCaoNguonGocKhachHangQuery,
  useGetBaoCaoSoSanhMucTieuDoanhSoQuery,
  useGetBaoCaoTheoCoHoiQuery,
  useGetBaoCaoTop5NhanVienCoDoanhThuCaoNhatQuery,
  useGetBaoCaoTop5NhanVienSuatSacNhatQuery,
} from "src/App/Api/BaoCao.api";
import FunnelChartCustom from "src/App/Components/Customchart/CustomFunnelChart/FunnelChart";

const userData = JSON.parse(localStorage.getItem("authorizationData"));
const BanLamViec = () => {

  const [valueTuNgay, setValueTuNgay] = useState(dayjs().startOf("month"));
  const [valueDenNgay, setValueDenNgay] = useState(dayjs().endOf("month"));
  const [valueTuNgayTheoQuy, setValueTuNgayTheoQuy] = useState(
    dayjs().startOf("month")
  );
  const [valueDenNgayTheoQuy, setValueDenNgayTheoQuy] = useState(
    dayjs().endOf("month")
  );
  const [selectedYear, setSelectedYear] = useState(dayjs());
  const [selectedQuy, setSelectedQuy] = useState(1);
  const [baoCaoDoanhThu, setBaoCaoDoanhThu] = useState(null);
  const [baoCaoDoanhThuTheoNam, setBaoCaoDoanhThuTheoNam] = useState(null);
  const [baoCaoDoanhThuTheoPhongBan, setBaoCaoDoanhThuTheoPhongBan] =
    useState(null);
  const [baoCaoSoSanhMucTieuDoanhSo, setBaoCaoSoSanhMucTieuDoanhSo] =
    useState(null);
  const [baoCaoTheoCoHoiState, setBaoCaoTheoCoHoiState] = useState(null);
  const [baoCaoNguonGocKhachHang, setBaoCaoNguonGocKhachHang] = useState(null);
  const [baoCaoTop5NhanVienSuatSac , setBaoCaoTop5NhanVienSuatSac] = useState(null);
  const { data: dataBaoCaoDoanhThu } = useGetBaoCaoDoanhThuQuery({
    tuNgay: valueTuNgay.format("YYYY-MM-DDT00:00:00"),
    denNgay: valueDenNgay.format("YYYY-MM-DDT23:59:59"),
  });
  const { data: dataBaoCaoDoanhThuTheoNam } = useGetBaoCaoDoanhThuTheoNamQuery({
    nam: selectedYear.format("YYYY"),
  });
  const { data: dataBaoCaoDoanhThuTheoPhongBan } =
    useGetBaoCaoDoanhThuTheoPhongBanQuery({
      tuNgay: valueTuNgay.format("YYYY-MM-DDT00:00:00"),
      denNgay: valueDenNgay.format("YYYY-MM-DDT23:59:59"),
    });

  const { data: dataSoSanhMucTieuDoanhSo } =
    useGetBaoCaoSoSanhMucTieuDoanhSoQuery({
      tuNgay: valueTuNgayTheoQuy.format("YYYY-MM-DDT00:00:00"),
      denNgay: valueDenNgayTheoQuy.format("YYYY-MM-DDT23:59:59"),
      nam: selectedYear.format("YYYY"),
    });

  const { data: dataBaoCaoTheoCoHoi } = useGetBaoCaoTheoCoHoiQuery({
    tuNgay: valueTuNgay.format("YYYY-MM-DDT00:00:00"),
    denNgay: valueDenNgay.format("YYYY-MM-DDT23:59:59"),
  });
  const { data: dataNguonGocKhachHang } = useGetBaoCaoNguonGocKhachHangQuery({
    tuNgay: valueTuNgay.format("YYYY-MM-DDT00:00:00"),
    denNgay: valueDenNgay.format("YYYY-MM-DDT23:59:59"),
  });

  const {data : dataTop5NhanVienSuatSac} = useGetBaoCaoTop5NhanVienSuatSacNhatQuery(
    {
      tuNgay: valueTuNgay.format("YYYY-MM-DDT00:00:00"),
      denNgay: valueDenNgay.format("YYYY-MM-DDT23:59:59"),
      type :1
    }
  )
   
  const {data : dataTop5NhanVienCoDoanhThuCaoNhat} = useGetBaoCaoTop5NhanVienCoDoanhThuCaoNhatQuery(
    {
      tuNgay: valueTuNgay.format("YYYY-MM-DDT00:00:00"),
      denNgay: valueDenNgay.format("YYYY-MM-DDT23:59:59"),
    }
  )

  const {data : dataHoatDongNhanVien} = useGetBaoCaoTop5NhanVienSuatSacNhatQuery(
    {
      tuNgay: valueTuNgay.format("YYYY-MM-DDT00:00:00"),
      denNgay: valueDenNgay.format("YYYY-MM-DDT23:59:59"),
      type :2
    }
  )

  useEffect(() => {
    if (dataBaoCaoDoanhThu) {
      setBaoCaoDoanhThu(dataBaoCaoDoanhThu);
    } else setBaoCaoDoanhThu([]);
  }, [dataBaoCaoDoanhThu]);

  useEffect(() => {
    if (dataBaoCaoDoanhThuTheoNam) {
      setBaoCaoDoanhThuTheoNam(dataBaoCaoDoanhThuTheoNam);
    } else setBaoCaoDoanhThuTheoNam([]);
  }, [dataBaoCaoDoanhThuTheoNam]);

  useEffect(() => {
    if (dataBaoCaoDoanhThuTheoPhongBan) {
      setBaoCaoDoanhThuTheoPhongBan(dataBaoCaoDoanhThuTheoPhongBan);
    } else setBaoCaoDoanhThuTheoPhongBan([]);
  }, [dataBaoCaoDoanhThuTheoPhongBan]);

  useEffect(() => {
    if (dataSoSanhMucTieuDoanhSo) {
      setBaoCaoSoSanhMucTieuDoanhSo(dataSoSanhMucTieuDoanhSo);
    } else setBaoCaoSoSanhMucTieuDoanhSo([]);
  }, [dataSoSanhMucTieuDoanhSo]);

  useEffect(() => {
    if (dataBaoCaoTheoCoHoi) {
      setBaoCaoTheoCoHoiState(dataBaoCaoTheoCoHoi);
    } else {
      setBaoCaoTheoCoHoiState([]);
    }
  }, [dataBaoCaoTheoCoHoi]);

  useEffect(() => {
    if (dataNguonGocKhachHang) {
      setBaoCaoNguonGocKhachHang(dataNguonGocKhachHang);
    } else {
      setBaoCaoNguonGocKhachHang([]);
    }
  }, [dataNguonGocKhachHang]);

  useEffect(() => {
    if (dataTop5NhanVienSuatSac) {
      setBaoCaoTop5NhanVienSuatSac(dataTop5NhanVienSuatSac);
    } else {
      setBaoCaoTop5NhanVienSuatSac([]);
    }
  }, [dataTop5NhanVienSuatSac]);


  useEffect(() => {
    if (selectedYear && selectedQuy) {
      const year = dayjs(selectedYear).year();

      let tuNgay, denNgay;

      switch (selectedQuy) {
        case 1:
          tuNgay = dayjs(`${year}-01-01`);
          denNgay = dayjs(`${year}-03-31`);
          break;
        case 2:
          tuNgay = dayjs(`${year}-04-01`);
          denNgay = dayjs(`${year}-06-30`);
          break;
        case 3:
          tuNgay = dayjs(`${year}-07-01`);
          denNgay = dayjs(`${year}-09-30`);
          break;
        case 4:
          tuNgay = dayjs(`${year}-10-01`);
          denNgay = dayjs(`${year}-12-31`);
          break;
        default:
          break;
      }

      setValueTuNgayTheoQuy(tuNgay);
      setValueDenNgayTheoQuy(denNgay);
    }
  }, [selectedYear, selectedQuy]);

  const doanhThuData = [
    {
      title: "Doanh thu hiện tại",
      value: 0,
      description: "",
      icon: <PaidIcon fontSize="large" />,
      increase: <NorthIcon fontSize="large" />,
      decrease: <SouthIcon fontSize="large" />,
      color: "#ffea00",
      currentMonthValue: baoCaoDoanhThu?.doanhThuHienTai,
      previousMonthValue: baoCaoDoanhThu?.doanhThuThangTruoc,
    },
  ];

  const StatisticCard = ({
      title,
      currentMonthValue,
      previousMonthValue,
      description,
      icon,
      color,
    }) => {
      const percentChange =
        previousMonthValue === 0
          ? currentMonthValue > 0
            ? 100
            : 0
          : Math.round(
              ((currentMonthValue - previousMonthValue) / previousMonthValue) *
                100
            );
  
      const isIncrease = percentChange >= 0;
      const ChangeIcon = isIncrease ? NorthIcon : SouthIcon;
      const theme = useTheme();
  
  
      return (
        <Paper
          elevation={4}
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderLeft: `6px solid ${color}`,
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[6],
            },
            height: '150px',
            width: '100%',
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              mr: 2,
              color,
              display: 'flex',
              alignItems: 'center',
              fontSize: '2.5rem',
            }}
          >
            {icon}
          </Box>
    
          {/* Content */}
          <Box sx={{ flex: 1 }}>
            {/* Title */}
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color={color}
              sx={{
                mb: 1,
                lineHeight: 1.3,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {title}
            </Typography>
    
            {/* Current Value */}
            <Typography variant="h4" fontWeight="bold" color="text.primary" sx={{ mb: 1 }}>
              {currentMonthValue}
            </Typography>
    
            {/* Change Information */}
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              {isIncrease ? (
                <ArrowUpwardIcon fontSize="small" sx={{ color: 'success.main' }} />
              ) : (
                <ArrowDownwardIcon fontSize="small" sx={{ color: 'error.main' }} />
              )}
              <Typography
                variant="body2"
                fontWeight="medium"
                color={isIncrease ? 'success.main' : 'error.main'}
              >
                {isIncrease ? '+' : ''}{percentChange}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                so với tháng trước ({previousMonthValue})
              </Typography>
            </Stack>
    
            {/* Description */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.4,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {description}
            </Typography>
          </Box>
        </Paper>
      );
    };

  return (
    <>
      <Paper>
        <Grid2 container spacing={2} sx={{ padding: 2 }}>
          <Grid2 size={12}>
                      <Typography variant="h5" sx={{ textAlign: "center" }}>
                        <b>BÀN LÀM VIỆC - Nhân Viên {userData?.response?.ten}</b>
                      </Typography>{" "}
          </Grid2>
          <Grid2 size={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  alignItems={{ xs: "stretch", sm: "center" }}
                >
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="quy-label">Chọn quý</InputLabel>
                    <Select
                      labelId="quy-label"
                      value={selectedQuy}
                      label="Chọn quý"
                      onChange={(e) => setSelectedQuy(e.target.value)}
                    >
                      <MenuItem value={1}>Quý 1</MenuItem>
                      <MenuItem value={2}>Quý 2</MenuItem>
                      <MenuItem value={3}>Quý 3</MenuItem>
                      <MenuItem value={4}>Quý 4</MenuItem>
                    </Select>
                  </FormControl>
                  <DatePicker
                    views={["year"]}
                    label="Chọn năm"
                    value={selectedYear}
                    onChange={(newValue) => setSelectedYear(newValue)}
                  />
                  <DatePicker
                    label="Từ ngày"
                    value={valueTuNgay}
                    onChange={(newValue) => setValueTuNgay(newValue)}
                  />
                  <DatePicker
                    label="Đến ngày"
                    value={valueDenNgay}
                    onChange={(newValue) => setValueDenNgay(newValue)}
                  />
                </Stack>
              </DemoContainer>
            </LocalizationProvider>
          </Grid2>
          <Grid2 size={12}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              <b>Tông quan doanh thu</b>
            </Typography>
          </Grid2>
          {doanhThuData.map((item, index) => (
            <Grid2 item size={4} sm={6} md={3} key={index}>
              <StatisticCard {...item} />
            </Grid2>
          ))}
          <Grid2 size={8}>
            <Paper>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                <b>Tổng quan doanh thu theo năm</b>
              </Typography>
              <LineCh
                data={baoCaoDoanhThuTheoNam}
                height={300}
                dataKey1={"thang"}
                dataKey2={"doanhThu"}
              />
            </Paper>
          </Grid2>
          <Grid2 size={6}>
            <Paper>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                <b>Tổng quan doanh thu theo phòng ban</b>
              </Typography>
              <Barchart
                data={baoCaoDoanhThuTheoPhongBan}
                dataKey={"doanhThu"}
                height={440}
              />
            </Paper>
          </Grid2>
          <Grid2 size={6}>
            <Paper>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                <b>So sánh doanh số và mục tiêu theo quý</b>
              </Typography>
              <CustomBarchartDouble
                data={baoCaoSoSanhMucTieuDoanhSo}
                dataKeyName={"thang"}
                dataKey1={"mucTieu"}
                dataKey2={"mucTieuThucTe"}
                height={440}
              />
            </Paper>
          </Grid2>

          <Grid2 size={12}>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              <b>Tổng quan khách hàng</b>
            </Typography>
          </Grid2>
          <Grid2 size={6}>
            <Paper>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                <b>Cơ hội theo giai đoạn</b>
              </Typography>
              {Array.isArray(baoCaoTheoCoHoiState) &&
                baoCaoTheoCoHoiState.length > 0 && (
                  <FunnelChartCustom
                    data={baoCaoTheoCoHoiState}
                    dataKey="soLuong"
                    nameKey="tenCoHoi"
                    fill="mauSac"
                  />
                )}
            </Paper>
          </Grid2>
          <Grid2 size={6}>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              <b>Nguồn gốc khách hàng</b>
            </Typography>
            {Array.isArray(baoCaoNguonGocKhachHang) &&
              baoCaoNguonGocKhachHang.length > 0 && (
                <Piechart
                  data={baoCaoNguonGocKhachHang}
                  dataKey={"number"}
                  height={400}
                />
              )}
          </Grid2>
          <Grid2 size={12}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              <b>Hiệu suất nhân viên</b>
            </Typography>
          </Grid2>
          <Grid2 size={6}>
            <Paper sx={{ padding: 2 }}>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              <b>Top 5 nhân viên suất sắc nhất</b>
            </Typography>
            <TableContainer
              component={Paper}
              sx={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderRadius: "12px",
                height: 400,
              }}
            >
              <Table
                sx={{
                  "& .MuiTableCell-root": { padding: "12px 16px" },
                }}
              >
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "background.primary",
                      "& .MuiTableCell-head": {
                        fontWeight: 600,
                        color: "#1a1a1a",
                        fontSize: "0.9rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      },
                    }}
                  >
                    <TableCell sx={{ width: "10%" }}>STT</TableCell>
                    <TableCell>Nhân viên</TableCell>
                    <TableCell align="center">Cuộc gọi hoàn thành</TableCell>
                    <TableCell align="center">Lịch hẹn hoàn thành</TableCell>
                    <TableCell align="center">Nhiệm vụ hoàn thành</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(baoCaoTop5NhanVienSuatSac)  &&
                     baoCaoTop5NhanVienSuatSac.length >0 && baoCaoTop5NhanVienSuatSac.map((nv, index) => (
                    <TableRow
                      key={nv.name}
                      hover
                      sx={{
                        "&:hover": {
                          backgroundColor: "background.primary",
                          transition: "background-color 0.2s ease",
                        },
                        "& .MuiTableCell-body": {
                          fontSize: "0.95rem",
                          color: "#333",
                          borderBottom: "1px solid #e8ecef",
                        },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          {nv?.hinhAnh == null ? <>
                            <Avatar
                            src={NoImage}
                            sx={{
                              width: 40,
                              height: 40,
                              border: "2px solid #e0e0e0",
                              bgcolor: "#f0f0f0",
                            }}
                          />
                           </> : <>
                           <Avatar
                            src={
                              "data:image/jpeg;base64," + nv?.hinhAnh
                            }
                            sx={{
                              width: 40,
                              height: 40,
                              border: "2px solid #e0e0e0",
                              bgcolor: "#f0f0f0",
                            }}
                          />
                           </> }
                        
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: "1rem",
                              color: "background.primary",
                            }}
                          >
                            {nv.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">{nv.soCuocGoiHoanThanh}</TableCell>
                      <TableCell align="right">{nv.soLichHenHoanThanh}</TableCell>
                      <TableCell align="right">{nv.soNhiemVuHoanThanh}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </Paper>
          </Grid2>
          <Grid2 size={6}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                <b> Top 5 Nhân Viên Có Doanh Thu Cao Nhất</b>
              </Typography>
              <TableContainer
                component={Paper}
                sx={{
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  borderRadius: "12px",
                  height: 400,
                }}
              >
                <Table
                  sx={{
                    "& .MuiTableCell-root": { padding: "12px 16px" },
                  }}
                >
                  <TableHead>
                    <TableRow
                      sx={{
                        backgroundColor: "background.primary",
                        "& .MuiTableCell-head": {
                          fontWeight: 600,
                          color: "#1a1a1a",
                          fontSize: "0.9rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        },
                      }}
                    >
                      <TableCell sx={{ width: "10%" }}>STT</TableCell>
                      <TableCell>Nhân viên</TableCell>
                      <TableCell align="center">Doanh thu</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(dataTop5NhanVienCoDoanhThuCaoNhat) &&
                     dataTop5NhanVienCoDoanhThuCaoNhat.length > 0 &&
                      dataTop5NhanVienCoDoanhThuCaoNhat.map((nv, index) => (
                      <TableRow
                        key={nv.tenNhanVien}
                        hover
                        sx={{
                          "&:hover": {
                            backgroundColor: "background.primary",
                            transition: "background-color 0.2s ease",
                          },
                          "& .MuiTableCell-body": {
                            fontSize: "0.95rem",
                            color: "#333",
                            borderBottom: "1px solid #e8ecef",
                          },
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            {nv?.hinhAnh == null ? <>
                            <Avatar
                            src={NoImage}
                            sx={{
                              width: 40,
                              height: 40,
                              border: "2px solid #e0e0e0",
                              bgcolor: "#f0f0f0",
                            }}
                          />
                           </> : <>
                           <Avatar
                            src={
                              "data:image/jpeg;base64," + nv?.hinhAnh
                            }
                            sx={{
                              width: 40,
                              height: 40,
                              border: "2px solid #e0e0e0",
                              bgcolor: "#f0f0f0",
                            }}
                          />
                           </> }
                            <Typography
                              sx={{
                                fontWeight: 500,
                                fontSize: "1rem",
                                color: "background.primary",
                              }}
                            >
                              {nv.tenNhanVien}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            sx={{
                              fontWeight: 500,
                              color: "background.primary",
                            }}
                          >
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(nv.doanhThu)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid2>

          <Grid2 size={6}>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              <b>Hoạt động nhân viên</b>
            </Typography>
            {Array.isArray(dataHoatDongNhanVien) && dataHoatDongNhanVien.length > 0
             && (
              <StackedBarChart
              data={dataHoatDongNhanVien}
              dataKeyName={"name"}
              dataKey1={"soCuocGoiHoanThanh"}
              dataKey2={"soLichHenHoanThanh"}
              dataKey3={"soNhiemVuHoanThanh"}
              height={400}
            />
             )}
           
          </Grid2>
        </Grid2>
      </Paper>
    </>
  );
};

export default BanLamViec;
