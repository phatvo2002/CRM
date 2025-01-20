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
import ModalAddLoaihangHoa from "./Modal/ModalAddLoaihangHoa";
import ModalUpdateLoaiHangHoa from "./Modal/ModalUpdateLoaiHangHoa";
import {
  useDeleteLoaiHangHoaMutation,
  useGetAllLoaiHangHoaQuery,
} from "src/App/Api/LoaiHangHoa";
import CustomDatagrid from "src/App/Components/DataGrid/CustomDatagrid";
import "../HangHoa.css";
import { toast } from "react-toastify";
const ModalLoaiHangHoa = ({
  modalLoaiHangHoa,
  handleCloseModalLoaihangHoa,
}) => {
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
              onClick={handleOpenModalUpdateLoaiHangHoa}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton
              disabled={selectedRow.length === 0}
              style={{}}
              onClick={handleDeleteLoaiHangHoa}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    { field: "name", headerName: "Tên loại hàng hóa", width: 300 },
  ];
  const [modalAddLoaihangHoa, setModalAddLoaihangHoa] = useState(false);
  const [modalUpdateLoaihangHoa, setModalUpdateLoaihangHoa] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [typeModal, setTypeModal] = useState("");
  const { data: dataLoaiHangHoa, refetch: isLoadingloaihangHoa } =
    useGetAllLoaiHangHoaQuery();
  const [deleteLoaiHangHoa] = useDeleteLoaiHangHoaMutation();
  const handleOpenModalAddLoaihangHoa = () => {
    setModalAddLoaihangHoa(true);
    setTypeModal(TYPE_MODAL.INSERT);
  };
  const handleCloseModalAddLoaihangHoa = () => {
    setModalAddLoaihangHoa(false);
    setTypeModal("");
  };
  const handleOpenModalUpdateLoaiHangHoa = () => {
    setModalUpdateLoaihangHoa(true);
    setTypeModal(TYPE_MODAL.UPDATE);
  };
  const handleCloseModalUpdateHangHoa = () => {
    setModalUpdateLoaihangHoa(false);
    setTypeModal("");
  };
  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRow(selectedRows);
  };
  useEffect(() => {
    if (dataLoaiHangHoa) {
      setRows(dataLoaiHangHoa);
    }
  }, [dataLoaiHangHoa]);

  const handleDeleteLoaiHangHoa = async () => {
    try
    {
        await deleteLoaiHangHoa(selectedRow[0]?.id);
        toast.success("Xóa thành công");
        isLoadingloaihangHoa();
    }catch {
        toast.error("Loại hàng hóa đang tồn tại trong hàng hóa nên không thể xóa");
    }
   
  };
  return (
    <div>
      {" "}
      <Dialog
        open={modalLoaiHangHoa}
        keepMounted
        maxWidth="xs"
        fullWidth={true}
        onClose={handleCloseModalLoaihangHoa}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Loại hàng hóa"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid2 container spacing={2}>
              <Grid2 size={12}>
                <Button
                  variant="outlined"
                  sx={{ marginLeft: 1 }}
                  startIcon={<Inventory2Icon />}
                  color="inherit"
                  onClick={handleOpenModalAddLoaihangHoa}
                >
                  Thêm Loại hàng hóa
                </Button>
              </Grid2>
              <Grid2>
                <CustomDatagrid
                  rows={rows}
                  columns={columns}
                  pageSizeOptions={[10, 25, 50]}
                  initialPageSize={25}
                  checkboxSelection={true}
                  showTopToolbar={true}
                  onRowSelectionChange={handleRowSelectionChange}
                />
              </Grid2>
            </Grid2>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalLoaihangHoa}>Đóng</Button>
        </DialogActions>
      </Dialog>
      <ModalAddLoaihangHoa
        closeModal={handleCloseModalAddLoaihangHoa}
        typeModal={typeModal}
        setTypeModal={setTypeModal}
        showModal={modalAddLoaihangHoa}
        refetch={isLoadingloaihangHoa}
      />
      <ModalUpdateLoaiHangHoa
        selectedItem={selectedRow}
        closeModal={handleCloseModalUpdateHangHoa}
        typeModal={typeModal}
        setTypeModal={setTypeModal}
        showModal={modalUpdateLoaihangHoa}
        refetch={isLoadingloaihangHoa}
      />
    </div>
  );
};

export default ModalLoaiHangHoa;
