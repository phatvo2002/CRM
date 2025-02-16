import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import { useGetCoHoiByIdQuery } from "src/App/Api/CoHoiApi";
import { useGetCuocGoiByIdQuery } from "src/App/Api/CuocGoiApi";

const CuocGoiHoanThanhTab = () => {
  const { id } = useParams();

  const { data: dataCuocGoi } = useGetCuocGoiByIdQuery(id);
  console.log(dataCuocGoi);

  return (
    <>
      <Typography
        sx={{ margin: 2, fontWeight: "bold" }}
        variant="h5"
        component="h5"
      >
        Cuộc gọi đã hoàn thành
      </Typography>
      <TableContainer component={Paper} sx={{ margin: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Thông tin</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Giá trị</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>{dataCuocGoi?.tieuDe}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mô tả</TableCell>
              <TableCell>{dataCuocGoi?.tenCoHoi}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ngày bắt đầu</TableCell>
              <TableCell>
                {dataCuocGoi?.ngayBatDau
                  ? new Date(dataCuocGoi.ngayBatDau).toLocaleDateString("vi-VN")
                  : ""}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Giai đoạn</TableCell>
              <TableCell>{dataCuocGoi?.giaiDoanBanHang?.tenGiaiDoan}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tỉ lệ thành công</TableCell>
              <TableCell>{dataCuocGoi?.tiLeThanhCong}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CuocGoiHoanThanhTab;
