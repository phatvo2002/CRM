import { Button, Grid2, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GetAppIcon from "@mui/icons-material/GetApp";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import DevicesIcon from "@mui/icons-material/Devices";
import ModalLoaiHangHoa from "./Modal/ModalLoaiHangHoa";
import ModalDonViTinh from "./Modal/ModalDonViTinh";
import { useGetAllHangHoaQuery } from "src/App/Api/HangHoa";
const index = () => {
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
              // onClick={handleOpenModalUpdateLoaiHangHoa}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton
              disabled={selectedRow.length === 0}
              style={{}}
              // onClick={handleDeleteLoaiHangHoa}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    { field: "maHangHoa", headerName: "Mã hàng hóa", width: 200 },
    { field: "tenHangHoa", headerName: "Tên hàng hóa", width: 200 },
    { field: "moTa", headerName: "Mô tả", width: 200 },
    { field: "donGia", headerName: "Đơn giá", width: 200 },
  ];
  const [modalAddHangHoa, setModalAddHangHoa] = useState(false),
    [modalImport, setModalImport] = useState(false),
    [modalUpdate, setModalUpdate] = useState(false),
    [selectedRow, setSelectedRow] = useState([]),
    [modalLoaiHangHoa, setModalLoaiHangHoa] = useState(false),
    [modalDonViTinh, setModalDonViTinh] = useState(false),
    [row, setRows] = useState([]);
  const { data: hangHoa, refetch: isloadinghanghoa } = useGetAllHangHoaQuery();
  const handleOpenModalLoaiHangHoa = () => {
    setModalLoaiHangHoa(true);
  };
  const handleCloseModalLoaihangHoa = () => {
    setModalLoaiHangHoa(false);
  };
  const handleOpenModalDonViTinh = () => {
    setModalDonViTinh(true);
  };
  const handleCloseModalDonViTinh = () => {
    setModalDonViTinh(false);
  };
  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRow(selectedRows);
  };
  useEffect(() => {
    if (hangHoa) {
      setRows(hangHoa);
    }
  }, [hangHoa]);
  return (
    <div>
      <Grid2 container spacing={2}>
        <Grid2 size={4}>
          <h3>Hàng hóa</h3>
        </Grid2>
        <Grid2 size={8}>
          <Button variant="outlined" color="success" startIcon={<GetAppIcon />}>
            Xuất Template
          </Button>
          <Button
            variant="outlined"
            color="warning"
            sx={{ marginLeft: 1 }}
            startIcon={<FileDownloadDoneIcon />}
          >
            IMPORT
          </Button>
          <Button
            variant="outlined"
            sx={{ marginLeft: 1 }}
            startIcon={<Inventory2Icon />}
          >
            Thêm hàng hóa
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ marginLeft: 1 }}
            startIcon={<CategoryIcon />}
            onClick={handleOpenModalLoaiHangHoa}
          >
            Loại Hàng hóa
          </Button>
          <Button
            variant="outlined"
            color="warning"
            sx={{ marginLeft: 1 }}
            startIcon={<DevicesIcon />}
            onClick={handleOpenModalDonViTinh}
          >
            Đơn vị tính
          </Button>
        </Grid2>
        <Grid2 size={12}>

        </Grid2>
      </Grid2>
      {/* Loại hàng hóa */}
      <ModalLoaiHangHoa
        modalLoaiHangHoa={modalLoaiHangHoa}
        handleCloseModalLoaihangHoa={handleCloseModalLoaihangHoa}
      />
      {/* đơn vị tính */}
      <ModalDonViTinh
        modalDoViTinh={modalDonViTinh}
        handleCloseModalDonViTinh={handleCloseModalDonViTinh}
      />
    </div>
  );
};

export default index;
