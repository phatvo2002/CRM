import {
  Box,
  Button,
  Grid2,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Step,
  StepButton,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import CachedIcon from "@mui/icons-material/Cached";
import { ModalConvertBaoGia } from "../../Modal/ModalConvertBaoGia";
import {
  useGetCoHoiByIdQuery,
  useUpdateGiaiDoanMutation,
} from "src/App/Api/CoHoiApi";
import { useGetAllGiaiDoanBanHangQuery } from "src/App/Api/GiaiDoanBanHangApi";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BanHangTab from "./ComponentTabs/BanHangTab";
import ThongTinChung from "./ComponentTabs/ThongTinChungTab";
import CuocGoiHoanThanhTab from "./ComponentTabs/CuocGoiHoanThanh";
import CuocGoiChuaHoanThanhTab from "./ComponentTabs/CuocGoiChuaHoanThanh";
const index = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: dataCoHoi, refetch } = useGetCoHoiByIdQuery(id);
  const { data: dataGiaiDoan } = useGetAllGiaiDoanBanHangQuery();
  const steps = dataGiaiDoan || [];
  const [activeStep, setActiveStep] = useState(null);
  const [completed, setCompleted] = useState({});
  const [value, setValue] = useState("1");
  const [modalChuyenDoiBaoGia, setModalChuyenDoiBaoGia] = useState(false);
  const [updateGiaiDoan] = useUpdateGiaiDoanMutation();
  useEffect(() => {
    if (dataCoHoi?.giaiDoanBanHang?.id) {
      setActiveStep(dataCoHoi?.giaiDoanBanHang?.id);
    }
  }, [dataCoHoi]);

  const handleOpenModalChuyenDoiBaoGia = () => setModalChuyenDoiBaoGia(true);
  const handleCloseModaChuyenDoiBaoGia = () => setModalChuyenDoiBaoGia(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleReturn = () => {
    navigate("/cohoi");
  };
  const handleReload = () => {
    refetch();
  };

  const totalSteps = () => {
    return steps.length;
  };
  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = async () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = async () => {
    const activeStepIndex = steps.findIndex((s) => s.id === activeStep);
    if (activeStepIndex === -1) return;

    const nextStepIndex =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((_, i) => !(i in completed))
        : activeStepIndex + 1;

    if (nextStepIndex < steps.length) {
      const nextStepId = steps[nextStepIndex].id;
      setActiveStep(nextStepId);

      await updateGiaiDoan({ cohoiId: id, giaiDoanId: nextStepId });
      refetch();
    }
  };

  const handleBack = async () => {
    const activeStepIndex = steps.findIndex((s) => s.id === activeStep);

    if (activeStepIndex > 0) {
      const previousStepId = steps[activeStepIndex - 1].id;
      setActiveStep(previousStepId);
      await updateGiaiDoan({ cohoiId: id, giaiDoanId: previousStepId });
      refetch();
    }
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(dataCoHoi?.giaiDoanBanHang?.id);
    setCompleted({});
  };

  const activeStepIndex = steps.findIndex((step) => step.id === activeStep);

  const doanhSoKyVongResult =
    (dataCoHoi?.soTien * dataCoHoi?.tiLeThanhCong) / 100;

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
            <div>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleReturn}
              >
                Quay về
              </Button>
              <Button
                variant="outlined"
                startIcon={<CachedIcon />}
                style={{ marginLeft: 3 }}
                onclick={handleReload}
              >
                Reload
              </Button>
            </div>
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                variant="outlined"
                color="text.primary"
                startIcon={<OpenInNewIcon />}
              >
                Mở rộng
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <ShoppingCartIcon /> Sinh đơn hàng
                </MenuItem>
                <MenuItem onClick={handleOpenModalChuyenDoiBaoGia}>
                  <AttachMoneyIcon /> Sinh Báo giá
                </MenuItem>
              </Menu>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                style={{ marginLeft: 3 }}
              >
                Sửa
              </Button>
            </div>
          </Stack>
        </Grid2>
        <Grid2 size={12}>
          <Paper sx={{ width: "100%", height: "100%", padding: 3 }}>
            <Typography variant="h6" component={"h6"}>
              {" "}
              <b>{dataCoHoi?.tenCoHoi}</b>{" "}
              <span>- {dataCoHoi?.soTien.toLocaleString("vi-VN")} <span>&#x0111;</span></span>
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <span style={{ width: "200px" }}>Liên hệ :</span>
              <TextField
                id="standard-basic"
                label="Liên hệ"
                variant="standard"
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <span style={{ width: "200px" }}>Số tiền :</span>
              <TextField
                id="standard-basic"
                value={dataCoHoi?.soTien.toLocaleString("vi-VN")}
                variant="standard"
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <span style={{ width: "200px" }}>Giai đoạn bán hàng :</span>
              <TextField
                id="standard-basic"
                value={dataCoHoi?.giaiDoanBanHang?.tenGiaiDoan}
                variant="standard"
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <span style={{ width: "200px" }}>Tỉ lệ thành công :</span>
              <TextField
                id="standard-basic"
                value={dataCoHoi?.tiLeThanhCong}
                variant="standard"
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <span style={{ width: "200px" }}>Doanh số kỳ vọng :</span>
              <TextField
                id="standard-basic"
                value={doanhSoKyVongResult.toLocaleString("vi-VN")}
                variant="standard"
              />
            </div>

            <Box sx={{ width: "100%", padding: 2 }}>
              <Stepper activeStep={activeStepIndex} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                      {label.tenGiaiDoan}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
              <div>
                <React.Fragment>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={
                        steps.findIndex((s) => s.id === activeStep) === 0
                      }
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Quay về
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                      Bước tiếp theo
                    </Button>
                  </Box>
                </React.Fragment>
              </div>
            </Box>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    <Tab label="Thông tin chung " value="1" />
                    <Tab label="Lịch sử giao dịch" value="2" />
                    <Tab label="Báo giá" value="3" />
                    <Tab label="Liên hệ" value="4" />
                    <Tab label="Bán hàng" value="5" />
                    <Tab label="Đơn hàng" value="6" />
                    <Tab label="Công việc đang thực hiện" value="7" />
                    <Tab label="Công việc đã hoàn thành" value="8" />
                    <Tab label="Ghi chú" value="9" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <ThongTinChung />
                </TabPanel>
                <TabPanel value="2">Lịch sử giao dịch</TabPanel>
                <TabPanel value="3">Báo giá </TabPanel>
                <TabPanel value="4">Liên hệ</TabPanel>
                <TabPanel value="5">
                  <BanHangTab dataCoHoi={dataCoHoi} refetchCoHoi={refetch} />
                </TabPanel>
                <TabPanel value="6">Đơn hàng </TabPanel>
                <TabPanel value="7">
                  <CuocGoiChuaHoanThanhTab />
                </TabPanel>
                <TabPanel value="8">
                  <CuocGoiHoanThanhTab />
                </TabPanel>
                <TabPanel value="9">Ghi chú</TabPanel>
              </TabContext>
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
      {/* Modal chuyển đổi báo giá */}
      <ModalConvertBaoGia
        coHoiData={dataCoHoi}
        showModal={modalChuyenDoiBaoGia}
        closeModal={handleCloseModaChuyenDoiBaoGia}
      />
    </>
  );
};

export default index;
