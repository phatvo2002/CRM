import { LoadingButton } from "@mui/lab";
import { Card, CircularProgress, Grid, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";
// import { GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../../Context/AuthContext";
import { Formik } from "formik";
import { useState, useContext, useRef, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as Yup from "yup";
import logo from "../../Assets/image/logo.png";
import { keyframes } from "@mui/system";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { toast } from "react-toastify";
const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  padding: "50px 32px 22px 32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const slideDown = keyframes`
  0% {
    transform: translateY(-150px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const JWTRoot = styled(JustifyBox)(() => ({
  background: "#f8fbf8",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  minHeight: "100% !important",
  animation: `${slideDown} 1s ease-out`,
  "& .card": {
    maxWidth: "80%",
    // minHeight: 400,
    // margin: '1rem',
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },
}

));

// inital login credentials
const initialValues = {
  UserName: "",
  password: "",
  remember: false,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    // .min(6, 'Password must be 6 character length')
    .required("Mật khẩu không được trống!"),
  UserName: Yup.string().required("Tên tài khoản không được trống!"),
});

const JwtLogin = () => {

  const captchaInputRef = useRef(null);
  // const userCaptcha = captchaInputRef.current?.value || '';
  const [userCaptcha, setUserCaptcha] = useState("");
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [loading, setLoading] = useState(false);

  // const handleFormSubmit = async (values) => {
  //   if (validateCaptcha(userCaptcha) === true) {
  //     loadCaptchaEnginge(6)
  //     captchaInputRef.current.value = '';
  //     setLoading(true);
  //     try {
  //       await login(values.UserName, values.password);
  //       // navigate("/user/profile");
  //       // Swal.fire({
  //       //   title: "Đăng nhập thành công!",
  //       //   icon: "success",
  //       // });
  //     } catch (e) {
  //       setLoading(false);
  //     }
  //   }
  //   else {
  //     toast.error("Mã kiểm tra không đúng")
  //     if (captchaInputRef.current) {
  //       captchaInputRef.current.value = '';
  //     }
  //   }
  // };
  const handleFormSubmit = async (values) => {
    if (validateCaptcha(userCaptcha)) { 
      loadCaptchaEnginge(6); 
      captchaInputRef.current.value = ""; 
      setUserCaptcha("");
      setLoading(true);
      try {
        await login(values.UserName, values.password);
        // navigate("/user/profile");
        // Swal.fire({
        //   title: "Đăng nhập thành công!",
        //   icon: "success",
        // });
      } catch (e) {
        setLoading(false);
      }
    } else {
      toast.error("Mã kiểm tra không đúng");
      if (captchaInputRef.current) {
        captchaInputRef.current.value = ""; 
      }
      setUserCaptcha(""); 
    }
  };
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={12} xs={12}>
            <ContentBox>
              <Box textAlign={"center"} color={"gray"}>
                <img
                  src={logo}
                  style={{ textAlign: "center", width: "200px" }}
                />
                <h2>PHẦN MỀM QUẢN LÝ QUAN HỆ KHÁCH HÀNG </h2>
                <h2>LPCRM</h2>
              </Box>

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
                      type="text"
                      name="UserName"
                      label="Tên đăng nhập"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.UserName}
                      onChange={handleChange}
                      helperText={touched.UserName && errors.UserName}
                      error={Boolean(errors.UserName && touched.UserName)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      name="password"
                      // type="password"
                      label="Mật khẩu"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      type={'password' && showPassword ? 'text' : 'password'}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                      InputProps={{
                        ...('password' && {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }),
                      }}
                    />
                    <FlexBox justifyContent="space-between">
                      {/* <FlexBox gap={1}>
                        <Checkbox
                          size="small"
                          name="remember"
                          onChange={handleChange}
                          checked={values.remember}
                          sx={{ padding: 0 }}
                        />

                        <Paragraph>Remember Me</Paragraph>
                      </FlexBox> */}
                      {/* 
                      <NavLink
                        to="/session/forgot-password"
                        style={{ color: "black" }}
                      >
                        Quên mật khẩu?
                      </NavLink> */}
                    </FlexBox>
                    <div style={{ textAlign: 'center' }}>
                      <LoadCanvasTemplate reloadText="Reload Captcha" reloadColor="red" />
                    </div>

                    <TextField
                      id="user_captcha_input"
                      label="Nhập mã kiểm tra"
                      fullWidth
                      name="user_captcha_input"
                      type="text"
                      inputRef={captchaInputRef}
                      onChange={(e) => setUserCaptcha(e.target.value)}
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
                      {loading ? (<><CircularProgress color="success" /></>) : (<>ĐĂNG NHẬP</>)}
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
    </JWTRoot>
  );
};

export default JwtLogin;
