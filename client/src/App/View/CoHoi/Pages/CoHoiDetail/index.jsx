import { Box, Button, Grid2, Menu, MenuItem, Paper, Stack, Step, StepButton, Stepper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';
import CachedIcon from '@mui/icons-material/Cached';
import { useGetCoHoiByIdQuery } from 'src/App/Api/CoHoiApi';
import { useGetAllGiaiDoanBanHangQuery } from 'src/App/Api/GiaiDoanBanHangApi';
const index = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: dataCoHoi, refetch } = useGetCoHoiByIdQuery(id)
  const { data: dataGiaiDoan } = useGetAllGiaiDoanBanHangQuery()
  const steps = dataGiaiDoan || [];
  const [activeStep, setActiveStep] = useState(dataCoHoi?.giaiDoanBanHang?.id);
  const [completed, setCompleted] = useState({});
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleReturn = () => {
    navigate("/cohoi")
  }
  const handleReload = () => {
    refetch()
  }

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ?
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + steps.findIndex((s) => s.id === activeStep) + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
            <div>
              <Button variant='outlined' startIcon={<ArrowBackIcon />} onClick={handleReturn}>
                Quay về
              </Button>
              <Button variant='outlined' startIcon={<CachedIcon />} style={{ marginLeft: 3 }}>
                Reload
              </Button>
            </div>
            <div >
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant='outlined'
                color='text.primary'
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
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose} ><ShoppingCartIcon /> Sinh đơn hàng</MenuItem>
                <MenuItem onClick={handleClose}><AttachMoneyIcon /> Sinh Báo giá</MenuItem>
              </Menu>
              <Button variant='contained' startIcon={<EditIcon />} style={{ marginLeft: 3 }}>
                Sửa
              </Button>
            </div>
          </Stack>

        </Grid2>
        <Grid2 size={12}>
          <Paper sx={{ width: "100%", height: "100%", padding: 3 }}>
            <Typography variant='h6' component={"h6"}> <b>{dataCoHoi?.tenCoHoi}</b> <span>- {dataCoHoi?.soTien.toLocaleString("vi-VN")} VND</span></Typography>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ width: "200px" }}>Liên hệ :</span>
              <TextField id="standard-basic" label="Liên hệ" variant="standard" />
            </div>

            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ width: "200px" }}>Số tiền :</span>
              <TextField id="standard-basic" label="Số tiền" variant="standard" />
            </div>

            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ width: "200px" }}>Giai đoạn bán hàng :</span>
              <TextField id="standard-basic" label="Giai đoạn bán hàng" variant="standard" />
            </div>

            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ width: "200px" }}>Tỉ lệ thành công :</span>
              <TextField id="standard-basic" label="Tỉ lệ thành công" variant="standard" />
            </div>

            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ width: "200px" }}>Doanh số kỳ vọng :</span>
              <TextField id="standard-basic" label="Doanh số kỳ vọng" variant="standard" />
            </div>

            <Box sx={{ width: '100%', padding: 2 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                      {label.tenGiaiDoan}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
              <div>
                {allStepsCompleted() ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Box sx={{ flex: '1 1 auto' }} />
                      <Button onClick={handleReset}>Reset</Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                      Step {steps.findIndex((s) => s.id === activeStep) + 1}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={steps.findIndex((s) => s.id === activeStep) === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Quay về 
                      </Button>
                      <Box sx={{ flex: '1 1 auto' }} />
                      <Button onClick={handleNext} sx={{ mr: 1 }}>
                        Tiếp theo
                      </Button>
                      {steps.findIndex((s) => s.id === activeStep) !== steps.length - 1 &&
                        (completed[activeStep] ? (
                          <Typography variant="caption" sx={{ display: 'inline-block' }}>
                            Giai đoạn {steps.findIndex((s) => s.id === activeStep) + 1} Đã hoàn thành
                          </Typography>
                        ) : (
                          <Button onClick={handleComplete}>
                            {completedSteps() === totalSteps() - 1 ? 'Hoàn thành' : 'Hoàn thành giai đoạn'}
                          </Button>
                        ))}
                    </Box>
                  </React.Fragment>
                )}

              </div>
            </Box>

          </Paper>
        </Grid2>

      </Grid2>
    </>
  )
}

export default index