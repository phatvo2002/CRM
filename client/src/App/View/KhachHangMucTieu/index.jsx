import { Button, Grid2, Paper, Tooltip, IconButton, MenuItem, Menu } from '@mui/material'
import React, { useEffect, useState } from 'react'
import GetAppIcon from "@mui/icons-material/GetApp";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useGetKhachHangMucTieuByNguoiDungIdQuery, useGetKhachHangMucTieuByPhongBanIdQuery } from 'src/App/Api/KhachHangMucTieuApi';
import CustomDatagrid from 'src/App/Components/DataGrid/CustomDatagrid';
import ThreePIcon from '@mui/icons-material/ThreeP';
const KhachHangMucTieu = () => {
  const [selectedRow, setSelectedRow] = useState([]);
  const [rows, setRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const columns = [
    {
      field: "action",
      width: 150,
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
            // onClick={onOpenModalUpdateKhachHang}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton
              disabled={selectedRow.length === 0}
              style={{}}
            // onClick={() => handleDeletePhongBan(params?.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bàn giao khách hàng">
            <IconButton disabled={selectedRow.length === 0} style={{}}
            // onClick={() => handleOpenModalBanGiaoKhachHang()}
            >
              <ThreePIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },

    {
      field: "tenKhachHang",
      headerName: "Tên khách hàng",
      width: 200,
      renderCell: (params) => (
        <div>
          {params.value}
          {/* <Link
            to={`/tiemnang/${params.id}`}
            style={{ textDecoration: "none" }}
          >
            {params.value}
          </Link> */}
        </div>
      ),
    },
    { field: "id", headerName: "Mã khách hàng", width: 200 },
    { field: "tenVietTat", headerName: "Tên viết tắt", width: 200 },
    { field: "maSoThue", headerName: "Mã số thuế", width: 200 },
    // {
    //   field: "soDienThoai",
    //   headerName: "Số điện thoại cá nhân",
    //   width: 200,
    //   renderCell: (params) => (
    //     <div>
    //       {params.value ?  <div><PhoneIcon/>{params.value}</div> : <div></div>}
    //     </div>
    //   ),
    // },
    {
      field: "soDienThoai",
      headerName: "Số điện thoại",
      width: 200,
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "nguongoc", headerName: "Nguồn gốc khách hàng", width: 200,
      renderCell: (params) =>
      (
        <div>
          {params?.row?.nguonGocKhachHang?.tenNguonGoc}
        </div>
      )
    },
    {
      field: "tiemnang", headerName: "Loại khách hàng", width: 200,
      renderCell: (params) =>
      (
        <div>
          {params?.row?.loaiTiemNang?.tenLoaiTiemNang}
        </div>
      )
    },
  ];

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userData = JSON.parse(localStorage.getItem("authorizationData"));
  const { data: dataKhachHangByNguoiDung } =
    useGetKhachHangMucTieuByNguoiDungIdQuery({
      skip:
        userData?.response.checkIsTruongPhong === true ||
        userData?.response.checkIsGiamDoc === true,
    });
  const { data: dataKhachHangPhongBan, refetch } =
    useGetKhachHangMucTieuByPhongBanIdQuery({
      skip:
        userData?.response.checkIsTruongPhong === false &&
        userData?.response.checkIsGiamDoc === false,
    });
  useEffect(() => {
    if (userData?.response?.checkIsTruongPhong === true) {
      setRows(dataKhachHangPhongBan);
    } else {
      setRows(dataKhachHangByNguoiDung);
    }
  }, [dataKhachHangByNguoiDung, dataKhachHangPhongBan, userData]);
  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRow(selectedRows);
  };

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 container alignItems="center" spacing={2}>
          <Grid2>
            <h2>Khách hàng </h2>
          </Grid2>
          <Grid2 sx={{ marginLeft: 5 }}>
            {/* <Button
              variant="outlined"
              color="success"
              startIcon={<GetAppIcon />}
            // onClick={handleGetTemplates}
            >
              Xuất Template
            </Button>
            <Button
              variant="outlined"
              color="warning"
              sx={{ marginLeft: 1 }}
              startIcon={<FileDownloadDoneIcon />}
            // onClick={gotoLinkImport}
            >
              IMPORT
            </Button> */}
            <Button
              variant="outlined"
              sx={{ marginLeft: 1 }}
              startIcon={<AddIcon />}
            // onClick={gotoLink}
            >
              Thêm mới
            </Button>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ marginLeft: 1 , width:"200px"}}
              variant="outlined"
              startIcon={<OpenInNewIcon/>}
            >
              Mở rộng
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>
                <Button
                  variant="outlined"
                  color="success"
                  startIcon={<GetAppIcon />}
                  sx={{ marginLeft: 1 , width:"200px"}}
                // onClick={handleGetTemplates}
                >
                  Xuất Template
                </Button>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Button
                  variant="outlined"
                  color="warning"
                  sx={{ marginLeft: 1 , width:"200px"}}
                  startIcon={<FileDownloadDoneIcon />}
                // onClick={gotoLinkImport}
                >
                  IMPORT
                </Button>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Button
                  variant="outlined"
                  sx={{ marginLeft: 1  ,width:"200px"}}
                  startIcon={<AutoDeleteIcon />}
                  color="error"
                >
                  Thùng rác
                </Button>
              </MenuItem>
            </Menu>

            {/* <Button
              variant="outlined"
              sx={{ marginLeft: 1 }}
              startIcon={<AutoDeleteIcon />}
              color="error"
            >
              Thùng rác
            </Button> */}
          </Grid2>
          <Grid2 size={12}>
            <Paper>
              <CustomDatagrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[10, 25, 50]}
                initialPageSize={25}
                checkboxSelection={false}
                showTopToolbar={true}
                onRowSelectionChange={handleRowSelectionChange}
              />
            </Paper>
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  )
}

export default KhachHangMucTieu