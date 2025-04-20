import {
  Avatar,
  Button,
  Checkbox,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconExcel from "../../Assets/icon/excel.png";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import NoImage from "../../Assets/image/no-image.png";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import ModalThemMoi from "./modal/ModalThemMoi";
import { useGetAllMucTieuDoanhSoQuery } from "src/App/Api/MucTieuDoanhSo.Api";
import Moment from "react-moment";
import ModalChinhSua from "./modal/ModalChinhSua";

const userData = JSON.parse(localStorage.getItem("authorizationData"));
const index = () => {
  const [valueTuNgay, setValueTuNgay] = useState(dayjs().startOf("month"));
  const [valueDenNgay, setValueDenNgay] = useState(dayjs().endOf("month"));
  const [selectedRow, setSelectedRow] = useState(null);
  const [openRow, setOpenRow] = useState(null);
  const [row, setRow] = useState([]);
  const [modalThemMoiMucTieu, setModalThemMoiMucTieu] = useState();
  const [modalChinhSua, setModalChinhSua] = useState();
  const { data: dataMucTieu, refetch: refetch } = useGetAllMucTieuDoanhSoQuery({
    tuNgay: valueTuNgay.format("YYYY-MM-DD HH:mm:ss.SSS"),
    denNgay: valueDenNgay.format("YYYY-MM-DD HH:mm:ss.SSS"),
  });

  const checkPermission = userData?.response?.checkIsTruongPhong;
  const checkAdminPerMission = userData?.response?.phongBan?.id;

  console.log(selectedRow);

  const handleOpenModalThemMoiMucTieu = () => {
    setModalThemMoiMucTieu(true);
  };
  const handleCloseModalThemMoi = () => {
    setModalThemMoiMucTieu(false);
  };
  const handleOpenModalChinhSua = () => {
    setModalChinhSua(true);
  };
  const handleCloseModalChinhSua = () => {
    setModalChinhSua(false);
  };

  useEffect(() => {
    if (dataMucTieu) {
      setRow(dataMucTieu);
    }
  }, [dataMucTieu]);

  return (
    <>
      <Grid2
        container
        alignItems="center"
        spacing={3}
        sx={{
          p: 3,
          backgroundColor: "background.default",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Grid2 xs={12}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#1976d2", mb: 2 }}
          >
            Mục tiêu doanh số
          </Typography>
        </Grid2>
        <Grid2 sx={12}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", sm: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: 2, textTransform: "none", boxShadow: 3 }}
              onClick={handleOpenModalThemMoiMucTieu}
              startIcon={<AddIcon />}
            >
              Thêm mục tiêu
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ borderRadius: 2, textTransform: "none", boxShadow: 3 }}
              //   onClick={handleOpenModalThemMoiMucTieu}
            >
              <img
                src={IconExcel}
                alt="Xuất thống kê"
                width={24}
                height={24}
                style={{ marginRight: 10 }}
              />{" "}
              Xuất excel
            </Button>
          </Stack>
        </Grid2>
        <Grid2 size={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "stretch", sm: "center" }}
              >
                <DateTimePicker
                  label="Từ ngày"
                  value={valueTuNgay}
                  onChange={(newValue) => setValueTuNgay(newValue)}
                />
                <DateTimePicker
                  label="Đến ngày"
                  value={valueDenNgay}
                  onChange={(newValue) => setValueDenNgay(newValue)}
                />
              </Stack>
            </DemoContainer>
          </LocalizationProvider>
        </Grid2>
        <Grid2 xs={12}>
          <Paper>
            <Box sx={{ maxHeight: 500, overflow: "auto" }}>
              <Table
                sx={{
                  minWidth: "2550px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  overflow: "auto",
                }}
              >
                <TableHead>
                  <TableRow sx={{ backgroundColor: "background.primary" }}>
                    <TableCell></TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", color: "#333", width: "200px" }}
                    >
                      Hành động
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                      //  color: "#333",
                        width: "300px",
                        flex: 1,
                      }}
                    >
                      Trưởng phòng phụ trách
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold",width: "200px" }}
                    >
                      Tên KPI
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold",  width: "200px" }}
                    >
                      Tên phòng ban
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold",  width: "300px" }}
                    >
                      Ngày bắt đầu
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", width: "300px" }}
                    >
                      Ngày kết thúc
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold",  width: "300px" }}
                    >
                      SL Cuộc Gọi / Thực Tế
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold",  width: "300px" }}
                    >
                      SL Lịch Hẹn / Thực Tế
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold",width: "300px" }}
                    >
                      SL Email Tương Tác Khách Hàng / Thực Tế
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", width: "300px" }}
                    >
                      SL Tiềm Năng Đã Chuyển Đổi / Thực tế
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold",  width: "300px" }}
                    >
                      SL Email Báo Giá/ Thực tế
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold",  width: "300px" }}
                    >
                      Doanh Số / Thực tế
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", width: "300px" }}
                    >
                      Tổng tỷ lệ (%)
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold",  width: "300px" }}
                    >
                      Đánh giá
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.length > 0 &&
                    row.map((item, index) => (
                      <React.Fragment key={index}>
                        <TableRow
                          hover
                          //  onClick={() => setSelectedRow(item)}
                          selected={selectedRow?.id === item.id}
                          sx={{
                            cursor: "pointer",
                            backgroundColor:
                              selectedRow?.id === item.id
                                ? "#e3f2fd"
                                : "inherit",
                          }}
                        >
                          <TableCell padding="checkbox">
                            {checkPermission == false && (
                              <>
                                <Checkbox
                                  color="primary"
                                  checked={selectedRow?.id === item.id}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedRow(item);
                                    } else {
                                      setSelectedRow(null);
                                    }
                                  }}
                                />
                              </>
                            )}
                          </TableCell>
                          <TableCell sx={{ width: 120 }}>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenRow(openRow === index ? null : index);
                              }}
                            >
                              {openRow === index ? (
                                <KeyboardArrowUp />
                              ) : (
                                <KeyboardArrowDown />
                              )}
                            </IconButton>
                            {checkPermission == false && (
                              <>
                                <IconButton
                                  color="success"
                                  disabled={selectedRow == null}
                                  onClick={handleOpenModalChinhSua}
                                >
                                  <EditIcon />
                                </IconButton>
                                {/* <IconButton color="error">
                                  <DeleteIcon />
                                </IconButton> */}
                              </>
                            )}
                          </TableCell>

                          <TableCell align="center">
                            <Box
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                            >
                              <Avatar
                                alt=""
                                src={
                                  item?.nguoiDung?.hinhAnh == null
                                    ? NoImage
                                    : `data:image/jpeg;base64,${item?.nguoiDung?.hinhAnh}`
                                }
                                sx={{ width: 40, height: 40, mb: 0.5 }}
                              />
                              <Typography variant="body2">
                                {item?.nguoiDung?.hoVaDem}{" "}
                                {item?.nguoiDung?.ten}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell sx={{ color: "#555" }}>
                            {item?.tenKPI}
                          </TableCell>

                          <TableCell align="center" sx={{ color: "#555" }}>
                            {item?.phongBan?.tenPhongBan}
                          </TableCell>

                          <TableCell align="center" sx={{ color: "#555" }}>
                            <Moment format="DD/MM/YYYY">
                              {item?.ngayBatDau}
                            </Moment>
                          </TableCell>

                          <TableCell align="center" sx={{ color: "#555" }}>
                            <Moment format="DD/MM/YYYY">
                              {item?.ngayKetThuc}
                            </Moment>
                          </TableCell>

                          {[
                            {
                              value1: item?.soCuocGoi,
                              value2: item?.soCuocGoiThucTe,
                              percent: item?.tileCuocGoiThucTe,
                            },
                            {
                              value1: item?.soLichHen,
                              value2: item?.soLichHenThucTe,
                              percent: item?.tileLichHenThucTe,
                            },
                            {
                              value1: item?.soKhachHangTiemNangDaChuyenDoi,
                              value2:
                                item?.soKhachHangTiemNangDaChuyenDoiThucTe,
                              percent:
                                item?.tiLeSoKhachHangTiemNangDaChuyenDoiThucTe,
                            },
                            {
                              value1: item?.soEmailTuongTacKhachHang,
                              value2: item?.soEmailTruongTacKhachHangThucTe,
                              percent: item?.tileEmailTuongTacThucTe,
                            },
                            {
                              value1: item?.soEmailBaoGia,
                              value2: item?.soEmailBaoGiaThucTe,
                              percent: item?.tiLeEmailBaoGiaThucTe,
                            },
                          ].map((data, i) => (
                            <TableCell align="center" key={i}>
                              <Typography variant="body2">
                                {data.value1} / {data.value2}
                              </Typography>
                              <Typography
                                variant="caption"
                               
                              >
                                {data.percent} %
                              </Typography>
                            </TableCell>
                          ))}

                          <TableCell align="center">
                            <Typography variant="body2">
                              {item?.doanhSo.toLocaleString("vi-VN")} /{" "}
                              {item?.doanhSoThucTe.toLocaleString("vi-VN")}
                            </Typography>
                            <Typography
                              variant="caption"
                           
                            >
                              {item?.tiLeDoanhSoThucTe} %
                            </Typography>
                          </TableCell>

                          <TableCell align="center">
                            <Typography variant="body2">
                              {item?.tongTiLeThucTe.toFixed(2)} %
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            {item.xepLoai || ""}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "60px",
                              }}
                            >
                              <div
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  backgroundColor: item?.color,
                                }}
                              ></div>
                            </div>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell colSpan={15} sx={{ padding: 0 }}>
                            <Collapse
                              in={openRow === index}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box
                                sx={{
                                  m: 2,
                                  backgroundColor: "background.primary",
                                  borderRadius: 2,
                                  boxShadow: 2,
                                  border: "1px solid #e0e0e0",
                                  p: 2,
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  sx={{ color: "#1976d2", fontWeight: 600 }}
                                >
                                  Thông tin KPI chi tiết
                                </Typography>

                                <Table size="small">
                                  <TableHead>
                                    <TableRow
                                      sx={{ backgroundColor: "background.primary" }}
                                    >
                                      {[
                                        "",
                                        "Hành động",
                                        "Nhân viên",
                                        "Ngày bắt đầu",
                                        "Ngày kết thúc",
                                        "SL cuộc gọi / Thực tế",
                                        "SL lịch hẹn / Thực tế",
                                        "SL Email tương tác / Thực tế",
                                        "SL tiềm năng đã chuyển đổi / Thực tế",
                                        "SL báo giá / Thực tế",
                                        "Doanh số / Thực tế",
                                        "Tổng phần trăm",
                                        "Đánh giá",
                                        "",
                                      ].map((text, idx) => (
                                        <TableCell
                                          key={idx}
                                          align="center"
                                          sx={{ fontWeight: "bold" }}
                                        >
                                          {text}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  </TableHead>

                                  <TableBody>
                                    {item?.kpiNhanViens.map((kpi, subIndex) => (
                                      <TableRow key={subIndex}>
                                        <TableCell padding="checkbox">
                                          {checkPermission == true && (
                                            <>
                                              <Checkbox
                                                color="primary"
                                                checked={
                                                  selectedRow?.id === kpi?.id
                                                }
                                                onChange={(e) => {
                                                  if (e.target.checked) {
                                                    setSelectedRow(kpi);
                                                  } else {
                                                    setSelectedRow(null);
                                                  }
                                                }}
                                              />
                                            </>
                                          )}
                                        </TableCell>
                                        <TableCell align="center">
                                          {checkPermission == true && (
                                            <IconButton
                                              color="success"
                                              disabled={selectedRow == null}
                                              onClick={handleOpenModalChinhSua}
                                            >
                                              <EditIcon />
                                            </IconButton>
                                          )}
                                        </TableCell>

                                        <TableCell align="center">
                                          <Box
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                          >
                                            <Avatar
                                              alt=""
                                              src={
                                                kpi?.nguoiDung?.hinhAnh == null
                                                  ? NoImage
                                                  : `data:image/jpeg;base64,${kpi.nguoiDung.hinhAnh}`
                                              }
                                              sx={{
                                                width: 40,
                                                height: 40,
                                                mb: 0.5,
                                              }}
                                            />
                                            <Typography variant="body2">
                                              {kpi.nguoiDung.hoVaDem}{" "}
                                              {kpi.nguoiDung.ten}
                                            </Typography>
                                          </Box>
                                        </TableCell>

                                        <TableCell align="center">
                                          <Moment format="DD/MM/YYYY">
                                            {kpi?.ngayBatDau}
                                          </Moment>
                                        </TableCell>
                                        <TableCell align="center">
                                          <Moment format="DD/MM/YYYY">
                                            {kpi?.ngayKetThuc}
                                          </Moment>
                                        </TableCell>
                                        <TableCell align="center">
                                          <div>
                                            {kpi.soCuocGoi} /{" "}
                                            {kpi.soCuocGoiThucTe}
                                          </div>
                                          {kpi.tileCuocGoiThucTe} %
                                        </TableCell>
                                        <TableCell align="center">
                                          <div>
                                            {kpi.soLichHen} /{" "}
                                            {kpi.soLichHenThucTe}
                                          </div>
                                          {kpi.tileLichHenThucTe} %
                                        </TableCell>
                                        <TableCell align="center">
                                          <div>
                                            {kpi.soEmailTuongTacKhachHang} /{" "}
                                            {
                                              kpi.soEmailTruongTacKhachHangThucTe
                                            }
                                          </div>
                                          {kpi.tileEmailTuongTacThucTe} %
                                        </TableCell>
                                        <TableCell align="center">
                                          <div>
                                            {kpi.soKhachHangTiemNangDaChuyenDoi}{" "}
                                            /{" "}
                                            {
                                              kpi.soKhachHangTiemNangDaChuyenDoiThucTe
                                            }
                                          </div>
                                          {
                                            kpi.tiLeSoKhachHangTiemNangDaChuyenDoiThucTe
                                          }{" "}
                                          %
                                        </TableCell>
                                        <TableCell align="center">
                                          <div>
                                            {kpi.soEmailBaoGia} /{" "}
                                            {kpi.soEmailBaoGiaThucTe}
                                          </div>
                                          {kpi.tiLeEmailBaoGiaThucTe} %
                                        </TableCell>
                                        <TableCell align="center">
                                          <div>
                                            {kpi.doanhSo.toLocaleString(
                                              "vi-VN"
                                            )}{" "}
                                            /{" "}
                                            {kpi.doanhSoThucTe.toLocaleString(
                                              "vi-VN"
                                            )}
                                          </div>
                                          {kpi.tiLeDoanhSoThucTe} %
                                        </TableCell>
                                        <TableCell align="center">
                                          {kpi.tongTiLeThucTe.toFixed(2)} %
                                        </TableCell>
                                        <TableCell align="center">
                                          {kpi.xepLoai || ""}
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              height: "60px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                width: "50px",
                                                height: "50px",
                                                backgroundColor: kpi.color,
                                              }}
                                            ></div>
                                          </div>
                                        </TableCell>

                                        <TableCell align="center" />
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Paper>
        </Grid2>
      </Grid2>

      {/* Modal thêm mới */}
      <ModalThemMoi
        showModal={modalThemMoiMucTieu}
        closeModal={handleCloseModalThemMoi}
        refetch={refetch}
        checkpermission={checkPermission}
        checkAdminPerMission={checkAdminPerMission}
      />
      {/* Modal chỉnh sửa */}
      <ModalChinhSua
        showModal={modalChinhSua}
        closeModal={handleCloseModalChinhSua}
        refetch={refetch}
        checkpermission={checkPermission}
        selectedRow={selectedRow}
      />
    </>
  );
};

export default index;
