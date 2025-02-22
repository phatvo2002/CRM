import { Typography, Paper } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetCuocGoiChuaHoanThanhByIdQuery } from "src/App/Api/CuocGoiApi";
import { DataGrid } from "@mui/x-data-grid";

const CuocGoiChuaHoanThanhTab = () => {
  const { id } = useParams();
  const {
    data: dataCuocGoi,
    isLoading,
    isError,
  } = useGetCuocGoiChuaHoanThanhByIdQuery(id);

  if (isLoading) return <p>Đang tải...</p>;
  if (isError) return <p>Lỗi tải dữ liệu</p>;

  const rows =
    dataCuocGoi && Array.isArray(dataCuocGoi)
      ? dataCuocGoi.map((callData, index) => ({
          id: callData.id || index,
          tieuDe: callData.tieuDe || "Không có dữ liệu",
          moTa: callData.moTa || "Không có dữ liệu",
          ngayBatDau: callData.ngayBatDau
            ? new Date(callData.ngayBatDau).toLocaleDateString("vi-VN")
            : "Không có dữ liệu",
          soPhutGoi: callData.soPhutGoi || "Không có dữ liệu",
          soGiayGoi: callData.soGiayGoi || "Không có dữ liệu",
          trangThai: callData.isHoanThanh ? "Đã liên lạc" : "Đang tiến hành",
        }))
      : [];

  const columns = [
    {
      field: "tieuDe",
      headerName: "Tiêu đề",
      headerAlign: "center",
      align: "center",
      width: 250,
    },
    {
      field: "moTa",
      headerName: "Mô tả",
      headerAlign: "center",
      align: "center",
      width: 250,
    },
    {
      field: "ngayBatDau",
      headerName: "Ngày bắt đầu",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "soPhutGoi",
      headerName: "Số phút gọi",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "soGiayGoi",
      headerName: "Số giây gọi",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "trangThai",
      headerName: "Trạng thái",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
  ];

  return (
    <>
      <Typography
        sx={{ margin: 2, fontWeight: "bold" }}
        variant="h5"
        component="h5"
      >
        Cuộc gọi đang thực hiện
      </Typography>
      <Paper sx={{ margin: 2, height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Paper>
    </>
  );
};

export default CuocGoiChuaHoanThanhTab;
