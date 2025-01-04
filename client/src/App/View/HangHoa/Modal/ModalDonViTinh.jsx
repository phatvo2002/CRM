import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TYPE_MODAL } from "src/App/Until/constant";
import ModalAddDonViTinh from "./Modal/ModalAddDonViTinh";
import ModalUpdateDonViTinh from "./Modal/ModalUpdateDonViTinh";
import {
  useDeleteLoaiHangHoaMutation,
  useGetAllLoaiHangHoaQuery,
} from "src/App/Api/LoaiHangHoa";
import CustomDatagrid from "src/App/Components/DataGrid/CustomDatagrid";
import "../HangHoa.css";
import { toast } from "react-toastify";
import { useAddDonViTinhMutation, useDeleteDonViTinhMutation, useGetAllDonViTinhQuery } from "src/App/Api/DonViTinh";
const ModalDonViTinh = ({ modalDoViTinh, handleCloseModalDonViTinh }) => {
  const columns = [
    {
      field: "action",
      width: 120,
      headerName: "Thao tác",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 5,
            margin: 5,
          }}
        >
          <Tooltip title="Sửa thông tin ">
            <IconButton
              disabled={selectedRow.length === 0}
              style={{}}
              onClick={handleOpenModalUpdateDonViTinh}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton
              disabled={selectedRow.length === 0}
              style={{}}
              onClick={handleDeleteDonViTinh}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    { field: "name", headerName: "Tên đơn vị", width: 200 },
    { field: "tiLeChuyenDoi", headerName: "Tỉ lệ chuyển đổi", width: 200 },
    { field: "moTa", headerName: "Mô tả", width: 200 },
  ];
  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [rows, setRows] = useState([]);
  const [typeModal, setTypeModal] = useState("");
  const { data: dataDonViTinh, refetch: isLoadingdonvitinh } =
  useGetAllDonViTinhQuery();
  const [deleteLoaiHangHoa] = useDeleteLoaiHangHoaMutation();
  const handleOpenModalAddDonViTinh = () => {
    setModalAdd(true);
    setTypeModal(TYPE_MODAL.INSERT);
  };
  const handleCloseModalAddDonViTinh = () => {
    setModalAdd(false);
    setTypeModal("");
  };
  const handleOpenModalUpdateDonViTinh= () => {
    setModalUpdate(true);
    setTypeModal(TYPE_MODAL.UPDATE);
  };
  const handleCloseModalUpdateDonViTinh = () => {
    setModalUpdate(false);
    setTypeModal("");
  };
  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRow(selectedRows);
  };
  useEffect(() => {
    if (dataDonViTinh) {
      setRows(dataDonViTinh);
    }
  }, [dataDonViTinh]);
  const [deleteDonViTinh] = useDeleteDonViTinhMutation()

  const handleDeleteDonViTinh = async () => {
      await deleteDonViTinh(selectedRow[0]?.id);
      toast.success("Xóa thành công");
      isLoadingdonvitinh();
  };
  return (
    <div>
      {" "}
      <Dialog
        open={modalDoViTinh}
        keepMounted
        maxWidth="sm"
        fullWidth={true}
        onClose={handleCloseModalDonViTinh}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Đơn vị tính"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid2 container spacing={2}>
              <Grid2 size={12}>
                <Button
                  variant="outlined"
                  sx={{ marginLeft: 1 }}
                  startIcon={<Inventory2Icon />}
                  color="inherit"
                  onClick={handleOpenModalAddDonViTinh}
                >
                  Thêm đơn vị tính
                </Button>
              </Grid2>
              <Grid2>
                <CustomDatagrid
                  rows={rows}
                  columns={columns}
                  pageSizeOptions={[10, 25, 50]}
                  initialPageSize={25}
                  checkboxSelection={false}
                  showTopToolbar={true}
                  onRowSelectionChange={handleRowSelectionChange}
                />
              </Grid2>
            </Grid2>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalDonViTinh}>Đóng</Button>
        </DialogActions>
      </Dialog>
      <ModalAddDonViTinh
          closeModal={handleCloseModalAddDonViTinh}
          typeModal={typeModal}
          setTypeModal={setTypeModal}
          showModal={modalAdd}
          refetch={isLoadingdonvitinh}
        />
        <ModalUpdateDonViTinh
          selectedItem={selectedRow}
          closeModal={handleCloseModalUpdateDonViTinh}
          typeModal={typeModal}
          setTypeModal={setTypeModal}
          showModal={modalUpdate}
          refetch={isLoadingdonvitinh}
        />
    </div>
  );
};

export default ModalDonViTinh;
