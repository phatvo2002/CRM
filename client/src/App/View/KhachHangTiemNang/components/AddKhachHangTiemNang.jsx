import { Button, Grid, Paper, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";
const AddKhachHangTiemNang = () => {
  const navigate = useNavigate()

  const previousPage = ()=>
  {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn hủy bỏ và không lưu dữ liệu?");
    if (isConfirmed) {
      navigate(-1);
    }
  }
  return (
    <>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs>
          <h2>Khách hàng tiềm năng</h2>
        </Grid>
        <Grid item>
          <Button variant="outlined" startIcon={<ClearIcon/>} color="error" onClick={previousPage}>Hủy bỏ</Button>
          <Button variant="outlined" startIcon={<AddIcon/>} style={{marginLeft:2}}>Lưu tiềm năng</Button>
        </Grid>
      </Grid>
      <Paper>
         
      </Paper>
    </>
  );
};

export default AddKhachHangTiemNang;
