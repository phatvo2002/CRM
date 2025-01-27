import { Button, Chip, Grid2, IconButton, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { ModalThemNhiemVu } from "./Modal/ModalThemNhiemVu";
import ModalUpdateNhiemVu from "./Modal/ModalUpdateNhiemVu";
import {
  useDeleteNhiemVuMutation,
  useGetNhiemVuByPhongBanIdQuery,
} from "src/App/Api/NhiemVuApi";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomDatagrid from "src/App/Components/DataGrid/CustomDatagrid";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Moment from "react-moment";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import Swal from "sweetalert2";
const DanhSach = () => {
  const columnsNhiemVu = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 100,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}>
          <IconButton
            style={{}}
            disabled={selectedRowNhiemVu.length === 0}
            onClick={handleOpenModalUpdate}
          >
            <CreateIcon color="primary"></CreateIcon>
          </IconButton>
          <IconButton
            style={{ margin: "0 10px" }}
            disabled={selectedRowNhiemVu.length === 0}
            onClick={() => handleDeleteNhiemVu(selectedRowNhiemVu[0]?.id)}
          >
            <DeleteIcon color="error"></DeleteIcon>
          </IconButton>
        </div>
      ),
    },
    {
      field: "trangThaiThucHien",
      headerName: "Trạng thái thực hiện",
      width: 200,
      renderCell: (params) => {
        const status = params?.row?.trangThaiThucHien?.name;
        const style = {
          color: "white",
          backgroundColor:
            status === "Hoàn thành"
              ? "#4caf50"
              : status === "Đang thực hiện"
                ? "#ffc400"
                : status === "Chưa thực hiện "
                  ? "#ff1744"
                  : "gray",
          borderRadius: "30px",
          fontStyle: "bold",
        };

        return (
          <Chip
            icon={<AssignmentIcon color="white" />}
            sx={style}
            label={status}
            variant="filled"
          />
        );
      },
    },
    {
      field: "mucDoUuTien",
      headerName: "Mức độ ưu tiên",
      width: 200,
      renderCell: (params) => {
        const status = params?.row?.mucDoUuTien?.name;
        const style = {
          color: "white",
          backgroundColor:
            status == "Cao"
              ? "#b2102f"
              : status === "Trung bình"
                ? "#b28704"
                : status === "Thấp"
                  ? "#357a38"
                  : status === "Không xác định"
                    ? "black"
                    : "gray",
          borderRadius: "30px",
          fontStyle: "bold",
        };
        return (
          <div>
            {status === "Cao" ? (
              <div>
                <Chip
                  icon={<ShowChartIcon color="white" />}
                  sx={style}
                  label={params?.row?.mucDoUuTien?.name}
                  variant="filled"
                />
              </div>
            ) : (
              <div>
                <Chip
                  icon={<LinearScaleIcon color="white" />}
                  sx={style}
                  label={params?.row?.mucDoUuTien?.name}
                  variant="filled"
                />
              </div>
            )}
          </div>
        );
      },
    },
    {
      field: "nguoidung",
      headerName: "Nhân viên thực hiện",
      width: 200,
      renderCell: (params) => {
        return params?.row?.nguoiDung?.ten ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <AssignmentIndIcon style={{ padding: 2 }} color="warning" />
            <span>
              {" "}
              {params?.row?.nguoiDung?.hoVaDem} {params?.row?.nguoiDung?.ten}
            </span>
          </div>
        ) : (
          <div></div>
        );
      },
    },
    { field: "tieuDe", headerName: "Tiêu đề", width: 200 },
    { field: "moTa", headerName: "Mô tả", width: 200 },
    {
      field: "",
      headerName: "Hạn hoàn thành",
      width: 200,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}>
          <Moment format="DD/MM/YYYY HH:SS">
            {new Date(params?.row?.hanHoanThanh)}
          </Moment>
        </div>
      ),
    },

    // { field: "createAt", headerName: "Ngày tạo", width: 200, flex: 1 },
  ];
  const [modalAdd, setModalAdd] = useState(false),
    [modalUpdate, setModalUpdate] = useState(false),
    handleOpenModal = () => setModalAdd(true),
    handleCloseModal = () => setModalAdd(false),
    [rowNhiemVu, setRowNhiemVu] = useState([]),
    [deleteNhiemVu] = useDeleteNhiemVuMutation(),
    { data: dataNhiemVu, refetch } = useGetNhiemVuByPhongBanIdQuery(),
    [selectedRowNhiemVu, setSelectedRowNhiemVu] = useState([]),
    handleRowNhiemVuSelectionChange = (selectedRows) => {
      setSelectedRowNhiemVu(selectedRows);
    },
    handleOpenModalUpdate = () => setModalUpdate(true),
    handleCloseModalUpdate = () => setModalUpdate(false);
  useEffect(() => {
    if (dataNhiemVu) {
      setRowNhiemVu(dataNhiemVu);
    }
  }, [dataNhiemVu]);

  const handleDeleteNhiemVu = async (id) => {
    Swal.fire({
      title: "Bạn có muốn xóa nhiệm vụ này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteNhiemVu(id);
        Swal.fire({
          title: "Xóa thành công",
          icon: "success",
        });
        refetch();
      }
    });
  };

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <Button
            variant="contained"
            sx={{ marginLeft: 1 }}
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
          >
            Thêm mới
          </Button>
        </Grid2>
        <Paper sx={{ width: "100%" }}>
          <Grid2 size={12}>
            <CustomDatagrid
              rows={rowNhiemVu}
              columns={columnsNhiemVu}
              pageSizeOptions={[10, 25, 50]}
              initialPageSize={25}
              checkboxSelection={true}
              showTopToolbar={true}
              onRowSelectionChange={handleRowNhiemVuSelectionChange}
            />
          </Grid2>
        </Paper>
      </Grid2>
      {/* Modal thêm */}
      <ModalThemNhiemVu
        showModal={modalAdd}
        closeModal={handleCloseModal}
        refetch={refetch}
      />
      {/* Modal update */}
      <ModalUpdateNhiemVu
        showModal={modalUpdate}
        closeModal={handleCloseModalUpdate}
        refetch={refetch}
        selectedItem={selectedRowNhiemVu}
      />
    </>
  );
};

export default DanhSach;
