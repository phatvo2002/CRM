import { LoadingButton } from "@mui/lab";
import { Card, Grid, TextField } from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
// import { GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toastr from "toastr";
import * as Yup from "yup";
import { blue } from "@mui/material/colors";
import logo from "../../Assets/image/logo.png";
import { keyframes } from "@mui/system";
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
}));

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
  const theme = useTheme();
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.UserName, values.password);
      navigate("/user/profile");
      Swal.fire({
        title: "Đăng nhập thành công!",
        icon: "success",
      });
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={12} xs={12}>
            <ContentBox>
              <Box textAlign={"center"} color={"gray"}>
                {/* <h3>TRƯỜNG ĐẠI HỌC TÀI CHÍNH MARKETING</h3> */}
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
                      type="password"
                      label="Mật khẩu"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
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

                      <NavLink
                        to="/session/forgot-password"
                        style={{ color: "black" }}
                      >
                        Quên mật khẩu?
                      </NavLink>
                    </FlexBox>
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
                      ĐĂNG NHẬP
                    </LoadingButton>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      {/* <GoogleLogin
                        onSuccess={async (credentialResponse) => {
                          const res = await axios.post(
                            `v2/auths/login_google`,
                            {
                              idToken: credentialResponse?.credential,
                            }
                          );
                          if (res?.data?.succeed) {
                            await loginWithGoogle(res);
                            navigate("/");
                          } else {
                            toastr.error(res?.data?.message);
                          }
                        }}
                        onError={() => {
                          toastr.error("Login Failed");
                        }}
                      /> */}
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
