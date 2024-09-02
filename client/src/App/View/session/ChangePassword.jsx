import { Box, Container, Grid , Card } from '@mui/material'
import React from 'react'
import {TextField} from '@mui/material'
import { Formik } from 'formik';
import { styled, } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { useState } from 'react';
import Swal from 'sweetalert2';
import AuthApi from '../../Api/AuthApi';
const ChangePassword = () => {
  const ContentBox = styled(Box)(() => ({
    height: "100%",
    padding: "50px 32px 22px 32px",
    position: "relative",
    background: "rgba(0, 0, 0, 0.01)",
  }));

  const [loading, setLoading] = useState(false);

  


  // inital login credentials
const initialValues = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};
const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Mật khẩu cũ không được để trống!"),
  password: Yup.string().min(6, 'Password phải tối thiểu 6 kí tự').required("Mật khẩu không được trống!"),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng khớp')
  .required("Xác nhận mật khẩu không được để trống!")
});

  const handleFormSubmit = async (values) => {
    try {
      const idUser = localStorage.getItem('userId');
      const response =  await AuthApi.ChangePassword(idUser,  values.confirmPassword ,values.oldPassword)
      if(response.status === 200){
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
      if(response.status === 202){
        Swal.fire({
          position: "center",
          icon: "error",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
      if(response.status === 203){
        Swal.fire({
          position: "center",
          icon: "error",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
       
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Container style={{display:"flex" ,justifyContent:"center",alignItems:"center"}}>
     <Card sx={{ width: 500}}>
      <Grid container >
       <Grid xs={12}>
        <ContentBox >
        <h3>Đổi mật khẩu </h3>
        <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                     <TextField
                      fullWidth
                      type="password"
                      name="oldPassword"
                      label="Mật khẩu cũ"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.oldPassword}
                      onChange={handleChange}
                      helperText={touched.oldPassword && errors.oldPassword}
                      error={Boolean(errors.oldPassword && touched.oldPassword)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      type="password"
                      name="password"
                      label="Mật mới"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      name="confirmPassword"
                      type="password"
                      label="Xác nhận mật khẩu"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      onChange={handleChange}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                      error={Boolean(errors.confirmPassword && touched.confirmPassword)}
                      sx={{ mb: 1.5 }}
                    />
                    <LoadingButton
                      type="submit"
                      // color="#70ad56"
                      style={{
                        background: "black",
                        color: "#fff",
                      }}
                      loading={loading}
                      variant="contained"
                      sx={{ my: 3, width: "100%" }}
                    >
                      Đổi mật khẩu
                    </LoadingButton>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                
                    </Box>
                  </form>
                )}
              </Formik>
           
        </ContentBox>
     
       </Grid>
      </Grid>

    </Card>
    </Container>
  
  )
}

export default ChangePassword