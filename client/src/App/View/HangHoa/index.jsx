import { Button, Grid2, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import PublishIcon from '@mui/icons-material/Publish';
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GetAppIcon from "@mui/icons-material/GetApp";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import DevicesIcon from "@mui/icons-material/Devices";
import ModalLoaiHangHoa from "./Modal/ModalLoaiHangHoa";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ModalDonViTinh from "./Modal/ModalDonViTinh";
import { useGetAllHangHoaQuery } from "src/App/Api/HangHoa";
import { TYPE_MODAL } from "src/App/Until/constant";
import ModalAddhangHoa from "./Modal/ModalAddhangHoa";
import ModalUpdateHangHoa from "./Modal/ModalUpdateHangHoa";
import CustomDatagrid from "src/App/Components/DataGrid/CustomDatagrid";
const index = () => {
  const url = process.env.REACT_APP_API_URL
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
              onClick={handleOpenModalUpdateHangHoa}
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
    { field: "id", headerName: "Mã hàng hóa", width: 200 },
    {
      field: "image",
      width: 200,
      headerName: "Hình ảnh",
      renderCell: (params) => (
        <div
          style={{
    
          }}
        >
        <img
        src={`${url}/File/image?path=${params?.row?.duongDanHinhAnh}`} 
        style={{ width: "70px", height: "70px", objectFit: "contain" }} // Điều chỉnh kích thước hình ảnh
      />
        </div>
      ),
    },
    { field: "tenHangHoa", headerName: "Tên hàng hóa", width: 200 },
    { field: "moTa", headerName: "Mô tả", width: 200 },
    { field: "donGia", headerName: "Đơn giá", width: 200 },
  ];
  const [modalAddHangHoa, setModalAddHangHoa] = useState(false),
    [modalImport, setModalImport] = useState(false),
    [modalUpdate, setModalUpdate] = useState(false),
    [selectedRow, setSelectedRow] = useState([]),
    [typeModal, setTypeModal] = useState(""),
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
  const handleOpenModalAddHangHoa = () => {
    setModalAddHangHoa(true)
    setTypeModal(TYPE_MODAL.INSERT)
  }
  const handlecloseModalAddHangHoa = () => {
    setModalAddHangHoa(false)
    setTypeModal("")
  }
  const handleOpenModalUpdateHangHoa = () => 
  {
    setModalUpdate(true)
    setTypeModal(TYPE_MODAL.UPDATE)
  }
  const handleCloseModalUpdateHangHoa = ()=>
  {
    setModalUpdate(false)
    setTypeModal("")
  }
  useEffect(() => {
    if (hangHoa) {
      setRows(hangHoa);
    }
  }, [hangHoa]);


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Grid2 container spacing={2}>
        <Grid2 size={7}>
          <h3>Hàng hóa</h3>
        </Grid2>
        <Grid2 size={5}>
          <Button
            variant="outlined"
            sx={{ marginLeft: 1 }}
            startIcon={<Inventory2Icon />}
            onClick={handleOpenModalAddHangHoa}
          >
            Thêm hàng hóa
          </Button>
          <Button
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            variant="outlined"
            color="inherit"
            startIcon={<OpenInNewIcon />}
            sx={{ marginLeft: 1 }}
          >
            Mở rộng
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={handleClose}>
              <Button
                variant="outlined"
                color="error"
                sx={{ marginLeft: 1, width: "200px" }}
                startIcon={<DevicesIcon />}
                onClick={handleOpenModalDonViTinh}

              >
                Đơn vị tính
              </Button>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ marginLeft: 1, width: "200px" }}
                startIcon={<CategoryIcon />}
                onClick={handleOpenModalLoaiHangHoa}
              >
                Loại Hàng hóa
              </Button>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Button
                variant="outlined"
                color="warning"
                sx={{ marginLeft: 1, width: "200px" }}
                startIcon={<PublishIcon />}
              >
                IMPORT
              </Button>
            </MenuItem>
            <MenuItem>
              <Button variant="outlined" sx={{ marginLeft: 1, width: "200px" }} color="success" startIcon={<GetAppIcon />}>
                Xuất Template
              </Button>
            </MenuItem>
          </Menu>
        </Grid2>
        <Grid2 size={12}>
          <CustomDatagrid
            rows={row}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            initialPageSize={25}
            checkboxSelection={false}
            showTopToolbar={true}
            onRowSelectionChange={handleRowSelectionChange}
          />
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
      {/* Hàng hóa */}
      <ModalAddhangHoa
        selectedItem={selectedRow}
        closeModal={handlecloseModalAddHangHoa}
        typeModal={typeModal}
        setTypeModal={setTypeModal}
        showModal={modalAddHangHoa}
        refetch={isloadinghanghoa}
      />
      <ModalUpdateHangHoa
          selectedItem={selectedRow}
          closeModal={handleCloseModalUpdateHangHoa}
          typeModal={typeModal}
          setTypeModal={setTypeModal}
          showModal={modalUpdate}
          refetch={isloadinghanghoa}
      />
    </div>
  );
};

export default index;
