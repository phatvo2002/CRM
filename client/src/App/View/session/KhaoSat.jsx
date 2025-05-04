import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const KhaoSat = () => {
    const [surveyData, setSurveyData] = useState({
        traiNghiemMuaSam: "",
        traiNghiemTuVan: "",
        traiNghiemTiepTheo: "",
        danhgiatongthe: "",
        yKienKhac :""
      });

    const handleChangeData = (e)=>
    {
        const {name , value} = e.target
        setSurveyData((prev) => ({ ...prev, [name]: value }))
    }
  return (
    <React.Fragment>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              Khảo Sát Sau Đơn Hàng
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Vui lòng chia sẻ ý kiến của bạn để chúng tôi cải thiện dịch vụ!
            </Typography>

            {/* {submitted && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Cảm ơn bạn đã gửi phản hồi!
              </Alert>
            )} */}

            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ fontWeight: 'bold', mb: 1 }}>
                  1. Bạn hài lòng đến mức nào với trải nghiệm mua sắm?
                </FormLabel>
                <RadioGroup
                  name="traiNghiemMuaSam"
                  value={surveyData.traiNghiemMuaSam}
                  onChange={handleChangeData}
                  row
                >
                  <FormControlLabel value="Rất không hài lòng" control={<Radio />} label="Rất Không hài lòng" />
                  <FormControlLabel value="Không Hài lòng" control={<Radio />} label="Không Hài lòng" />
                  <FormControlLabel value="Bình thường" control={<Radio />} label="Bình thường" />
                  <FormControlLabel value="Hài lòng" control={<Radio />} label="Hài lòng" />
                  <FormControlLabel value="Rất hài lòng " control={<Radio />} label="Rất hài lòng" />
                </RadioGroup>
              </FormControl>

              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ fontWeight: 'bold', mb: 1 }}>
                  2. Nhân viên kinh doanh có tư vấn rõ ràng và dễ hiểu không?
                </FormLabel>
                <RadioGroup
                  name="traiNghiemTuVan"
                   value={surveyData.traiNghiemTuVan}
                   onChange={handleChangeData}
                  row
                >
                  <FormControlLabel value="Rất không hài lòng" control={<Radio />} label="Rất không hài lòng" />
                  <FormControlLabel value="Không hài lòng" control={<Radio />} label="Không hài lòng" />
                  <FormControlLabel value="Bình thường" control={<Radio />} label="Bình thường" />
                  <FormControlLabel value="hài lòng" control={<Radio />} label="hài lòng" />
                  <FormControlLabel value="Rất hài lòng" control={<Radio />} label="Rất hài lòng" />
                </RadioGroup>
              </FormControl>
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ fontWeight: 'bold', mb: 1 }}>
                  3. Bạn có sẵn sàng làm việc lại với nhân viên kinh doanh này trong các đơn hàng tiếp theo không ?
                </FormLabel>
                <RadioGroup
                  name="traiNghiemTiepTheo"
                  value={surveyData.traiNghiemTiepTheo}
                  onChange={handleChangeData}
                  row
                >
                  <FormControlLabel value="Có" control={<Radio />} label="Có" />
                  <FormControlLabel value="Không " control={<Radio />} label="Không " />
                </RadioGroup>
              </FormControl>
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ fontWeight: 'bold', mb: 1 }}>
                  4. Bạn đánh giá tổng thể thế nào về dịch vụ của nhân viên kinh doanh  ?
                </FormLabel>
                <RadioGroup
                  name="danhgiatongthe"
                  value={surveyData.danhgiatongthe}
                  onChange={handleChangeData}
                  row
                >
                  <FormControlLabel value="1" control={<Radio />} label="1 ☆ " />
                  <FormControlLabel value="2" control={<Radio />} label="2 ☆" />
                  <FormControlLabel value="3" control={<Radio />} label="3 ☆" />
                  <FormControlLabel value="4" control={<Radio />} label="4 ☆" />
                  <FormControlLabel value="5" control={<Radio />} label="5 ☆" />
                </RadioGroup>
              </FormControl>

              
              <FormControl>
                <FormLabel sx={{ fontWeight: 'bold', mb: 1 }}>
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
                // onClick={handleSubmit}
                sx={{ mt: 2, alignSelf: 'flex-end' }}
              >
                Gửi Phản Hồi
              </Button>
            </Box>
          </Paper>
        </Container>
    </React.Fragment>
  )
}

export default KhaoSat