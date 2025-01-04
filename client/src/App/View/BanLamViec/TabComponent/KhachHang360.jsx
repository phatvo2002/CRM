import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import BusinessIcon from "@mui/icons-material/Business";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CustomerChart from "./Component/CustomerChart";

const cardsData = [
  { title: "Tổng khách hàng", value: "5231", color: "#673ab7", percent: null }, // Màu tím
  {
    title: "Khách hàng tạo mới",
    value: "360",
    color: "#3f51b5",
    percent: "5%",
  }, // Màu xanh đậm
  {
    title: "Khách hàng mua hàng",
    value: "36",
    color: "#03a9f4",
    percent: "5%",
  }, // Màu xanh dương
  { title: "KH mua lần đầu", value: "7", color: "#ff9800", percent: "40%" }, // Màu cam
  {
    title: "Khách hàng mua lại",
    value: "29",
    color: "#ffb300",
    percent: "16%",
  }, // Màu vàng cam
];

export const KhachHang360 = () => {
  const [form1, setForm1] = React.useState("");
  const [form2, setForm2] = React.useState("");
  const handleChange1 = (e) => {
    setForm1(e.target.value);
  };
  const handleChange2 = (e) => {
    setForm2(e.target.value);
  };
  return (
    <>
      {/* Cấu hình khách hàng */}
      <div className="customer_settings">
        <div
          className="customer_filter"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <FormControl
            sx={{
              position: "relative",
              m: 1,
              minWidth: "150px",
              minHeight: "30px",
            }}
          >
            <InputLabel
              sx={{ position: "absolute", top: "-6px", fontSize: "14px" }}
              id="demo-simple-select-label"
            >
              Cơ cấu tổ chức
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={form1}
              label="Age"
              onChange={handleChange1}
              sx={{
                minWidth: "80px",
                height: "40px",
                fontSize: "14px",
              }}
            >
              <MenuItem value={"Cơ cấu tổ chức theo chức năng"}>
                Cơ cấu tổ chức theo chức năng
              </MenuItem>
              <MenuItem value={"Cơ cấu tổ chức phân quyền"}>
                Cơ cấu tổ chức phân quyền
              </MenuItem>
              <MenuItem value={"Cơ cấu tổ chức ma trận"}>
                Cơ cấu tổ chức ma trận
              </MenuItem>
              <MenuItem value={"Cơ cấu tổ chức ma trận"}>
                Cơ cấu tổ chức ma trận
              </MenuItem>
              <MenuItem value={"Cơ cấu tổ chức phẳng"}>
                Cơ cấu tổ chức phẳng
              </MenuItem>
              <MenuItem value={"Cơ cấu tổ chức quản lý phi tập trung"}>
                Cơ cấu tổ chức quản lý phi tập trung
              </MenuItem>
            </Select>
          </FormControl>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              margin: "0 5px",
            }}
          >
            <TextField
              id="outlined-basic"
              sx={{
                position: "relative",
                width: "250px", // Đặt chiều rộng nhỏ hơn
                "& .MuiInputBase-root": {
                  height: "40px", // Chiều cao của ô nhập
                  fontSize: "14px", // Kích thước chữ nhỏ hơn
                },
                "& .MuiInputLabel-root": {
                  position: "absolute",
                  top: "-6px",
                  fontSize: "14px", // Kích thước nhãn nhỏ hơn
                },
              }}
              label="Tên công ty"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <BusinessIcon
                      style={{ marginRight: "8px", color: "#666" }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <FormControl
            sx={{
              position: "relative",
              m: 1,
              minWidth: "150px",
              minHeight: "30px",
            }}
          >
            <InputLabel
              sx={{ position: "absolute", top: "-6px", fontSize: "14px" }}
              id="demo-simple-select-label"
            >
              Năm nay
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={form2}
              label="Năm nay"
              onChange={handleChange2}
              sx={{
                minWidth: "80px", // Giảm chiều rộng của Select
                height: "40px", // Giảm chiều cao của Select
                fontSize: "14px", // Giảm kích thước chữ
              }}
            >
              <MenuItem value={2020}>2020</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2024}>2024</MenuItem>
            </Select>
          </FormControl>

          <RefreshIcon sx={{ color: "#bbb", mx: "5px", cursor: "pointer" }} />
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            sx={{
              position: "absolute",
              top: "-50px",
              right: "60px",
              textTransform: "none",
              borderRadius: "8px",
              borderColor: "#d3d3d3",
              color: "#000",
            }}
          >
            Sửa
          </Button>

          <IconButton
            sx={{
              position: "absolute",
              top: "-52px",
              // right: "80px",
              backgroundColor: "#fff", // Màu nền trắng
              borderRadius: "8px", // Bo góc
              border: "1px solid #d3d3d3", // Viền
              padding: "8px", // Khoảng cách bên trong
              boxShadow: "none", // Loại bỏ bóng (nếu có)
              "&:hover": {
                backgroundColor: "#f5f5f5", // Màu khi hover
              },
            }}
          >
            <MoreHorizIcon sx={{ color: "#666" }} />{" "}
            {/* Biểu tượng dấu ba chấm */}
          </IconButton>
        </div>

        <div className="customer_card">
          <Typography
            variant="h2"
            sx={{
              my: "12px",
              mx: "5px",
              fontSize: "18px",
              lineHeight: 1,
              color: "#660000",
              fontWeight: "bold",
            }}
          >
            Tổng quan khách hàng 360
          </Typography>
          <Grid
            container
            spacing={2} // Khoảng cách giữa các thẻ
            sx={{
              justifyContent: "space-evenly", // Căn đều khoảng cách các thẻ
              flexWrap: "wrap", // Đảm bảo xuống hàng nếu không đủ chỗ
            }}
          >
            {cardsData.map((card, index) => (
              <Grid
                item
                key={index}
                xs={12} // Toàn bộ chiều rộng trên màn hình nhỏ
                sm={6} // Chia đều 2 thẻ trên màn hình nhỏ hơn
                md={4} // Chia đều 3 thẻ trên màn hình trung bình
                lg={2.4} // Chia đều 5 thẻ trên màn hình lớn hơn
              >
                <Card
                  sx={{
                    bgcolor: card.color,
                    color: "white",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    p: 2, // Padding nhỏ hơn
                    width: "200px", // Tự động co giãn
                    height: "100px", // Đảm bảo chiều cao bằng nhau
                  }}
                >
                  <CardContent
                    sx={{
                      p: 0,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        mb: "12px",
                        fontSize: "14px",
                        lineHeight: 1.2,
                        fontWeight: "bold",
                      }}
                    >
                      {card.title}
                    </Typography>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "30px", // Font chữ lớn hơn
                          lineHeight: 1,
                          mr: 0.5,
                        }}
                      >
                        {card.value}
                      </Typography>
                      {card.percent && (
                        <div
                          style={{
                            display: "flex",
                            backgroundColor: "#fff",
                            alignItems: "center",
                            color: "#673ab7",
                            padding: "4px 10px",
                            fontSize: "12px", // Font chữ lớn hơn
                          }}
                        >
                          <ArrowDropUpIcon sx={{ fontSize: "1.2rem" }} />
                          {card.percent}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      {/* Cấu hình khách hàng */}

      <div className="bg-white shadow-md p-4 rounded-lg flex-1 min-w-[300px]">
        <CustomerChart />
      </div>
    </>
  );
};

export default KhachHang360;
