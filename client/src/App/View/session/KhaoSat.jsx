import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetGetDonHangByIdQuery } from "src/App/Api/DonHangApi";
import { useCreateMutation } from "src/App/Api/KhaoSat.api";
import { v4 as uuidv4 } from "uuid";
const KhaoSat = () => {
  const { donhangid } = useParams();
  const [surveyData, setSurveyData] = useState({
    traiNghiemMuaSam: "",
    traiNghiemTuVan: "",
    traiNghiemTiepTheo: "",
    danhgiatongthe: "",
    yKienKhac: "",
  });
  const [donHangData, setDonHangData] = useState(null);
  const [sendEsurvey] = useCreateMutation();
  const { data: donHang } = useGetGetDonHangByIdQuery(donhangid);
  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setSurveyData((prev) => ({ ...prev, [name]: value }));
  };

  const callApiSendAnswer = async () => {
    const tempData = {
      Id: uuidv4(),
      NhanVienId: donHangData?.nguoiDung?.id,
      DonHangId: donhangid,
      KhachHangId: donHangData?.maKhachHang,
      TenNhanVien: `${donHangData?.nguoiDung?.hoVaDem} ${donHangData?.nguoiDung?.ten}`,
      TenKhachHang: donHangData?.khachHangMucTieu?.tenKhachHang,
      TraiNghiemMuaSam: surveyData?.traiNghiemMuaSam,
      TraiNghiemTuVan: surveyData?.traiNghiemTuVan,
      TraiNghiemTiepTheo: surveyData?.traiNghiemTiepTheo,
      DanhGiaTongThe: surveyData?.danhgiatongthe,
      YKienKhac: surveyData?.yKienKhac,
      CreateAt: new Date(),
    };
    const response = await sendEsurvey(tempData);
    if (response?.data?.status === 200) {
      toast.success(
        "Cảm ơn quý khách đã khảo sát , chúc quý khách có một ngày vui vẻ "
      );
      setTimeout(() => {
        window.location.href = `https://mail.google.com/`;
      }, 1500);
    } else toast.error("Đã có lỗi xảy ra trong quá trình khảo sát");
  };

  useEffect(() => {
    if (donHang) setDonHangData(donHang);
    else setDonHangData([]);
  }, [donHang]);

  return (
    <React.Fragment>
      <Container maxWidth="sm" sx={{ py: 4, fontFamily: "Roboto, sans-serif" }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
          >
            Khảo Sát Sau Đơn Hàng
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
            Chúng tôi luôn nỗ lực nâng cao chất lượng sản phẩm và dịch vụ nhằm
            mang đến trải nghiệm tốt nhất cho khách hàng. Rất mong bạn dành ít
            phút để chia sẻ cảm nhận, đánh giá cũng như những góp ý chân thành
            về quá trình mua hàng vừa qua. Phản hồi của bạn là nguồn động lực
            quý giá để chúng tôi không ngừng hoàn thiện và phục vụ bạn tốt hơn
            trong tương lai.
          </Typography>

          {/* {submitted && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Cảm ơn bạn đã gửi phản hồi!
              </Alert>
            )} */}

          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <FormControl component="fieldset">
              <FormLabel sx={{ fontWeight: "bold", mb: 1 }}>
                1. Bạn hài lòng đến mức nào với trải nghiệm mua sắm?
              </FormLabel>
              <RadioGroup
                name="traiNghiemMuaSam"
                value={surveyData.traiNghiemMuaSam}
                onChange={handleChangeData}
                sx={{ flexDirection: "column", gap: 1 }}
              >
                <FormControlLabel
                  value="Rất không hài lòng"
                  control={<Radio />}
                  label="Rất Không hài lòng"
                />
                <FormControlLabel
                  value="Không Hài lòng"
                  control={<Radio />}
                  label="Không Hài lòng"
                />
                <FormControlLabel
                  value="Bình thường"
                  control={<Radio />}
                  label="Bình thường"
                />
                <FormControlLabel
                  value="Hài lòng"
                  control={<Radio />}
                  label="Hài lòng"
                />
                <FormControlLabel
                  value="Rất hài lòng "
                  control={<Radio />}
                  label="Rất hài lòng"
                />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ fontWeight: "bold", mb: 1 }}>
                2. Nhân viên kinh doanh có tư vấn rõ ràng và dễ hiểu không?
              </FormLabel>
              <RadioGroup
                name="traiNghiemTuVan"
                value={surveyData.traiNghiemTuVan}
                onChange={handleChangeData}
                sx={{ flexDirection: "column", gap: 1 }}
              >
                <FormControlLabel
                  value="Rất không hài lòng"
                  control={<Radio />}
                  label="Rất không hài lòng"
                />
                <FormControlLabel
                  value="Không hài lòng"
                  control={<Radio />}
                  label="Không hài lòng"
                />
                <FormControlLabel
                  value="Bình thường"
                  control={<Radio />}
                  label="Bình thường"
                />
                <FormControlLabel
                  value="hài lòng"
                  control={<Radio />}
                  label="hài lòng"
                />
                <FormControlLabel
                  value="Rất hài lòng"
                  control={<Radio />}
                  label="Rất hài lòng"
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ fontWeight: "bold", mb: 1 }}>
                3. Bạn có sẵn sàng làm việc lại với nhân viên kinh doanh này
                trong các đơn hàng tiếp theo không ?
              </FormLabel>
              <RadioGroup
                name="traiNghiemTiepTheo"
                value={surveyData.traiNghiemTiepTheo}
                onChange={handleChangeData}
                sx={{ flexDirection: "column", gap: 1 }}
              >
                <FormControlLabel value="Có" control={<Radio />} label="Có" />
                <FormControlLabel
                  value="Không "
                  control={<Radio />}
                  label="Không "
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ fontWeight: "bold", mb: 1 }}>
                4. Bạn đánh giá tổng thể thế nào về dịch vụ của nhân viên kinh
                doanh ?
              </FormLabel>
              <RadioGroup
                name="danhgiatongthe"
                value={surveyData.danhgiatongthe}
                onChange={handleChangeData}
                sx={{ flexDirection: "column", gap: 1 }}
              >
                <FormControlLabel value="1" control={<Radio />} label="1 ☆ " />
                <FormControlLabel value="2" control={<Radio />} label="2 ☆" />
                <FormControlLabel value="3" control={<Radio />} label="3 ☆" />
                <FormControlLabel value="4" control={<Radio />} label="4 ☆" />
                <FormControlLabel value="5" control={<Radio />} label="5 ☆" />
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel sx={{ fontWeight: "bold", mb: 1 }}>
                5. Bạn có đề xuất gì để chúng tôi cải thiện?
              </FormLabel>
              <TextField
                name="yKienKhac"
                value={surveyData.yKienKhac}
                onChange={handleChangeData}
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                placeholder="Nhập ý kiến của bạn..."
              />
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={callApiSendAnswer}
              sx={{ mt: 2, alignSelf: "flex-end" }}
              disabled={
                surveyData.danhgiatongthe == "" ||
                surveyData.traiNghiemMuaSam == "" ||
                surveyData.traiNghiemTiepTheo == "" ||
                surveyData.traiNghiemTuVan == ""
              }
            >
              Gửi Phản Hồi
            </Button>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default KhaoSat;
